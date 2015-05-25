<!-- 
//***********************************************************************************
//***********************************************************************************
// This script defines the branding content for the help system.
// This script also defines the dropdown links menus. 
//***********************************************************************************
//***********************************************************************************


// determine the location of the suport directory

var isSupportDir;
var isHomeDir;
var isCommonDir;

  if (window.parent.BODY == null || window.parent.BODY == self) 
  {
     isSupportDir="../../../support";
     isHomeDir="../../../";
     isCommonDir="../../exteNd/common/";
  }
  
  if (window.parent.BRANDING == self) 
  {
     isSupportDir="../support";
     isHomeDir="../";
     isCommonDir="exteNd/common/";
  }


// declare the image to be used as a one-pixel-wide spacer between buttons

imageSpacer = new Image();
imageSpacer.src = isSupportDir + "/spacer.gif";



// stuff to make the dropdown links menus work

if (window.parent.BODY == self || window.parent.BRANDING == null)
{



  // initialize the timeout object for the links menu


  helplinkstimeout = window.setTimeout("dismisshelplinks()", 75);



  // function to dismiss the help links dropdown menus 


  function dismisshelplinks()
  {
    if(document.getElementById("helpsystemlinks").style.display=="block")
      {
      document.getElementById("helpsystemlinks").style.display="none";
      }
  }

}


// function to correctly position the dropdown menu when the content window is scrolled 
// within a frameset
// NB: will only be called from the BRANDING frame

function positiondropdown()

{

var verticalposition;
var horizontalposition;

  if (window.parent.BODY != null)
  {
    verticalposition = top.BODY.document.body.scrollTop.toString();
    horizontalposition = 124;

    top.BODY.document.getElementById('helpsystemlinks').style.top = verticalposition; 
    top.BODY.document.getElementById('helpsystemlinks').style.left = horizontalposition; 
  }

  else
  
  {
    verticalposition = "66px";
    horizontalposition = 124;

    document.getElementById('helpsystemlinks').style.top = verticalposition; 
    document.getElementById('helpsystemlinks').style.left = horizontalposition; 
  }


}




// stuff to make the Show Navigation / Hide Navigation buttons work


var htmlFileName;
var htmlFileDirectory;
var htmlFrameName;
var showHideURL;

//var fileURL;
//var frameURL;
//var isShowHide;

imageShow1 = new Image();
imageShow2 = new Image();
imageShow1.src = isSupportDir + "/showcontents.gif";
imageShow2.src = isSupportDir + "/showcontents.glow.gif";

imageShow3 = new Image();
imageShow4 = new Image();
imageShow3.src = isSupportDir + "/hidecontents.gif";
imageShow4.src = isSupportDir + "/hidecontents.glow.gif";



function showHideLoad()
{


// Set the htmlFrameName or htmlFileName variable, depending on the context.
//
// The variable isFileDirectoryName can be set by a separate script in the HTML file itself.
// This allows for non-generated HTML files that are not installed to the books directory
// to use this code. 



if (window.parent.BODY == null) // we are in a standalone file 
{
  htmlFileName = window.location.pathname.match(/[\w-]+.htm[l]?$/);
  htmlFrameName = isS3HSYS_FRAMESETNAME;

  if (self.isFileDirectoryName !== (void 0)) // the isFileDirectoryName variable is defined
  {
    htmlFileDirectory = self.isFileDirectoryName;
  }
  
  else
  {
    htmlFileDirectory = "books";
  }

  showHideURL="../../../" + htmlFrameName + "?" + htmlFileDirectory + "%2f" + htmlFileName;
}


if (window.parent.BODY != null) // we are in a frameset
{
  htmlFileName = window.parent.BODY.location.pathname.match(/[\w-]+.htm[l]?$/);
  htmlFileDirectory = "books";

  if (window.parent.BODY.isFileDirectoryName !== (void 0)) // the isFileDirectoryName variable is defined
  {
    htmlFileDirectory = window.parent.BODY.isFileDirectoryName; 
  }

  showHideURL = window.parent.BODY.isS3HSYS_HELPDIR + "/" + htmlFileDirectory + "/" + htmlFileName;

}

window.parent.location.href = showHideURL;

}


// This button code is for use when this document is in a frameset

