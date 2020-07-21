<template>
  <div class="login">
    <div class="login-box">
      <img src="@/assets/loginImg.png" alt="">
      <el-form label-width="0px" class="login-form" :model="loginForm" :rules="loginFormRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name:'',
  data(){
    return{
      loginForm:{
        username:'admin',
        password:'123456'
      },
      loginFormRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    resetForm(){
      this.$refs.loginForm.resetFields()
    },
    login(){
      this.$refs.loginForm.validate(valid => {
        if(!valid)return;
        this.$http.post('/login',this.loginForm).then(res => {
          let data = res.data
          if(data.meta.status == 200){
            this.$message.success(`${data.meta.msg}`)   
            window.sessionStorage.setItem('token',data.data.token) 
            this.$router.push('/home')       
          }else{
            this.$message.error(`${data.meta.msg}`)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.login{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 550px;
    height: 400px;
    background-color: #fff;
    img{
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 150px;
      height: 150px;
      border: 10px solid #eee;
      border-radius: 50%;
    }
    .login-form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 40px;
      box-sizing: border-box;
      .btns{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.login::before{
    content: '';
    display: table;
  }
</style>