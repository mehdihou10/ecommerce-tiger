/*---------------------start header----------------------*/

//select Elements
let logo = document.querySelector("header .logo");
let nav = document.querySelector("header ul");
let navElements = document.querySelectorAll("header ul li a");
let bars = document.querySelector("header .bars");
let deleteNav = document.querySelector("header ul .fa-xmark");
let shoppingLi = document.querySelector("header ul .special-li");
let shoppingList = document.querySelector("header ul .special-li .shopping");
let productsHead = document.querySelector("header .container .special-li .shopping span:first-child");
let listHead = document.querySelector("header .container .special-li .shopping span:nth-child(2)");
let checkoutHead = document.querySelector("header .container .special-li .shopping span:nth-child(3)");
let wishlistHead = document.querySelector("header .container .special-li .shopping span:last-child");
let card = document.querySelector("header .card-list");


//add logo img
let logoImg = document.createElement("img");
logoImg.alt = "logo";
logoImg.src = "images/logo.png";

logo.prepend(logoImg);


//show nav by click on bars + change style of shopping card
bars.onclick = ()=>{
    nav.classList.add("show-ul");
    card.classList.add("change-card");
};

//hide nav by click on xmark + return the main style of shopping card
deleteNav.onclick = ()=>{

    nav.classList.remove("show-ul");
    card.classList.remove("change-card");
};

//show shopping features by click (only small devices)
if(window.innerWidth <= 991){

    shoppingLi.onclick = ()=> shoppingList.classList.toggle("show");
}

//change page location
productsHead.onclick = ()=> window.location.href = "products.html";
listHead.onclick = ()=> window.location.href = "list.html";
card.onclick = ()=> window.location.href = "list.html";
checkoutHead.onclick = ()=> window.location.href = "checkout.html";
wishlistHead.onclick = ()=> window.location.href = "wishlist.html";

//get the number of ordered products
let productsNumberStorage = window.localStorage.getItem("products-number");

if(productsNumberStorage) card.lastElementChild.innerHTML = productsNumberStorage;


/*---------------------end header----------------------*/

/*---------------------start last news----------------------*/

//select elements
let newsParagraphs = document.querySelectorAll(".last-news p");

//change the main news automaticly
let indexNews = 0;
setInterval(()=>{

    //go to the next news
     indexNews++;

     //return to the first news after finishing all news
     if(indexNews === newsParagraphs.length){
        indexNews = 0;
    }

    //change active(main) news
    newsParagraphs.forEach(p => p.classList.remove("active"));

    newsParagraphs[indexNews].classList.add("active");



},5000);



/*---------------------end last news----------------------*/

/*---------------------start footer----------------------*/

//select elements
let copyrightLinks = document.querySelectorAll("footer .copyright a");

//add target: blank to all copyright links
copyrightLinks.forEach(link => link.target = "_Blank");

/*---------------------end footer----------------------*/

//go to order_complete page after finishing order
if(window.localStorage.getItem("order-complete")){
    // window.location.href = "order_complete.html";
    location.replace("order_complete.html");
    window.localStorage.removeItem("order-complete");
}
