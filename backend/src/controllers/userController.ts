import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateJwt } from '../utils/jwt';
import { BadRequestError, CustomAPIError, UnauthenticatedError } from '../errors';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    const error = new CustomAPIError(
      'User exists already, please login instead'
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      id: '',
      email,
      password: hashedPassword
    });
    const token = generateJwt(newUser.id, newUser.email);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    const error = new UnauthenticatedError(
      'Invalid credentials, could not log you in'
    );
    return next(error);
  }

  let isValidPassword = await bcrypt.compare(password, existingUser.password);;

  if (!isValidPassword) {
    const error = new BadRequestError('Invalid password, please try again.');
    return next(error);
  }
  let token = generateJwt(existingUser.id, existingUser.email);

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};


export {
  createUser,
  loginUser
};