/* 收集樓下的房客機長 */

var myBot = require('./PTT-BOT/ptt-bot');
var fs = require('fs');
var iconv = require('iconv-lite'); 
var S = require('string');

//login
fs.readFile('myID.txt',{encoding:'utf-8'}, function (err, data) {
	
	if (err) throw err;
	id = S(data).between("ID:'","'").s;
	ps = S(data).between("PS:'","'").s;
	
	/*  與Ptt-sever建立連線  */
	myBot.login(id,ps, function(){ //請自行輸入帳號密碼
		
		/*	登入完後即停留在主功能表 */	
		console.log('已進入主功能表');
	
	});
	
	getArticleListOfMovie(myBot);
		
});	

var articleList = [];

function getArticleListOfMovie( bot   ){
	
	/*****
	para :
		bot  OBJ
		movieName  ARR
 		releaseDate  STR
	 
	return :
		article list  ARR
	******/
	
	// console.log(bot);
	// console.log(conn);
	
	_listIndex = 0;
	
	/*	進入欲收集的電影版版中	*/
	bot.toBoard('movie',function(){
		
		console.log('已進入movie板，接著收集文章!');
		
		var listData = bot.escapeANSI(bot.getScreen());
		
		fs.writeFile('./article_list/'+'movie'+_listIndex+'.txt',iconv.encode( listData ,'big5' ), function (err) {
				
		});	
		
		var listDataLines = S(listData).lines();

		_date = ""; //current date
		
		for ( var _ = 23 ; _ >= 4 ; _-- ){
			
				var _left, articleDate, articleIndex, articleAuthor, articleTitle;
			
				if ( S(listDataLines[_]).left(12).contains('★') ) { 
					
					/*
					 * 公告置底文章
					 */
					
				} else if ( S(listDataLines[_]).left(12).contains('爆') ) {
					
					/*
					 * 推文數爆之鄉民文章 
					 * Note: '爆' 為兩字元
					 */
					
					articleInfo = {};
					_left =  S(listDataLines[_]).left(29).s;
					articleInfo.date = S(listDataLines[_]).left(15).right(4).s;
					articleInfo.index = S(listDataLines[_]).left(7).right(5).s;
					articleInfo.author = S(listDataLines[_]).left(29).right(13).trimRight().s;
					articleInfo.title = S(listDataLines[_]).chompLeft(_left).trimLeft().s;
					articleInfo.isPop = true;
					
					if ( articleInfo.date != _date ) {
						
						_date = articleInfo.date;
						console.log( "[1;33m" + _date + "[m" );
						
					}	
					
					if (S(articleInfo.title).contains('樓下的房客')) {
						
						console.log("[1;32m" + articleInfo.title + "[m");
						articleList.push(articleInfo);
					
					}	
							
				} else {
					
					/*
					 * 一般鄉民文章
					 */
					
					articleInfo = {};
					_left =  S(listDataLines[_]).left(30).s;
					articleInfo.date = S(listDataLines[_]).left(16).right(4).s;
					articleInfo.index = S(listDataLines[_]).left(7).right(5).s;
					articleInfo.author = S(listDataLines[_]).left(30).right(13).trimRight().s;
					articleInfo.title = S(listDataLines[_]).chompLeft(_left).s;
					articleInfo.isPop = false;
					
					if ( articleInfo.date != _date ) {
						
						_date = articleInfo.date;
						console.log( "[1;33m" + _date + "[m" );
						
					}	
					
					if (S(articleInfo.title).contains('樓下的房客')) {
						
						console.log("[m" + articleInfo.title + "[m");
						articleList.push(articleInfo);
					
					}	
						
				}
				
			}
		
		_listIndex ++ ;
		
	});
	
	
	//135 => 一個月的文章, 2分半左右蒐集完畢
	
	for(var _ =0 ; _< 150 ; _++){
		
		bot.sendPageUp(function(){
		
			// console.log('上一頁');
		
			var listData = bot.escapeANSI(bot.getScreen());
		
			fs.writeFile('./article_list/'+'movie'+_listIndex+'.txt',iconv.encode( listData ,'big5' ), function (err) {
				
			});	
		
			var listDataLines = S(listData).lines();
		
			for ( var _ = 23 ; _ >= 4 ; _-- ){
			
				var _left, articleDate, articleIndex, articleAuthor, articleTitle;
			
				if ( S(listDataLines[_]).left(12).contains('★') ) { 
					
					/*
					 * 公告置底文章
					 */
					
				} else if ( S(listDataLines[_]).left(12).contains('爆') ) {
					
					/*
					 * 推文數爆之鄉民文章 
					 * Note: '爆' 為兩字元
					 */
					
					articleInfo = {};
					_left =  S(listDataLines[_]).left(29).s;
					articleInfo.date = S(listDataLines[_]).left(15).right(4).s;
					articleInfo.index = S(listDataLines[_]).left(7).right(5).s;
					articleInfo.author = S(listDataLines[_]).left(29).right(13).trimRight().s;
					articleInfo.title = S(listDataLines[_]).chompLeft(_left).trimLeft().s;
					articleInfo.isPop = true;
					
					if ( articleInfo.date != _date ) {
						
						_date = articleInfo.date;
						console.log( "[1;33m" + _date + "[m" );
						
					}	
					
					if (S(articleInfo.title).contains('樓下的房客')) {
						
						console.log("[1;32m" + articleInfo.title + "[m");
						articleList.push(articleInfo);
					
					}	
							
				} else {
					
					/*
					 * 一般鄉民文章
					 */
					
					articleInfo = {};
					_left =  S(listDataLines[_]).left(30).s;
					articleInfo.date = S(listDataLines[_]).left(16).right(4).s;
					articleInfo.index = S(listDataLines[_]).left(7).right(5).s;
					articleInfo.author = S(listDataLines[_]).left(30).right(13).trimRight().s;
					articleInfo.title = S(listDataLines[_]).chompLeft(_left).s;
					articleInfo.isPop = false;
					
					if ( articleInfo.date != _date ) {
						
						_date = articleInfo.date;
						console.log( "[1;33m" + _date + "[m" );
						
					}	
					
					if (S(articleInfo.title).contains('樓下的房客')) {
						
						console.log("[m" + articleInfo.title + "[m");
						articleList.push(articleInfo);
					
					}	
						
				}
				
			}
		
			_listIndex ++ ;
		
		});
				 
		
	}
	
	bot.execFuntion(function(){
		
		fs.writeFile('./樓下的房客/ArticleInfo.json',JSON.stringify(articleList), function (err) {
				
			console.log('Strored as json format');	
				
		});	
	});
	
	bot.execFuntion(function(){
		
		for(var _ =0; _<articleList.length; _++ ){
			
			console.log(articleList[_].index);
			bot.toArticle(articleList[_].index);
			
			_aindex = 0;
			
			bot.loadArticle(function(){
				
				fs.writeFile('./樓下的房客/Article' + _aindex +'.txt', bot.escapeANSI(bot.getArticle()), function (err) {
						
					_aindex++;	
						
				});
				
			});
			
		}
		
	});
	
}