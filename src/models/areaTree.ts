import { Effect, Reducer, Subscription } from 'umi';
import { getTree } from '@/api/areaTree';


export interface AreaTreeProps {
  id: string;
  text: string;
  hasChildren: boolean;
}

export interface  AreaTreeModelState {
  treeDatas: AreaTreeProps[],
  cityData: AreaTreeProps[]
  areaData: AreaTreeProps[]
}

export interface AreaTreeModelType {
  namespace: string;
  state: AreaTreeModelState;
  effects: {
    getTree: Effect;
  };
  reducers: {
    save: Reducer<any>;
  };
  subscriptions: { setup: Subscription };
}

const LoginModel: AreaTreeModelType = {
  namespace: 'areaTree',

  state: {
    treeDatas: [],
    cityData: [],
    areaData: [],
  },

  effects: {
    *getTree({ payload }, { put, call }) {   // 获取省数据
      const treeDatas = yield call(getTree, payload);

      yield put({
        type: 'save',
        payload: { treeDatas }
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {

        if (pathname === '/layouts/sub2_subnav') {
          dispatch({
            type: 'getTree'
          })
        }
      });
    }
  },
}

export default LoginModel;