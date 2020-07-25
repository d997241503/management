<template>
  <el-container class="home">
    <el-header>
      <div>
        <img src="@/assets/loginImg.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="loginOut" type="info">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapseAside ? '60px' : '200px'">
        <aside-content @collapse="collapseAside = !collapseAside"></aside-content>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideContent from './childcomp/AsideContent' 
export default {
  name:'',
  data(){
    return{
      collapseAside:false
    }
  },
  components:{
    AsideContent
  },
  methods:{
    loginOut(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.home{
  height: 100%;
  .el-aside{
    background-color:  #545c64;
    transition: .4s;
  }
}
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(49, 71, 73);
  >div:first-child{
    display: flex;
    align-items: center;
    img{
      height: 60px;
    }
    span{
      margin-left: 20px;
      color: #fff;
      font-size: 20px;
    }
  }
}


</style>