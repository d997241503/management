import Vue from 'vue'

//全局注册过滤器
Vue.filter('dateFormat',originVal => {
  const dt = new Date(originVal)

  let year = dt.getFullYear()
  let mouth = (dt.getMonth() + 1 + '').padStart(2,'0')
  let day = (dt.getDate() + '').padStart(2,'0')
  let hours = (dt.getHours() + '').padStart(2,'0')
  let minutes = (dt.getMinutes() + '').padStart(2,'0')
  let seconds = (dt.getSeconds() + '').padStart(2,'0')

  return `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`
})
