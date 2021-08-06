var addBtn = document.getElementById("addBtn");
var nameInput = document.getElementById("name");
var categoryInput = document.getElementById("category");
var priceInput = document.getElementById("price");
var descInput = document.getElementById("desc");
var products = [];
var input = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("search");
var newind = 0;
var nameAlert=document.getElementById("nameAlert");
var categoryAlert=document.getElementById("categoryAlert");
var priceAlert=document.getElementById("priceAlert");
var descAlert=document.getElementById("descAlert")

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Update") {
        update();
    }
    else {
        addProduct();
    }
    dispayData();
    resetData();
}
function addProduct() {
    var product = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descInput.value,
    }
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
}
if (JSON.parse(localStorage.getItem("productsList") != null)) {
    products = JSON.parse(localStorage.getItem("productsList"));
    dispayData();
}
function dispayData() {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].desc}</td>
            <td><button onclick='deleteItem(${i})' class='btn btn-outline-danger'>Delete</button></td>
            <td><button onclick='updateItem(${i})' class='btn btn-outline-warning'>Update</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = cartona;
}
function resetData() {
    for (var i = 0; i < input.length; i++) {
        input[i].value = ""
    }
}
function deleteItem(index) {
    products.splice(index, 1);
    dispayData();
    localStorage.setItem("productsList", JSON.stringify(products));
}
searchInput.onkeyup = function () {
    var searchValue = searchInput.value;
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].desc}</td>
                <td><button onclick='deleteItem(${i})' class='btn btn-outline-danger'>Delete</button></td>
            <td><button onclick='updateItem(${i})' class='btn btn-outline-warning'>Update</button></td>

            </tr>
            `
        }
        document.getElementById("tableBody").innerHTML = cartona;
    }
}
function updateItem(index) {
    nameInput.value = products[index].name;
    categoryInput.value = products[index].category;
    priceInput.value = products[index].price;
    descInput.value = products[index].desc;
    addBtn.innerHTML = "Update";
    newind = index;
}
function update() {
    var item = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        desc: descInput.value,
    }
    products[newind] = item;
    localStorage.setItem("productsList", JSON.stringify(products));
    addBtn.innerHTML = "Add Product";

}
// validation name input
nameInput.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z\s]{2,20}$/;
    if(!nameRejex.test(nameInput.value)) {//!true=false
        addBtn.disabled="true";
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none");
    }
    else{
        addBtn.removeAttribute("disabled");
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    }
}
//validation category input
categoryInput.onkeyup=function(){
    var categoryRejex=/^[\w\s]{2,15}$/

    if(!categoryRejex.test(categoryInput.value)){
        //false
        addBtn.disabled="true";
        categoryInput.classList.add("is-invalid");
        categoryInput.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none");
    }
    else{
        //true
        addBtn.removeAttribute("disabled");
        categoryInput.classList.add("is-valid");
        categoryInput.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none");
    }
}
//validation price input
priceInput.onkeyup=function(){
    var priceRejex=/^[^0][0-9]{0,3}[,]*[0-9]*$/gm;
    if(!priceRejex.test(priceInput.value)){
        //false
        addBtn.disabled="true";
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        priceAlert.classList.remove("d-none");
    }
    else{
        //true
        addBtn.removeAttribute("disabled");
        priceInput.classList.add("is-valid");
        priceInput.classList.remove("is-invalid");
        priceAlert.classList.add("d-none");


    }
}
//validation description input
descInput.onkeyup=function(){
    var descRejex=/^[a-z]{2,100}$/
    if(!descRejex.test(descInput.value)){
        //false
        addBtn.disabled="true";
        descInput.classList.add("is-invalid");
        descInput.classList.remove("is-valid");
        descAlert.classList.remove("d-none");
    }
    else{
        addBtn.removeAttribute("disabled");
        descInput.classList.add("is-valid");
        descInput.classList.remove("is-invalid");
        descAlert.classList.add("d-none");


    }
}
