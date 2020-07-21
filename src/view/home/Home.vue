<template>
  <div>
    <el-button @click="loginOut"></el-button>
  </div>
</template>

<script>

export default {
  name:'',
  methods:{
    loginOut(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>