/**
 * Uniform success envelope: { success, message, data, meta? }.
 */
export default class ApiResponse {
  constructor(data, message = 'OK', meta = undefined) {
    this.success = true;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }

  static send(res, statusCode, data, message, meta) {
    return res.status(statusCode).json(new ApiResponse(data, message, meta));
  }
}
