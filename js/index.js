// JavaScript Document
$(document).ready(function(){
	var picnum = $('.mini img').length*2, computerWidth = 637, phoneWidth = 93, time = 3000;
	$('.mask .num').html('1/' + picnum/2);
	//滚动部分再复制一份滑动的时候不用动态复制
	$('.slider ul').each(function(){
		$(this).append($(this).html()).width($(this).parent().width()*picnum);
	});
	upInt();
	var rotateInt;
	function upInt(){
		rotateInt = setInterval(function(){
			slideLeft();
		}, time);
	}
	//正向滑动,向左
	function slideLeft(){
		//是否到最右了
		$('.slider ul').each(function(){
			var me = $(this);
			var left = parseInt(me.css('margin-left'));
			//alert(left + '<=' + (1-picnum)*$(this).parent().width());
			if(left <= -(picnum-1)*$(this).parent().width()){
				left = -(picnum/2-1)*$(this).parent().width();
				me.css('margin-left', left);
			}
			left = left - $(this).parent().width();
			me.animate({
				marginLeft: left + 'px'
			});
		});
		upnum();
	}
	function slideRight(){
		$('.slider ul').each(function(){
			var me = $(this);
			var left = parseInt(me.css('margin-left'));
			if(left >= 0){
				left = -(picnum/2)*$(this).parent().width();
				me.css('margin-left', left);
			}
			left = left + $(this).parent().width();
			me.animate({
				marginLeft: left + 'px'
			});
		});
		upnum();
	}
	function upnum(){
		var num = $('.mask .num'), curr = parseInt(num.html()), total = picnum/2;
		curr++;
		if(curr > total) curr = 1;
		num.html(curr+'/'+total);
	}
	$('.mask').hover(function(){
		$(this).fadeTo('slow', 1);
	}, function(){
		$(this).fadeTo('slow', 0);
	});
	$('.arrow-left-1, .arrow-right-1').hover(function(){
		$(this).fadeTo('fast', 1);
	}, function(){
		$(this).fadeTo('fast', 0.4);
	}).click(function(){
		clearInterval(rotateInt);
		var curr = rotateInt;
		setTimeout(function(){
			//如果已经注册过了就不要再重复注册
			if(rotateInt != curr) return;
			rotateInt = setInterval(function(){
				upInt();
			}, time);
		}, time);
	});
	$('.arrow-left-1').click(function(){
		slideRight();
	});
	$('.arrow-right-1').click(function(){
		slideLeft();
	});
});