import { StatusCodes } from 'http-status-codes';
import CustomApiError from './customApiError';

class UnauthenticatedError extends CustomApiError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


export default UnauthenticatedError;