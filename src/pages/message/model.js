import Services from './service';
import router from 'umi/router';
import { userInfo } from 'os';

export default {
  namespace: 'message',
  state: {
    application_message_list: []
    // username: null,
    // role: null,
    // login_state: null,
    // message: null,
  },
  reducers: {
    // setUserLoginState(state, { payload: { username, role, login_state, message } }) {
    //   console.log(state);
    //   login_state = login_state || 1;
    //   message = message || "登录成功";
    //   return { ...state, username, role, login_state, message };
    // },
    set_application_message_list(state, { payload: { application_message_list }}) {
      return { ...state, application_message_list };
    }
  },
  effects: {
    *get_message_list({  }, { call, put }) {
      try {
          const { all_list } = yield call(Services.get_application_message);
          console.log(all_list);
          let application_message_list = [];
          for (let i = 0; i < all_list.length; i++) {
            const { id, actor, verb, description, timestamp } = all_list[i];
            if (verb.startsWith("APPLICATION")) {
              application_message_list.push({id, actor, verb, description, timestamp});
            }
          }
          yield put({ type: 'set_application_message_list', payload: { application_message_list } });
        //   router.push('/');
      } catch (e){
          console.log(e);
        //   yield put({ type: 'set_userLoginState', payload: { username, login_state: 0, message: e.message } });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.startsWith('/message/')) {
          dispatch({ type: 'get_message_list' });
        }
      });
    },
  },
};