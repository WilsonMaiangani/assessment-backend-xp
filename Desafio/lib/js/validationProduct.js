import ('./api/consummer');
import ('./messageBox');

$(document).ready(function() {

    $("#btnImg").change(function() {

        const dataFile = $(this)[0].files[0];
        var extensao = dataFile['name'].split('.')[1].toLowerCase();

        if (extensao == 'png' || extensao == 'jpg') {
            const fileReader = new FileReader();
            fileReader.onloadend = function() {
                $('#panelImg').attr('src', fileReader.result)
            }
            fileReader.readAsDataURL(dataFile);
        } else {
            $("#btnImg").val('');
            $('#panelImg').attr('src', '');
        }
    });

    $("#frms").submit(function(e) {
        e.preventDefault();

        let productName = $.trim($("#txtProductName").val());
        let productSku = $.trim($("#txtProductSku").val());
        let productPrice = $.trim($("#txtPrice").val());
        let productQuantity = $.trim($("#txtQuantity").val());
        let productCategory = $.trim($("#listCategory").val());
        let productDescription = $.trim($("#txtDescription").val());
        let productImg = $.trim($("#btnImg").val());

        if (productName == '' && productSku == '' && productPrice == '' && productQuantity == '' && productCategory == '...' && productDescription == '' && productImg == '') {
            $(".limpar-erro").html("Por favor,preencha este campo obrigatorio");
            MessageBoxErro("Por favor,preencha este campo nome obrigatorio");
        } else {
            $(".limpar-erro").html('');

            if (productName == '') {
                $("#lblName").html("Por favor,preencha este campo nome obrigatorio");
            }
            if (productSku == '') {
                $("#lblSku").html("Por favor,preencha este campo nome obrigatorio");
            }
            if (productPrice == '') {
                $("#lblPrice").html("Por favor,preencha este campo nome obrigatorio");
            } else if (productPrice <= 0) {
                $("#lblPrice").html("Preço invalido");
            }
            if (productQuantity == '') {
                $("#lblQuantity").html("Por favor,preencha este campo nome obrigatorio");
            } else if (productQuantity <= 0) {
                $("#lblQuantity").html("Quantidade invalida");
            }
            if (productCategory == '...') {
                $("#lblCategory").html("Por favor,preencha este campo nome obrigatorio");
            }
            if (productDescription == '') {
                $("#lblDescription").html("Por favor,preencha este campo nome obrigatorio");
            }
            if (productImg == '') {
                $("#lblImg").html("Selecione uma img");
            }
            if (productName != '' && productSku != '' && productPrice != '' && productPrice > 0 && productQuantity != '' && productQuantity > 0 && productCategory != '...' && productCategory > 0 && productDescription != '' && productImg != '') {
                let frmData = new FormData(this);
                let idImg = 0;

                function upload(callBack) {
                    $.ajax({
                        url: "../../controllers/upload.php",
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: frmData,
                        type: 'post',
                        success: function(data) {
                            // idImg = data;
                            callBack(data);
                        }
                    });
                }

                if ($("#btnSave").val() == "Save") {
                    upload(_data => {
                        idImg = _data;

                        if (idImg > 0) {
                            add();
                        }
                    })

                    const add = async() => {

                        let method = "add";
                        let data = {
                            "Product": [{
                                "idCategory": idCategory,
                                "idImg": idImg,
                                "name": productName,
                                "sku": productSku,
                                "quantity": productQuantity,
                                "price": productPrice,
                                "description": productDescription
                            }]
                        }

                        let value = await Consummer(method, data);

                        if (value.status.result.codigoStatus == 200) {
                            MessageBoxConcluido("Cadastro Concluido");
                            $("input[id ^= txt]").val("");
                            $("select[id ^= listCategory]").val("...");
                            $("#txtDescription").val("");
                            $("#btnImg").val("");
                            $('#panelImg').attr('src', '');

                            GetTable();
                        }
                    }
                } else if ($("#btnSave").val() == "Update") {

                    upload(_data => {
                        idImg = _data;

                        if (idImg > 0) {
                            update();
                        }
                    })

                    const update = async() => {
                        let method = "update";
                        let data = {
                            "Product": [{
                                "idCategory": idCategory,
                                "idImg": idImg,
                                "name": productName,
                                "sku": productSku,
                                "quantity": productQuantity,
                                "price": productPrice,
                                "description": productDescription,
                                "parms": {
                                    "camp": "id",
                                    "value": idProduct
                                }
                            }]
                        }

                        let value = await Consummer(method, data);

                        if (value.status.result.codigoStatus == 200) {
                            MessageBoxConcluido("Registros atualizados com sucesso");
                            $("input[id ^= txt]").val("");
                            $("select[id ^= listCategory]").val("...");
                            $("#txtDescription").val("");
                            $("#btnImg").val("");
                            $('#panelImg').attr('src', '');
                            $("#btnSave").val("Save");
                            GetTable();
                        }
                    }
                }

            }
        }
    })

    let idCategory = 0;
    $("#listCategory").change(function() {
        idCategory = $(this).val();
    });

    let idProduct = 0;
    $(document).on("click", "#btnDelete", function() {
        idProduct = $(this).val();
        $("#modalDelete").modal("show");
    })

    $("#btnConfirmDelete").click(function() {
        if (idProduct > 0) {

            const DeleteData = async() => {
                let method = "delete";
                let data = {
                    "product": {
                        "camp": "id",
                        "value": idProduct
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
            "Product": {
                "join": {}
            }
        }
        let value = await Consummer(method, data);

        if (value.data.Product.status.result.codigoStatus == 200) {
            const table = document.querySelector("#dataGridView");
            table.innerHTML = "";
            let tags = "";
            let data = value.data.Product.data;
            if (data.length > 0) {
                data.forEach(item => {

                    tags +=
                        `<tr> 
                          <td>${item.name} </td> 
                          <td>${item.sku}</td> 
                          <td>R$${item.price}</td> 
                          <td>${item.quantity}</td> 
                          <td>${item.catename}</td> 
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

    const GetAllCategoty = async() => {
        let method = "select";
        let data = {
            "Category": {}
        }
        let value = await Consummer(method, data);

        if (value.data.Category.status.result.codigoStatus == 200) {
            const table = document.querySelector("#listCategory");
            table.innerHTML = "";
            let tags = "";
            let count = 0;
            let data = value.data.Category.data;
            if (data.length > 0) {

                data.forEach(function(item, index) {

                    if (count == 0) {
                        tags += `<option value="...">...</option>`;
                        tags += `<option value="${item.id}">${item.name}</option>`;
                    } else if (count > 0) { tags += `<option value="${item.id}">${item.name}</option>`; }
                    count++;
                });
                table.innerHTML += tags;
                tags = "";
            }
        }
    }
    GetAllCategoty();
    GetTable();


    $(document).on("click", "#btnUpdate", function() {
        idProduct = $(this).val();
        $("#btnSave").val("Update");

        // let data = {
        //     "Product": {
        //         "filter": "where",
        //         "parms": {
        //             "camp": "id",
        //             "value": idProduct
        //         }
        //     }
        // }

        const GetDataFilter = async() => {
            let method = "select";
            let data = {
                "Product": {
                    "filter": "where",
                    "parms": {
                        "camp": "id",
                        "value": idProduct
                    }
                }
            }
            let value = await Consummer(method, data);
            let dataProduct = value.data.Product.data;
            idCategory = dataProduct[0].idCategory;
            idImg = dataProduct[0].idImg;

            if (idCategory > 0 && idImg > 0) {
                let data = {
                    "Category": {
                        "filter": "where",
                        "parms": {
                            "camp": "id",
                            "value": idCategory
                        }
                    },
                    "Imagem": {
                        "filter": "where",
                        "parms": {
                            "camp": "id",
                            "value": idImg
                        }
                    }
                }

                let value_ = await Consummer(method, data);
                let categoryName = value_.data.Category.data[0].name;
                let imgName = value_.data.Imagem.data[0].name;
                let imgPath = value_.data.Imagem.data[0].path;

                dataProduct.forEach(item => {

                    $.trim($("#txtProductName").val(item.name));
                    $.trim($("#txtProductSku").val(item.sku));
                    $.trim($("#txtPrice").val(item.price));
                    $.trim($("#txtQuantity").val(item.quantity));
                    // $.trim($("#listCategory").val(categoryName));
                    // $.trim($("#btnImg").val(item.description));
                    $.trim($("#txtDescription").val(item.description));
                    $('#panelImg').attr('src', `../../${imgPath}${imgName}`);
                });
                console.log("");;
            }

            console.log("");;




            // if (value.data.Category.status.result.codigoStatus == 200) {
            //     let data = value.data.Category.data;
            //     if (data.length > 0) {
            //         data.forEach(item => {

            //             $.trim($("#txtCategoryName").val(item.name));
            //             $.trim($("#txtCategoryCode").val(item.code));
            //         });
            //     }
            // }
        }

        if (idProduct > 0) {
            GetDataFilter();
        }
    })
})