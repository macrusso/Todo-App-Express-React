import { Request, NextFunction, Response } from 'express';
import prisma from '../prisma/prisma';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        name,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};
