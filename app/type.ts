export interface UserType {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  date_of_birth: string | null;
  gender: GenderType;
  create_ts?: Date;
}

export interface ProductType {
  id?: string;
  usersId: string;
  name: string;
  price: number;
  create_ts: Date;
  modify_ts: Date;
}

export enum GenderType {
  NotSpecified = "not-specified",
  Female = "female",
  Male = "male",
}
