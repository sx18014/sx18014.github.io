import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Screen from '../views/ScreenPage.vue'
import Line from '../components/line.vue'
import Scatter3d from '../components/scatter3d.vue'
// import Scatter3d_dataset from '../components/scatter3d_dataset.vue'
import Sunburst from '../components/sunburst.vue'
import Sunburst2 from '../components/sunburst2.vue'
import Bar3d from '../components/bar3d.vue'
import Radar from '../components/radar.vue'
import ScatterMatrix from '../components/scatter_matrix.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { // 重定向到主页
    path: '/',
    redirect: 'screen'
  },
  { // 主页
    path: '/screen',
    component: Screen,
  },
  { path: '/line', component: Line },
  { path: '/scatter3d', component: Scatter3d },
  { path: '/sunburst', component: Sunburst },
  { path: '/sunburst2', component: Sunburst2 },
  { path: '/bar3d', component: Bar3d },
  { path: '/radar', component: Radar },
  { path: '/scatter_matrix', component: ScatterMatrix }
]

const router = new VueRouter({
  routes
})

export default router
