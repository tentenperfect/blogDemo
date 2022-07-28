const Mock = require('mockjs')
Mock.mock("/login", "post", (req) => {
   var body = JSON.parse(req.body)
   if (body.username == 'admin' && body.password == '123456') {
      return {
         code: 0,
         data: {
            blogToken: "1as61d5s1",
            username: body.username,
            uid: 1,
            role: 'admin'
         }
      }
   } else if (body.username == 'user' && body.password == '654321') {
      return {
         code: 0,
         data: {
            blogToken: "1as61d5s1",
            username: body.username,
            uid: 2,
            role: 'user'
         }
      }
   } else {
      return {
         code: 1,
      }
   }
})
Mock.mock('/loginout', "get", () => {
   return {
      code: 0,
      data: {}
   }
})
Mock.mock('/renderCategory', "get", () => {
   return {
      code: 0,
      data: Mock.mock({
         "array|8": [
            {
               "id|+1": 1,
               cateName: "@cword(3)"
            }
         ]
      })
   }

})
Mock.mock('/renderArticle', "get", () => {
   return {
      code: 0,
      data: Mock.mock({
         "array|6": [
            {
               "id|1-1000": 1,
               "uid|1-10": 100,
               title: "@cword(3,8)",
               cateName: "@cword(3,5)",
               htmlContent: "<h2>JavaScript位居榜首;Rust涨势迅猛</h2><p>在连续十次的调查中<strong>JavaScript受欢迎程度都位居第一</strong>毕竟全球有近1750万的开发者在使用它另外JavaScript不仅被世界上的绝大多数网站所使用而且被世界主流浏览器;Chrome、IE、Firefox、Safari、Opera;支持。霸榜也是理所当然。</p><p>自从Python超越Java之后;就长期占据第二的位置;现在已经拥有了1570万个用户。简单易上手可能是Python被大规模采用的主要原因。</p> <p>在过去的一年里&#xff0c;Rust获得了更多开发者的青睐;从2021年到2022年第一季度;使用Rust的开发者数量迅速增长;从60万增加到了220万。</p><p>Go和Ruby都是后端开发的重要语言&#xff0c;不过Go似乎获得了更多开发者的喜爱&#xff0c;其增长速度是Ruby的两倍。<br /> <img src='https://img-blog.csdnimg.cn/c9f269f4c8fb4fb5a1506a732b21a18b.png' alt='在这里插入图片描述' /></p><center>&#xff08;编程语言受欢迎程度排行&#xff09;<br /> <img src='https://img-blog.csdnimg.cn/b8b62cccdb084376bb2eed4ae5d32fe1.png' alt='在这里插入图片描述' /><center>&#xff08;编程语言排行变化&#xff09;</center></center><p></p> <h2><a id='_19'></a>中间型人格是大多数程序员的属性</h2> <p>在许多人的眼中大多数程序员都是以一种类似宅男的形象出现的&#xff0c;简单的T恤和背包&#xff0c;给人一种话不多的感觉。程序员的性格到底是怎样呢&#xff1f;SlashData使用了TIPI法&#xff08;Ten-Item Personality Inventory&#xff09;对开发者的五大人格维度&#xff08;情绪稳定性、外向性、经验开放性、合群性和自觉性&#xff09;进行了调查。</p> <p><img src='https://img-blog.csdnimg.cn/4f41d9b3818a4fa3b858605338e7649f.png' alt='在这里插入图片描述' /></p><center>&#xff08;开发者性格调查&#xff09;</center><p></p> <p>有52%的开发者属于“中间型”人格&#xff0c;即不外向也不内向&#xff0c;情绪即没有很不稳定但也不缺乏情绪&#xff0c;这可能是大多数人眼中的程序员形象。</p> <p>大约有8%的人的经验的开放程度更高&#xff0c;求知欲更强。这一类的开发人员通常更加倾向于研究新的工具和技术&#xff0c;走在科技的前沿。</p> <p>另外还有5%的开发者比其他的开发者负责感和亲和力更强。这类人一般更适合担任具有创造性的角色&#xff0c;如用户体验设计师。</p> <p><img src='https://img-blog.csdnimg.cn/96320b9d50794099b7be3257aefb6db5.png' alt='在这里插入图片描述' /></p><center><p>元宇宙是最近几年爆火的概念之一。53%的开发人员参与了关于元宇宙的技术开发，当然因为还并不成熟，所以采用率比较低。元宇宙未来的发展前景还不明朗，但是已经有28%的开发者积极地学习关于元宇宙的技术。</p>",
               src_url: "",
               nickname: "@cword(3,5)",
               publishDate: "@date()",
               "tags|3-6": [{ "id|+1": 1, tag: "@cword(3,4)" }]
            }
         ]
      })
   }
})

Mock.mock(/\/article\/\d{1,}/, "get", (req) => {
   console.log(req.url);
   let url = req.url.split('/')
   let id = url[2]
})

Mock.mock("/article/allTags", "get", () => {
   return {
      code: 0,
      data: Mock.mock({
         "array|6": [{
            "id|+1": 1,
            tagName: "@cword(3,8)"
         }
         ]
      })
   }
})
Mock.mock('/article/addArticle', 'post', (req) => {
   console.log();

   return {
      code: 0,
      data: req.body

   }
})