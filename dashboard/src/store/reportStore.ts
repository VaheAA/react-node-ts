import { create } from 'zustand';
import { IMessage } from '../types/report';
import { getMessages } from '../services/reportService/reportService';
import { AxiosError, AxiosResponse } from 'axios';


interface IReportState {
  report: IMessage[] | null;
  isLoading: boolean;
  error: AxiosResponse | null;
  getMessages: () => Promise<void>;
}


export const useReportStore = create<IReportState>((set) => ({
  report: null,
  isLoading: false,
  error: null,
  getMessages: async () => {
    try {
      set(() => ({ isLoading: true }));
      const data = await getMessages();
      set(() => ({
        report: data,
        isLoading: false,
        error: null
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response;
        set(() => ({ error, isLoading: false, isLoggedIn: false, user: null }));
      }
    }
  }
}));