import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Screen from '../views/ScreenPage.vue'
import scatter_matrix_home from '../views/ScatterMatrixHome.vue'
import Line from '../components/line.vue'
import Scatter2d from '../components/scatter2d.vue'
import Scatter3d from '../components/scatter3d.vue'
// import Scatter3d_dataset from '../components/scatter3d_dataset.vue'
import Sunburst from '../components/sunburst.vue'
import Sunburst2 from '../components/sunburst2.vue'
import Bar3d from '../components/bar3d.vue'
import Radar from '../components/radar.vue'
import Heatmap from '../components/heatmap.vue'
import ScatterMatrix from '../components/scatter_matrix.vue'
import CP from '../components/scatter_matrix/SM_CP.vue'
import MOp from '../components/scatter_matrix/SM_MOp.vue'
import MOs from '../components/scatter_matrix/SM_MOs.vue'

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
  { path: '/scatter2d', component: Scatter2d },
  { path: '/scatter3d', component: Scatter3d },
  { path: '/sunburst', component: Sunburst },
  { path: '/sunburst2', component: Sunburst2 },
  { path: '/bar3d', component: Bar3d },
  { path: '/radar', component: Radar },
  { path: '/heatmap', component: Heatmap },
  { path: '/scatter_matrix', component: ScatterMatrix },

  { // 散点矩阵主页
    path: '/scatter_matrix_home',
    component: scatter_matrix_home,
    children: [
      { path: '/SM_CP', component: CP },
      { path: '/SM_MOp', component: MOp },
      { path: '/SM_MOs', component: MOs }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