if (window.parent.BODY != null)
{
  isShowHideButton = 
   
  "<img src='" + imageSpacer.src + "' border='0'>" +
  "<img src=\"" + isSupportDir +"/hidecontents.gif\" name=\"buttonshowhide\" border=\"0\" alt=\"Hide navigation pane\" title=\"Hide navigation pane\"" +
  "onmouseover=\"document.images.buttonshowhide.src=imageShow4.src\; return true\" " +
  "onmouseout=\"document.images.buttonshowhide.src=imageShow3.src\;\"" +
  "onclick=\"showHideLoad()\">" ;
   
}

// This button code is for use when this document is NOT in a frameset

else 
{
  isShowHideButton = 
        
  "<img src='" + imageSpacer.src + "' border='0'>" +
  "<img src=\"" + isSupportDir +"/showcontents.gif\" name=\"buttonshowhide\" border=\"0\" title=\"Show navigation pane\" alt=\"Show navigation pane\"" +
  "onmouseover=\"document.images.buttonshowhide.src=imageShow2.src\; return true\" " +
  "onmouseout=\"document.images.buttonshowhide.src=imageShow1.src\;\"" +
  "onclick=\"showHideLoad()\">" ;

}


// End of stuff to make the Show Navigation / Hide Navigation buttons work.



// Stuff to make the VCR buttons work.

//var isFirstButton = "";
//var isPreviousButton = "";
//var isNextButton = "";
//var isLastButton = "";



imageBookFirstUp = new Image();
imageBookFirstOver = new Image();
imageBookFirstUp.src =  isSupportDir + "/toc.gif";
imageBookFirstOver.src =  isSupportDir + "/toc.glow.gif";

imageBookPreviousUp = new Image();
imageBookPreviousOver = new Image();
imageBookPreviousUp.src =  isSupportDir + "/prevchap.gif";
imageBookPreviousOver.src =  isSupportDir + "/prevchap.glow.gif";

imageBookNextUp = new Image();
imageBookNextOver = new Image();
imageBookNextUp.src =  isSupportDir + "/nextchap.gif";
imageBookNextOver.src =  isSupportDir + "/nextchap.glow.gif";

imageBookLastUp = new Image();
imageBookLastOver = new Image();
imageBookLastUp.src =  isSupportDir + "/index.gif";
imageBookLastOver.src =  isSupportDir + "/index.glow.gif";


function processFirstButtonEvents(eventtype)
{

  switch(eventtype)
  {

    case "over":
    
      var mouseOverFileName = imageBookFirstUp.src;
 
      if (window.parent.BODY == null && self.firstDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        mouseOverFileName = imageBookFirstOver.src;
      }
    
      if (window.parent.BODY != null && window.parent.BODY.firstDocumentInBook !== (void 0)) // we are in a   frameset
      {
        mouseOverFileName = imageBookFirstOver.src;
      }
  
      document.images.buttonfirst.src = mouseOverFileName;
    
    break;
    

    case "out":
    
      document.images.buttonfirst.src = imageBookFirstUp.src;
      
    break;
    

    case "click":
      
      if (window.parent.BODY == null && self.firstDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        window.location.href = firstDocumentInBook;
      }


      if (window.parent.BODY != null && window.parent.BODY.firstDocumentInBook !== (void 0)) // we are in a frameset
      {
      var buttonURL = new RegExp("\\w+\\.html#?[a-zA-Z0-9]*$");
     
      window.parent.BODY.location.href = window.parent.BODY.location.href.replace(buttonURL, window.parent.BODY.firstDocumentInBook);
      }
      
    break;

  }

}


function processPreviousButtonEvents(eventtype)
{

  switch(eventtype)
  {

    case "over":
    
      var mouseOverFileName = imageBookPreviousUp.src;
 
      if (window.parent.BODY == null && self.previousDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        mouseOverFileName = imageBookPreviousOver.src;
      }
    
      if (window.parent.BODY != null && window.parent.BODY.previousDocumentInBook !== (void 0)) // we are in a   frameset
      {
        mouseOverFileName = imageBookPreviousOver.src;
      }
  
      document.images.buttonprevious.src = mouseOverFileName;
    
    break;
    

    case "out":
    
      document.images.buttonprevious.src = imageBookPreviousUp.src;
      
    break;
    

    case "click":
      
      if (window.parent.BODY == null && self.previousDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        window.location.href = previousDocumentInBook;
      }

      if (window.parent.BODY != null && window.parent.BODY.previousDocumentInBook !== (void 0)) // we are in a frameset
      {
      var buttonURL = new RegExp("\\w+\\.html#?[a-zA-Z0-9]*$");
     
      window.parent.BODY.location.href = window.parent.BODY.location.href.replace(buttonURL, window.parent.BODY.previousDocumentInBook);
      }
      
    break;

  }

}

