class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
/***  Status: 401 */
export class unauthorizedError extends HttpError {}

/*** Status: 409  */
export class ConflictError extends HttpError {}
