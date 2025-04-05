export interface OwnerModel {
  name: string;
  phone: string;
  address: {
    postalCode: string;
    city: string;
    street: string;
  };
}
