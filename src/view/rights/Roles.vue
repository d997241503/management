<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表 -->
      <roles-list></roles-list>
    </el-card>
  </div>
</template>

<script>
import RolesList from './RolesList'
export default {
  name:'',
  components:{
    RolesList
  },
  data(){
    return{
    }
  },
  created(){
  },
  methods:{
    
  }
}
</script>

<style scoped>

</style>