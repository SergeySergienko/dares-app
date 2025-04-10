import { ObjectId } from 'mongodb';
import { Status } from './TankModel';

export interface InventoryModel {
  date: Date;
  tankId: ObjectId;
  tankNumber: number;
  tankStatus: Fit;
  executor: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type Fit = Exclude<Status, 'Rejected' | 'In testing'>;

export type InventoryOutputDTO = Omit<InventoryModel, 'tankId'> & {
  id: string;
  tankId: string;
};
