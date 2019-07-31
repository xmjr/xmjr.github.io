---
layout: post
title: "原生js一些常见的兼容写法"
date: 2019-07-31  
description: "在本地实现服务器环境"
tag: 工具
---

- [1.获取事件对象、事件源](#1%E8%8E%B7%E5%8F%96%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1%E4%BA%8B%E4%BB%B6%E6%BA%90)
- [2.添加绑定事件](#2%E6%B7%BB%E5%8A%A0%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6)
- [3.移除绑定事件](#3%E7%A7%BB%E9%99%A4%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6)
- [4.阻止浏览器默认事件](#4%E9%98%BB%E6%AD%A2%E6%B5%8F%E8%A7%88%E5%99%A8%E9%BB%98%E8%AE%A4%E4%BA%8B%E4%BB%B6)
- [5.阻止事件冒泡](#5%E9%98%BB%E6%AD%A2%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1)
- [6.获取scrollTop、scrollLeft](#6%E8%8E%B7%E5%8F%96scrolltopscrollleft)
- [7.获取pageX、pageY](#7%E8%8E%B7%E5%8F%96pagexpagey)
- [8.获取offsetX、offsetY](#8%E8%8E%B7%E5%8F%96offsetxoffsety)
- [参考资料](#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)

### 1.获取事件对象、事件源

    // 获取事件对象
    getEvent: function(event) {
        // 在火狐浏览器中是event
        return event ? event : window.event;
    }
    
    // 获取事件源
    getTarget: function(event) {
        // 后者是为了兼容IE浏览器
        return event.target || event.srcElement;
    }

**举个事件委托的例子**

    // html部分
    <ul id = "ul1">
        <li>111</li>
        <li>222</li>
        <li>333</li>
    </ul>
    
    // script部分
    window.onload = function() {
        var oUl = document.getElementById("ul1");
        oUl.onclick = function(event) {
            var event = event || widnow.event;
            var target = event.target || event.srcElement;
            if(target.nodeName.toLowerCase() == "li") {
                alert(target.innerHTML);
            }
        }
    }

### 2.添加绑定事件

    // 视情况分别使用dom2、IE、dom0来绑定事件；
    // 参数依次为：操作的元素、事件名称、事件处理函数
    addEvent: function(elemnt, event, handler) {
        if(element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if(element.attachEvent) {
            element.attachEvent('on' + event, function(e) {
                handler.call(element, e);
            });
        } else {
            element['on' + event] = handler;
        }
    }

**前面的例子可以写为：**

    // html
    <ul id = "ul1">
        <li>111</li>
        <li>222</li>
        <li>333</li>
    </ul>
    
    // script部分
    window.onload = function() {

        function addEvent(element, event, handler) {
            if(element.addEventListener) {
                element.addEventListener(event, handler, false);
            } else if(element.attachEvent) {
                element.attachEvent('on' + event, function(e) {
                    handler.call(element, e);
                });
            } else {
                element['on' + event] = handler;
            }
        }
        
        function getEvent(event) {
            return event ? event : window.event;
        }
    
        function getTarget(event) {
            return event.target || event.srcElement;
        }
        
        
        var oUl = document.getElementById("ul1");
        
        addEvent(oUl, "click", function(event) {
            var event = getEvent(event);
            var target = getTarget(event);
            if(target.nodeName.toLowerCase() == "li") {
                alert(target.innerHTML);
            }
        });
    }
    

### 3.移除绑定事件

    removeEvent: function(element, event, handler) {
        if(element.removeEventListener) {
            element.removeEventListener(event, handler, flase);
        } else if(element.detachEvent) {
            element.detachEvent('on' + event, handler);
        } else {
            elemnt['on' + event] = null;
        }
    }


### 4.阻止浏览器默认事件

    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;  // IE
        }
    }
    

### 5.阻止事件冒泡

    stopPropagation: function(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancleBubble = true;  // IE
        }
    }


### 6.获取scrollTop、scrollLeft

document.body是为了兼容chrome

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;


### 7.获取pageX、pageY
clientX、clientY：点击位置相对于当前body可视区域的x、y坐标；

screenX、screenY：点击位置相对于电脑屏幕的x、y坐标；

pageX、pageY：对于整个页面（包括了被卷去的body部分）的x、y坐标；

offsetX、offsetY：相对于带有定位的父盒子的x、y坐标。

    function getPageXY(event) {
        let pageX ,pageY;
        pageX = event.pageX || (event.clientX + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft));
        pageY = event.pageY || (event.clientY + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop));
        return {pageX, pageY};
    }


### 8.获取offsetX、offsetY

    function getOffsetXY(event) {
        let elem = event.target || event.srcElement;
        return {
            offsetX: event.offsetX || (event.clientX - elem.getBoundingClientRect().left),
            offsetY: event.offsetY || (event.clientY - elem.getBoundingClientRect().top)
        }
    }



### 参考资料

[JS中一些常用的兼容写法](https://www.cnblogs.com/arguments/p/10319841.html) 

[一些常见的原生js兼容写法](https://blog.csdn.net/qq_28506819/article/details/88549954) 

[JavaScript 事件兼容性写法](https://www.cnblogs.com/wangweizhang/p/8328806.html) 

[js的一些兼容性写法](https://blog.csdn.net/qq_42767631/article/details/84992507) 