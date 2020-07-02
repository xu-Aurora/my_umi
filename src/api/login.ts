import request from '@/utils/request';

export interface LoginParams {
  userCode: string,
  passWord: string,
}

export const login = async (params: LoginParams): Promise<any> => {
  return request('/app/User/UserLogin', {
    method: 'POST',
    data: params,
  });
}

// export async function fakeAccountLogin(params: LoginParamsType) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }