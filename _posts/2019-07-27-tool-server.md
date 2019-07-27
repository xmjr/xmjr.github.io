---
layout: post
title: "在本地实现服务器环境"
date: 2019-07-27  
description: "在本地实现服务器环境"
tag: 工具
---

在测试前端数据交互的过程中，发现直接在本地打开含有ajax操作的html文件，浏览器会报错：

>  Failed to load file:///D:/test/json.json: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

翻译过来就是：跨源请求只支持协议模式:http、data、chrome、chrome-extension、https。而本地使用的是file协议。

在网上找到了两个解决办法，亲测有效。

### 方法一：配置chrome支持本地（file协议）的ajax请求

- Windows：

设置Chrome的快捷方式属性，在“目标”后面加上 --allow-file-access-from-files，注意前面有个空格，重新打开Chrome即可。

如果上述步骤不行，找到chrome浏览器安装路径复制下来（我的是C:\Program Files (x86)\Google\Chrome\Application\chrome.exe），再打开cmd，直接输入命令：
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files

- Mac：

只能通过终端打开浏览器：打开终端，输入下面命令：open -a "Google Chrome" --args --disable-web-security然后就可以屏蔽安全访问了[ --args：此参数可有可无]

### 方法二：sublime编辑器中安装插件SublimeServer

安装sublime插件 sublimeServer，这个插件可以提供一个静态文件http服务器

**1. 安装sublimeServer**

- 找到菜单栏 -> 首选项，点击Package Control （快捷键为ctrl + shirft + p）

- 弹出面板找到Package Control: Install Package并点击

- 等待片刻，在弹出面板输入SublimeServer，回车(安装中)

**2. 使用sublimeServer**

- 项目必须是添加进来的（即菜单栏 -> 项目 -> 添加文件夹到项目，左侧工具栏可看到已添加）

- 开启SublimeServer服务：菜单栏 ->工具 -> SublimeServer -> Start SublimeServer (服务已开启)

- 在sublime中的html页面右击 ->　Ｖiew in SublimeServer (浏览器页面正常显示ok)

**3. 备注：**

- 页面由原始的file://协议变为location:8080；该服务器端口可自定义(工具 -> SublimeServer -> Settings )

- 也可以在手机端访问该页面，复制地址到手机端，将localhost修改为电脑的ip即可访问


### 参考资料

[配置Chrome支持本地（file协议）的AJAX请求](https://www.cnblogs.com/micua/p/chrome-file-protocol-support-ajax.html) 
 
[sublime text搭建本地服务器 SublimeServer](https://www.cnblogs.com/fenglee/p/9461450.html) 


