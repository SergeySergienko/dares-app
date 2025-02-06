'use server';

import { inspectionApi } from '@/app/api/inspection-api';
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

  const inspection = await inspectionApi.createInspection(data);
  if (inspection?.id) {
    redirect('/inspections');
  }
}
