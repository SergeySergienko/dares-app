'use server';

import { ClientSession, WithId } from 'mongodb';
import { tanksRepo } from '@/lib/db/tanks-repo';
import {
  BackupModel,
  BackupOutputDTO,
  Color,
  FillingType,
  Manufacturer,
  Material,
  Status,
  TankModel,
  TankOutputDTO,
  TankUpdateDTO,
} from '@/models/TankModel';
import { revalidatePath } from 'next/cache';

const procedureMapper = {
  inspection: 'lastInspectionDate',
  hydrotest: 'lastHydrotestDate',
};

const tankMapper = (tank: WithId<TankModel>): TankOutputDTO => {
  const { _id, ...rest } = tank;
  return { id: _id.toString(), ...rest };
};

export async function getTanks(query: Partial<TankModel> = {}) {
  const tanks = await tanksRepo.getTanks(query);
  return tanks.map(tankMapper);
}

export async function getTankByInternalNumber(tankNumber: number) {
  const query = { internalNumber: tankNumber };
  const [tank] = await tanksRepo.getTanks(query);
  if (!tank) return null;
  return tankMapper(tank);
}

export async function getTanksByProcedureDate(
  procedure: 'inspection' | 'hydrotest',
  monthsAgo: number
) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const query = { [procedureMapper[procedure]]: date };
  const tanks = await tanksRepo.getTanks(query);
  return tanks.map(tankMapper);
}

export async function getTanksByStatus(status: Status) {
  const tanks = await tanksRepo.getTanks({ status });
  return tanks.map(tankMapper);
}

export async function createTank(state: any, formData: FormData) {
  const getValue = (key: keyof TankModel) =>
    formData.get(key)?.toString().trim() || '';

  const newTank: TankModel = {
    internalNumber: Number(getValue('internalNumber')),
    serialNumber: getValue('serialNumber'),
    manufacturer: getValue('manufacturer') as Manufacturer,
    workPressure: Number(getValue('workPressure')),
    material: getValue('material') as Material,
    volume: Number(getValue('volume')),
    valve: undefined,
    color: getValue('color') as Color,
    status: 'Created',
    fillingType: getValue('fillingType') as FillingType,
    firstHydrotestDate: new Date(getValue('firstHydrotestDate')),
    lastHydrotestDate: new Date(getValue('lastHydrotestDate')),
    lastInspectionDate: undefined,
    lastInventoryDate: undefined,
    createdAt: new Date(),
  };

  const tankByNumber = await getTankByInternalNumber(newTank.internalNumber);
  if (tankByNumber) {
    return {
      error: `Failed to create tank record. Tank with internal number "${newTank.internalNumber}" already exists.`,
    };
  }

  const [tankBySerial] = await getTanks({
    serialNumber: newTank.serialNumber,
  });
  if (tankBySerial) {
    return {
      error: `Failed to create tank record. Tank with serial number "${newTank.serialNumber}" already exists.`,
    };
  }

  const { insertedId } = await tanksRepo.createTank(newTank);
  if (!insertedId) {
    return { error: 'Failed to create tank record. Please try again later.' };
  }
  revalidatePath('/tanks');
  return { message: 'New tank has been successfully created.' };
}

export async function updateTank(updateData: TankUpdateDTO) {
  const updatedTank = await tanksRepo.updateTank(updateData);
  if (!updatedTank) {
    throw new Error('Failed to update tank record. Please try again later.');
  }
  return tankMapper(updatedTank);
}

export async function backupTank(
  internalNumber: number,
  session?: ClientSession
) {
  const currentTank = await getTankByInternalNumber(internalNumber);
  if (!currentTank) {
    throw new Error('Tank not found');
  }

  const tank = await tanksRepo.backupTank(currentTank.id, session);
  if (!tank) {
    throw new Error('Backup for this tank already exists');
  }
  return tank;
}

export async function deleteTank(id: string, session?: ClientSession) {
  const result = await tanksRepo.deleteTank(id, session);
  if (result?.deletedCount !== 1) {
    return {
      error: 'Failed to delete tank record. Please try again later.',
    };
  }
  revalidatePath('/tanks');
  revalidatePath('/tanks/scrapped');
  revalidatePath('/inspections');
  revalidatePath('/inventories');
  revalidatePath('/hydrotests');
  revalidatePath('/repairs');
  return { message: 'Tank has been successfully deleted.' };
}

const scrappedMapper = (tank: BackupModel): BackupOutputDTO => {
  const {
    _id,
    inspectionList,
    inventoryList,
    hydrotestList,
    repairList,
    ...rest
  } = tank;
  return { id: _id.toString(), ...rest };
};

export async function getScrappedTanks() {
  const tanks = await tanksRepo.getScrappedTanks();
  return tanks.map(scrappedMapper);
}

export async function getScrappedTankBySerialNumber(serialNumber: string) {
  const tank = await tanksRepo.getScrappedTankBySerialNumber(serialNumber);
  if (!tank) return null;

  const { _id, ...rest } = tank;
  return { id: _id.toString(), ...rest };
}
