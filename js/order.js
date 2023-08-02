//select elements

let productImg = document.querySelector(".product-order img");
let productTitle = document.querySelector(".product-order h3");
let productPrice = document.querySelector(".product-order .price");
let sizes = document.querySelectorAll(".product-order .sizes span");
let quantityInput = document.querySelector(".product-order .quantity input");
let addQuantityBtn = document.querySelector(".product-order .quantity .add");
let removeQuantityBtn = document.querySelector(".product-order .quantity .remove");
let addToListBtn = document.getElementById("add-list");
let listPopup = document.getElementById("list-modal");
let testList = document.getElementById("testList");
let missing = document.querySelector("#list-modal .modal-body");
let orderAlert = document.querySelector(".using-alert");


//array of order data
let bigArr = [];
// window.localStorage.clear()
//get the data from local storage and set it in the page
if(window.localStorage.getItem("order-product")){
    let productData = JSON.parse(localStorage.getItem("order-product"));

    productImg.src = productData[0];
    productPrice.innerHTML = productData[1];
    productTitle.innerHTML = productData[2];

}

//get the old orders and put it in the array
let orderListStorage = window.localStorage.getItem("order-list");

if(orderListStorage){
let data = JSON.parse(orderListStorage);

for(let i = 0; i < data.length; i++){
    bigArr.push(data[i]);
}
}

//add size by click
sizes.forEach(size =>{

    size.onclick = ()=>{

        sizes.forEach(delSize => delSize.classList.remove("active"));

        size.classList.add("active");
    };
});

//set the value of quantity input
quantityInput.value = "0";

//add quantity (max = 5)
addQuantityBtn.onclick = ()=>{

    if(quantityInput.value !== "5"){
        quantityInput.value ++
    }
};

//remove quantity (min = 0)
removeQuantityBtn.onclick = ()=>{

    if(quantityInput.value !== "0"){
        quantityInput.value --;
    }

};

//add to list

// addToListBtn.onclick = ()=>{

// //get the size

// let currentSize;

// sizes.forEach(size => {

// if(size.classList.contains("active")){

//     currentSize = size.innerHTML;

// }

// });

// //add warning message
//     if(quantityInput.value === "0" || currentSize === undefined){
//         testList.click();

//         quantityInput.value === "0" ? missing.innerHTML = "You Must Add Quantity" : missing.innerHTML = "You Must Add Size";

//     }



//     else{

//         let check = false;

//         for(let i = 0; i < bigArr.length; i++){
//             if(bigArr[i].image === productImg.src && bigArr[i].size === currentSize){
//                 check = true;
//                 break;
//             }
//         }

//         if(check === false){

//             orderAlert.classList.add("show");
//             addToListBtn.classList.add("stop");

//             setTimeout(()=>{

//                 orderAlert.classList.remove("show");
//                 addToListBtn.classList.remove("stop");

//             },5000);

//             document.querySelector("audio").play();


//             let obj = {

//                 image: productImg.src,
//                 name: productTitle.innerHTML,
//                 size : currentSize,
//                 price: productPrice.innerHTML,
//                 quantity: quantityInput.value
//             }
    
//             //add to big array list
//             bigArr.push(obj);
    
//             //add big array list to local storage
//             window.localStorage.setItem("order-list",JSON.stringify(bigArr));

//             //set number of products: in page
//             card.lastElementChild.innerHTML++;

//             // in local storage
//             window.localStorage.setItem("products-number",card.lastElementChild.innerHTML);
//         }
//         else{
//             testList.click();
//             missing.innerHTML = "You Already Have This Product & Size";
//         }

//     }
// };

addToListBtn.onclick = ()=>{


    //get the size
    
    let currentSize;
    
    sizes.forEach(size => {
    
    if(size.classList.contains("active")){
    
        currentSize = size.innerHTML;
    
    }
    
    });

            let check = false;
    
            for(let i = 0; i < bigArr.length; i++){
                if(bigArr[i].image === productImg.src && bigArr[i].size === currentSize){
                    check = true;
                    break;
                }
            }
    
    //add warning message
        if(quantityInput.value === "0" || currentSize === undefined || check === true){
            testList.click();
    
            quantityInput.value === "0" ? missing.innerHTML = "You Must Add Quantity" : currentSize === undefined ? missing.innerHTML = "You Must Add Size" : missing.innerHTML = "You Already Have This Product & Size";
    
        }
    
    
    
        else{
    
                orderAlert.classList.add("show");
                addToListBtn.classList.add("stop");
    
                setTimeout(()=>{
    
                    orderAlert.classList.remove("show");
                    addToListBtn.classList.remove("stop");
    
                },5000);
    
                document.querySelector("audio").play();
    
    
                let obj = {
    
                    image: productImg.src,
                    name: productTitle.innerHTML,
                    size : currentSize,
                    price: productPrice.innerHTML,
                    quantity: quantityInput.value
                }
        
                //add to big array list
                bigArr.push(obj);
        
                //add big array list to local storage
                window.localStorage.setItem("order-list",JSON.stringify(bigArr));
    
                //set number of products: in page
                card.lastElementChild.innerHTML++;
    
                // in local storage
                window.localStorage.setItem("products-number",card.lastElementChild.innerHTML);
            
    
        }
};
