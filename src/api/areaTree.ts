import request from '@/utils/request';
import qs from 'qs'

export interface AreaTreeParams {
  parentId: React.Key,
}

export const getTree = async (params: AreaTreeParams): Promise<any> => {
  return request(`/area/GetTree?${qs.stringify(params)}`, {
    method: 'GET'
  });
}
