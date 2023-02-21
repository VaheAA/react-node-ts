import { IUser } from '../types/user';

export function getToken(): IUser | null {
  let userData: IUser;

  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData') as string);
    return userData as IUser;
  } else {
    return null;
  }
}