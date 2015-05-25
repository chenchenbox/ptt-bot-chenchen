<!-- 
//***********************************************************************************
//***********************************************************************************
// 
// stylesheet.js
// 
// This script is used by the generated HTML content files to load one of three style 
// sheets, based on operating system, browser brand, and browser version.
// 
// 
//***********************************************************************************
//***********************************************************************************


  window.onload = function()  {

            if (top.isNAVIGATION_STATE != 'search') return false;

	    var hiliteColor = "#e0b0b0";                   
	    var html = document.body.innerHTML;            // get <BODY> text
	    var query = window.location.hash.substring(1); // get query string 
	    var tokens = regexSafe(unescape(query)).split("|"); // split it into tokens
	    var replacement = ">$1<font style=\"background:" + hiliteColor + "\">$2</font>$3<";  

	    var replacement_hash = "<a name=firstfoundword></a>$1"; // variable that defines the anchor to insert

	    while(tokens.length) 
	    {                       // don't replace anything within markup!
		 html = html.replace( 
			new RegExp(">([^<]*)(" + tokens.pop() + ")([^<]*)<","ig"), 
			replacement );
	    }

	    // now insert the anchor--should replace the first occurrence only
	    var hit = new RegExp("(<font style=\"background:" + hiliteColor + "\">[^<]*<)","i");
		
 	    html = html.replace( hit, replacement_hash );
             
            newLocation = 
                window.location.toString().substring(0,window.location.toString().indexOf('#')) + 
                "#firstfoundword";

	    document.body.innerHTML = html; // .replace(/</g,"&lt;").replace(/>/g,"&gt;");

            window.location.href = newLocation;
	
  	    return false;
  }

   
function regexSafe( str ) {	
	return str.replace(/[^a-zA-Z0-9_|]/g,"");  // filter out regex-illegal chars
}


if (navigator.platform.match(/NetWare/) != null){
     document.write('<LINK REL=STYLESHEET HREF="../../../support/exteNd_NetWare.css" TYPE="text/css">');
     }

else {
     document.write('<LINK REL=STYLESHEET HREF="../../../support/exteNd.css" TYPE="text/css">');
     }


//***********************************************************************************
//***********************************************************************************
// End of JavaScript code -->