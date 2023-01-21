export interface IUser {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  address: string;
  passID: string;
  token: string;
}

export function generateEmptyUser(): IUser {
  return {
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    phone: "",
    address: "",
    passID: "",
    token: "",
  };
}
