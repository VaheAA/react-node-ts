import { IMessage } from '../../types/report';
import $reportHost from '.';


const getMessages = async (): Promise<IMessage[]> => {
  const { data } = await $reportHost.get('/');
  return data.messages;
};


export { getMessages };