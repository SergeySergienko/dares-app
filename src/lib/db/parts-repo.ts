import { Filter } from 'mongodb';
import { connectDB } from './mongo-db';
import { PartModel, PartQueryDTO } from '@/models/PartModel';
import { RepairModel } from '@/models/RepairModel';

export const partsRepo = {
  async getParts(query: Partial<PartModel>) {
    const db = await connectDB();
    const filter: Filter<PartModel> = { ...query };

    return await db
      .collection<PartModel>('parts')
      .find(filter)
      .sort({ itemNumber: 'asc' })
      .toArray();
  },

  async createPart(part: PartModel) {
    const db = await connectDB();
    return await db.collection<PartModel>('parts').insertOne(part);
  },

  async partsUsageReport({
    alias,
    startDate,
    endDate,
  }: PartQueryDTO): Promise<{ [alias: string]: number }> {
    const db = await connectDB();
    const pipeline: any[] = [{ $match: {} }];

    if (startDate || endDate) {
      const dateFilter: Record<string, Date> = {};
      if (startDate) {
        dateFilter.$gte = startDate;
      }
      if (endDate) {
        dateFilter.$lte = endDate;
      }
      pipeline[0].$match.date = dateFilter;
    }

    if (alias) {
      pipeline.push(
        { $match: { [`parts.${alias}`]: { $exists: true } } },
        {
          $group: {
            _id: null,
            total: { $sum: `$parts.${alias}` },
          },
        },
        {
          $project: {
            _id: 0,
            [alias]: '$total',
          },
        }
      );
    } else {
      pipeline.push(
        {
          $addFields: {
            partsArray: { $objectToArray: '$parts' },
          },
        },
        { $unwind: { path: '$partsArray', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$partsArray.k',
            total: { $sum: '$partsArray.v' },
          },
        },
        {
          $project: {
            _id: 0,
            alias: '$_id',
            total: 1,
          },
        },
        {
          $group: {
            _id: null,
            parts: { $push: { k: '$alias', v: '$total' } },
          },
        },
        {
          $project: {
            _id: 0,
            parts: { $arrayToObject: '$parts' },
          },
        }
      );
    }

    const [report] = await db
      .collection<RepairModel>('repair')
      .aggregate(pipeline)
      .toArray();

    if (alias) {
      return report || { [alias]: 0 };
    } else {
      return report?.parts || {};
    }
  },
};
