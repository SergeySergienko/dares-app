import { ObjectId } from 'mongodb';
import { Grade, Valve } from './TankModel';

export interface InspectionModel {
  date: Date;
  tankId: ObjectId;
  tankNumber: number;
  external?: {
    heatDamage?: boolean;
    repainting?: boolean;
    odor?: boolean;
    bow?: boolean;
    bulges?: boolean;
    hammerToneTest?: boolean;
    corrosion?: boolean;
    description?: string;
    damageLocation?: string;
    verdict?: Verdict;
  };
  internal?: {
    description?: string;
    verdict?: Verdict;
  };
  threading?: {
    description?: string;
    verdict?: Verdict;
  };
  valve?: {
    type?: Valve;
    burstDiskReplaced?: boolean;
    oRingReplaced?: boolean;
    dipTubeReplaced?: boolean;
    description?: string;
  };
  tankVerdict: Verdict;
  stickerAffixed?: boolean;
  grade?: Grade;
  inspector: Inspector;
  createdAt: Date;
  updatedAt?: Date;
}

export type Verdict = 'Acceptable' | 'Marginal' | 'Condemn';
export type Inspector = { name: string; pciNumber: string };

export type InspectionUpdateDTO = Omit<
  Partial<InspectionModel>,
  'createdAt' | 'updatedAt'
> & {
  id: string;
};

export type InspectionOutputDTO = Omit<InspectionModel, 'tankId'> & {
  id: string;
  tankId: string;
};
