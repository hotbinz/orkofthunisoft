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

var state = {
    isLogin : '100'
}

//基础配置
Vue.prototype.Const = {
    ApiURL : "/OKRsThunisoft"
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
        if(state.isLogin == "100") {
            next();
        }
        else {
            next({path:'/login',query:{Rurl:to.fullPath}});
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
state.isLogin == "100";