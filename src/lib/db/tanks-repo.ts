import { ClientSession, Filter, ObjectId } from 'mongodb';
import { client, connectDB } from './mongo-db';
import { BackupModel, TankModel, TankUpdateDTO } from '@/models/TankModel';
import { InspectionModel } from '@/models/InspectionModel';
import { InventoryModel } from '@/models/InventoryModel';
import { HydrotestModel } from '@/models/HydrotestModel';

export const tanksRepo = {
  async getTanks({
    internalNumber,
    serialNumber,
    lastInspectionDate,
    lastHydrotestDate,
  }: Partial<TankModel>) {
    const db = await connectDB();
    const filter: Filter<TankModel> = {};
    if (internalNumber) {
      filter.internalNumber = Number(internalNumber);
    }
    if (serialNumber) {
      filter.serialNumber = serialNumber;
    }
    if (lastInspectionDate) {
      filter.lastInspectionDate = {};
      filter.lastInspectionDate.$lte = lastInspectionDate;
    }
    if (lastHydrotestDate) {
      filter.lastHydrotestDate = {};
      filter.lastHydrotestDate.$lte = lastHydrotestDate;
    }
    return await db.collection<TankModel>('tanks').find(filter).toArray();
  },

  async createTank(tank: TankModel) {
    const db = await connectDB();
    return await db.collection<TankModel>('tanks').insertOne(tank);
  },

  async updateTank(updateData: TankUpdateDTO) {
    const db = await connectDB();
    const { id, ...fieldsToUpdate } = updateData;

    const updateFields = Object.entries(fieldsToUpdate).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {}
    );

    const result = await db
      .collection<TankModel>('tanks')
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { ...updateFields, updatedAt: new Date() } },
        { returnDocument: 'after', includeResultMetadata: true }
      );

    return result.value;
  },

  async backupTank(internalNumber: number, session?: ClientSession) {
    const db = await connectDB();
    const pipeline = [
      { $match: { internalNumber } },
      {
        $unset: [
          'valve',
          'status',
          'lastInspectionDate',
          'lastInventoryDate',
          'lastHydrotestDate',
          'grade',
          'updatedAt',
        ],
      },
      {
        $lookup: {
          from: 'inspection',
          localField: '_id',
          foreignField: 'tankId',
          as: 'inspectionList',
        },
      },
      {
        $lookup: {
          from: 'inventory',
          localField: '_id',
          foreignField: 'tankId',
          as: 'inventoryList',
        },
      },
      {
        $lookup: {
          from: 'hydrotest',
          localField: '_id',
          foreignField: 'tankId',
          as: 'hydrotestList',
        },
      },
      {
        $addFields: {
          createdAt: new Date(),
        },
      },
      {
        $merge: {
          into: 'backup',
          whenMatched: 'fail',
          whenNotMatched: 'insert',
        },
      },
    ];

    await db
      .collection<TankModel>('tanks')
      .aggregate(pipeline, { session })
      .toArray();
    return await db
      .collection<BackupModel>('backup')
      .findOne({ internalNumber }, { session });
  },

  async deleteTank(id: string, session?: ClientSession) {
    const db = await connectDB();
    const objectId = new ObjectId(id);

    const shouldStartSession = !session;
    const currentSession = shouldStartSession ? client.startSession() : session;

    try {
      if (shouldStartSession) {
        currentSession.startTransaction();
      }

      await db
        .collection<InspectionModel>('inspection')
        .deleteMany({ tankId: objectId }, { session: currentSession });

      await db
        .collection<InventoryModel>('inventory')
        .deleteMany({ tankId: objectId }, { session: currentSession });

      await db
        .collection<HydrotestModel>('hydrotest')
        .deleteMany({ tankId: objectId }, { session: currentSession });

      const result = await db
        .collection<TankModel>('tanks')
        .deleteOne({ _id: objectId }, { session: currentSession });

      if (result.deletedCount !== 1) {
        throw new Error(
          'Failed to delete tank record. Please try again later.'
        );
      }

      if (shouldStartSession) {
        await currentSession.commitTransaction();
      }

      return {
        success: true,
        message: 'The tank has been successfully deleted.',
      };
    } catch (error) {
      if (shouldStartSession) {
        await currentSession.abortTransaction();
      }
      return { success: false, message: (error as Error).message };
    } finally {
      if (shouldStartSession) {
        await currentSession.endSession();
      }
    }
  },
};
