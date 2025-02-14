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
  inspector: { name: string; pciNumber: string };
  createdAt: Date;
  updatedAt?: Date;
}

export type Verdict = 'Acceptable' | 'Marginal' | 'Condemn';

export type InspectionOutputDTO = Omit<InspectionModel, 'tankId'> & {
  id: string;
  tankId: string;
};
