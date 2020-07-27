<template>
  <div>
    <el-card>
      <!-- 卡片头部 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="clearSearchInfo">
            <el-button slot="append" icon="el-icon-search" @click="getUsersData"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="$children[1].dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 卡片列表 -->
      <el-table
        :data="usersList"
        style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- v-slot='scope'中的scope为包含el-table-column组件中的插槽中用:prop="prop"绑定的prop属性的对象 -->
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" @change="stateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteClick(scope.row.id)"></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRoleDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <add-user-dialog></add-user-dialog>

    <!-- 编辑用户对话框 -->
    <edit-user-dialog :userId="userId"></edit-user-dialog>

    <!-- 分配角色对话框 -->
    <set-role-dialog :user="settingUser" :rolesList="rolesList"></set-role-dialog>
  </div>
</template>

<script>
import AddUserDialog from './AddUserDialog'
import EditUserDialog from './EditUserDialog'
import SetRoleDialog from './SetRoleDialog'
export default {
  name:'',
  components:{
    AddUserDialog,
    EditUserDialog,
    SetRoleDialog
  },
  data(){
    return{
      usersList:[],
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:2
      },
      total:0,
      // 用于编辑对话框获取用户数据
      userId:'',
      // 用于分配角色对话框获取用户数据
      settingUser:{},
      // 所有角色列表
      rolesList:[]
    }
  },
  created(){
    this.getUsersData()
    this.getRolesList()
  },
  methods:{
    getUsersData(){
      this.$http.get('/users',{
        params:this.queryInfo
      }).then(res => {
        if(res.data.meta.status != 200){
          this.$message.error(res.data.meta.msg)
        }else{
          this.usersList = res.data.data.users
          this.total = res.data.data.total
        }
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUsersData()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getUsersData()
    },
    async stateChange(userInfo){
      const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status != 200){
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新状态失败')
      }
      this.$message.success('更新状态成功')
    },
    clearSearchInfo(){
      this.getUsersData()
    },
    editClick(id){
      this.$children[2].dialogVisible = true
      this.userId = id
    },
    deleteClick(id){
      this.$confirm(
        '此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http.delete('/users/' + id).then(res => {
          if(res.data.meta.status === 200){
            this.$message.success('删除成功')
            this.queryInfo.pagenum = 1
            this.getUsersData()
          }else{
            this.$message.error('删除失败')
          }          
        })
      }).catch(() => {
        this.$message.info('取消删除成功')
      })
    },
    showSetRoleDialog(user){
      this.settingUser = user
      this.$children[3].dialogVisible = true
    },
    //获取所有角色，用于分配权限
    getRolesList(){
      this.$http.get('/roles').then(res => {
        this.rolesList = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>