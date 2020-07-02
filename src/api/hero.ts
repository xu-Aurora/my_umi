import request from '@/utils/request';

export const query = async (): Promise<any> =>  {
  return request('web201605/js/herolist.json');
}