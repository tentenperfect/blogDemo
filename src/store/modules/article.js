import {
   addArticleRequest,
   blogRequest,
   categoryInfoRequest,
   userArticleRequest,
   blogAllRequest,
   logicRestoreRequest,
   logicRemoveRequest,
   categoryArticleRequest,
   tagListRequest
} from '../../request/api'

const article = {
   state: {
      blogList: [],
      currentArticle: {},
      categoryList: [],
      userArticleList: [],
      draftList: [],
      categoryArticleList: [],
      tagSelectList: []
   },
   mutations: {
      createBlog (state, payload) {
         let newblog = {
            ...payload,
            oldValue: payload.blog
         }
         console.log(typeof state.blogList);
         console.log(state.blogList);
         state.blogList.array.push(newblog)
         console.log(state.blogList);
      },
      editBlog (state, blog) {
         let i = state.blogList.indexOf(blog.msg.oldValue)
         state.blogList.splice(i, 1, blog.msg)
      },
      setCurrentArticle (state, article) {
         state.currentArticle = article
      },
      clearCurrent (state) {
         state.currentArticle = {}
      },
      setCategory (state, payload) {
         state.categoryList = payload
      },
      setAllBlog (state, payload) {
         console.log(payload.array);
         if (state.blogList.length < 50) {
            state.blogList = [...state.blogList, ...payload.array]
            // console.log("setallblog");
            // console.log(state.blogList);
         } else {
            state.blogList = []
            state.blogList = payload
         }
      },
      setUserArticleList (state, payload) {
         state.userArticleList = []
         state.userArticleList = payload
         console.log("payload:");
         console.log(payload);
      },
      removeArticle (state, payload) {
         state.draftList.push(payload)
         state.blogList = state.blogList.filter(item => item.aid != payload)
         state.blogList = state.userArticleList.filter(item => item.aid != payload)
      },
      restoreArtcile (state, payload) {
         let article = state.draftList.some(item => item.aid == payload)
         state.draftList.splice(article, 1)
      },
      deleteArticle (state, payload) {
         let article = state.draftList.some(item => item.aid == payload)
         state.draftList.splice(article, 1)
      },
      setCategoryArticleList (state, payload) {
         state.categoryArticleList = payload
      },
      settagSelectList (state, payload) {
         state.tagSelectList = payload
      }
   },
   actions: {
      //添加、修改博客
      Blog ({ commit }, blogObj) {
         let type = blogObj.type
         return new Promise((resolve, reject) => {
            if (type == 'create') {
               addArticleRequest(blogObj.blog).then((response) => {
                  console.log(response);
                  commit('createBlog', blogObj.blog)
                  resolve()
               }).catch(err => {
                  console.error("发布blog出现错误了" + err);
               })
            }
         })
      },
      //获取文章的详细信息 response
      Article ({ commit }, params) {
         let id = params.id
         return new Promise((resolve, reject) => {
            blogRequest(id).then((response) => {
               commit('setCurrentArticle', response.data)
               resolve()
            }).catch(err => {
               console.error("获取文章详情出现错误了" + err);
            })
         })
      },

      //获取所有的种类 reponse
      allCategory ({ commit }) {
         return new Promise((resolve, reject) => {
            categoryInfoRequest().then((response) => {
               // console.log("获取文章");
               console.log(response.data);
               commit('setCategory', response.data)
               resolve()
            })
         }).catch(err => {
            console.error("获取种类出现错误了" + err);
         })
      },
      //获取当前用户的所有文章  response
      userArticle ({ commit, state }, obj) {
         let { uid, page, count } = obj
         return new Promise((resolve, reject) => {
            console.log("test userarticle");
            let userArticle = state.blogList.array.filter(item => {
               return item.uid == uid
            })
            console.log(userArticle);
            commit('setUserArticleList', userArticle)
            resolve()
            //对接后端
            // userArticleRequest(uid, page, count).then((response) => {
            //    commit('setUserArticleList', response.data)
            //    resolve()
            // })
            // .catch(err => {
            //    console.error("获取种类出现错误了" + err);
            // })
         })
      },
      //获取所有的博客文章  response 
      allArticle ({ commit }) {
         return new Promise((resolve, reject) => {
            blogAllRequest().then((response) => {
               // console.log(response);
               commit('setAllBlog', response.data)
               resolve()
            }).catch(err => {
               console.error("获取所有文章出现错误了" + err);
            })
         })
      },
      //逻辑删除
      removeArticle ({ commit }, aid) {
         return new Promise((resolve, reject) => {
            logicRemoveRequest(aid).then((response) => {
               commit('removeArticle', aid)
               resolve()
            }).catch(err => {
               console.error("逻辑删除失败了" + err);
            })
         })
      },
      //真正删除
      deleteArticle ({ commit }, aid) {
         return new Promise((resolve, reject) => {
            commit("deleteArticle", aid)
            console.log("shanchu");
            resolve()
         })
      },
      //还原逻辑删除
      restoreArticle ({ commit }, aid) {
         return new Promise((resolve, reject) => {
            logicRestoreRequest(aid).then((response) => {
               commit('restoreArtcile', aid)
               resolve()
            }).catch(err => {
               console.error("逻辑还原失败了" + err);
            })
         })
      },
      categoryArticleRequest ({ commit }, id) {
         return new Promise((resolve, reject) => {
            categoryArticleRequest(id).then((response) => {
               commit('setAllBlog', response.data)
               resolve()
            }).catch(err => {
               console.error("更新用户信息失败了" + err);
               reject()
            })
         })
      },
      tagList ({ commit }) {
         console.log('标签获取');
         return new Promise((resolve, reject) => {
            tagListRequest().then((response) => {
               let data = (response.data)
               commit('settagSelectList', data)
               resolve()
            }).catch(err => {
               console.error("更新用户信息失败了" + err);
               reject()
            })
         })
      },

   },
}

export default article