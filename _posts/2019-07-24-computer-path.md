---
layout: post
title: "谈谈：绝对路径与相对路径"
date: 2019-07-24  
description: "绝对路径与相对路径"
tag: 计算机知识
---

- [一、定义](#%E4%B8%80%E5%AE%9A%E4%B9%89)
- [二、相对路径中的特殊符号](#%E4%BA%8C%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E4%B8%AD%E7%9A%84%E7%89%B9%E6%AE%8A%E7%AC%A6%E5%8F%B7)
- [三、绝对路径转换为相对路径](#%E4%B8%89%E7%BB%9D%E5%AF%B9%E8%B7%AF%E5%BE%84%E8%BD%AC%E6%8D%A2%E4%B8%BA%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84)
- [四、参考资料](#%E5%9B%9B%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)

## 一、定义

- 绝对路径：不管在哪个目录下，都是以根目录开始写路径；

- 相对路径：相对于当前路径的位置，以特殊符号标识；

在前端开发中，因为代码最终要上传到服务器，而具体存放到服务器哪个位置并不确定，且存放位置也可能会变动，所以在引用本地资源时一般避免写绝对路径，而是写相对路径。

## 二、相对路径中的特殊符号

- **/ 代表根目录，也就是当前文件所在的最上一层目录**

https://github.com/xmjr/baidu  的根目录是https://github.com； 

d:/web/index.html的根目录是d:

**适用场景：**文件引用同一服务器资源且知道该资源在服务器的具体路径时。

例如，index.html要引用服务器资源https://github.com/xmjr/baidu.photo.jpg，（该index.html
编写好后会上传至同一服务器https://github.com/，但不确定会放在该服务器的哪个位置），则相对路径便可写为：/xmjr/baidu.photo.jpg。

- **./ 代表当前文件所在目录**

- **../ 代表当前目录的上一层目录（父目录）**


## 三、绝对路径转换为相对路径

绝对路径转化为相对路径时，两个文件绝对路径中相同的部分可以忽略，只需从路径的不同部分考虑。

现在假设：index.html文件中需要插入一张图片photo.jpg

**例1：index.html与photo.jpg在同一目录下**

> d:/web/index.html

> d:/web/photo.jpg

则代码可写为：

    <img src="./photo.jpg">

**例2：index.html与photo.jpg所在的文件夹在同一目录中（常见情况）**

> d:/web/index.html

> d:/web/img/photo.jpg

则代码可写为：

    <img src="./img/photo.jpg">

**例3：index.html 与photo.jpg不在同一父目录中，父目录的父目录相同**

> d:/web/xmjr/index.html

> d:/web/img/photo.jpg

则代码可写为：

    <img src="../img/photo.jpg">


## 四、参考资料

[CSS相对地址与绝对地址](https://blog.csdn.net/gxq741718618/article/details/21658237)

[相对地址与绝对地址](https://www.cnblogs.com/coconutGirl/p/8324081.html) 

