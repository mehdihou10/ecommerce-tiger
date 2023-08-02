//select elements
let cards = document.querySelectorAll(".our-products .card");
let productsImages = document.querySelectorAll(".our-products .card img");
let productsPrices = document.querySelectorAll(".our-products .card .card-body span");
let productsTitles = document.querySelectorAll(".our-products .card .card-body h4");
let alertSaved = document.querySelector(".using-alert");
// window.localStorage.clear()

//add information link as an icon for every card
cards.forEach(card =>{

    //create product options
    let links = document.createElement("div");
    links.className = "links d-flex justify-content-center g-20 my-4";

    //show informations link
    let add = document.createElement("a");
    add.href = "order.html";
    add.className = "product-information btn btn-primary";
    add.innerHTML = "<i class=\"fa-solid fa-plus\"></i>";
    links.append(add);

    //add to wishlist
    let save = document.createElement("span");
    save.innerHTML = "<i class=\"fa-regular fa-bookmark\"></i>";
    save.className = "btn btn-danger";
    links.append(save);

    //append links to card
    card.append(links);
});

//get all information links
let orderLinks = document.querySelectorAll(".our-products .card .product-information");
let saveLinks = document.querySelectorAll(".our-products .card .links span");
let bookmarks = document.querySelectorAll(".our-products .card .links span i");

//information array
let arrLink = [];

//add product informations in local storage
orderLinks.forEach((link,index) =>{

    link.onclick = ()=>{

        arrLink.push(productsImages[index].src , productsPrices[index].innerHTML , productsTitles[index].innerHTML);

        window.localStorage.setItem("order-product",JSON.stringify(arrLink));
    };
});

//array of saved products
let arrSaved = [];

//get old saved products
let savedProductsStorage = window.localStorage.getItem("saved-products");

if(savedProductsStorage){

    let data = JSON.parse(savedProductsStorage);

    for(let i = 0; i < data.length; i++){

        arrSaved.push(data[i]);

    //get the saved elements and specialize them with solid bookmark

    for(let j = 0; j < productsTitles.length; j++){

        if(data[i].title === productsTitles[j].innerHTML){
            bookmarks[j].classList.remove("fa-regular");
            bookmarks[j].classList.add("fa-solid");
        }
    }
    }

    
}

//save product in local storage by clicking on bookmark
saveLinks.forEach((link,index) =>{

    link.addEventListener("click",(e)=>{

        //stop click event for all buttons
        saveLinks.forEach(btn => btn.classList.add("stop"));

        let icon = e.currentTarget.firstElementChild;

        //add sound after clicking
        document.querySelector("audio").play();

        if(icon.classList.contains("fa-regular")){

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        //save in local storage

        let saveObj = {
            image: productsImages[index].src,
            title: productsTitles[index].innerHTML,
            price: productsPrices[index].innerHTML
        }

        arrSaved.push(saveObj);

        window.localStorage.setItem("saved-products",JSON.stringify(arrSaved));

        //add alert
        alertSaved.innerHTML = "Added To WishList";
        alertSaved.classList.add("alert-success","show");
        alertSaved.classList.remove("alert-warning");

        }

        else{
            
        icon.classList.add("fa-regular");
        icon.classList.remove("fa-solid");

        //add alert
        alertSaved.innerHTML = "Removed From WishList";
        alertSaved.classList.add("alert-warning","show");
        alertSaved.classList.remove("alert-success");

        //delete saved products from local storage
        for(let i = 0; i < arrSaved.length; i++){
            if(productsTitles[index].innerHTML === arrSaved[i].title){
                arrSaved.splice(i,1);
                window.localStorage.setItem("saved-products",JSON.stringify(arrSaved));

            }
        }
        }

        //remove alert + return click event
        setTimeout(()=> {
            alertSaved.classList.remove("show");
            saveLinks.forEach(btn => btn.classList.remove("stop"));

        },3000);

    });
});

