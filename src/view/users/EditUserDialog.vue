<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="dialogVisible"
    width="50%"
    >    
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name:'',
  props:['userId'],
  data(){
    var checkEmail = (rule,value,callback) => {
      const regEmial = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)/
      if(regEmial.test(value)){
        return callback()
      }
      callback(new Error('请输入正确的邮箱'))
    }
    var checkMobile = (rule,value,callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if(regMobile.test(value)){
        return callback()
      }
      callback(new Error('请输入正确的手机号'))
    }
    return{
      dialogVisible:false,
      editForm:{},
      rules:{
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator:checkEmail,trigger:'blur'}
        ],
        mobile:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {validator:checkMobile,trigger:'blur'}
        ]
      }
    }
  },
  watch:{
    userId(){
      this.getUserData()
    }
  },
  methods:{
    getUserData(){
      this.$http.get('/users/' + this.userId).then(res => {
        if(res.data.meta.status != 200)return this.$message.error('请求数据失败')
        this.editForm = res.data.data
      })
    },    
    dialogConfirm(){
      this.$refs.editForm.validate(valid => {
        if(!valid)return ths.$message.error('请输入正确的格式')
        this.$http.put('/users/' + this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile}).then(res => {
          if(res.data.meta.status !== 200)return this.$message.error('更新失败')
          this.$message.success('更新成功')
          this.$parent.getUsersData()
          this.dialogVisible = false
        })
      })
    },
    dialogCancel(){
      this.dialogVisible = false
      this.getUserData()
    }
  }
}
</script>

<style scoped>

</style>