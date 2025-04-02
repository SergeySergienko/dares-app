export interface PartModel {
  itemNumber: number;
  title: string;
  alias: string;
  catalogNumber: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartQueryDTO = {
  alias?: string;
  startDate?: Date;
  endDate?: Date;
};

export type PartOutputDTO = PartModel & { id: string };

export type PartsUsageReportOutputDTO = PartOutputDTO & { total: number };
