import { CustomError } from "../utils/globalErrorHandler";





//decorators
export function setErrorStatusCode(statusCode: number) {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    let original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (error: any) {
        throw new CustomError(error, error.message, statusCode);
      }
    };
  };
}
