'use server';

import { inspectionApi } from '@/app/api/inspection-api';
import { fetchTankByInternalNumber } from '@/app/api/tank-api';
import { deepSet } from '@/lib/utils';
import { redirect } from 'next/navigation';

export async function getInspectionsList() {
  return await inspectionApi.getInspectionsList();
}

export async function getInspectionByTankNumber(tankNumber) {
  return await inspectionApi.getInspectionByTankNumber(tankNumber);
}

export async function createInspection(state, formData) {
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$')) {
      continue;
    }

    if (key.includes('.')) {
      deepSet(data, key, value);
    } else {
      data[key] = value;
    }
  }

  const tank = await fetchTankByInternalNumber(data.tankNumber);
  if (!tank) {
    throw new Error(`Tank with internal number ${data.tankNumber} not found`);
  }
  data.tankId = tank.id;
  const inspection = await inspectionApi.createInspection(data);
  if (inspection?.id) {
    redirect('/inspections');
  }
}
