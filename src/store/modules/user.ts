/**
 * @Author: lwsmilence
 * @Create time: 2019/7/2 18:12
 * @Last Modified time: 2019/7/2 18:12
 * @Desc:
 */
import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {getUserInfo, login} from '@/api/login';
import {getToken, setToken} from '@/utils/auth';

export interface IUserState {
  nickname: string;
  avatar: string;
  token: string;
}

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
  public nickname = '';
  public avatar = '';
  public token = '';

  @Mutation
  public setToken(token: string) {
    this.token = token;
  }

  @Action({ commit: 'setToken' })
  public async login(loginParam: {username: string, password: string}) {
    const { data } = await login(loginParam);
    setToken(data.token);
  }

  @MutationAction({mutate: ['nickname', 'avatar']})
  public async getUserInfo() {
    const {data} = await getUserInfo();
    return {
      nickname: data.nickname,
      avatar: data.avatar
    };
  }
}

export const UserModule = getModule(User);
