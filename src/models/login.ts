import { Effect, Reducer, history } from 'umi';
import { login } from '@/api/login';
import { localStorageSet } from '@/utils/util';



export interface ItemModelType {
  namespace: string;
  state: any;
  effects: {
    login: Effect;
  };
  reducers: {
    save: Reducer<any>;
  };
}

const LoginModel: ItemModelType = {
  namespace: 'login',

  state: {
    
  },

  effects: {
    *login({ payload }, { put, call }) {
      // const data = yield call(login, payload);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     userCode, 
      //     passWord
      //   },
      // });
      localStorageSet('auth', 'user')
      localStorage.removeItem("menuData");

      history.push('/layouts')
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  }
}

export default LoginModel;