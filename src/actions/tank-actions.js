'use server';

import { tanksRepo } from '@/lib/db/tanks-repo';

const procedureMapper = {
  inspection: 'lastInspectionDate',
  hydrotest: 'lastHydrotestDate',
};

const tankMapper = (tank) => {
  const { _id, ...rest } = tank;
  return { id: _id.toString(), ...rest };
};

export async function getTanks(query) {
  const tanks = await tanksRepo.getTanks(query);
  return tanks.map(tankMapper);
}

export async function getTankByInternalNumber(tankNumber) {
  const query = { internalNumber: +tankNumber };
  const [tank] = await tanksRepo.getTanks(query);
  return await tankMapper(tank);
}

export async function getTanksByProcedureDate(procedure, monthsAgo) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);

  const query = {
    [procedureMapper[procedure]]: {
      $lte: new Date(date.toISOString()),
    },
  };
  const tanks = await tanksRepo.getTanks(query);
  return tanks.map(tankMapper);
}

export async function updateTank(updateData) {
  const updatedTank = await tanksRepo.updateTank(updateData);
  if (!updatedTank) {
    throw new Error('Failed to update tank record. Please try again later.');
  }

  return tankMapper(updatedTank);
}
