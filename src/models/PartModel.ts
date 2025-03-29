export interface PartModel {
  itemNumber: number;
  title: string;
  alias: string;
  catalogNumber: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartOutputDTO = PartModel & { id: string };