function processNextButtonEvents(eventtype)
{

  switch(eventtype)
  {

    case "over":
    
      var mouseOverFileName = imageBookNextUp.src;
 
      if (window.parent.BODY == null && self.nextDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        mouseOverFileName = imageBookNextOver.src;
      }
    
      if (window.parent.BODY != null && window.parent.BODY.nextDocumentInBook !== (void 0)) // we are in a   frameset
      {
        mouseOverFileName = imageBookNextOver.src;
      }
  
      document.images.buttonnext.src = mouseOverFileName;
    
    break;
    

    case "out":
    
      document.images.buttonnext.src = imageBookNextUp.src;
      
    break;
    

    case "click":
      
      if (window.parent.BODY == null && self.nextDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        window.location.href = nextDocumentInBook;
      }

      if (window.parent.BODY != null && window.parent.BODY.nextDocumentInBook !== (void 0)) // we are in a frameset
      {
      var buttonURL = new RegExp("\\w+\\.html#?[a-zA-Z0-9]*$");
     
      window.parent.BODY.location.href = window.parent.BODY.location.href.replace(buttonURL, window.parent.BODY.nextDocumentInBook);
      }
      
    break;

  }

}

function processLastButtonEvents(eventtype)
{

  switch(eventtype)
  {

    case "over":
    
      var mouseOverFileName = imageBookLastUp.src;
 
      if (window.parent.BODY == null && self.lastDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        mouseOverFileName = imageBookLastOver.src;
      }
    
      if (window.parent.BODY != null && window.parent.BODY.lastDocumentInBook !== (void 0)) // we are in a   frameset
      {
        mouseOverFileName = imageBookLastOver.src;
      }
  
      document.images.buttonlast.src = mouseOverFileName;
    
    break;
    

    case "out":
    
      document.images.buttonlast.src = imageBookLastUp.src;
      
    break;
    

    case "click":
      
      if (window.parent.BODY == null && self.lastDocumentInBook !== (void 0)) // we are in a standalone file 
      {
        window.location.href = lastDocumentInBook;
      }

      if (window.parent.BODY != null && window.parent.BODY.lastDocumentInBook !== (void 0)) // we are in a frameset
      {
      var buttonURL = new RegExp("\\w+\\.html#?[a-zA-Z0-9]*$");
     
      window.parent.BODY.location.href = window.parent.BODY.location.href.replace(buttonURL, window.parent.BODY.lastDocumentInBook);
      }
      
    break;

  }

}




  isBookNavigationButtons = 
   
  "<img src='" + imageSpacer.src + "' border='0'>" +
  
  "<img src=\"" + isSupportDir +"/toc.gif\" name=\"buttonfirst\" border=\"0\" title=\"First document in book\" alt=\"First document in book\"" +
  "onmouseover=\"processFirstButtonEvents(\'over\')\" " +
  "onmouseout=\"processFirstButtonEvents(\'out\')\"" +
  "onclick=\"processFirstButtonEvents(\'click\')\">" +
  
  "<img src='" + imageSpacer.src + "' border='0'>" +
  
  "<img src=\"" + isSupportDir +"/prevchap.gif\" name=\"buttonprevious\" border=\"0\" title=\"Previous document in book\" alt=\"Previous document in book\"" +
  "onmouseover=\"processPreviousButtonEvents(\'over\')\" " +
  "onmouseout=\"processPreviousButtonEvents(\'out\')\"" +
  "onclick=\"processPreviousButtonEvents(\'click\')\">" +
  
  "<img src='" + imageSpacer.src + "' border='0'>" +
  
  "<img src=\"" + isSupportDir +"/nextchap.gif\" name=\"buttonnext\" border=\"0\" title=\"Next document in book\" alt=\"Next document in book\"" +
  "onmouseover=\"processNextButtonEvents(\'over\')\" " +
  "onmouseout=\"processNextButtonEvents(\'out\')\"" +
  "onclick=\"processNextButtonEvents(\'click\')\">" +
  
  "<img src='" + imageSpacer.src + "' border='0'>" +
  
  "<img src=\"" + isSupportDir +"/index.gif\" name=\"buttonlast\" border=\"0\" title=\"Last document in book\" alt=\"Last document in book\"" +
  "onmouseover=\"processLastButtonEvents(\'over\')\" " +
  "onmouseout=\"processLastButtonEvents(\'out\')\"" +
  "onclick=\"processLastButtonEvents(\'click\')\">" ;
  

// End of stuff to make the VCR buttons work.




