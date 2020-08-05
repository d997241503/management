<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="goodsList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="order_number" label="订单编号"></el-table-column>
          <el-table-column prop="order_price" label="订单价格"></el-table-column>
          <el-table-column prop="pay_status" label="是否付款"></el-table-column>
          <el-table-column label="是否发货">
            <template v-slot="scope">
              <el-tag v-if="scope.row.pay_status === 1" type="success">已付款</el-tag>
              <el-tag v-else type="danger">未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template v-slot="scope">
              {{ scope.row.create_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作">            
            <el-tooltip content="修改地址" placement="top">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editAdressVisible = true"></el-button>
            </el-tooltip>
            <el-tooltip content="物流进度" placement="top">
              <el-button type="success" size="mini" icon="el-icon-location" @click="showProgressBox"></el-button>
            </el-tooltip>            
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>    
    <el-dialog
      title="修改地址"
      :visible.sync="editAdressVisible"
      width="50%"
      @close="editAdressClose">
      <el-form ref="editAdressform" :model="editAdressform" label-width="100px" :rules="editAdressFormRules">
        <el-form-item label="省市区/县" prop="adress">
          <el-cascader
            v-model="editAdressform.adress"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAdress">
          <el-input v-model="editAdressform.detailAdress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editAdressVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdressVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="物流进度"
      :visible.sync="progressVisible"
      width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer">
        <el-button @click="progressVisible = false">取 消</el-button>
        <el-button type="primary" @click="progressVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from './province.js'
export default {
  name: "",
  data(){
    return{
      queryInfo:{
        query:'',
        pagesize:1,
        pagenum:10
      },
      goodsList:[],
      total:null,
      editAdressVisible:false,
      editAdressform:{
        adress:'',
        detailAdress:''
      },
      editAdressFormRules:{
        adress:[
          { required: true, message: '请选择地址', trigger: 'blur' }
        ],
        detailAdress:[
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      progressVisible:false,
      progressInfo:[]
    }
  },
  created(){
    this.getOrderListData()
  },
  methods:{
    async getOrderListData(){
      const { data:res } = await this.$http.get('orders',{params:this.queryInfo})
      if(res.meta.status != 200){
        this.$message.error('数据获取失败')
      }else{
        this.total = res.data.total
        this.goodsList = res.data.goods
      }
    },
    handleSizeChange(newsize){
      this.queryInfo.pagesize = newsize
      this.getOrderListData()
    },
    handleCurrentChange(newpage){
      this.queryInfo.pagenum = newpage
      this.getOrderListData()
    },
    editAdressClose(){
      this.$refs.editAdressform.resetFields()
    },
    showProgressBox(){
      this.$http.get('/kuaidi/804909574412544580').then(res => {
        if(res.data.meta.status != 200){
          return this.$message.error('获取数据失败')
        }
        this.progressInfo = res.data.data
      })
      this.progressVisible = true
    }
  }
};
</script>

<style scoped>
</style>