import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import "babel-polyfill";
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);
//基础配置
Vue.prototype.Const = {
    ApiURL : "/OKRsThunisoft"
}
window.User = {
    isLogin : '101',
    avatar : ""
}

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    //是否登录验证
    if(to.matched.some(m=>m.meta.auth)) {
        if(window.User.isLogin == "200") {
            next();
        }
        else {
            next({path:'/',query:{Rurl:to.fullPath}});
        }
    }
    else {
        next();
    }    
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
window.Hub = new Vue(); //创建事件中心
var vue = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});