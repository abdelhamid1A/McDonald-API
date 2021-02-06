async function getMenu() {
    var doc = await axios.get('http://localhost:3000/all');
    var data = doc.data;
    document.getElementById('menu').innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var stringTemp = `
                <div class="item" id="cat">
                    <img src="../image/nav_full_menu_160x160_.jpg" alt="">
                    <span class="title">${data[i].catName} </span>
                    <button onclick="getOne('${data[i]._id}')" class="arrow">></button>

                </div>
              
            `

        document.getElementById('menu').innerHTML += stringTemp;


    }

}

async function getOne(id) {
    //    body={categoryParent:id};
    //   console.log(body)
    var doc = await axios.get('http://localhost:3000/' + id);
    var data = doc.data;
    //    console.log(data);
    document.getElementById('menu').innerHTML = `<button onclick="getMenu()"><--</button>`
    for (let i = 0; i < data.length; i++) {
        var stringTemp = `
                <div class="item" id="cat">
                    <img src="../image/nav_full_menu_160x160_.jpg" alt="">
                    <span class="title">${data[i].sousCatName} </span>
                    <button onclick="getProducts('${data[i]._id}')" class="arrow">></button>

                </div>
              
            `
        document.getElementById('menu').innerHTML += stringTemp;


    }

}
// async function sendData() {
//     var name  = document.getElementById('name').value;
//     body ={name:name}
//     var doc = await axios.post('http://localhost:3000/senddata',body)

// }

async function getProducts(id) {
    var doc = await axios.get('http://localhost:3000/products/' + id);
    // console.log(doc);
    var data = doc.data;
    document.getElementById('products').innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        var stringTemp = `
        <div class="col-md-4 d-flex justify-content-center products">
        
            <div class="item " onclick="hello('${data[i]._id}')">
                <img src="../image/nav_full_menu_160x160_.jpg" alt="" class="d-flex img-fluid">
                <span class="title d-flex justify-content-center">${data[i].productName}</span>
                <span class="title d-flex justify-content-center">${data[i].productPrice} DH</span>
            </div>
        
    </div>
              
            `
        document.getElementById('products').innerHTML += stringTemp;


    }

}

async function hello(id) {
    console.log(id);
    var doc = await axios.get('http://localhost:3000/product/' + id);
    
    var data = doc.data[0];
    // console.log(tables);
    document.getElementById('products').innerHTML = "";
    // for (let i = 0; i < data.length; i++) {
        getFreeTables()
        var stringTemp = `
        <div class="col-md-6  d-flex justify-content-center products shadow-lg p-3 mb-5 bg-white rounded">
                    
                        <div class="item " style="text-align: center;">
                            <img src="../image/nav_full_menu_160x160_.jpg" alt="" class="">
                            <div >
                                <p>${data.productName}</p>
                                <button class="btn btn-warning" id="price">${data.productPrice}</button><br>
                                <input type="hidden" value="${data.productPrice}" id="originPrice">
                                <span >${data.ingredien[0].elements}</span><br>
                                <input type="number" name="" id="qte" value="1" min="1" onchange="total()"><br>
                                table number
                                <select name="" id="tableSelect" class="mt-2">
                               
                                </select><br>
                                <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setDataInModal()">commande</button><br>
                            </div>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">invoice</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <label for="mQty" class="form-label">quantity</label>
                                <input type="text" class="form-control" id="mQty" aria-describedby="emailHelp" readonly>
                                <label for="mTotal" class="form-label">Total</label>
                                <input type="text" class="form-control" id="mTotal" aria-describedby="emailHelp" readonly>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    
                </div>   
            `

        document.getElementById('products').innerHTML += stringTemp;


    // }
}

async function getFreeTables(){
    var freeTable = await axios.get('http://localhost:3000/table/getfree');
    var tables = freeTable.data;
    for (let i = 0; i < tables.length; i++) {
        var option = `<option>${tables[i].tableNumber}</option>`
       document.getElementById('tableSelect').innerHTML += option 
    }
}

function total(){
    console.log("change");
    var price = document.getElementById('originPrice').value;
    var qte = document.getElementById('qte').value;
    var total = price * qte;
    console.log(price);
    console.log(total);
    document.getElementById('price').innerHTML = total

}
function setDataInModal(){
    var price = document.getElementById('mTotal');
    var qte = document.getElementById('mQty');
    price.value = document.getElementById('price').textContent
    qte.value = document.getElementById('qte').value
}