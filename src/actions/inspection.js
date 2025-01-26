'use server';

import { createInspection, getInspectionList } from '@/app/api/inspection-api';
import { fetchTankByInternalNumber } from '@/app/api/tanks-api';
import { deepSet } from '@/lib/utils';
import { redirect } from 'next/navigation';

export async function get() {
  return await getInspectionList();
}

export async function create(state, formData) {
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
  const inspection = await createInspection(data);
  if (inspection?.id) {
    redirect('/inspection/view');
  }
}
