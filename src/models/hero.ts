import { Effect, Reducer, Subscription } from 'umi';
import { query } from '@/api/hero';

export interface HeroProps {
  ename: number,
  cname: string,
  title: string,
  new_type: number,
  hero_type: number,
  skin_name: string,
  pay_type: number,
}

// 在modals定义的接口并导出的话，会默认注入到umi里面去，然后可以用通过umi导出来达到复用
export interface HeroModelState {
  heros: HeroProps[],
  filterKey: number
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heros: [],
    filterKey: 0
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const data = yield call(query)
      yield put({
        type: 'save',
        payload: {
          heros: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  // 订阅
  // 监听路由，当页面一进入hero路由时，就发送请求
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          setTimeout(() => {
            dispatch({
              type: 'fetch'
            })
          }, 500)
          
        }
      });
    }
  },
}

export default HeroModel;