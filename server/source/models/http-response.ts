class HttpResponse {

  errors?: any;
  response?: any;
  statusCode?: number;
  total?: number;

  constructor(errors?: any, response?: any, statusCode?: number, total?: number) {
    this.errors = errors;
    this.response = response;
    this.statusCode = statusCode;
    this.total = total;
  }
}

export default HttpResponse;