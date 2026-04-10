import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
    { path: '/test', name: 'test', component: () => import('@/views/TestPage.vue') },
    { path: '/result', name: 'result', component: () => import('@/views/ResultPage.vue') },
    { path: '/wiki', name: 'wiki', component: () => import('@/views/WikiPage.vue') },
    { path: '/wiki/:code', name: 'wiki-detail', component: () => import('@/views/WikiDetailPage.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const titleMap: Record<string, string> = {
    home: 'SBTI 人格测试',
    test: 'SBTI 测试中',
    result: 'SBTI 测试结果',
    wiki: 'SBTI 人格百科',
    'wiki-detail': 'SBTI 人格详情',
  }
  document.title = titleMap[to.name as string] ?? 'SBTI'
})

export default router
