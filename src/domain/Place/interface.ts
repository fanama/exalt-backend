export interface IPlace {
  _id?: string;
  level: number;
  age: number;
  phone: string;
  address: string;
}

export function generatePlace({
  level = 2,
  age = 18,
  phone = "",
  address = "",
}: IPlace): IPlace {
  return {
    level,
    age,
    phone,
    address,
  };
}
