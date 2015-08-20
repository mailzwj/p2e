# p2e
使用Canvas将普通图片转换成一个div标签，并使用box-shadow将整张图还原，可设置还原等级

灵感源自：[http://codepen.io/HugoGiraudel/full/gpcwa/](http://codepen.io/HugoGiraudel/full/gpcwa/)

在线DEMO：[http://mailzwj.github.io/p2e/](http://mailzwj.github.io/p2e/)

## 使用文档

### 参数

* `size`: 整数，色块儿尺寸，单位为像素
* `attrs`: 对象，生成html元素的属性
* `space`: 整数，生成html元素色块间隙，默认1
* `radius`: 整数，生成html元素色块圆角大小，默认undefined

### 实例方法

* `get(n)`: 获取参数值，返回传入属性对应的值
* `set(n, v)`: 设置参数值
* `drawImage(img, callback)`: 绘制图片，img可为图片url或img标签，callback为绘制成功后的回调函数
* `getHtml()`: 获取转换完成后得到的html标签和样式
