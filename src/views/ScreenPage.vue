<template>
<!--
    <div class="screen-container">
    <div class="screen-body">
        <section class="screen-left">
            <div id="left-st">
                <Bar3d></Bar3d>
            </div>
            <div id="left-nd">
                <Line3d></Line3d>
            </div>
        </section>
        <section class="screen-right">
            <div id="right-st">
                <Scatter3d></Scatter3d>
            </div>
            <div id="right-nd">
            </div>
        </section>
    </div>
    </div>
-->
<el-container style="height: 100%; border: 1px solid #eee">
<el-main>
<el-row :gutter="8">
    <el-col :span="12">
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>二维散点图</span>
            <el-button @click="JTscatter2d" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content">
            <Scatter2d></Scatter2d>
        </div>
    </el-card>
    </el-col>
    <el-col :span="12">
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>三维散点图</span>
            <el-button @click="JTscatter3d" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content">
            <Scatter3d></Scatter3d>
        </div>
    </el-card>
    </el-col>
</el-row>
<!-- 第二行
<el-row>
    <el-col>
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>大数据量面积图</span>
            <el-button @click="JTline" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content">
            <Line3d></Line3d>
        </div> 
    </el-card>
    </el-col>
</el-row> -->
<!-- 第二行 -->
<el-row>
    <el-col>
    <el-card class="box-card-SM" shadow="hover">
        <div slot="header">
            <span>散点矩阵和平行坐标</span>
            <el-button @click="JTscattermatrix" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
            <el-button @click="JThome" icon='el-icon-s-home'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content-SM">
            <ScatterMatrix></ScatterMatrix>
        </div> 
    </el-card>
    </el-col>
</el-row>
<!-- 第三行 -->
<el-row :gutter="8">
    <el-col :span="12">
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>旭日图</span>
            <el-button @click="JTsunburst" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content">
            <Sunburst></Sunburst>
        </div> 
    </el-card>
    </el-col>
    <el-col :span="12">
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>旭日图</span>
            <el-button @click="JTsunburst2" icon='el-icon-full-screen'
            style="float: right" circle></el-button>
        </div>
        <div class="card-content">
            <Sunburst2></Sunburst2>
        </div> 
    </el-card>
    </el-col>
</el-row>
</el-main>
</el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import Bar3d from '../components/bar3d.vue'
import Line3d from '../components/line.vue'
import Scatter3d_dataset from '../components/scatter3d_dataset.vue'
import Scatter2d from '../components/preview/scatter2d.vue'
import Scatter3d from '../components/preview/scatter3d.vue'
import Sunburst from '../components/sunburst.vue'
import Sunburst2 from '../components/sunburst2.vue'
import ScatterMatrix from '../components/scatter_matrix.vue'
import ScatterMatrixHome from './ScatterMatrixHome.vue'
export default {
    components: {
        Bar3d,
        Line3d,
        Scatter3d_dataset,
        Scatter2d,
        Scatter3d,
        Sunburst,
        Sunburst2,
        ScatterMatrix,
        ScatterMatrixHome
    },
    methods: {
        JTbar3d () {
            this.$router.push('/bar3d')
        },
        JTscatter2d () {
            this.$router.push('/scatter2d')
        },
        JTscatter3d () {
            this.$router.push('/scatter3d')
        },
        JTline () {
            this.$router.push('/line')
        },
        JTsunburst () {
            this.$router.push('/sunburst')
        },
        JTsunburst2 () {
            this.$router.push('/sunburst2')
        },
        JTscatterdata () {
            this.$router.push('/scatter3d_dataset')
        },
        JTscattermatrix () {
            this.$router.push('/scatter_matrix')
        },
        JThome () {
            this.$router.push('/scatter_matrix_home')
        }
    }
}
</script>

<style>
.box-card {
    width: 100%;
    height: 700px;
}
.box-card-SM {
    width: 100%;
    height: 1000px;
}
.card-content {
    width: 100%;
    height: 600px
}
.card-content-SM {
    width: 100%;
    height: 900px
}
/*
.screen-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.screen-body {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 10px;
    .screen-left {
        margin-left: 10px;
        width: 60%;
        height: 100%;
        #left-st {
            height: 50%;
        }
        #left-nd {
            margin-top: 0px;
            height: 50%;
        }
    }
    /* .screen-middle {
        width: 40%;
        height: 100%;
    }
    .screen-right {
        margin-left: 1.6%;
        margin-right: 1.6%;
        width: 40%;
        height: 100%;
        #right-st {
            height: 60%;
        }
        #right-nd {
            margin-top: 0px;
            height: 50%;
        }
    }
}
section > div {
    border : 1px solid 	#CDC9C9;
    border-radius: 5px
}*/

</style>