const routers = [
    {
        path: '/',
        meta: {
            title: '欢迎使用OKRsThunisoft'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/prod',
        meta: {
            title: '我的OKR',
            auth:true
        },
        component: (resolve) => require(['./views/layout.vue'], resolve)
    }
];
export default routers;