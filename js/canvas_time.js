var window_width = 1200;
var window_height = 768 ;
var radius = 8;
var margin_top = 60;
var margin_left = 30;
var fartime = new Date(2016,7,1,12,5,0);
var curTime = 0;


window.onload = function(){
	var canvas = document.getElementById("canvas");
	canvas.width = window_width;
	canvas.height = window_height;
	var context = canvas.getContext("2d");
	curTime = showCurTimeSeconds();
	console.log("剩余秒数:"+curTime);
	render(context);
}
function render(cxt){
	var hours = parseInt(curTime/3600);
	var minutes = parseInt(curTime-hours*3600)/60;
	var seconds = parseInt(curTime%60);

	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt); //小时 个位

	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(minutes%10),cxt);//十位

	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);//冒号

	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);//分钟 个位

	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);//十位
	
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);//冒号

	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);//秒数  十位

	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);//十位
	
	// renderDigit(margin_left+108*(radius+1),margin_top,10,cxt);//冒号





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
	var ret = fartime.getTime() - curentTime.getTime();
	ret = Math.round(ret/1000);
	return ret>=0 ? ret:0;
}