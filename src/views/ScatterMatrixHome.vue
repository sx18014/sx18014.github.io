<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <!--首页头部-->
    <el-header style=
    "text-align: center; font-size: 20px; height: 8vh">
      <span>散点矩阵与平行坐标</span>
    </el-header>
  <el-container>
  <!--左侧菜单-->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="$route.path" @select="handleSelect">
      <el-menu-item index="/SM_CP">
        <template slot="title"><i class="el-icon-caret-right"></i>CP</template>
      </el-menu-item>
      <el-menu-item index="/SM_MOp">
        <template slot="title"><i class="el-icon-caret-right"></i>MOp</template>
      </el-menu-item>
      <el-menu-item index="/SM_MOs">
        <template slot="title"><i class="el-icon-caret-right"></i>MOs</template>
      </el-menu-item>
      <el-menu-item index="/SM_SSp_bfd">
        <template slot="title"><i class="el-icon-caret-right"></i>SSp-bfd</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <!--内容主体-->
  <el-main>
      <router-view></router-view>
  </el-main>
  </el-container>
</el-container>
</template>


<script>
import CP from '../components/scatter_matrix/SM_CP.vue'
export default {
  data () {
    return {
      activeIndex: "/SM_CP"
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(indexPath)
    }
  },
  components: {
    CP
  }
}
</script>

<style>
  .el-header {
    background-color: #33475c;
    color: white;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    color: #333;
  }
</style>
