export interface INewMessage {
  name?: string;
  email: string;
  phone?: string;
  category: string;
  status: string;
  period?: string;
  date?: Date;
  message: string;
  files?: FileList;
}