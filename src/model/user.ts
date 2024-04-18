import { model } from '@modern-js/runtime/model';

interface UserInfoType {
  name: string;
  age: number;
  avatar: string;
}

interface UserType {
  userInfo: UserInfoType | null;
}

export const foo = model<UserType>('foo').define({
  state: {
    userInfo: null,
  },
  computed: {},
  actions: {
    setUserInfo: (state, payload: UserInfoType) => {
      state.userInfo = payload;
    },
  },
});
