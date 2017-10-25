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
const ResourceConfig = {
    ApiURL : "http://www.baidu.com"
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
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
