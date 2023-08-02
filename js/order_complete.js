
//delete local storage items
document.querySelector(".order-complete").onclick = ()=>{

    window.localStorage.removeItem("order-list");
    window.localStorage.removeItem("order-product");
    window.localStorage.removeItem("products-number");

};
