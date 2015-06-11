var myBot = require('../../PTT-BOT/ptt-bot');
var fs = require('fs');
var iconv = require('iconv-lite'); 
var S = require('string');



//取得今天日期
var dateObj = new Date();
var thisMonth = dateObj.getMonth()+1;
var thisDate = dateObj.getDate();
if (thisDate<=9) thisDate = '0'+thisDate;
var today = thisMonth.toString()+'/'+thisDate.toString();



//login
fs.readFile('../../myID.txt',{encoding:'utf-8'}, function (err, data) {
	
	if (err) throw err;
	id = S(data).between("ID:'","'").s;
	ps = S(data).between("PS:'","'").s;
	
	
	
	/*  與Ptt-sever建立連線  */
	var conn = myBot.login(id,ps, function(){ //請自行輸入帳號密碼
		
			/*	登入完後即停留在主功能表 */	
			console.log('The bot is in Main!');
		
	});
	
	
	var targetArticleIndex = [];
		
	
	/*	進入欲收集的電影版版中	*/
	myBot.toBoard('movie',function(){
		
		console.log('The bot is in movie board, try to collect article index!');
		
		//console.log(myBot.escapeANSI(myBot.getScreen()));
		var screenData = S(myBot.getScreen()).replaceAll('●','  ').s;	
		var screenArr =  S(myBot.escapeANSI(screenData)).lines();
		//console.dir(screenArr);	
		//console.log(S(screenArr[5]).right(-7).right(5).s);
		//console.log(S(screenArr[5]).right(-16).right(4).s);
		
		for(var _ =0; _<screenArr.length;_++){
			
			var articleIndex = S(screenArr[_]).right(-7).right(5).s 
			var articleDate = S(screenArr[_]).right(-16).right(4).s
			if( articleDate == today){
				targetArticleIndex.push(articleIndex);
			}
			
		}
		
		//console.log(targetArticleIndex);
		//console.log(targetArticleIndex.length);
		
	});
	
	
	for(var i=0;i<=10;i++){
		
		myBot.sendPageUp(function(){
			
				var screenData = S(myBot.getScreen()).replaceAll('●','  ').s;
				var screenArr =  S(myBot.escapeANSI(screenData)).lines();
				//console.dir(screenArr);
				//console.log(S(screenArr[5]).right(-7).right(5).s);
				//console.log(S(screenArr[5]).right(-16).right(4).s);
		
				for(var _ =0; _<screenArr.length;_++){
					
					var articleIndex = S(screenArr[_]).right(-7).right(5).s 
					var articleDate = S(screenArr[_]).right(-16).right(4).s
					if( articleDate == today){
						targetArticleIndex.push(articleIndex);
					}
				
				}
		
				//console.log(targetArticleIndex);
				//console.log(targetArticleIndex.length);
		
		
				fs.writeFile('./targetArticleList.txt',JSON.stringify(targetArticleIndex), function (err) {
					if (err) throw err;
				});
		
			console.log("finding List...");
		
		});	
		
	}

});