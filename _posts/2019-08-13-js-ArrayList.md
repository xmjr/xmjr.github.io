---
layout: post
title: "js中常见的排序算法"
date: 2019-08-13  
description: "js中常见的排序算法"
tag: JavaScript
---

- [1. 冒泡排序 bubbleSort()](#1-%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F-bubblesort)
- [2. 选择排序 selectionSort()](#2-%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F-selectionsort)
- [3. 插入排序 insertionSort()](#3-%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F-insertionsort)
- [4. 归并排序 mergeSort()](#4-%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F-mergesort)
- [5. 快速排序 quickSort()](#5-%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F-quicksort)


### 1. 冒泡排序 bubbleSort()

冒泡排序在所有排序算法中最简单，它是原地排序，不需要额外的存储空间，但从运行时间来看，效率是最差的一个，时间复杂度：O(n2)。

冒泡排序比较任何两个相邻的项，如果第一个比第二大，则交换它们，元素向上移动至正确的顺序，就像气泡升至表面一样，因此得名冒泡排序。


    function bubbleSort(array) {
	    let length = array.length;

	    // 外循环：从数组的第一位迭代至最后一位；
	    for(let i = 0; i < length; i++) {
		    // 内循环：原本是从数组的第一位迭代至倒数第二位，这里减去了外循环中已经跑过的轮数，避免内循环中所有不必要的比较；
		    for(let j = 0; j < length-1-i; j++) {
			    // 当前项和下一项比较
			    if(array[j] > array[j+1]) {
				    // 用一个中间值来存储某一交换项的值
				    let temp = array[j];
				    array[j] = array[j+1];
				    array[j+1] = temp;
			    }
		    }
	    }
	    return array;
    }

    let array = [5, 4, 3, 2, 1];

    bubbleSort(array);   // [1, 2, 3, 4, 5]


### 2. 选择排序 selectionSort()

找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

和冒泡排序一样，它包含有嵌套的两个循环，这导致了二次方的复杂度。

    function selectionSort(array) {
	    let length = array.length,
		    indexMin;

	    for(let i = 0; i < length-1; i++) {
		    // 假设本迭代轮次的第一个值为数组的最小值
		    indexMin = i;

		    for(let j = i; j < length; j++) {
			    if(array[indexMin] > array[j]) {
				    indexMin = j;
			    }
		    }

		    // 如果该最小值和原最小值不同，则交换其值
		    if(i !== indexMin) {
			    let temp = array[i];
			    array[i] = array[indexMin];
			    array[indexMin] = temp;
		    }
	    }

	    return array;
    }

    let array = [5, 4, 3, 2, 1];

    selectionSort(array);   // [1, 2, 3, 4, 5]



### 3. 插入排序 insertionSort()

假定第一项已经排序了，接着，它和第二项进行比较，第二项是英国待在原位还是插到第一项之前呢？这样，头两项就已经正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢？），以此类推。

    function insertionSort(array) {
	    let length = array.length,
		    j,
		    temp;

	    for(let i = 0; i < length; i++) {
		    // 用i的值来初始化一个辅助变量，并将其值存储于一个临时变量中
		    j = i;
		    temp = array[i];

		    while(j > 0 && array[j-1] > temp) {
			    // 将待比较的值移到当前位置
			    array[j] = array[j-1];
			    j--;
		    }
		    array[j] = temp;
	    }

	    return array;
    }

    let array = [5, 4, 3, 2, 1];

    insertionSort(array);   // [1, 2, 3, 4, 5]


### 4. 归并排序 mergeSort()

将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

前三个排序算法性能不好，归并排序性能不错。

	function mergeSort(array) {
		let length = array.length;

		if(length === 1) {
			return array;
		}

		let mid = Math.floor(length / 2),
			left = array.slice(0, mid),
			right = array.slice(mid, length);


		return merge(mergeSort(left), mergeSort(right));
	}

	function merge(left, right) {
		let result = [],
			il = 0,
			ir = 0;

		while(il < left.length && ir < right.length) {
			if(left[il] < right[ir]) {
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		while(il < left.length) {
			result.push(left[il++]);
		}

		while(ir < right.length) {
			result.push(right[ir++]);
		}

		return result;
	}

	let array = [5, 4, 3, 2, 1];

	mergeSort(array);   // [1, 2, 3, 4, 5]    


### 5. 快速排序 quickSort()

快速排序是所有排序算法中最高效的一种，也是最常用的。

快速排序先保证列表的前半部分项都小于后半部分项，然后分别对前半部分和后半部分排序。

具体来说：

首先，从数组中选择中间一项作为主元；

其次，创建两个指针，左边一个指向数组的第一项，右边一个指向数组的最后一项。移动左指针直到找到一个比主元大的元素，接着，移动右指针直到找到一个比主元小的元素，然后交换它们；重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。

然后，对划分后的两个小数组重复之前的两个步骤，直到数组已完全排序。

	function quickSort() {
	    return quick(array, 0, array.length -1);
	};

	function quick(array, left, right) {   // 3
	    let index;
	    
	    if(array.length > 1) {
	        index = partition(array, left, right);
	        
	        // 如果子数组存在较小值的元素，则对该数组重复这个过程
	        if(left < index -1) { 
	            quick(array, left, index - 1);
	        }
	        
	        // 同理，对如果子数组存在较大值，也重复快速排序过程
	        if(index < right) {
	            quick(array, index, right);
	        }
	    } 
	    return array;
	};

	function partition(array, left, right) {
	    let pivot = array[Math.floor((left + right) / 2)],
	        // 初始化两个指针：left、right
	        i = left,
	        j = right;
	    
	    while(i <= j) {  // 只要left和right没有相互交错，就执行划分操作
	        while(array[i] < pivot) { //移动left指针直到找到一个元素比主元大
	            i++;
	        }
	        while(array[j] > pivot) { //移动right指针直到找到一个元素比主元小
	            j--;
	        }
	        if(i <= j) {
	            //交换它们
	            let temp = array[i];
	            array[i] = array[j];
	            array[j] = temp;
	            
	            // 循环
	            i++;
	            j--;
	        }
	    }
	    return i;  // 在划分操作结束后，返回左指针的索引，用来在行{3}处创建子数组。
	};

	let array = [5,4,3,2,1];
	quickSort(array);  // [1, 2, 3, 4, 5]













