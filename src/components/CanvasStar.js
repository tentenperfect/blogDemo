export function canvasStar () {
   const canvas = document.querySelector("#canvas")
   const ctx = canvas.getContext('2d');

   var width, height;
   function setSize () {
      width = canvas.width = document.body.clientWidth
      height = canvas.height = document.body.clientHeight
   };
   setSize();
   window.onresize = setSize;

   var optObj = {
      color: '0,0,0',
      count: 500//线条数量
   };

   //创建鼠标对象
   var mouseInfo = {
      x: isNaN,
      y: isNaN,
      max: 15000
   };
   window.onmousemove = function (e) {
      mouseInfo.x = e.clientX;
      mouseInfo.y = e.clientY;
   }
   window.onmouseout = function () {
      mouseInfo.x = isNaN;
      mouseInfo.y = isNaN;
   }
   for (var arr = [], i = 0; i < optObj.count; i++) {
      var x = Math.random() * width,
         y = Math.random() * height,
         ranx = 2 * Math.random() - 1,
         rany = 2 * Math.random() - 1;
      arr.push({
         x: x,
         y: y,//点的位置
         ranx: ranx,
         rany: rany,//点的移动方向
         max: 5000//点雨点之间允许显示连线的范围
      });
   };
   var newArr = arr.concat(mouseInfo)
   function draw () {
      ctx.clearRect(0, 0, width, height);
      var nextItem,
         nextIndex,//点的编号
         lineMax,
         lineX,//线条x轴的宽度
         lineY,//线条y轴的高度
         lineRan;
      arr.forEach((item, index) => {
         item.x += item.ranx;
         item.y += item.rany;

         //点的移动范围超过了 显示范围则向反方向进行移动
         item.ranx *= item.x > width || item.x < 0 ? -1 : 1;
         item.rany *= item.y > height || item.y < 0 ? -1 : 1;

         for (nextIndex = index + 1; nextIndex < newArr.length; nextIndex++) {
            nextItem = newArr[nextIndex];

            //结束点坐标不为空
            if (nextItem.x !== null && nextItem.y !== null) {
               lineX = item.x - nextItem.x;//起点与终点x轴的差值
               lineY = item.y - nextItem.y;

               lineRan = lineX * lineX + lineY * lineY;
               //越小，线条颜色越浅
               lineMax = (nextItem.max - lineRan) / nextItem.max;
            };

            //混合差值小于极限距离
            if (lineRan < nextItem.max) {

               //鼠标缚茧
               if (nextItem === mouseInfo && lineRan >= nextItem.max / 2) {
                  item.x -= .03 * lineX, item.y -= .03 * lineY
               }
               ctx.beginPath();
               ctx.lineWidth = lineMax;
               ctx.strokeStyle = "rgba(" + optObj.color + "," + (lineMax + 0.8) + ")";
               ctx.moveTo(item.x, item.y);
               ctx.lineTo(nextItem.x, nextItem.y);
               ctx.stroke();
            }
         };
      });
      setTimeout(draw, 30);
   };
   setTimeout(function () {
      draw()
   }, 100)
}
