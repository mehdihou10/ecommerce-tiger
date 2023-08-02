//select elements
let savedProducts = document.querySelector(".saved-products .row");

//array of links
let arrLink = [];

//get the data from local storage

let savedLocalStorage = window.localStorage.getItem("saved-products");

if(savedLocalStorage && savedLocalStorage !== "[]"){


    let data = JSON.parse(savedLocalStorage);
    
    //set data on page
    for(let i = 0; i < data.length; i++){

        //create product column
        let product = document.createElement("div");
        product.className = "col-md-6 col-lg-4";

        //create card
        let card = document.createElement("div");
        card.className = "card";

        //create card body
        let cardBody = document.createElement("div");
        cardBody.className = "card-body p-0";

        //create product image
        let img = document.createElement("img");
        img.alt = "product";
        img.src = data[i].image;
        img.className = "img-fluid";
        cardBody.appendChild(img);

        //create product title
        let title = document.createElement("h4");
        title.className = "card-title text-center p-3";
        title.innerHTML = data[i].title;
        cardBody.appendChild(title);


        //create price
        let price = document.createElement("span");
        price.className = "fst-italic fw-bold fs-5 text-center";
        price.innerHTML = data[i].price;
        cardBody.appendChild(price);

        //append card body to card
        card.appendChild(cardBody);

        //create order link
        let orderLink = document.createElement("a");
        orderLink.href = "order.html";
        orderLink.className = "add-link btn btn-primary w-fit mx-auto my-4";
        orderLink.innerHTML = "<i class=\"fa-solid fa-plus\"></i>";

        //append order link to card
        card.appendChild(orderLink);

        //append card to product column
        product.appendChild(card);

        //append product to saved products parent
        savedProducts.appendChild(product);
    }
}

else{
    let p = document.createElement("p");
    p.innerHTML = "Nothing To Show";
    p.className = "text-center text-secondary fs-5 fst-italic";
    savedProducts.after(p);
}

//select elements after creation of products
let productsImages = document.querySelectorAll(".saved-products .row img");
let productsTitles = document.querySelectorAll(".saved-products .row .card-title");
let productsPrices = document.querySelectorAll(".saved-products .row span");
let addLinks = document.querySelectorAll(".saved-products .row .add-link");

//add product informations in local storage
addLinks.forEach((link,index) =>{

    link.onclick = ()=>{

        arrLink.push(productsImages[index].src , productsPrices[index].innerHTML , productsTitles[index].innerHTML);

        window.localStorage.setItem("order-product",JSON.stringify(arrLink));
    };
});

