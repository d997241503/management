<template>
  <el-menu background-color="#545c64" text-color="#fff" active-text-color :collapse="iscollapse"
  unique-opened :collapse-transition="false" router>
    <div class="collapse-button" @click="collapseClick">|||</div>
    <el-submenu :index="item.id + ''" v-for="item in menus" :key="item.id">
      <template slot="title"><i :class="icons[item.id]"></i><span>{{item.authName}}</span></template>
      <el-menu-item :index="'/home/' + childItem.path" v-for="childItem in item.children" :key="childItem.id" >
        <i class="el-icon-menu"></i>
        {{childItem.authName}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

export default {
  name:'',
  data(){
    return{
      menus:[],
      icons:{
        '125':"iconfont icon-users",
        '103':"iconfont icon-lock-fill",
        '101':"iconfont icon-shangpin",
        '102':"iconfont icon-danju",
        '145':"iconfont icon-baobiao",
      },
      iscollapse:false,
    }
  },
  created(){
    this.getMenuData()
  },
  methods:{
    getMenuData(){
      this.$http.get('/menus').then(res => {
        this.menus = res.data.data
      })
    },
    collapseClick(){
      this.iscollapse = !this.iscollapse
      this.$emit('collapse')
    }
  },
  watch:{
  }
}
</script>

<style scoped>
.iconfont{
  margin-right: 10px;
}
.el-menu{
  border-right: none;
  width: 100%;
}
.collapse-button{
  width: 100%;
  line-height: 24px;
  text-align: center;
  letter-spacing: 4px;
  color: #fff;
  background-color: rgb(98, 115, 116);
  cursor: pointer;
}

</style>