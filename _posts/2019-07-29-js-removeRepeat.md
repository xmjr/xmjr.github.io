---
layout: post
title: "数组去重的4种方法"
date: 2019-07-29  
description: "数组去重的4种方法"
tag: JavaScript
---

- [方法一：用for()双层遍历数组，用splice()删除相同的数组项](#%E6%96%B9%E6%B3%95%E4%B8%80%E7%94%A8for%E5%8F%8C%E5%B1%82%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E7%94%A8splice%E5%88%A0%E9%99%A4%E7%9B%B8%E5%90%8C%E7%9A%84%E6%95%B0%E7%BB%84%E9%A1%B9)
- [方法二：用for()、for..of配合.values()健值遍历或forEach()遍历数组，建立新数组；用indexOf()或includes()判断是否存在于新数组中，不存在则push到新数组，最后返回新数组](#%E6%96%B9%E6%B3%95%E4%BA%8C%E7%94%A8forforof%E9%85%8D%E5%90%88values%E5%81%A5%E5%80%BC%E9%81%8D%E5%8E%86%E6%88%96foreach%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E5%BB%BA%E7%AB%8B%E6%96%B0%E6%95%B0%E7%BB%84%E7%94%A8indexof%E6%88%96includes%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E4%BA%8E%E6%96%B0%E6%95%B0%E7%BB%84%E4%B8%AD%E4%B8%8D%E5%AD%98%E5%9C%A8%E5%88%99push%E5%88%B0%E6%96%B0%E6%95%B0%E7%BB%84%E6%9C%80%E5%90%8E%E8%BF%94%E5%9B%9E%E6%96%B0%E6%95%B0%E7%BB%84)
- [方法三：数组下标判断法，用forEach()遍历数组，利用indexOf()判断元素的值是否与当前索引相等，若相等则加入](#%E6%96%B9%E6%B3%95%E4%B8%89%E6%95%B0%E7%BB%84%E4%B8%8B%E6%A0%87%E5%88%A4%E6%96%AD%E6%B3%95%E7%94%A8foreach%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E5%88%A9%E7%94%A8indexof%E5%88%A4%E6%96%AD%E5%85%83%E7%B4%A0%E7%9A%84%E5%80%BC%E6%98%AF%E5%90%A6%E4%B8%8E%E5%BD%93%E5%89%8D%E7%B4%A2%E5%BC%95%E7%9B%B8%E7%AD%89%E8%8B%A5%E7%9B%B8%E7%AD%89%E5%88%99%E5%8A%A0%E5%85%A5)
- [方法四：将数组转换成Set()，然后用Array.from()转回数组](#%E6%96%B9%E6%B3%95%E5%9B%9B%E5%B0%86%E6%95%B0%E7%BB%84%E8%BD%AC%E6%8D%A2%E6%88%90set%E7%84%B6%E5%90%8E%E7%94%A8arrayfrom%E8%BD%AC%E5%9B%9E%E6%95%B0%E7%BB%84)


### 方法一：用for()双层遍历数组，用splice()删除相同的数组项


    function removeRepeat(arr){
	    for(let i = 0; i < arr.length; i++) {
		    for(let j = i + 1; j < arr.length; j++) {
			    if(arr[i] == arr[j]) {
				    arr.splice(j, 1);
				    j--;
			    }
		    }
	    }
	    return arr;
    } 

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr);  // [1, 2, 3, 4]


### 方法二：用for()、for..of配合.values()健值遍历或forEach()遍历数组，建立新数组；用indexOf()或includes()判断是否存在于新数组中，不存在则push到新数组，最后返回新数组

    // for()
    function removeRepeat(arr){
	    const arr1 = [];
	    for(let i = 0; i < arr.length; i++) {
		    // if(arr1.indexOf(arr[i]) == -1)
		    if(arr1.includes(arr[i]) == false) {
			    arr1.push(arr[i]);
		    }
	    }
	    return arr1;
    } 

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr);  // [1, 2, 3, 4]
    
    
    // for..of 配合.values()
    function removeRepeat(arr) {
        const arr1 = [];
        for(let e of arr.values()) {
            if(arr1.includes(e) == false) {
                arr1.push(e);
            }
        }
        return arr1;
    }

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr); // [1, 2, 3, 4]


    // forEach
    function removeRepeat(arr){
	    const arr1 = [];
	    arr.forEach(function(e) {
		    // if(arr1.indexOf(e) == -1)
		    if(arr1.includes(e) == false) {
			    arr1.push(e);
		    }
	    });
	    return arr1;
    } 

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr);  // [1, 2, 3, 4]


### 方法三：数组下标判断法，用forEach()遍历数组，利用indexOf()判断元素的值是否与当前索引相等，若相等则加入


    function removeRepeat(arr){
	    const arr1 = [];
	    arr.forEach(function(e,i,arr) {
		    if(arr.indexOf(e) === i) {
			arr1.push(e);
		    }
	    });
        return arr1;
    } 

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr); // [1, 2, 3, 4]
    
    
### 方法四：将数组转换成Set()，然后用Array.from()转回数组    
    
    
    function removeRepeat(arr){
	   let set = new Set(arr);
	   let arr1 = Array.from(set);
	   return arr1;
    } 

    const arr = [1,1,2,2,3,3,4];
    removeRepeat(arr);