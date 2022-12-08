 <div class="wrapper d-flex align-items-stretch">
  <?php include '../include/dashboard.php'  ?>

  <div id="content" class="p-4 p-md-5">
   <?php include '../include/headDashbord.php'  ?>

   <section id="">
    <div class="row">
     <div class="col-lg-6">
      <div class="detalhe-area">
       <h4>New Category</h4>
       <form action="">
        <div class="row">
         <div class="col-lg-8 col-md-6">
          <div class="form-group">
           <label for="">Category Name: </label>
           <span class="limpar-erro" id="lblName" style="color: red;"></span>
           <input type="text" class="form-control" id="txtCategoryName">
          </div>
          <div class="form-group">
           <label for="txt">Category Code: </label>
           <span class="limpar-erro" id="lblCode" style="color: red;"></span>
           <input type="text" class="form-control" id="txtCategoryCode">
           <img src="" alt="" id="btn-chave" style="cursor: pointer;">
          </div>

          <div class="form-group">

           <input type="button" value="Save" class="btn" id="btnSave" style="cursor:pointer;">

          </div>
         </div>
        </div>
       </form>
      </div>
     </div>
     <div class="col-lg-6">
      <div class="row">
       <div class="form-group">
        <div class="">
         <label for="txt-nomeUsuario">Pesquisar: </label>

        </div>
       </div>
       <button class="btn" style=" background: transparent;" id="btn-pesquisar" value=""><b><img src="" alt=""></b></button>
       <button class="btn" style=" background: transparent;" id="btn-home-tabela" value=""><b><img src="" alt=""></b></button>

       <div class="table-responsive">
        <div class="">
         <table class="table table-hover">
          <thead>
           <tr>
            <th>Name</th>
            <th>Code</th>
            <th colspan="2">
             <center>Actions</center>
            </th>
           </tr>
          </thead>
          <tbody id="dataGridView">

          </tbody>
         </table>
        </div>
       </div>

      </div>
     </div>

    </div>
   </section>
  </div>

  <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
   <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
     <div class="modal-header">
      <img src="../../img/icon/icons8_delete_bin_25px.png" alt="" id="img-modal-concluir">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
     </div>
     <div class="modal-body">
      <h5 id="lbl-titulo" class="lbl-titulo">Delete</h5>
      <p id="lbl-texto" class="lbl-texto">Tem certeza de que deseja deletar o "registro" </p>
      <span class="lbl-erro-novo-alectivo" style="color: red;"></span>
     </div>
     <div class="modal-footer lista-btn">
      <button type="button" class="btn btn-xd btn-danger btn-sm" data-dismiss="modal" id="btn">Abortar</button>
      <button type="button" class="btn btn-xd btn-sucess btn-sm " id="btnConfirmDelete">Excluir</button>
     </div>
    </div>
   </div>
  </div>



  <script src="../../lib/js/jquery-3.3.1.min.js"></script>
  <script src="../../lib/bootstrap/js/bootstrap.min.js"></script>
  <script src="../../lib/js/sidebar.js"></script>
  <script src="../../lib/jquery-toast/js/jquery.toast.js"></script>
  <script src="../../lib/js/api/consummer.js"></script>
  <script src="../../lib/js/messageBox.js"></script>
  <script src="../../lib/js/validationCategory.js"></script>