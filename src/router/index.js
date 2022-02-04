import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/test',
      name: 'Test',
      meta:{
        title:'测试'
      },
      component: () => import('@/views/test'),
    },
    {
      path: '/live',
      name: 'Live',
      meta:{
        title:'直播'
      },
      component: () => import('@/views/live'),
    },
    {
        path: '/*',
        redirect: { name: 'Test' },
    },
  ],
});

router.beforeEach((to,from,next)=>{
  if(to.meta && to.meta.title){
    window.document.title = to.meta.title
  }
  next()
})

export default router;
