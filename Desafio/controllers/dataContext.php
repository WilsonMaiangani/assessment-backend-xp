<?php
require_once '../config/conexao.php';
require_once 'statusApi.php';
$conexao = new conexao;

class dataContext
{

 public function Add($table , $listaData = [] )
 {
  if (!conexao::$conex==null)
  {
   $statusApi = new statusApi;
   $camp = "" ;
   $parm = "";
   $list = [];
   $query = "";
   $count = 0;      
   
   for ($i=0; $i < count($listaData) ; $i++,$count++)
   {
    foreach ($listaData[$i] as $key => $item)
    {
     $camp .= "$key,";
     $parm .= ":$key,";     
     $list[$key] = "$item";     
    }

    $camp = substr($camp,0,strlen($camp)-1);
    $parm = substr($parm,0,strlen($parm)-1);
    
    $query = "insert into $table ($camp) values ($parm);";
           
    $cmd = conexao::$conex->prepare($query);
    if ($cmd->execute($list)) 
    {
     $camp = ""; $parm = "";    
     $listId["$table: ".$count] = ["id"=> conexao::$conex->lastInsertId()];                
    }      
   }if($count == count($listaData)) 
   echo json_encode(array("resp" => "Cadastro com sucesso!", "data"=> $listId, "status" => $statusApi->status200() ));      
  }
 }

 public function Del($table , $listaData = [] )
 {
  if (!conexao::$conex==null)
  {
   $statusApi = new statusApi;
   $camp = "" ;
   $value = "";
   $list = [];
   foreach ($listaData as $key => $item)
   {
    if($key == "camp") $camp = $item;
    else if($key == "value") $value = $item;
   }

   $list = ["$camp" => "$value"];

   $query = "delete from $table where $camp = :$camp;";

   $cmd = conexao::$conex->prepare($query);
   if ($cmd->execute($list)) 
   {
    echo json_encode(array("resp" => "Registro eliminado com sucesso!",  "status" => $statusApi->status200() ));      
   } 
      
  }
 }

 public function Upd($table , $listaData = [] )
 {
  if (!conexao::$conex==null)
  {
   $statusApi = new statusApi;
   $camp = "" ;
   $value = "";
   $list = [];
   $count = 0;
   $parm = ""; 
      
   for ($i=0; $i < count($listaData) ; $i++, $count++)
   {
    foreach ($listaData[$i] as $key => $item)
    {          
     if($key != "parms")
     {
      $parm.="$key=:$key,";
      $list[$key] = "$item";
     }
     else if($key == "parms")
     {      
      foreach ($item as $key_ => $item_)
      {
       if($key_ == "camp") { $camp = $item_; $list[$camp] = "$item_"; }                               
       
       else if($key_ == "value") { $value = $item_; $list[$camp] = "$value"; }
      }
     }     
    }

    $parm = substr($parm,0,strlen($parm)-1);
    
    $query = "update $table set $parm where $camp = :$camp;";     
    
    $cmd = conexao::$conex->prepare($query);
    if ($cmd->execute($list))
    { 
     $parm = "";
    }
       
   }if($count == count($listaData)) 
   echo json_encode(array("resp" => "Registros atualizados com sucesso!", "status" => $statusApi->status200() ));      
   
  }
 }

 public function Select($listaData = [] )
 {
  if (!conexao::$conex==null)
  {
   $statusApi = new statusApi;
   $camp = "" ;
   $value = "";
   $parm = "";
   $list = [];
   $data = array();
   $filter = false;

   foreach ($listaData as $key => $value) 
   {
     $table = $key;
              
    if(array_key_exists("join",$value)) 
    {
     $query = 
     "
      select 
      prod.id, prod.name, prod.sku, prod.quantity, prod.price, prod.description,
      cate.name as catename, cate.code,
      img.name as imgname, img.path 
      from product as prod
      left join category as cate on prod.idCategory = cate.id
      left join imagem as img on prod.idImg = img.id;
     ";
    }
    else { $query = "select *from $table;";}
    if(array_key_exists("filter",$value))
    {
     foreach ($value as $key_ => $value_)
     {
      if($key_ == "parms")
      {       
       foreach ($value_ as $_key_ => $_value_)
       {
        if($_key_ == "camp") { $camp = $_value_; $list[$camp] = "$_value_";}                               
        
        else if($_key_ == "value") { $value = $_value_; $list[$camp] = "$value"; }
       }
      }
     }
     $query = "select *from $table where $camp = :$camp;";
     $filter = true;
     
    }
          
     $cmd = conexao::$conex->prepare($query);

     if($filter == false)
     {      
      if ($cmd->execute())
      {
       $result = $cmd->fetchAll(PDO::FETCH_ASSOC);
 
       $data["$table"] = 
       [
         "data"=>$result,
         "totalData" => count($result),
         "status" => $statusApi->status200()
       ];
      }
      else $data["$table"] = ["data"=>"[]", "status" => $statusApi->status400()];
     }

     else if($filter == true)
     {      
      if ($cmd->execute($list))
      {       
       $result = $cmd->fetchAll(PDO::FETCH_ASSOC);       
       $data["$table"] = 
       [
         "data"=>$result,
         "totalData" => count($result),
         "status" => $statusApi->status200()
       ];
      }
      else $data["$table"] = ["data"=>"[]", "status" => $statusApi->status400()];
     }    
   }

   $list = ["data" => $data]; echo json_encode($list);   
  }
 }

 public function execut($query,$listaData = [] )
{
 if (!conexao::$conex==null)
 {
  $statusApi = new statusApi;
  $cmd = conexao::$conex->prepare($query);
  if ($cmd->execute($listaData)) 
  {
   // $result = $cmd->fetchAll(PDO::FETCH_ASSOC);
   $result = conexao::$conex->lastInsertId();
  }else $result = 0;
  // else $result = ["data"=>"[]", "status" => $statusApi->status400()];

  return $result;

 }
}
}


?>