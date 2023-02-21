import { create } from 'zustand';
import { IUser } from '../types/user';
import { loginUser } from '../services/userService/userService';
import { UserLoginType } from '../shared/schema/userSchema';
import { AxiosError, AxiosResponse } from 'axios';
import { getToken } from '../utils/getToken';


interface IUserState {
  user: IUser | null,
  isLoading: boolean;
  error: AxiosResponse | null;
  isLoggedIn: boolean;
  login: (user: UserLoginType) => void;
  logout: () => void;
  checkLogin: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  login: async (user: UserLoginType) => {
    try {
      set(() => ({ isLoading: true }));
      const data = await loginUser(user);
      localStorage.setItem('userData', JSON.stringify({ email: data.email, token: data.token }));
      set(() => ({
        user: data,
        isLoading: false,
        isLoggedIn: true,
        error: null
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response;
        set(() => ({ error, isLoading: false, isLoggedIn: false, user: null }));
      }
    }
  },
  logout: () => {
    localStorage.removeItem('userData');
    set(() => ({ user: null, isLoggedIn: false, error: null }));
  },
  checkLogin: () => {
    getToken() && set(() => ({ isLoggedIn: true, user: getToken() }));
  }
})); 