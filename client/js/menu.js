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
    document.getElementById('menu').innerHTML = `<button onclick="getMenu()" class="back"><--</button>`
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
                                <button class="btn btn-warning" id="price">${data.productPrice} DH</button><br>
                                <input type="hidden" value="${data.productPrice}" id="originPrice">
                                <span >${data.ingredien[0].elements}</span><br>
                                <input type="number" name="" id="qte" value="1" min="1" onchange="total()"><br>
                                <span class="table">table number</span>
                                <select name="" id="tableSelect" class="mt-2">
                               
                                </select><br>
                                <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setDataInModal()">commande</button><br>
                            </div>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">invoice</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" id="btnClose" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <label for="mQty" class="form-label " id="qteLabel" >quantity</label>
                                <input type="text" class="form-control" id="mQty" aria-describedby="emailHelp" readonly>
                                <label for="mTotal" class="form-label">Total</label>
                                <input type="text" class="form-control" id="mTotal" aria-describedby="emailHelp" readonly>
                                <label for="code" class="form-label" id="codeLabel">your Code</label>
                                <input type="text" class="form-control" id="code" aria-describedby="emailHelp" placeholder="if you have a code "  onkeyup="getPoints()" >
                                <span id="pts"></span>
                                <div id="usingPoints"></div>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                  <button type="button" class="btn btn-primary"  id="sendBtn" onclick="ordered('${data._id}')">ordered</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    
                </div>   
            `

    document.getElementById('products').innerHTML += stringTemp;
    changeLan()


    // }
}

async function getFreeTables() {
    var freeTable = await axios.get('http://localhost:3000/table/getfree');
    var tables = freeTable.data;
    for (let i = 0; i < tables.length; i++) {
        var option = `<option>${tables[i].tableNumber}</option>`
        document.getElementById('tableSelect').innerHTML += option
    }
}

function total() {
    console.log("change");
    var price = document.getElementById('originPrice').value;
    var qte = document.getElementById('qte').value;
    var total = price * qte;
    console.log(price);
    console.log(total);
    document.getElementById('price').innerHTML = total

}
function setDataInModal() {
    var price = document.getElementById('mTotal');
    var qte = document.getElementById('mQty');
    price.value = document.getElementById('price').textContent
    qte.value = document.getElementById('qte').value
}
// random code 
function randomCode(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

console.log(
    randomCode(1, 9999)
)


async function getPoints() {
    var code = document.getElementById('code').value;
    var doc = await axios.get('http://localhost:3000/order/getPoints/' + code);
    const data = doc.data;
    var points = data.points;
    if (points) {
        document.getElementById('pts').innerHTML = "your points is : <span id='pt'>" + points + "</span> DH you can use";
        document.getElementById('usingPoints').innerHTML = `
        <label for="usePoints" class="form-label">how mutch points want to use</label>
        <input type="text" class="form-control" id="usePoints" aria-describedby="emailHelp" placeholder="if you have a code "  onkeyup="comparePoints()" >
        <span id="errMessage"></span>`;
    } else {
        document.getElementById('pts').innerHTML = "";
        document.getElementById('usingPoints').innerHTML = "";

    }
}

function comparePoints() {
    var MyPoints = document.getElementById('pt').textContent;
    console.log(typeof (MyPoints))
    MyPoints = parseInt(MyPoints)
    var usePoints = document.getElementById('usePoints').value;
    var message = document.getElementById('errMessage');
    var btn = document.getElementById('sendBtn');

    if (usePoints != "") {
        if (usePoints > MyPoints) {
            console.log('no');
            message.innerHTML = 'you can\'t use more than ' + MyPoints;
            message.style.color = 'red';
            btn.setAttribute("disabled", true);
        }
        else {
            console.log('yes');
            message.innerHTML = "";
            btn.removeAttribute("disabled");

        }
    }



}


async function ordered(id) {

    var qte = parseInt(document.getElementById('mQty').value);
    var usePoints = document.getElementById('usePoints');
    var code = document.getElementById('code').value;
    var tableSelect = document.getElementById('tableSelect').value;
    console.log(tableSelect);
    if (usePoints) {
        usePoints = usePoints.value
        if (usePoints > 0) {
            usePoints = parseInt(usePoints)
            console.log(usePoints);
        }

    } else {

        console.log('no');
    }
    // return;
    body = { id: id, qte: qte, usePoints: usePoints, code: code, tableSelect: tableSelect }
    const productPrice = await axios.post('http://localhost:3000/order/setOrder', body);
    const client = productPrice.data.client;
    console.log(client);
    document.querySelector('#btnClose').click()
    var message = `<div class="alert alert-success p-3 d-flex justify-content-center" >
    Your order is confirmed :)
  </div>`
  document.getElementById('products').innerHTML = message
}


function changeLan() {
    var langElem = document.querySelector('.langElem');
    var lang = document.querySelectorAll('.lang');

    var table = document.querySelector('.table')
    var qteLabel = document.querySelector('#qteLabel')
    var codeLabel = document.querySelector('#codeLabel')
    // localStorage.setItem('lang', "english")
    var storageLan = localStorage.getItem('lang');

    // console.log(storageLan)
    langElem.addEventListener('click', (e) => {
        var lg = e.target.getAttribute('language');
        langElem.querySelector('.active').classList.remove('active');
        e.target.classList.add('active')
        localStorage.setItem('lang', lg)
        storageLan = localStorage.getItem('lang');
        console.log(storageLan)
        setData(storageLan)
    })

    setData(storageLan)
    function setData(lan) {
        var data = {
            "english": {
                "table": "table number ",
                "qte": "Quantity",
                "code": "your code"

            },
            "francais": {
                "table": "numero de table ",
                "qte": "Quantite",
                "code": "votre code"
            }
        }

        table.textContent = data[lan].table
        qteLabel.textContent = data[lan].qte
        codeLabel.textContent = data[lan].code


    }
}