var window_width = 1200;
var window_height = 768 ;
var radius = 8;
var margin_top = 60;
var margin_left = 30;
// var fartime = new Date();
// fartime.setTime(fartime.getTime()+3600*1000);
var curTime = 0;
var ball = [];
var colors = ['red','yellow','green','blue','olive','pink','orange','black','grey','borwn'];

window.onload = function(){
	window_width = document.body.clientWidth;
	window_height = document.body.clientHeight;
	console.log(window_height);
	margin_left = Math.round(window_width/10);
	radius = Math.round(window_width*4/5/108)-1;
	margin_top = Math.round(window_height/5);

	var canvas = document.getElementById("canvas");
	canvas.width = window_width;
	canvas.height = window_height;
	var context = canvas.getContext("2d");
	curTime = showCurTimeSeconds();
	console.log("剩余秒数:"+curTime);
	setInterval(function(){
		render(context);
		update();
	}, 50)

}
function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);
	var hours = parseInt(curTime/3600);
	var minutes = parseInt(curTime-hours*3600)/60;
	var seconds = curTime%60;

	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt); //小时 个位

	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(minutes%10),cxt);//十位

	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);//冒号

	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);//分钟 个位

	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);//十位
	
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);//冒号

	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);//秒数  十位

	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);//十位
	
	// renderDigit(margin_left+108*(radius+1),margin_top,10,cxt);//冒号
	for(var i=0;i<ball.length;i++){
		cxt.fillStyle = ball[i].color;
		cxt.beginPath();
		cxt.arc(ball[i].x,ball[i].y,radius,0,2*Math.PI,true);
		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = 'rgb(0,102,153)';

	for (var i=0;i<digit[num].length;i++) {
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}

}

function showCurTimeSeconds(){
	var curentTime = new Date();
	// var ret = fartime.getTime() - curentTime.getTime();
	var ret = curentTime.getHours()*3600 + curentTime.getMinutes()*60 + curentTime.getSeconds();
	// ret = Math.round(ret/1000);
	// return ret>=0 ? ret:0;
	return ret;
}


function update(){
	var nextshowTime = showCurTimeSeconds();
	var nextshowHours = parseInt(nextshowTime/3600);
	var nextshowMinutes = parseInt((nextshowTime-nextshowHours*3600)/60);
	var nextshowSeconds = parseInt(nextshowTime%60);

	var curhours = parseInt(curTime/3600);
	var curminutes = parseInt(curTime-curhours*3600)/60;
	var curseconds = curTime%60;

	if(nextshowSeconds != curseconds){
		if(parseInt(nextshowHours/10) != parseInt(curhours/10)){
			addBalls(margin_left+0,margin_top,parseInt(curhours/10));
		}
		if(parseInt(nextshowHours%10) != parseInt(curhours%10)){
			addBalls(margin_left+15*(radius+1),margin_top,parseInt(curhours%10));
		}

		if(parseInt(nextshowMinutes/10) != parseInt(curminutes/10)){
			addBalls(margin_left+39*(radius+1),margin_top,parseInt(curminutes/10));
		}
		if(parseInt(nextshowMinutes%10) != parseInt(curminutes%10)){
			addBalls(margin_left+54*(radius+1),margin_top,parseInt(curminutes%10));
		}
		
		if(parseInt(nextshowSeconds/10) != parseInt(curseconds/10)){
			addBalls(margin_left+78*(radius+1),margin_top,parseInt(curseconds/10));
		}
		if (parseInt(curseconds%10) != parseInt(nextshowSeconds%10)) {
			addBalls(margin_left+93*(radius+1),margin_top,parseInt(nextshowSeconds%10));
		}

		curTime = nextshowTime ;
	}
	updateBall();
}

function updateBall(){
	for(var i=0;i<ball.length;i++){
		ball[i].x += ball[i].vx;
		ball[i].y += ball[i].vy;
		ball[i].vy += ball[i].g;
		if(ball[i].y >= window_height-radius){
			ball[i].y = window_height-radius;
			ball[i].vy = -ball[i].vy*0.65;
		}
	}
	var count = 0;
	for(var k=0;k<ball.length;k++)
		if(ball[k].x+radius>0 && ball[k].x-radius < window_width)
			ball[count++] = ball[k];
			// console.log("count:"+count);
		
	
		while (ball.length > Math.min(310,count)) {
			ball.pop();
		}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
			ball.push(aBall);
			}
		}
	}

}