<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <users-card></users-card>
  </div>
</template>

<script>
import UsersCard from './UserCard'
export default {
  name:'',
  components:{
    UsersCard
  },
  methods:{

  }
}
</script>

<style scoped>

</style>