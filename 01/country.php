<?php
$a = file('database.txt');
$s1 = $_GET['key'] ?? "";

$response="";
if (strlen($s1) > 0)	{
	for($i = 0; $i< count($a); $i++)	{
  		if (strtolower($s1) == strtolower(substr($a[$i],0,strlen($s1))))	{
    		if ($response == "")
      		{
      			$response=$a[$i];
      		}
    		else
      		{
      			$response=$response.";".$a[$i];
      		}
    	}
  	}
}
echo $response;
?>