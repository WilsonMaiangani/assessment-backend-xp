import ('./api/consummer');
import ('./messageBox');

$(document).ready(function() {

    $("#btnSave").click(function() {

        let categoryName = $.trim($("#txtCategoryName").val());
        let categoryCode = $.trim($("#txtCategoryCode").val());

        if (categoryName == '' && categoryCode == '') {
            $(".limpar-erro").html("Por favor,preencha este campo nome obrigatorio");
            MessageBoxErro("Por favor,preencha este campo nome obrigatorio");
        } else {
            $(".limpar-erro").html("");
            if (categoryName == '') {
                $("#lblName").html("Por favor,preencha este campo nome obrigatorio");
                MessageBoxErro("Por favor,preencha este campo nome obrigatorio");
            } else if (categoryCode == '') {
                $("#lblCode").html("Por favor,preencha este campo nome obrigatorio");
                MessageBoxErro("Por favor,preencha este campo nome obrigatorio");
            } else if (categoryName != '' && categoryCode != '') {

                if ($("#btnSave").val() == "Save") {
                    let method = "add";
                    let data = {
                        "Category": [{
                            "name": categoryName,
                            "code": categoryCode
                        }]
                    }

                    let value = "...";
                    const GetData = async() => {
                        value = await Consummer(method, data);

                        if (value.status.result.codigoStatus == 200) {
                            MessageBoxConcluido("Cadastro Concluido");
                            $("#txtCategoryName").val("");
                            $("#txtCategoryCode").val("");
                            GetTable();
                        }
                    }
                    GetData();
                } else if ($("#btnSave").val() == "Update") {
                    let method = "update";
                    let data = {
                        "Category": [{
                            "name": categoryName,
                            "code": categoryCode,
                            "parms": {
                                "camp": "id",
                                "value": idCategory
                            }
                        }]
                    }

                    const Update = async() => {
                        let value = await Consummer(method, data);

                        if (value.status.result.codigoStatus == 200) {
                            MessageBoxConcluido("Registros atualizados com sucesso");
                            $("#txtCategoryName").val("");
                            $("#txtCategoryCode").val("");
                            $("#btnSave").val("Save");
                            GetTable();
                        }
                    }
                    Update();
                }

            }
        }
    })

    let idCategory = 0;
    $(document).on("click", "#btnDelete", function() {
        idCategory = $(this).val();
        $("#modalDelete").modal("show");
    })

    $("#btnConfirmDelete").click(function() {
        if (idCategory > 0) {

            const DeleteData = async() => {
                let method = "delete";
                let data = {
                    "Category": {
                        "camp": "id",
                        "value": idCategory
                    }
                }
                let value = await Consummer(method, data);

                if (value.status.result.codigoStatus == 200) {
                    $("#modalDelete").modal("hide");
                    MessageBoxConcluido("Registro deletado com sucesso.");
                    GetTable();
                }
            }
            DeleteData();
            // console.log("Delete");
            // $("#modalDelete").modal("hide");
            // MessageBoxConcluido("Registro deletado com sucesso.");
        }

    })

    const GetTable = async() => {
        let method = "select";
        let data = {
            "Category": {}
        }
        let value = await Consummer(method, data);

        if (value.data.Category.status.result.codigoStatus == 200) {
            const table = document.querySelector("#dataGridView");
            table.innerHTML = "";
            let tags = "";
            let data = value.data.Category.data;
            if (data.length > 0) {
                data.forEach(item => {

                    tags +=
                        `<tr> 
                          <td>${item.name} </td> 
                          <td>${item.code}</td> 
                          <td width="5%">
                          <center><button class="btn" style=" background: transparent;" id="btnUpdate" value="${item.id}"><b><img src="../../img/icon/icons8_edit_25px.png" alt=""></b></button></center>
                          </td> 
                          <td width="5%">
                          <center><button class="btn" style=" background: transparent;" id="btnDelete" value="${item.id}"><b><img src="../../img/icon/icons8_delete_bin_25px.png" alt=""></b></button></center>
                          </td>
                        </tr>`;
                });
                table.innerHTML += tags;
                tags = "";
            }
        }
    }
    GetTable();

    const GetDataFilter = async() => {
        let method = "select";
        let data = {
            "Category": {}
        }
        let value = await Consummer(method, data);

        if (value.data.Category.status.result.codigoStatus == 200) {
            const table = document.querySelector("#dataGridView");
            table.innerHTML = "";
            let tags = "";
            let data = value.data.Category.data;
            if (data.length > 0) {
                data.forEach(item => {

                    tags +=
                        `<tr> 
                       <td>${item.name} </td> 
                       <td>${item.code}</td> 
                       <td width="5%">
                       <center><button class="btn" style=" background: transparent;" id="btnUpdate" value="${item.id}"><b><img src="../../img/icon/icons8_edit_25px.png" alt=""></b></button></center>
                       </td> 
                       <td width="5%">
                       <center><button class="btn" style=" background: transparent;" id="btnDelete" value="${item.id}"><b><img src="../../img/icon/icons8_delete_bin_25px.png" alt=""></b></button></center>
                       </td>
                     </tr>`;
                });
                table.innerHTML += tags;
                tags = "";
            }
        }
    }
    $(document).on("click", "#btnUpdate", function() {
        idCategory = $(this).val();
        $("#btnSave").val("Update");

        const GetDataFilter = async() => {
            let method = "select";
            let data = {
                "Category": {
                    "filter": "where",
                    "parms": {
                        "camp": "id",
                        "value": idCategory
                    }
                }
            }
            let value = await Consummer(method, data);

            if (value.data.Category.status.result.codigoStatus == 200) {
                let data = value.data.Category.data;
                if (data.length > 0) {
                    data.forEach(item => {

                        $.trim($("#txtCategoryName").val(item.name));
                        $.trim($("#txtCategoryCode").val(item.code));
                    });
                }
            }
        }

        if (idCategory > 0) {
            GetDataFilter();
        }
    })
})