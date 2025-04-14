import { ClientSession, Filter, ObjectId } from 'mongodb';
import { client, connectDB } from './mongo-db';
import { BackupModel, TankModel, TankUpdateDTO } from '@/models/TankModel';
import { InspectionModel } from '@/models/InspectionModel';
import { InventoryModel } from '@/models/InventoryModel';
import { HydrotestModel } from '@/models/HydrotestModel';
import { RepairModel } from '@/models/RepairModel';

export const tanksRepo = {
  async getTanks({
    internalNumber,
    serialNumber,
    status,
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
    if (status) {
      filter.status = status;
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

  async getScrappedTanks() {
    const db = await connectDB();
    return await db.collection<BackupModel>('backup').find({}).toArray();
  },

  async getScrappedTankBySerialNumber(serialNumber: string) {
    const db = await connectDB();
    return await db
      .collection<BackupModel>('backup')
      .findOne({ serialNumber: decodeURI(serialNumber) });
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

  async backupTank(id: string, session?: ClientSession) {
    const db = await connectDB();
    const objectId = new ObjectId(id);

    const pipeline = [
      { $match: { _id: objectId } },
      {
        $unset: [
          'internalNumber',
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
        $lookup: {
          from: 'repair',
          localField: '_id',
          foreignField: 'tankId',
          as: 'repairList',
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
      .findOne({ _id: objectId }, { session });
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

      await db
        .collection<RepairModel>('repair')
        .deleteMany({ tankId: objectId }, { session: currentSession });

      const result = await db
        .collection<TankModel>('tanks')
        .deleteOne({ _id: objectId }, { session: currentSession });

      if (shouldStartSession) {
        await currentSession.commitTransaction();
      }

      return result;
    } catch (error) {
      if (shouldStartSession) {
        await currentSession.abortTransaction();
      }
    } finally {
      if (shouldStartSession) {
        await currentSession.endSession();
      }
    }
  },
};
