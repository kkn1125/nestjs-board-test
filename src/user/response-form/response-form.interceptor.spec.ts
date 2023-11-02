import { ApiResponseService } from '@src/api.response/api.response.service';
import { ResponseFormInterceptor } from './response-form.interceptor';

describe('ResponseFormInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseFormInterceptor(new ApiResponseService())).toBeDefined();
  });
});
