const getters = {
   userInfo: state => state.user.userInfo,
   role: state => state.user.userInfo.role,
   addRoutes: state => state.permission.addRoutes,
   routeList: state => state.permission.routeList,
   categoryList: state => state.article.categoryList,
   currentArticle: state => state.article.currentArticle,
   blogList: state => state.article.blogList,
   userArticleList: state => state.article.userArticleList,
   tagSelectList:state => state.article.tagSelectList
}

export default getters