<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/dataContext.php';
require_once '../controllers/statusApi.php';

$dataContext = new dataContext;
$statusApi = new statusApi;

$methodRequest = strtolower($_SERVER["REQUEST_METHOD"]);

if(!empty($methodRequest) && $methodRequest == "post")
{
 $jsonData = json_decode(file_get_contents("php://input"), true);  

 $obj = "";
 $objValue = "";
 $method = "";
 $methodValue = "";
 $data = array();
 $tables = array();
 $dataSerch = array();
 

 if (!empty($jsonData))
 {
  foreach ($jsonData as $key => $value)
  {
   if(trim($key) == "obj" || trim($key) == "OBJ") $obj = addslashes(strtolower($key)); $objValue = $value;
  }

  if($obj == "obj")
  {
   foreach ($objValue as $key => $value)
   {
    if(trim($key) == "method")
    {
     $method = addslashes(strtolower($key));
     // if(trim($value) == "show") $methodValue = addslashes(strtolower($value));
     $methodValue = addslashes(strtolower($value));
    }
    if(trim($key) == "data") $data[] = $value;   
   }

   if(!empty($method) && $method == "method")
   {    
    if($methodValue == "add")
    {       
     foreach ($data as $key => $value) 
     {
      foreach ($value as $key_ => $value_) { $tables = $key_; $values = $value_;  }
     }     
     $dataContext->Add($tables,$values);          
    } 

    else if($methodValue == "select")
    {
     if(!empty($data))
     {
      foreach ($data as $key => $value) { $values = $value;  } 
      $dataContext->Select($values);    
     }
    }

    else if($methodValue == "delete")
    {     
     foreach ($data as $key => $value) 
     {
      foreach ($value as $key_ => $value_) { $tables = $key_; $values = $value_;  }
     }
     $dataContext->Del($tables,$values);
    }

    else if($methodValue == "update")
    {
     foreach ($data as $key => $value) 
     {
      foreach ($value as $key_ => $value_) { $tables = $key_; $values = $value_;  }
     }

     $dataContext->Upd($tables,$values);
    }
    
   }

  }else if($obj != "obj" || empty($obj)) echo json_encode(array("resp" => "A raiz do json deve conter a palavra obj ", "status" => $statusApi->status400() ));
  
 }else echo json_encode(array("resp" => "Obrigatorio enviar um Body json", "status" => $statusApi->status400() ));

}else echo json_encode(array("resp" => "Para as requisições o método requisitado é post", "status" => $statusApi->status200() ));
?>