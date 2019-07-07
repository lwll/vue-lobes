/**
 * @Author: lwsmilence
 * @Create time: 2019/7/3 18:37
 * @Last Modified time: 2019/7/3 18:37
 * @Desc: 路由权限控制
 */
import router from '@/router';
import {Route} from 'vue-router';
import NProgress from 'nprogress';
import {getToken} from '@/utils/auth';
import {UserModule} from '@/store/modules/user';
import {Message} from 'iview';


router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (!UserModule.nickname) {
        UserModule.getUserInfo().then(() => {
          next();
        }).catch((err) => {
          Message.prototype.error(err);
        });
      }
    }
  } else {
    next('/login');
  }
});
