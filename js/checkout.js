//select elements
let select = document.querySelector(".checkout-content form select");
let totalContent = document.querySelector(".checkout-content .card-total .total-content");
let totalPayment = document.querySelector(".checkout-content .final-price span");
let couponInput = document.querySelector(".checkout-content .coupon input");
let couponBtn = document.getElementById("coupon");
let refuseCouponBtn = document.getElementById("coupon-refuse");
let modalBodyCoupon = document.querySelector("#coupon-alert .modal-body");
let bodyOverlay = document.querySelector(".body-overlay");
let loading = document.querySelector(".loading-coupon");
let successAlert = document.querySelector(".using-alert");
let formInputs = document.querySelectorAll("form input:not([type='submit'])");
let submitBtn = document.querySelector("form input[type='submit']");


//get USA cities
fetch("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
.then((result)=>{
    let data = result.json();
    return data;
})
.then((data) => {


    let arr = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].country == "United States"){
            arr.push(data[i].subcountry);
        }
    }
    let newArr = Array.from(new Set(arr));
    newArr.length = 20;
    
    //show them in page
    for(let i = 0; i < newArr.length; i++){

        //create option
        let option = document.createElement("option");
        option.value = newArr[i];
        option.innerHTML = newArr[i];
        //append option on select
        select.appendChild(option);
    }
});


//get data from local storage
let orderListStorage = window.localStorage.getItem("order-list");

if(orderListStorage){

    let data = JSON.parse(orderListStorage);


//send ordered products data & their size via form
    for(let i = 0; i < data.length; i++){

        //create input
        let input = document.createElement("input");
        input.type = "text";
        input.name = `order ${i+1}`;
        input.value = `${data[i].quantity} x ${data[i].name} , size: ${data[i].size}`;
        input.className = "d-none";

        //append input to form
        submitBtn.before(input);
    }

    let newData = [];

    //remove repeated products
    for(let i = 0; i < data.length; i++){
         for(let j = i + 1; j < data.length; j++){

            if(data[i].name === data[j].name){

                data[i].quantity = +data[i].quantity + +data[j].quantity;
                
                data[j].name = "";

            }
        }
    } 

    for(let i = 0; i < data.length; i++){
        if(data[i].name !== ""){
            newData.push(data[i]);
        }
    }

//set data on page
    for(let i = 0; i < newData.length; i++){

        //create parent div
        let info = document.createElement("div");
        info.className = "info d-flex-all text-black-50 border-bottom border-1 border-black-50";


        if(i === 0){
            info.classList.add("pb-3");
        } else{
            info.classList.add("py-3");
        }

       

        //create product details
        let first = document.createElement("div");
        first.innerHTML = `${newData[i].quantity} x ${newData[i].name}`;
        info.appendChild(first);

        //create final price for the product
        let second = document.createElement("div");
        let final = +newData[i].price.slice(1) * +newData[i].quantity;
        second.innerHTML = `$${final.toFixed(2)}`;
        second.className = "price";
        info.appendChild(second);

        //append info to infos parent
        totalContent.appendChild(info);


    }
}


//get prices
let prices = document.querySelectorAll(".checkout-content .price");

//sum of prices to find total payment
let pricesSum = 0;
for(let pr of prices){

pricesSum += +pr.innerHTML.slice(1);

}

//add prices sum to page
totalPayment.innerHTML = "$" + pricesSum.toFixed(2);

// create input of : total payment
let inputPayment = document.createElement("input");
inputPayment.type = "text";
inputPayment.className = "d-none";
inputPayment.name = "Total Payment";
inputPayment.value = totalPayment.innerHTML;
submitBtn.before(inputPayment);



//add coupon array
let arrCoupon = ["mehdi10","islam","mohammed"];

//add coupon changes
couponBtn.onclick = ()=>{

    if(couponInput.value.trim() !== ""){
    //check if the coupon is correct
    let checkCoupon = false;

    for(let i = 0; i < arrCoupon.length; i++){
        if(arrCoupon[i] === couponInput.value){

            checkCoupon = true;
            break;
        }
    }

    if(checkCoupon === true){
       bodyOverlay.classList.add("show");
       loading.classList.add("show");


       setTimeout(()=>{

        //stop button events
        couponBtn.classList.add("pe-none");

        //do changes on button
        couponBtn.innerHTML = "<i class=\"fa-solid fa-check\"></i> Applied";

        //stop input
        couponInput.classList.add("pe-none");

        bodyOverlay.classList.remove("show");
        loading.classList.remove("show");

        //add success sound
        document.querySelector("audio").play();

        //add success alert
        successAlert.classList.add("show");

        setTimeout(()=>{

            successAlert.classList.remove("show");
        },2000);

        //change the price
        totalPayment.classList.add("text-decoration-line-through");

        //create new price
        let span = document.createElement("span");
        let oldTotal = +totalPayment.innerHTML.slice(1);
        span.innerHTML = `$${(oldTotal - (oldTotal * 25 /100)).toFixed(2)}`;
        span.className = "fs-3";
        totalPayment.after(span);

        //change total payment data in input
       inputPayment.value = span.innerHTML;

       },3000);

    }
    else{
        refuseCouponBtn.click();
        modalBodyCoupon.innerHTML = "Add a Valid Coupon";
    }
    }

    else{
        refuseCouponBtn.click();
        modalBodyCoupon.innerHTML = "Add Coupon";
    }


};


//add required attribute to all inputs
formInputs.forEach(input =>{

    input.required = true;
});


//form inputs rules
document.forms[0].onsubmit = (e)=>{

   formInputs.forEach(input =>{

    if(input.type === "email"){
        if(/\w+@\w+\.\w+/.test(input.value.trim()) === false){
            e.preventDefault();
            if(input.nextElementSibling !== null){
                input.nextElementSibling.remove();
            }
            createParagraph("Add a Valid Email",input);
        }

    }

    else if(input.type === "tel"){

        if(/\d{10,}/.test(input.value.trim()) === false){
            e.preventDefault();
            if(input.nextElementSibling !== null){
                input.nextElementSibling.remove();
            }
            createParagraph("Add a Valid Phone",input);
        }

    }
    
    window.localStorage.setItem("order-complete","true");
   });
};

// create paragraph of warning function
function createParagraph(text,element){
    let p = document.createElement("p");
    p.innerHTML = `${text}`;
    p.className = 'text-danger fs-6 text-center';

    element.after(p);
}

