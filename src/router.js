const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/prod',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/layout.vue'], resolve)
    }
];
export default routers;