// assemble the HTML to be written to the document stream,
// based partly which help system frame is calling this one and 
// what navigation state we are in.

var isBrand = "";


// stuff that always goes into the BRANDING frame and goes into the BODY frame
// in Hide Navigation state


if (window.parent.BODY == null || window.parent.BRANDING == self)
{


isBrand = 

"<style type= 'text/css'> "+
"body { background: white url(" +isSupportDir+ "/branding/Head_bg.gif) repeat-x 0% 0% } "+
"</style> "+

"<div id='Headgraphic'><a name='TopPage'></a><img src='" +isSupportDir+ "/branding/help_header.gif' width='500' height='65' border='0'></div> "+

"<div id='prodtitle'>" + "<img src='" + isHomeDir + "help/" + top.isS3HSYS_HELPDIR + "/nav/prodtitle.gif'>" + "</div> "+
"<div id='title'>" + "<img src='" + isHomeDir + "help/" + top.isS3HSYS_HELPDIR + "/nav/prodsubtitle.gif'>" + "</div> "+


"<div id='logo'> "+
"<table border='0' cellpadding='0' cellspacing='0' align='left'> "+
"<tr> " ;

}


// include the navigation buttons only in the BRANDING frame
// the buttons are defined in the separate NeHELPtabs.js file.

if (window.parent.BRANDING == self)
{
isBrand = isBrand + 

"<td width='219' nowrap align='left' valign='bottom'>" +

isTabs + 

"</td> ";

}



if (window.parent.BODY == null || window.parent.BRANDING == self)
{
isBrand = isBrand +  

"<td nowrap align='left' valign='bottom'>" +

isShowHideButton + isBookNavigationButtons ;


}


if (window.parent.BRANDING == self)


{

isBrand = isBrand +

"<img src='" + imageSpacer.src + "' border='0'>" +
"<img src=\"" + isSupportDir +"/buttonextendhelplibrary.gif\" border='0'" +
"    onmouseover=\"window.clearTimeout(top.BODY.helplinkstimeout)\; positiondropdown()\; top.BODY.document.getElementById(\'helpsystemlinks\').style.display=\'block\'\"" +
"    onmouseout=\"top.BODY.helplinkstimeout = top.BODY.setTimeout(\'dismisshelplinks()\', 100)\">" ;

}



if (window.parent.BODY == null)
{

isBrand = isBrand +

"<img src='" + imageSpacer.src + "' border='0'>" +
"<img src=\"" + isSupportDir +"/buttonextendhelplibrary.gif\" border='0'" +
"    onmouseover=\"window.clearTimeout(helplinkstimeout)\; positiondropdown()\; document.getElementById(\'helpsystemlinks\').style.display=\'block\'\"" +
"    onmouseout=\"window.helplinkstimeout = window.setTimeout(\'dismisshelplinks()\', 100)\">" ;

}



if (window.parent.BODY == null || window.parent.BRANDING == self)
{

isBrand = isBrand +

"<img src='" + imageSpacer.src + "' border='0'>" +
"<img src=\"" + isSupportDir +"/buttonhelponhelp.up.gif\" name=\"buttonhelponhelp\" border=\"0\" title=\"Using exteNd Help and Documentation\" alt=\"Using exteNd Help and Documentation\"" +
"    onmouseover=\"document.images.buttonhelponhelp.src=\'" + isSupportDir +"/buttonhelponhelp.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.buttonhelponhelp.src=\'" + isSupportDir +"/buttonhelponhelp.up.gif\'\;\"" +
"    onclick=\"window.open(\'" + isCommonDir + "suiteHelp.html\', \'_blank\', \'height=672, width=420, menubar=no, toolbar=no, scrollbars, resizable\')\;\">" +

"</td> " ;


}


// add an extra spacer cell to keep the Novell logo from going into the colored area of the branding frame

if (window.parent.BODY == null)
{

isBrand = isBrand +

"<td width='158' nowrap align='right' valign='bottom'>&nbsp;</td> " ;

}



if (window.parent.BODY == null || window.parent.BRANDING == self)
{

isBrand = isBrand +

"<td width='100%' nowrap align='right' valign='bottom'> " +

"<img src=\"" + isSupportDir +"/branding/Novellogo.gif\" border=\"0\" title=\"Novell Home Page\" alt=\"Novell Home Page\"" +
"    onclick=\"window.open(\'http://www.novell.com/\', \'_blank\')\;\">" +

"</td> " +
"</tr>" +
"</table>" +
"</div> ";


}


