<?php 
class statusApi
{
 private $resposta = 
 [
   'status' => "...",
   "result" => []
 ];

 public function status200()
 {
  $this->resposta['status'] = "Ok";
  $this->resposta['result'] =
  [
   "codigoStatus"=> "200",
   "mesagem"=> "Requisição foi bem sucedida."
  ]; 
  return $this->resposta;
 }
 
 public function status400()
 {
  $this->resposta['status'] = "Bad Request";
  $this->resposta['result'] =
  [
   "codigoStatus"=> "400",
   "mesagem"=> "O servidor não consegue atender está requisição",
   "outros"=> "A requisição pode estar com erro de sintaxe."
  ]; 
  return $this->resposta;
 }


}
?>