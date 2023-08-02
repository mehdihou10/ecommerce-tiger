

/*---------------------start cover----------------------*/

//select elements
let imgsCover = document.querySelectorAll(".cover img");
let infosCover = document.querySelectorAll(".cover .info");
let dotsParent = document.querySelector(".cover .dots");

//the number of content
let contentCoverLength = imgsCover.length;


//create dots depending on number of content
for(let i = 0; i < contentCoverLength; i++){

    //create dot
    let span = document.createElement("span");

    //add active class on first dot by default
    if(i === 0){
        span.className = "active";
    }

    //append dot to parent
    dotsParent.append(span);

}

let dotsChildren = Array.from(dotsParent.children);
let indexContentCover = 0;
let checkMain = true;


//change active automaticly
setInterval(()=>{

    if(checkMain === true){
        indexContentCover++;

        changeMainContent();
    }


},5000);

//change active content by clicking on dots

//change active dot
changeActive(dotsChildren);

dotsChildren.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        indexContentCover = index;
        changeMainContent();
        checkMain = false;

        setTimeout(()=>{
            checkMain = true;
        },3000);

    }); 
     

});

//change active element(imgs infos)
function changeMainContent(){

    changeActiveNext(imgsCover);
    changeActiveNext(infosCover);
    changeActiveNext(dotsChildren);
}


//main function: change active content
function changeActiveNext(elements){

    if(indexContentCover === imgsCover.length){
        indexContentCover=0;
    }
    

    elements.forEach(del => del.classList.remove("active"));

    if(elements === infosCover){
        setTimeout(()=>{
            elements[indexContentCover].classList.add("active");

        },500);

    } else{
        elements[indexContentCover].classList.add("active");

    }

}
/*---------------------end cover----------------------*/

//functions that are used in differant sections
//change active class
function changeActive(elements){
    elements.forEach(el => {

        el.addEventListener("click",()=>{
            elements.forEach(del => del.classList.remove("active"));
            el.classList.add("active");
        });
    });
    
}