// stuff that always goes into the BODY frame and never goes into the BRANDING frame.
// primarily the help systems and external links dropdowns
// NB: vertical placement needs to be different depending on show/hide navigation state.


if (window.parent.BODY == self || window.parent.BRANDING == null)
{


isBrand = isBrand +





"<div id=\"helpsystemlinks\"" +
"onmouseover=\"window.clearTimeout(helplinkstimeout);\"" +
"onmouseout=\"helplinkstimeout = window.setTimeout(\'dismisshelplinks()\', 25)\">" +


"<table border=0 cellspacing=0 cellpadding=0 width=214>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" height=6><img src=\"" + isSupportDir +"/extendhelplibraryspacer.gif\"></td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibraryextend5help.up.gif\" name=\"extendhelplibraryextend5help\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibraryextend5help.src=\'" + isSupportDir +"/extendhelplibraryextend5help.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibraryextend5help.src=\'" + isSupportDir +"/extendhelplibraryextend5help.up.gif\'\;\"" +
"    onclick=\"window.open(\'" + isHomeDir + "Start_exteNd_Help.html\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibraryappserverhelp.up.gif\" name=\"extendhelplibraryappserverhelp\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibraryappserverhelp.src=\'" + isSupportDir +"/extendhelplibraryappserverhelp.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibraryappserverhelp.src=\'" + isSupportDir +"/extendhelplibraryappserverhelp.up.gif\'\;\"" +
"    onclick=\"window.open(\'" + isHomeDir + "Start_AppServer_Help.html\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibrarycomposerhelp.up.gif\" name=\"extendhelplibrarycomposerhelp\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibrarycomposerhelp.src=\'" + isSupportDir +"/extendhelplibrarycomposerhelp.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibrarycomposerhelp.src=\'" + isSupportDir +"/extendhelplibrarycomposerhelp.up.gif\'\;\"" +
"    onclick=\"window.open(\'" + isHomeDir + "Start_Composer_Help.html\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibrarydirectorhelp.up.gif\" name=\"extendhelplibrarydirectorhelp\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibrarydirectorhelp.src=\'" + isSupportDir +"/extendhelplibrarydirectorhelp.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibrarydirectorhelp.src=\'" + isSupportDir +"/extendhelplibrarydirectorhelp.up.gif\'\;\"" +
"    onclick=\"window.open(\'" + isHomeDir + "Start_Director_Help.html\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" height=12><img src=\"" + isSupportDir +"/extendhelplibrarynavline.gif\"></td>" +

"  </tr>" +



"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibrarynovellwebsite.up.gif\" name=\"extendhelplibrarynovellwebsite\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibrarynovellwebsite.src=\'" + isSupportDir +"/extendhelplibrarynovellwebsite.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibrarynovellwebsite.src=\'" + isSupportDir +"/extendhelplibrarynovellwebsite.up.gif\'\;\"" +
"    onclick=\"window.open(\'http://www.novell.com/\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibrarydeveloperwebsite.up.gif\" name=\"extendhelplibrarydeveloperwebsite\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibrarydeveloperwebsite.src=\'" + isSupportDir +"/extendhelplibrarydeveloperwebsite.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibrarydeveloperwebsite.src=\'" + isSupportDir +"/extendhelplibrarydeveloperwebsite.up.gif\'\;\"" +
"    onclick=\"window.open(\'http://developer.novell.com/solutions/extend\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" width=200 height=20>" +

"    <img src=\"" + isSupportDir +"/extendhelplibrarydocumentationwebsite.up.gif\" name=\"extendhelplibrarydocumentationwebsite\" border=\"0\" " +
"    onmouseover=\"document.images.extendhelplibrarydocumentationwebsite.src=\'" + isSupportDir +"/extendhelplibrarydocumentationwebsite.over.gif\'\; return true\" " +
"    onmouseout=\"document.images.extendhelplibrarydocumentationwebsite.src=\'" + isSupportDir +"/extendhelplibrarydocumentationwebsite.up.gif\'\;\"" +
"    onclick=\"window.open(\'http://www.novell.com/documentation/exteNd.html\', \'_blank\')\;\">" +

"    </td>" +

"  </tr>" +

"  <tr>" +

"    <td class=\"tablecellsuitelinks\" height=6><img src=\"" + isSupportDir +"/extendhelplibraryspacer.gif\"></td>" +

"  </tr>" +

"</table>" +

"</div>" ;


}

document.write(isBrand);






//***********************************************************************************
//***********************************************************************************
// End of JavaScript code -->
