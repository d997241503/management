<template>
  <div>
    <el-table :data="roles" border stripe>
      <el-table-column type="expand">
        <!-- 展开内容 -->
        <template v-slot="scope">
          <!-- 一级权限循环 -->
          <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['border-bottom',{'border-top':i1 == 0},'vertical-center']">
            <el-col :span="5">
              <!-- scpoe.row.id为角色id,item.id为权限id -->
              <el-tag closable @close="removeRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <!-- 二级权限循环 -->
              <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="['vertical-center',{'border-top':i2 != 0}]">
                <el-col :span="6">
                  <el-tag type="success" closable @close="removeRight(scope.row,item2.id)">{{item2.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <!-- 三级权限循环 -->
                  <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable @close="removeRight(scope.row,item3.id)">
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="角色操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightsDialog(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="40%">
      <el-tree :data="rightsList" :props="defaultProps" show-checkbox default-expand-all node-key="id" :default-checked-keys="defArr" ref="elTree"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetRights">确 定</el-button>
      </span>
    </el-dialog>    
  </div>
</template>

<script>

export default {
  name:'',
  data(){
    return{
      //角色信息列表
      roles:[],
      dialogVisible:false,
      //所有权限列表
      rightsList:[],
      //el-tree组件的配置项
      defaultProps:{
        children:'children',
        label:'authName'
      },
      //el-tree默认选中的keys的数组
      defArr:[],
      //当前正在设置的角色
      settingRole:{}
    }
  },
  created(){
    this.getRolesData()
  },
  methods:{
    getRolesData(){
      this.$http.get('/roles').then(res => {
        if(res.data.meta.status !== 200){
          return this.$message.error('请求数据失败')
        }
        this.roles = res.data.data
      })
    },
    removeRight(role,id){
      this.$confirm(
        '此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http.delete(`/roles/${role.id}/rights/${id}`).then(res => {
          if(res.data.meta.status === 200){
            this.$message.success('删除成功')
            role.children = res.data.data
          }else{
            this.$message.error('删除失败')
          }          
        })
      }).catch(() => {
        this.$message.info('取消删除成功')
      })
    },
    showRightsDialog(role){
      this.settingRole = role
      this.$http.get('/rights/'+'tree').then(res => {
        this.rightsList = res.data.data
      })
      this.defArr = []
      this.getDefaultId(role,this.defArr)
      this.dialogVisible = true
    },
    //递归获取没有children属性的对象的id,push到数组中绑定到el-tree中默认选中
    getDefaultId(obj,arr){
      if(!obj.children){
        arr.push(obj.id)
        return
      }
      obj.children.forEach(item => {
        this.getDefaultId(item,arr)
      })
    },
    confirmSetRights(){
      let idArr = [
        ...this.$refs.elTree.getCheckedKeys(),
        ...this.$refs.elTree.getHalfCheckedKeys()
      ]
      let idStr = idArr.join(',')
      this.$http.post(`/roles/${this.settingRole.id}/rights`,{rids:idStr}).then(res => {
        if(!res.data.meta.status == 200)return this.$message.error('修改失败')
        this.getRolesData()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
.el-tag{
  margin: 7px;
}
.border-bottom{
  border-bottom: 1px solid #eee;
}
.border-top{
  border-top: 1px solid #eee;
}
</style>