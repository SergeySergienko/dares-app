'use server';

import { WithId } from 'mongodb';
import { tanksRepo } from '@/lib/db/tanks-repo';
import { TankModel, TankOutputDTO, TankUpdateDTO } from '@/models/TankModel';

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

export async function updateTank(updateData: TankUpdateDTO) {
  const updatedTank = await tanksRepo.updateTank(updateData);
  if (!updatedTank) {
    throw new Error('Failed to update tank record. Please try again later.');
  }

  return tankMapper(updatedTank);
}
