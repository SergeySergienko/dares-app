import { ObjectId } from 'mongodb';
import { InspectionModel } from './InspectionModel';
import { InventoryModel } from './InventoryModel';
import { HydrotestModel } from './HydrotestModel';

export interface TankModel {
  internalNumber: number;
  serialNumber: string;
  manufacturer: Manufacturer;
  workPressure: number;
  material: Material;
  volume: number;
  valve?: Valve;
  color: Color;
  status?: Status;
  fillingType: FillingType;
  firstHydrotestDate: Date;
  lastHydrotestDate: Date;
  lastInspectionDate?: Date;
  lastInventoryDate?: Date;
  grade?: Grade;
  manufactureDate?: Date;
  terminationDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface BackupModel {
  _id: ObjectId;
  internalNumber: number;
  serialNumber: string;
  manufacturer: Manufacturer;
  workPressure: number;
  material: Material;
  volume: number;
  color: Color;
  fillingType: FillingType;
  firstHydrotestDate: Date;
  manufactureDate?: Date;
  terminationDate: Date;
  inspectionList: InspectionModel[];
  inventoryList: InventoryModel[];
  hydrotestList: HydrotestModel[];
  // maintenanceList: MaintenanceModel[];
  createdAt: Date;
}

export type Manufacturer = 'Catalina' | 'Faber';
export type Material = 'Aluminium' | 'Steel' | 'FRP' | 'Carbon Composite';
export type Valve = 'YOKE' | 'DIN' | 'Other' | 'Unknown';
export type Color = 'Not painted' | 'Black/White' | 'Black/Yellow';
export type Status =
  | 'In use'
  | 'In testing'
  | 'Rejected'
  | 'Not found'
  | 'Lost';
export type FillingType = 'Air' | 'Nitrox';
export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type TankUpdateDTO = Omit<
  Partial<TankModel>,
  'createdAt' | 'updatedAt'
> & {
  id: string;
};

export type TankOutputDTO = TankModel & {
  id: string;
};

export type BackupOutputDTO = Omit<Partial<BackupModel>, '_id'> & {
  id: string;
};
