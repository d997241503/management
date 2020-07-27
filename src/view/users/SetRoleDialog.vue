<template>
  <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="40%" @close="value = ''">
      <p>当前的用户：{{user.username}}</p>
      <p>当前的角色：{{user.role_name}}</p>
      <p>选择角色：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetRole">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>

export default {
  name:'',
  props:['user','rolesList'],
  data(){
    return{
      dialogVisible:false,
      value:''
    }
  },
  methods:{
    confirmSetRole(){
      if(this.value == ''){
        return this.$message.error('请选择角色')
      }
      this.$http.put(`/users/${this.user.id}/role`,{rid:this.value}).then(res => {
        if(res.data.meta.status != 200){
          return this.$message.error('获取信息失败')
        }
        this.$message.success('更新角色成功')
        this.$parent.getUsersData()
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
p{
  margin-bottom: 10px;
  font-size: 16px;
}
</style>