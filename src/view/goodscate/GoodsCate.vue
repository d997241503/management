<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col><el-button type="primary" @click="dialogVisible = true">添加商品</el-button></el-col>
      </el-row>
      <tree-table class="tree-table"
        :data="cateList" 
        :columns="columns"
        :selection-type="false"
        :expand-type="false" show-index index-text='#' border
        :show-row-hover="false">
        <template v-slot:isOk="scope">
          <i class="el-icon-success" style="color:lightgreen" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error" style="color:red" v-else></i>
        </template>
        <template v-slot:order="scope">
          <el-tag size="mini" type="primary" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level == 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <template v-slot:opt="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      @close="cancelAddCate"
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateForm" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            clearable
            v-model="selectedKeys"
            :options="parentCateList"
            :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_id',children:'children',checkStrictly:true}"
            @change="selectedKeysChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddCate">取 消</el-button>
        <el-button type="primary" @click="comfirmAddCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name:'',
  data(){
    return {
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      cateList:[],
      total:null,
      columns:[
        {
          label:'分类名称',
          prop:'cat_name'
        },
        {
          label:'是否有效',
          type:'template',
          template:'isOk'
        },
        {
          label:'排序',
          type:'template',
          template:'order'
        },
        {
          label:'操作',
          type:'template',
          template:'opt'
        }
      ],
      dialogVisible:false,
      addCateForm:{
        cat_name:'',
        cat_pid:0,
        cat_level:0
      },
      addCateRules:{
        cat_name:[
          {
            required: true, message: '请输入分类名称', trigger: 'blur'
          }
        ]
      },
      parentCateList:[],
      selectedKeys:[]
    }
  },
  created(){
    this.getCateData()
    this.getParentCateList()
  },
  methods:{
    getCateData(){
      this.$http.get('/categories',{params:this.queryInfo}).then(res => {
        this.cateList = res.data.data.result
        this.total = res.data.data.total
      })
    },
    getParentCateList(){
      this.$http.get('/categories',{params:{type:2}}).then(res => {
        this.parentCateList = res.data.data
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCateData()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getCateData()
    },
    selectedKeysChange(){
      if(this.selectedKeys.length > 0){
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length
      }else{
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    cancelAddCate(){
      this.addCateForm.cat_name = ''
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
      this.selectedKeys = []
      this.dialogVisible = false
    },
    comfirmAddCate(){
      this.$refs.addCateForm.validate(valid => {
        if(!valid){
          return
        }
        this.$http.post('/categories',this.addCateForm).then(res => {
          if(res.data.meta.status != 201){
            return this.$message.error('添加数据失败')
          }
          this.$message.success('添加数据成功')
          this.getCateData()
          this.getParentCateList()
          this.dialogVisible = false
        })
      })
    }
  }
}
</script>

<style scoped>
.tree-table{
  margin-top: 15px;
}
</style>