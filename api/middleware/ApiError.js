export class ApiError extends Error {
  constructor(message, code, safe = false) {
    super(message);
    this._message = message;
    this._code = code;
    this._safe = safe;
  }

  get message() {
    return this._safe ? this._message : "Hubo un error desconocido.";
  }

  get code() {
    return this._code;
  }

  get safe() {
    return this._safe;
  }
}
