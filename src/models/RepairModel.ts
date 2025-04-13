import { ObjectId } from 'mongodb';

export interface RepairModel {
  date: Date;
  tankId: ObjectId;
  tankNumber: number;
  executor: string;
  parts: {
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export type RepairUpdateDTO = Omit<
  Partial<RepairModel>,
  'createdAt' | 'updatedAt'
> & {
  id: string;
};

export type RepairOutputDTO = Omit<RepairModel, 'tankId'> & {
  id: string;
  tankId: string;
};
