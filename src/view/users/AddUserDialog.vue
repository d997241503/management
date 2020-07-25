<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%"
    @close="$refs.addForm.resetFields()">
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name:'',
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
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {validator:checkEmail,trigger:'blur'}
        ],
        mobile:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {validator:checkMobile,trigger:'blur'}
        ]
      },
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      }
    }    
  },
  methods:{
    dialogConfirm(){
      this.$refs.addForm.validate(valid => {
        if(!valid)return
        this.$http.post('/users',this.addForm).then(res => {
          if(res.data.meta.status !== 201){
            this.$message.error('添加失败')
          }
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.$parent.getUsersData()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>