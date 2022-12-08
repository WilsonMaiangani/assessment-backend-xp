<?php
class conexao
{
 private static $server = "";
 private static $user = "";
 private static $password = "";
 private static $database = "";
 private static $port = "";
 public static $conex;

 function __construct()
 {
  $this->setDataConexao();
 }

private function setDataConexao()
{
  $data = $this->getDataConexao();
  
  foreach ($data as $key => $value) 
  {   
   self::$server = $value["server"];
   self::$user = $value["user"];
   self::$password = $value["password"];
   self::$database = $value["database"];
   self::$port = $value["port"];
  }

  try 
  {
   self::$conex = new PDO ("mysql:host=".self::$server.";dbname=".self::$database.";charset=utf8;",self::$user,self::$password);
  } 
  catch (PDOException $ex) 
  {
   echo 'error to conexion';
  }
}
 private function getDataConexao()
 {  
  $dir = dirname(__FILE__);
  $jsondata = file_get_contents($dir . "/" . "dbConfig");
  return json_decode($jsondata,true);
 }
}
?>