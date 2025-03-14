import { ObjectId } from 'mongodb';
import { Verdict } from './InspectionModel';

export interface HydrotestModel {
  date: Date;
  tankId: ObjectId;
  tankNumber: number;
  tankVerdict: Verdict;
  executor: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type HydrotestOutputDTO = Omit<HydrotestModel, 'tankId'> & {
  id: string;
  tankId: string;
};
