import { ObjectId } from 'mongodb';

export interface TerminationModel {
  date: Date;
  tankId: ObjectId;
  tankSerialNumber: string;
  reason: string;
  executor: string;
  approver: string;
  createdAt: Date;
  updatedAt?: Date;
}
