export class Result<T> {
  data: T | null;
  error: string | null;
  success: boolean;

  constructor(data: T | null = null, error: string | null = null) {
    this.data = data;
    this.error = error;
    this.success = error === null;
  }

  static success<T>(data: T): Result<T> {
    return new Result<T>(data);
  }

  static failure<T>(error: string): Result<T> {
    return new Result<T>(null, error);
  }

  static standardResponse<T>(result: Result<T>) {
    return {
      success: result.success,
      data: result.data,
      error: result.error,
    };
  }
}
