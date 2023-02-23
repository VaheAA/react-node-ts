import { IMessage, IReport } from '../../types/report';
import $reportHost from '.';



const getMessages = async (page: number, limit: number = 5, rest: any): Promise<IReport> => {
  const { data } = await $reportHost.get('/', {
    params: {
      page,
      limit,
      ...rest
    }
  });

  return data.messages;
};

const exportReport = async (): Promise<BlobPart> => {
  const { data } = await $reportHost.get('/export');

  return data;
};


export { getMessages, exportReport };