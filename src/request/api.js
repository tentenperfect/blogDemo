import request from '../common/http'

//注册用户信息 ok
export function registerRequest (username, password) {
   const data = {
      "username": username,
      "password": password
   }
   return request.post('/api/register', data) //api/register

}
//获取用户信息 ok
export function loginRequest (username, password) {
   const data = {
      "username": username,
      "password": password
   }
   return request.post('/api/login', data) //api/login application/x-www-form-urlencoded
}

//作者编辑页面 
//作者发布博客文章 ok
export function addArticleRequest (articleInfo) {
   console.log(articleInfo);
   return request.post('/article/addArticle', articleInfo) ///api/article/addAticle
}

//获取作品信息    //has a little question 
export function blogRequest (id) {
   //  console.log(id);
   // return request.get(`/article?id=id`)
   return request.get(`/article/${id}`) ///api/article/${aid}
}
//获取博客信息 ok
export function blogAllRequest () {
   return request.get('/renderArticle') //api/blog
}

//逻辑删除作品 ok
export function logicRemoveRequest (params) { //可以设置成 私密状态 和 发布状态
   return request.post('/article/dustbin', params.ids)
}

//还原逻辑删除的作品 ok
export function logicRestoreRequest (params) {
   return request.post('/article/restore', params.ids)
}

//获取去用户的作品信息 ok
export function userArticleRequest (uid, page, count) {
   return request.get(`/article/getUserArticle/${uid}?page=${page}&count=${count}`) ///user
}

//根据分类获取作品 ok
export function categoryArticleRequest (cid, page, count) {
   // console.log("cid:" + cid, +",page:" + page + ",count:" + count)
   let apiUrl = `/article/getCategoryArticle/${cid}?page=${page}&count=${count}`
   return request.get(apiUrl)
}

//获取所有博客的种类信息 ok
export function categoryInfoRequest () {
   return request.get('/renderCategory') ///article/category/all
}

//用户编辑个人资料  half ok
export function editUserRequest (user) {
   return request.post('/user/editUser', user)
}

//用户注销  ok
export function loginOutRequest () {
   return request.get('/loginout') ///loginout
}

//上传用户头像 ok
export function faceImgRequest (image) {
   console.log(image);
   return request.post('/user/uploadFaceImg', image)
}
//获取初始的标签列表
export function tagListRequest () {
   return request.get('/article/allTags')
}