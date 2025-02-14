export interface TankModel {
  internalNumber: number;
  serialNumber: string;
  manufacturer: Manufacturer;
  workPressure: number;
  material: Material;
  volume: number;
  valve: Valve;
  color: Color;
  status: Status;
  fillingType: FillingType;
  firstHydrotestDate: Date;
  lastHydrotestDate: Date;
  lastInspectionDate: Date;
  grade?: Grade;
  manufactureDate?: Date;
  terminationDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
export type Manufacturer = 'Catalina';
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
