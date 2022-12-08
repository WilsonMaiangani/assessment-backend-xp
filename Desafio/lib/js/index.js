import ('./api/consummer');

$(document).ready(function() {

    const GetTable = async() => {
        let method = "select";
        let data = {
            "Product": {
                "join": {}
            }
        }
        let value = await Consummer(method, data);

        if (value.data.Product.status.result.codigoStatus == 200) {
            const table = document.querySelector("#listProduct");
            const infor = document.querySelector("#infor");
            table.innerHTML = "";
            infor.innerHTML = "";

            let tags = "";
            let tagsImng = "";
            let data = value.data.Product.data;
            let totalData = value.data.Product.totalData;
            if (data.length > 0) {
                data.forEach(item => {
                    tags += ` 
                    <li id="listProduct"> 
                      <div class="product-image">
                      <img src="../../${item.path}${item.imgname}" id="productImg" layout="responsive" width="164" height="145" alt="Tênis Runner Bolt" />
                     </div>
                     <div class="product-info">
                      <div class="product-name" id="productName"><span>${item.name}</span></div>
                      <div class="product-price"><span class="special-price"></span><span id="productPrice">R$${item.price}</span> </div>
                     </div>
                    </li>
                    `;
                });
                table.innerHTML += tags;
                infor.innerHTML = `You have ${totalData} products added on this store:`;
                tags = "";
            }
        }
    }

    GetTable();

})