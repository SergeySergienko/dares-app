import { tankApi } from '@/app/api/tank-api';

export async function getTankList() {
  return await tankApi.getTankList();
}
