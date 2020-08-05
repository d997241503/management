<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-alert title="注意：只允许为第三级分类设置参数" type="warning" show-icon :closable="false"></el-alert>
        </el-col>
      </el-row>
      <el-row class="select-cate">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            clearable
            v-model="selectedKeys"
            :options="cateList"
            :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_id',children:'children'}"           
            @change="selectedKeysChange">            
          </el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="动态参数" name="many">
              <el-button type="primary" size="mini" :disabled="isDisable">动态参数</el-button>
              <el-table :data="manyTableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="参数名称"></el-table-column>
                <el-table-column label="操作"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
              <el-button type="primary" size="mini" :disabled="isDisable">静态属性</el-button>
              <el-table :data="onlyTableData" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="参数名称"></el-table-column>
                <el-table-column label="操作"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  name:'',
  data(){
    return{
      cateList:[],
      selectedKeys:[],
      activeTab:'many',
      manyTableData:[],
      onlyTableData:[]
    }
  },
  created(){
    this.getCateList()
  },
  methods:{
    getCateList(){
      this.$http.get('/categories').then(res => {
        if(res.data.meta.status != 200){
          return this.$message.error('获取数据失败')
        }
        this.cateList = res.data.data
      })
    },
    selectedKeysChange(){
      this.getParamsData()
    },
    tabClick(){
      this.getParamsData()
    },
    getParamsData(){
      if(this.selectedKeys.length != 3){
        return this.selectedKeys = []
      }
      this.$http.get(`/categories/${this.cateId}/attributes`,{params:{sel:this.activeTab}}).then(res => {
        if(res.data.meta.status != 200){
          return this.$message.error('获取数据失败')
        }
        if(this.activeTab === 'many'){
          this.manyTableData = res.data.data
        }else{
          this.onlyTableData = res.data.data
        }
      })
    }
  },
  computed:{
    isDisable(){
      if(this.selectedKeys.length != 3){
        return true
      }else{
        return false
      }
    },
    cateId(){
      return this.selectedKeys[2] || null
    }
  }
}
</script>

<style scoped lang="less">
.select-cate{
  margin:15px;
  font-size: 16px;
}
</style>