import { tankApi } from '@/app/api/tank-api';

export async function getTanksList() {
  return await tankApi.getTanksList();
}

export async function fetchTankByInternalNumber(internalNumber) {
  return await tankApi.fetchTankByInternalNumber(internalNumber);
}
