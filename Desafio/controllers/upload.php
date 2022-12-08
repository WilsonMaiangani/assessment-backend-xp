<?php
if(isset($_FILES['btnImg']) && !empty($_FILES['btnImg']) )
{
 require_once 'dataContext.php';

 $dataContext = new dataContext;

 $path = "img/upload/";
 $listFormt = array('png','PNG','jpg','JPG');
 $name = $_FILES['btnImg']['name'] ;
 $list = explode('.',$name);
 $extensa = strtolower(end($list));

 if(in_array($extensa,$listFormt))
 {
  $name = $list[0].'-'.uniqid('',true).".".$extensa;
  
  $query = "insert into Imagem (name,path) values (:name,:path);";
  $data = ["name"=>$name,"path"=>$path];

  $id = $dataContext->execut($query,$data);

  if($id > 0)
  {
   if(move_uploaded_file($_FILES['btnImg']['tmp_name'],'../'.$path.$name))
    echo $id;
  }
 }

}

?>