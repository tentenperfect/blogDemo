import {
   registerRequest,
   loginRequest,
   loginOutRequest,
   faceImgRequest,
   editUserRequest,
} from '../../request/api'
import permission from './permission'

const user = {
   namespaced: true,
   state: {
      userInfo: {
         uid: '',
         username: '',
         role: '',
         url: ''
      },
   },
   mutations: {
      setUser (state, user) {
         state.userInfo = user
      },
      setToken (state, token) {
         state.userInfo.token = token
      },
      editUser () {

      },
   },
   actions: {
      //用户登录
      login ({ commit }, obj) {
         let username = obj.username.trim()
         return new Promise((resolve, reject) => {
            loginRequest(username, obj.pass).then(response => {
               console.log('发送完毕，收到回调' + "数据为： " + response);
               console.log(response);
               if (response.status == 0) { //response.code !== 200
                  let res = response.data
                  sessionStorage.setItem("username", res.username)
                  sessionStorage.setItem("role", res.roles)
                  sessionStorage.setItem("blogToken", res.token)
                  commit('setUser', { uid: res.uid, username: res.username, role: res.roles, url: res.url })
               } else {
                  console.log('错误')
               } resolve(response)
            }).catch(err => {
               console.error("登录出现错误了" + err);
            })
         })
      },
      //用户注册
      register ({ commit }, obj) {
         let username = obj.username.trim()
         return new Promise((resolve, reject) => {
            registerRequest(username, obj.pass).then(response => {
               console.log('发送完毕，收到回调' + response.message);
               if(response.status == 0){
                  resolve()
               }else{
                  reject('注册失败！')
               }
            }).catch(err => {
               console.error("注册出现错误了" + err);
            })
         })
      },
      //登出
      loginOut ({ commit }) {
         console.log('执行登出');
         return new Promise((resolve, reject) => {
            loginOutRequest().then((response) => {
               console.log('登出完毕');
               //清空session
               localStorage.clear()
               sessionStorage.clear()
               commit('clearRoutes')
               resolve()
            })
         }).catch(err => {
            console.error("登出出现错误了" + err);
         })
      },
      //上传用户头像
      uploadImg ({ commit }, image) {
         console.log(image);
         return new Promise((resolve, reject) => {
            faceImgRequest(image).then((response) => {
               console.log('上传图片的请求已经发送给服务七了');
               console.log(response.message);
               resolve()
            }).catch(err => {
               console.error("上传图片失败了" + err);
            })
         })
      },
      //编辑用户的个人信息
      editUser ({ commit }, userInfo) {
         console.log(userInfo);
         return new Promise((resolve, reject) => {
            editUserRequest(userInfo).then((response) => {
               console.log(response);
               commit('editUser', response.data)
               resolve()
            }).catch(err => {
               console.error("更新用户信息失败了" + err);
            })
         })
      },
   },
   modules: {
      permission
   }
}

export default user