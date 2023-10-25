import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  private _ok: boolean = true;
  private _code: number = 200;
  private _data: any = {};

  constructor() {}

  ok(ok: boolean = true) {
    this._ok = ok;
    return this;
  }

  code(code: number = 200) {
    this._code = code;
    return this;
  }

  data(data: any) {
    this._data = data;
    return this;
  }

  private out() {
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
