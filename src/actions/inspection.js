'use server';

import { createInspection } from '@/app/api/inspection-api';
import { fetchTankByInternalNumber } from '@/app/api/tanks-api';
import { deepSet } from '@/lib/utils';

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

  const tank = await fetchTankByInternalNumber(data.internalNumber);
  if (!tank) {
    throw new Error(
      `Tank with internal number ${data.internalNumber} not found`
    );
  }
  delete data.internalNumber;
  data.tankId = tank.id;
  const inspection = await createInspection(data);
}
