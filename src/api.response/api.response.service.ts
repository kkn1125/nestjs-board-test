import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  _ok: boolean = true;
  _code: number = 200;
  _data: any = {};

  constructor() {}

  ok(ok: boolean) {
    this._ok = ok;
    return this;
  }

  code(code: number) {
    this._code = code;
    return this;
  }

  data(data: any) {
    this._data = data;
    return this;
  }

  out() {
    return {
      ok: this._ok,
      code: this._code,
      data: this._data,
    };
  }

  outputWithoutData() {
    const out = this.out();
    delete out.data;
    return out;
  }
  output() {
    return this.out();
  }
}
