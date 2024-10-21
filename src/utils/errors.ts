import { CustomError } from './exceptions';

export function handleError(err: Error): {
  statusCode: number;
  error: string;
} {
  if (err instanceof CustomError) {
    return { statusCode: err.statusCode, error: err.message };
  } else {
    return { statusCode: 500, error: 'Internal Server Error' };
  }
}
