---
layout: post
title: "移动端常用设置"
date: 2019-07-21 
description: "移动端，常用设置"
tag: 移动端
---

这里只提常用到的，会不定时更新；至于更多的移动端css样式设置，可网上搜索reset.css或common.css查看。

- [1.meta标签](#1meta%E6%A0%87%E7%AD%BE)
- [2.开启拨打电话、发送短信、发送邮件功能](#2%E5%BC%80%E5%90%AF%E6%8B%A8%E6%89%93%E7%94%B5%E8%AF%9D%E5%8F%91%E9%80%81%E7%9F%AD%E4%BF%A1%E5%8F%91%E9%80%81%E9%82%AE%E4%BB%B6%E5%8A%9F%E8%83%BD)
- [3.css3过渡动画开启硬件加速](#3css3%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB%E5%BC%80%E5%90%AF%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F)
- [4.消除transition闪屏](#4%E6%B6%88%E9%99%A4transition%E9%97%AA%E5%B1%8F)
- [5.ios系统中去掉元素被触摸时产生的半透明灰色遮罩](#5ios%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%8E%BB%E6%8E%89%E5%85%83%E7%B4%A0%E8%A2%AB%E8%A7%A6%E6%91%B8%E6%97%B6%E4%BA%A7%E7%94%9F%E7%9A%84%E5%8D%8A%E9%80%8F%E6%98%8E%E7%81%B0%E8%89%B2%E9%81%AE%E7%BD%A9)
- [6.ios中去掉input默认样式](#6ios%E4%B8%AD%E5%8E%BB%E6%8E%89input%E9%BB%98%E8%AE%A4%E6%A0%B7%E5%BC%8F)
- [7.移动端轮播图上下滑动时，避免页面跟着滑动](#7%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%BD%AE%E6%92%AD%E5%9B%BE%E4%B8%8A%E4%B8%8B%E6%BB%91%E5%8A%A8%E6%97%B6%E9%81%BF%E5%85%8D%E9%A1%B5%E9%9D%A2%E8%B7%9F%E7%9D%80%E6%BB%91%E5%8A%A8)

## 1.meta标签

**页面在手机上显示时，强制让文档的宽度与设备的宽度保持1：1，并禁止用户缩放页面。**

这个在ios10及以上版本的Safari浏览器中已经失效，即使加了这条meta，用户还是可以缩放页面；此外，有网友反映，若user-scalable=no，据说在三星的note上无法生效，而user-scalable=0则有效。

此外，若是在适配页面时采用的是淘宝的flexble.js，则别写这条，flexible.js会自动生成这条meta。

viewport:视窗  device-width:设备/屏幕宽度   initial-scale:初始缩放比例

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0;" />

对于ios10及以上版本，可以用js添加监听事件来阻止手动缩放，代码如下：

    window.onload = function() {
        // 缩放页面有两种方式：多只手指拖动页面、双击页面
        
        // 当有多只手指触摸屏幕时，阻止其默认事件
        document.addEventListener('touchstart', function(event) {
            if(event.touches.length > 1) {
                event.preventDefault();
            }
        })
        
        // 当双击时（也就是点击屏幕的时间间隔小于300ms），阻止其默认事件
        var lastTouchEnd = 0;
        document.addEventListener('touched', function(event) {
            var now = (new Date()).getTime();
            if(now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        },false)
        
    }

**格式检测——禁止ios上自动识别电话**

        <meta name="format-detection" content="telephone=no" />   

**格式检测——禁止android上自动识别邮箱**

        <meta name="format-detection" content="email=no" />

**当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari**

        <!-- ios7.0版本以后，safari上已看不到效果 -->
        <meta name="apple-mobile-web-app-capable" content="yes" />

**将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式**

        <!-- 可选default、black、black-translucent -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

**上述常用meta代码汇总：**

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0;" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />


**还有些是针对不同浏览器的，看着用：**

参考网址：[https://www.cnblogs.com/gfsy-520/p/6687765.html](https://www.cnblogs.com/gfsy-520/p/6687765.html ) 

    <!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓--> 
    <meta name="HandheldFriendly" content="true">
    <!-- 微软的老式浏览器-->
    <meta name="MobileOptimized" content="320">
    <!--uc强制竖屏-->
    <meta name="screen-orientation" content="portrait">
    <!--QQ强制竖屏-->
    <meta name="x5-orientation" content="portrait">
    <!--UC强制全屏-->
    <meta name="full-screen" content="yes">
    <!--QQ强制全屏-->
    <meta name="x5-fullscreen" content="true">
    <!--UC应用模式-->
    <meta name="browsermode" content="application">
    <!--QQ应用模式-->
    <meta name="x5-page-mode" content="app">


## 2.开启拨打电话、发送短信、发送邮件功能

    <a href="tel:123456">123456</a>

    <a href="sms:123456">123456</a>

    <a href="mailto:doooe@mail.com">...</a>
    

## 3.css3过渡动画开启硬件加速

PS：用了这个，手机的耗电量会增加，注意合理使用。

    .translate3d{
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

## 4.消除transition闪屏

以前要求加，现在不加貌似也没什么影响，但建议还是加上

    .no-flash {
        /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
        -webkit-transform-style: preserve-3d;
        /*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
    }

## 5.ios系统中去掉元素被触摸时产生的半透明灰色遮罩

    a,button,input,textarea {-webkit-tap-highlight-color: rgba(0,0,0,0;)}


## 6.ios中去掉input默认样式

    input,button,textarea{-webkit-appearance: none;}


## 7.移动端轮播图上下滑动时，避免页面跟着滑动

    body加上css  touch-action:none;
