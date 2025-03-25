import { ObjectId } from 'mongodb';
import { Verdict } from './InspectionModel';

export interface HydrotestModel {
  startDate: Date;
  endDate?: Date;
  tankId: ObjectId;
  tankNumber: number;
  tankVerdict?: Omit<Verdict, 'Marginal'>;
  executor: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type HydrotestOutputDTO = Omit<HydrotestModel, 'tankId'> & {
  id: string;
  tankId: string;
};

export type HydrotestUpdateDTO = {
  _id: ObjectId;
  endDate: Date;
  tankVerdict: Omit<Verdict, 'Marginal'>;
  executor: string;
  description?: string;
  updatedAt?: Date;
};
