import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

type ErrorObject = Record<string, string | Record<string, unknown>>;

function generateErrors(errors: ValidationError[]): ErrorObject {
  const result: ErrorObject = {};

  for (const error of errors) {
    if (error.children && error.children.length > 0) {
      result[error.property] = generateErrors(error.children);
    } else {
      const constraints = error.constraints;
      result[error.property] = constraints
        ? Object.values(constraints).join(', ')
        : '';
    }
  }

  return result;
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: generateErrors(errors),
    });
  },
};

export default validationOptions;
