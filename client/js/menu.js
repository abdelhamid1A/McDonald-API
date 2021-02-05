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

function hello(id) {
    console.log(id);
}