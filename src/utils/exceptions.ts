// Base custom error class
export class CustomError extends Error {
  statusCode: number; // Add a property to store the status code

  constructor(messages: string | string[], statusCode: number, name?: string) {
    const errorMessage = Array.isArray(messages)
      ? messages.join(', ')
      : messages;
    super(errorMessage);
    this.name = name || this.constructor.name;
    this.statusCode = statusCode; // Initialize the status code
  }
}

// 400 Bad Request Error
export class BadRequestError extends CustomError {
  constructor(messages: string | string[] = 'Bad Request') {
    super(messages, 400);
  }
}

// 401 Unauthorized Error
export class UnauthorizedError extends CustomError {
  constructor(messages: string | string[] = 'Unauthorized') {
    super(messages, 401);
  }
}

// 403 Forbidden Error
export class ForbiddenError extends CustomError {
  constructor(messages: string | string[] = 'Forbidden') {
    super(messages, 403);
  }
}

// 404 Not Found Error
export class NotFoundError extends CustomError {
  constructor(messages: string | string[] = 'Not Found') {
    super(messages, 404);
  }
}

// 500 Internal Server Error
export class InternalServerError extends CustomError {
  constructor(messages: string | string[] = 'Internal Server Error') {
    super(messages, 500);
  }
}
