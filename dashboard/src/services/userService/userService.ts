import { UserLoginType } from '../../shared/schema/userSchema';
import $userHost from '.';


const loginUser = async (userObj: UserLoginType) => {
  const { data } = await $userHost.post('/login', userObj);

  return data;
};


export {
  loginUser
};