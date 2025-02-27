'use server';

import { TerminationModel } from '@/models/TerminationModel';
import { backupTank, deleteTank } from './tank-actions';
import { client } from '@/lib/db/mongo-db';
import { terminationsRepo } from '@/lib/db/terminations-repo';

export async function createTermination(state: any, formData: FormData) {
  const getValue = (key: keyof TerminationModel) =>
    formData.get(key)?.toString().trim() || '';

  // 1. Make a backup of the deleting Tank
  const tankNumber = formData.get('tankNumber')!;
  const backupResult = await backupTank(+tankNumber);

  if (!backupResult) {
    throw new Error(`Backup failed for tank ${tankNumber}`);
  }

  const { _id, serialNumber } = backupResult;
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      // 2. Create Termination entity
      const newTermination: TerminationModel = {
        date: new Date(getValue('date')),
        tankId: _id,
        tankSerialNumber: serialNumber,
        reason: getValue('reason'),
        executor: getValue('executor'),
        approver: getValue('approver'),
        createdAt: new Date(),
      };

      const { insertedId } = await terminationsRepo.createTermination(
        newTermination,
        session
      );

      if (!insertedId) {
        throw new Error('Failed to create termination record.');
      }

      // 3. Delete Tank from "tanks" collection and its "history"
      await deleteTank(_id.toString(), session);
    });

    return 'Backup for the tank has been successfully created.';
  } catch (error) {
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
}
