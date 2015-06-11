<?php

	
	$output = system('node getTodayList.js', $retval);
	
	$output = system('node getArticleFromList.js', $retval);

	
?>