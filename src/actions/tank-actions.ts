'use server';

import { ClientSession, WithId } from 'mongodb';
import { tanksRepo } from '@/lib/db/tanks-repo';
import {
  Color,
  FillingType,
  Manufacturer,
  Material,
  Status,
  TankModel,
  TankOutputDTO,
  TankUpdateDTO,
  Valve,
} from '@/models/TankModel';
import { redirect } from 'next/navigation';

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
    valve: getValue('valve') as Valve,
    color: getValue('color') as Color,
    status: getValue('status') as Status,
    fillingType: getValue('fillingType') as FillingType,
    firstHydrotestDate: new Date(getValue('firstHydrotestDate')),
    lastHydrotestDate: new Date(getValue('lastHydrotestDate')),
    lastInspectionDate: getValue('lastInspectionDate')
      ? new Date(getValue('lastInspectionDate'))
      : undefined,
    lastInventoryDate: getValue('lastInventoryDate')
      ? new Date(getValue('lastInventoryDate'))
      : undefined,
    createdAt: new Date(),
  };

  const tankByNumber = await getTankByInternalNumber(newTank.internalNumber);
  if (tankByNumber) {
    throw new Error(
      `Failed to create tank record. Tank with internal number "${newTank.internalNumber}" already exists.`
    );
  }

  const [tankBySerial] = await getTanks({
    serialNumber: newTank.serialNumber,
  });
  if (tankBySerial) {
    throw new Error(
      `Failed to create tank record. Tank with serial number "${newTank.serialNumber}" already exists.`
    );
  }

  const { insertedId } = await tanksRepo.createTank(newTank);
  if (!insertedId) {
    throw new Error('Failed to create tank record. Please try again later.');
  }
  return 'New tank has been successfully created.';
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
  const tank = await tanksRepo.backupTank(internalNumber, session);
  if (!tank) {
    throw new Error('Backup for this tank already exists');
  }
  return tank;
}

export async function deleteTank(id: string, session?: ClientSession) {
  const { success, message } = await tanksRepo.deleteTank(id, session);
  if (!success) {
    throw new Error(message);
  }
  return message;
}
