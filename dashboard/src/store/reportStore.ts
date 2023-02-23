import { create } from 'zustand';
import { IMessage, IReport } from '../types/report';
import { exportReport, getMessages } from '../services/reportService/reportService';
import { AxiosError, AxiosResponse } from 'axios';


interface IReportState {
  rows: IMessage[] | null;
  isLoading: boolean;
  error: AxiosResponse | null;
  count: number;
  getMessages: (page: number, limit: number, rest?: any) => Promise<void>;
  exportReport: () => Promise<void>;
}


export const useReportStore = create<IReportState>((set) => ({
  rows: null,
  isLoading: false,
  error: null,
  count: 0,
  getMessages: async (page: number, limit: number, rest: any) => {
    try {
      set(() => ({ isLoading: true }));
      const { rows, count } = await getMessages(page, limit, rest);
      set(() => ({
        rows: rows,
        count: count,
        isLoading: false,
        error: null
      }));
      set(() => ({ isLoading: false }));
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response;
        set(() => ({ error, isLoading: false, isLoggedIn: false, user: null }));
      }
    }
  },
  exportReport: async () => {
    try {
      set(() => ({ isLoading: true }));
      const data = await exportReport();
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'download.csv');
      a.click();
      console.log(data);
      set(() => ({ isLoading: false }));
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response;
        set(() => ({ error, isLoading: false, isLoggedIn: false, user: null }));
      }
    }
  }
}));