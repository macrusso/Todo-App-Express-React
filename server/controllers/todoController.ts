import prisma from '../prisma/prisma';
import { Request, NextFunction, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, content } = req.body;
    const newTodoItem = await prisma.todoItem.create({
      data: {
        id: uuidv4(),
        userId,
        content,
        isCompleted: false,
      },
    });
    res.json(newTodoItem);
  } catch (error) {
    next(error);
  }
};

export const getUserTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const todos = await prisma.todoItem.findMany({
      where: {
        userId,
      },
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const updatedTodo = await prisma.todoItem.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.todoItem.delete({
      where: {
        id,
      },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteCompletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await prisma.todoItem.deleteMany({
      where: {
        userId,
        isCompleted: true,
      },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
