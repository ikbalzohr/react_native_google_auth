export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ValidationError extends Error {
  constructor(message: string, public details?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ServerError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "ServerError";
  }
}
