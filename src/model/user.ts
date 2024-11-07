import { create } from 'zustand';

interface UserInfoType {
  name: string;
  age: number;
  avatar: string;
}

interface UserType {
  userInfo: UserInfoType | null;
  isAdmin: boolean;
}

const useUserStore = create<UserType>(set => ({
  userInfo: {
    name: 'clark',
    age: 18,
    avatar: '',
  },
  isAdmin: true,
  updateUser: (newBears: UserType) => set({}),
}));
