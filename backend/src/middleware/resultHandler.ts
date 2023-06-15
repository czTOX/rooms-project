import { Response } from 'express';
import z from 'zod';

export function resultError(
  status: number,
  res: Response,
  msg?: string
): Response {
  return res.status(status).send({
    status: 'error',
    data: {},
    message: msg,
  });
}
export function resultOk(data: any, res: Response, msg?: string): Response {
  return res.send({
    status: 'success',
    data: data,
    message: msg,
  });
}

export function resultValidationError(
  error: z.ZodError,
  res: Response
): Response {
  return res.status(400).send({
    status: 'error',
    data: {},
    message: `Validation error: ${error.issues
      .map((issue) => issue.message)
      .join(';')}`,
  });
}
