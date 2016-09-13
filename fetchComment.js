
var fs = require('fs');
var S = require('string');
var iconv = require('iconv-lite'); 

var comments = '';


for (var _=0 ; _<=29 ; _++){
	
	comments += 'Article' + _ + "\r\n";
	
	var raw = fs.readFileSync('C:\\Users\\chenchen\\Documents\\GitHub\\ptt-bot-chenchen\\薩利機長\\Article'+ _ +'.txt','utf8');
	
	while ( S(raw).between('$[', ']$').s != '' ){
		
		comments += S(raw).between('$[', ']$').s + "\r\n";
		
		raw = raw.replace('$[','').replace(']$','');
		
	}
	
	console.log(comments);
		
}

fs.writeFileSync( './薩利機長/Comments.txt', comments );