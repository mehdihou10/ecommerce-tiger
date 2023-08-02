//select elements
let tableBody = document.querySelector(".products-list .container table tbody");
let cardCopy = document.querySelector("header .card-list");

//create list or order
let listLocalStorage = window.localStorage.getItem("order-list");

let arr;

if(listLocalStorage && listLocalStorage !== "[]"){

    let data = JSON.parse(listLocalStorage);
    arr = data;

    for(let i = 0; i < data.length; i++){
        
        //create a tr
        let tr = document.createElement("tr");

        //create product details
        let productDetails = document.createElement("td");

        let img = document.createElement("img");

        img.src = data[i].image;
        img.alt = "product";

        productDetails.appendChild(img);

        let name = document.createElement("span");
        name.className = "name fs-14";
        name.innerHTML = data[i].name;

        productDetails.appendChild(name);

        //append product details to tr
        tr.appendChild(productDetails);

        //create size
        let size = document.createElement("td");
        size.className = 'size';

        let sizeSpan = document.createElement("span");
        sizeSpan.className = "btn btn-secondary";
        sizeSpan.innerHTML = data[i].size;

        size.appendChild(sizeSpan);

        //append size to tr
        tr.appendChild(size);

        //create quantity
        let quantity = document.createElement("td");

        let quantitySpan = document.createElement("span");
        quantitySpan.className = "quantity";
        quantitySpan.innerHTML = data[i].quantity;

        quantity.appendChild(quantitySpan);

        //append quantity to tr
        tr.appendChild(quantity);

        //create total
        let total = document.createElement("td");
        total.className = "total";

        let totalNumber = quantitySpan.innerHTML * data[i].price.slice(1);

        total.innerHTML = "$" + totalNumber;

        //append total to tr
        tr.appendChild(total);

        //create remove button
        let remove = document.createElement("td");
        remove.className = "remove";

        let removeSpan = document.createElement("span");
        removeSpan.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
        remove.appendChild(removeSpan);

        //append remove button to tr
        tr.appendChild(remove);

        //append tr to tbody
        tableBody.appendChild(tr);
    }
}

else{
    addMessage();
}


//select elements after creating
let removeParent = document.querySelectorAll(".products-list table .remove span");
let productsNames = document.querySelectorAll(".products-list table .name");
let productsSizes = document.querySelectorAll(".products-list table .size span");

//remove tr by clicking on remove button
removeParent.forEach((btn,index) =>{

    btn.addEventListener("click",()=>{

        //remove from local storage
        for(let i = 0; i < arr.length; i++){
    
            if(arr[i].name === productsNames[index].innerHTML && arr[i].size === productsSizes[index].innerHTML){
    
                arr.splice(i , 1);

            }
    
        }


    
        window.localStorage.setItem("order-list",JSON.stringify(arr));


        //remove from page
        btn.parentElement.parentElement.remove();

    });
});


//set the new number of ordered products after clicking on remove button
removeParent.forEach(btn =>{

    btn.addEventListener("click",()=>{

    //in page:
    cardCopy.lastElementChild.innerHTML--;

    //in local storage
    window.localStorage.setItem("products-number",cardCopy.lastElementChild.innerHTML);
    

    });

});

//add paragraph message when all products are deleted
removeParent.forEach(btn =>{

    btn.addEventListener("click",()=>{

        if(tableBody.innerHTML === ""){
            addMessage();
        }
    });
});

//function of: add message when there is no products + delete checkout button
function addMessage(){
    let p = document.createElement("p");
    p.innerHTML = "Nothing To Show";
    p.className = "d-block text-secondary text-center mt-3 fs-6 fst-italic";

    tableBody.parentElement.parentElement.after(p);
    document.querySelector(".products-list > a").classList.add("d-none");
}