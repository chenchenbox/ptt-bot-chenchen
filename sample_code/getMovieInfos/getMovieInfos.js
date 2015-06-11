var myBot = require('../../PTT-BOT/ptt-bot');
var fs = require('fs');
var iconv = require('iconv-lite'); 
var S = require('string');

//login
fs.readFile('../../myID.txt',{encoding:'utf-8'}, function (err, data) {
	
	if (err) throw err;
	id = S(data).between("ID:'","'").s;
	ps = S(data).between("PS:'","'").s;
	
	
	
	/*  與Ptt-sever建立連線  */
	myBot.login(id,ps, function(){ //請自行輸入帳號密碼
		
		/*	登入完後即停留在主功能表 */	
		console.log('已進入主功能表');
	
	});
	
	/*	進入欲收集的電影版版中	*/
	myBot.toBoard('movie',function(){
		
		console.log('已進入movie板，接著收集文章!');
		
	});
	
	/*	從編號54635的文章開始收集	*/
	_indexForArticle = 58155; //global
	
	/*	往後收集5篇文章	*/
	for( var _=0;_<200;_++ ){
		
		/*	先進入文章中	*/
		myBot.toArticle(_+_indexForArticle,function(){ 
			
			console.log('進入'+_indexForArticle+'文章中');
			
		});
	
		/*	接著下載文章	*/
		myBot.loadArticle(function(){
		
			var article_data = myBot.getArticle() ;
			
			/*	從getArticle()取得文章內容	*/
			fs.writeFile('./Articles/'+'movie'+_indexForArticle+'.txt',iconv.encode( article_data ,'big5' ), function (err) {
				
				if (err) throw err;
				
				/*	替Article新增標籤資料	*/
				var article_tag = {};
				article_tag.index = _indexForArticle;
				article_tag.title =  S(article_data).between('[34;47m 標題 [0;44m',"\r\n").trim().replaceAll(" ","").s;
				if( S(article_tag.title).contains("[")&& S(article_tag.title).contains("]") ){
					article_tag.attr = S(article_tag.title).between("[","]").s;
				}else{
					article_tag.attr = "NONE";
				}
				article_tag.author = S(article_data).between('[34;47m 作 [0;44m ',"[34;47m 看板").trim().replaceAll(" ","").s;				
				article_tag.time = S(article_data).between('[34;47m 時間 [0;44m',"\r\n").collapseWhitespace().replaceAll(" ","-").s;			
				if( S(article_tag.title).contains("Re:") ){
					article_tag.isReply = true;
				}else{
					article_tag.isReply = false;
				}
				article_tag.numGoodComment = S(article_data).count("[1;37m推");
				article_tag.numBadComment = S(article_data).count("[1;31m噓");
				article_tag.numNeutralComment = S(article_data).count("[1;31m→");				
				if( article_tag.numGoodComment+article_tag.numBadComment+article_tag.numNeutralComment >100 )
					article_tag.isPopular = true;
				else
					article_tag.isPopular = false;			
				if( article_tag.numGoodComment>50 )
					article_tag.isGoodArticle = true;
				else
					article_tag.isGoodArticle = false;
				
				/*	寫入infos.txt	*/
				fs.readFile('./movieInfos.txt', function (err, data) {
					if (err) throw err;
					
					var movieInfos = JSON.parse(iconv.decode( data ,'big5' ));
					movieInfos.push(article_tag);
					
					fs.writeFile('./movieInfos.txt',iconv.encode( JSON.stringify(movieInfos) ,'big5' ), function (err) {
						if (err) throw err;
					});
					
				});
				
				
				/*	Console Tag 結果	*/
				if( article_tag.isGoodArticle ){
					console.log("[1;32m"+JSON.stringify(article_tag)+"[m");
					/*	寫入Tag	*/
					/*
					fs.writeFile('./popular_article/'+'movie'+_indexForArticle+'.txt',iconv.encode( article_data ,'big5' ), function (err) {
						if (err) throw err;
					});
					*/
				}
				else
					console.log("[1;33m"+JSON.stringify(article_tag)+"[m");
				if( article_tag.isPopular ){
					console.log("[1;31m此篇為熱門文章!![m");
					/*
					fs.writeFile('./popular_article/'+'movie'+_indexForArticle+'.txt',iconv.encode( article_data ,'big5' ), function (err) {
					if (err) throw err;
					});
					*/
				}
				
				/*	寫入Tag	*/
				/**
				fs.writeFile('./Articles/'+'movie'+_indexForArticle+'_tag.txt',iconv.encode( JSON.stringify(article_tag) ,'big5' ), function (err) {
					if (err) throw err;
				});
				**/
				
				
				console.log('movie'+_indexForArticle+' 已經被儲存囉!');
				_indexForArticle++;
				
			});
		
		});
		
	}
	
	

});