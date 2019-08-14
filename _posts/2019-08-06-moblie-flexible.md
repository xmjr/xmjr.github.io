---
layout: post
title: "移动端页面适配方案（布局）"
date: 2019-08-06  
description: "移动端，页面适配方案"
tag: 移动端
---

- [一、在移动端布局，需要面对两个主要问题：](#%E4%B8%80%E5%9C%A8%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%B8%83%E5%B1%80%E9%9C%80%E8%A6%81%E9%9D%A2%E5%AF%B9%E4%B8%A4%E4%B8%AA%E4%B8%BB%E8%A6%81%E9%97%AE%E9%A2%98)
- [二、移动端页面适配方案变化：](#%E4%BA%8C%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%A1%B5%E9%9D%A2%E9%80%82%E9%85%8D%E6%96%B9%E6%A1%88%E5%8F%98%E5%8C%96)
- [三、淘宝弹性布局方案：flexible](#%E4%B8%89%E6%B7%98%E5%AE%9D%E5%BC%B9%E6%80%A7%E5%B8%83%E5%B1%80%E6%96%B9%E6%A1%88flexible)
  * [（一）其主要思想有三点：](#%E4%B8%80%E5%85%B6%E4%B8%BB%E8%A6%81%E6%80%9D%E6%83%B3%E6%9C%89%E4%B8%89%E7%82%B9)
  * [（二）使用flexible](#%E4%BA%8C%E4%BD%BF%E7%94%A8flexible)
  * [（三）编写CSS](#%E4%B8%89%E7%BC%96%E5%86%99css)
- [四、更多相关内容](#%E5%9B%9B%E6%9B%B4%E5%A4%9A%E7%9B%B8%E5%85%B3%E5%86%85%E5%AE%B9)

## 一、在移动端布局，需要面对两个主要问题：

1. 各终端下的适配问题

2. Retina（视网膜屏/高清屏）的细节处理

## 二、移动端页面适配方案变化：

1. 流式布局（百分比布局）+ 媒体查询

2. 响应式布局：Bootstrap网格系统...

3. 自适应布局：flex、淘宝flexible方案...

4. 使用vw特性（目前还有少数移动端浏览器不支持）

## 三、淘宝弹性布局方案：flexible

### （一）其主要思想有三点：

1. 根据dpr的值来修改viewport实现1px的线；

2. genjdpr的值来修改html的font-size，从而使用rem实现等比缩放

3. 使用hack手段用rem模拟vw弹性


### （二）使用flexible

**1.引入flexible.js**

在html页面里，尽可能早的引入这个js文件（为了让适配的效果更快）

### （三）编写CSS

**1.视觉稿中的px转换成rem**

目前视觉稿大小分为640、750、1125这三种；

除font-size外，其它大小都根据750标注稿的尺寸，转换成rem单位的值；

转换方法为：标注稿尺寸 / 标注稿基准字体大小，而 标注稿基准字体大小 = 标注稿宽度 / 10。

比如设计图尺寸是750*1000，某个容器在设计图的宽度时150px*225px，那我们在css里面：

宽度：150px / 750px / 10 = 150px / 75px = 2rem；

高度：225px / 75px = 3rem。

转换可以用css预处理器来计算，也可以在sublime中安装使用[cssREM插件](https://github.com/flashlizi/cssrem) 

**2.处理font-size**

字体不使用rem的方法，仍旧使用px作为单位，且使用[data-dpr]属性来区分不同dpr下的文本字号大小

    div {
        width: 1rem; 
        height: 0.4rem;
        font-size: 12px; // 默认写上dpr为1的fontSize
    }
    [data-dpr="2"] div {
        font-size: 24px;
    }
    [data-dpr="3"] div {
        font-size: 36px;
    }

为了更方便，可以用css预处理器Sass混合宏定制一个font-dpr()：

    @mixin font-dpr($font-size) {
    font-size: $font-size;
    
        [data-dpr="2"] & {
            font-size: $font-size * 2;
        }
    
        [data-dpr="3"] & {
            font-size: $font-size * 3;
        }
    }

有了这个混合宏后，在开发中可以直接使用：

    @include font-dpr(16px);
   

**3.手动配置dpr**

引入执行js之前，可以通过输出meta标签方式来手动设置dpr。语法如下：

    <meta name="flexible" content="initial-dpr=2,maximum-dpr=3" />

其中initial-dpr会把dpr强制设置为给定的值，maximum-dpr会比较系统的dpr和给定的dpr，取最小值。注意：这两个参数只能选其一。

**4.手动设置rem基准值的方法**

输出如下css样式即可：

    html {font-size: 60px!important;}

## 四、更多相关内容

**淘宝弹性布局方案：flexible**

1）[旧版flexible（目前使用最多的适配方案）](https://github.com/amfe/lib-flexible/tree/master) 

[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

2）[新版flexible（采用vw，不过有极个别移动端浏览器不支持）](https://github.com/amfe/lib-flexible)

[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)  

[如何在Vue项目中使用vw实现移动端适配](https://www.jianshu.com/p/1f1b23f8348f)



