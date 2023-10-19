import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  code: number;
  data: any;

  constructor(data) {
    this.data = data;
  }

  setCode(code: number) {
    this.code = code;
    return this;
  }

  

  static output(data) {
    return new ApiResponseService(data);
  }
}
