var myBot = require('../../PTT-BOT/ptt-bot');
var fs = require('fs');
var iconv = require('iconv-lite'); 
var S = require('string');

fs.readFile('targetArticleList.txt',{encoding:'utf-8'}, function (err, data) {
	
	articleList = JSON.parse(data);
	var totalNum = articleList.length;

	
	//console.log( totalNum );
	
	//login
	fs.readFile('../../myID.txt',{encoding:'utf-8'}, function (err, data) {
	
		if (err) throw err;
		id = S(data).between("ID:'","'").s;
		ps = S(data).between("PS:'","'").s;
	
		//console.log( articleList[0] );
	
		/*  與Ptt-sever建立連線  */
		var conn = myBot.login(id,ps, function(){ //請自行輸入帳號密碼
		
			/*	登入完後即停留在主功能表 */	
			console.log('已進入主功能表');
		
		});
	
		/*	進入欲收集的電影版版中	*/
		myBot.toBoard('gossiping',function(){
		
			console.log('已進入gossiping板，接著收集文章!');
		
		});
	
	
		/*	往後收集5篇文章	*/
		for( var _=0;_<totalNum;_++ ){
	
			arrIndex = 0;
			
			/*	先進入文章中	*/
			myBot.toArticle( articleList[_] ,function(){ 
			
				console.log('進入'+ articleList[arrIndex] +'文章中');
				
			});
	
			/*	接著下載文章	*/
			myBot.loadArticle(function(){
		
				/*	從getArticle()取得文章內容	*/
				fs.writeFile('./Articles/'+'gossiping'+articleList[arrIndex]+'.txt', iconv.encode( myBot.escapeANSI( myBot.getArticle() ),'big5' ), function (err) {
				
					if (err) throw err;
					console.log('gossiping'+articleList[arrIndex]+' 已經被儲存囉!');
				
					arrIndex++;
				
				});
				
			});
		
		}
	
	
	});
	
	
});