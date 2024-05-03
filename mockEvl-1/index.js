let result = document.querySelector(".forShow");
let productAppend = document.querySelector("#apendHere")
let con = document.querySelector("#container");
let filter = document.querySelector("#filter");
let sort = document.querySelector("#sort");
let search = document.querySelector("#search");

// global declaration ------------------------------------------------------
let globalData = [];
let getData = async (url)=>{

    try{
        let data = await fetch(url);
            data = await data.json();
    
            globalData =  data;
            showData(data);
    }
    catch(err){
        console.log(err);
    }

}

//  show data for appending data on web page-----------------------------------------
let showData = (data)=>{
    
    productAppend.innerHTML = null;
    data.forEach((ele,ind)=>{
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.src = ele.image;

        let title = document.createElement("h3");
        title.innerText = ele.title;

        let price = document.createElement("p");
        price.innerHTML = `<b>${ele.price}</b>`;

        div.append(img,title,price);
        productAppend.append(div);
    })
}
// filter by categories ------------------------------------------------------------

filter.addEventListener("change",()=>{
    result.innerHTML = null
    let value = filter.value;
    if(value === "electronics"){
        getData("https://fakestoreapi.com/products/category/electronics");
    }else if(value === "jewelery"){
        getData("https://fakestoreapi.com/products/category/jewelery");
    }else if(value === "men's clothing"){
        getData("https://fakestoreapi.com/products/category/men's clothing");
    }else if(value === "women's clothing"){
        getData("https://fakestoreapi.com/products/category/women's clothing");
    }else{
        getData("https://fakestoreapi.com/products");
    }
})

// sorting by price ----------------------------------------------------------------

sort.addEventListener("change",()=>{
    
    let value = sort.value;
    let narr = [];
    result.innerHTML = null;
    if(value === "low"){
        narr = globalData.sort((a,b)=> a.price - b.price)
    }else if(value === "high"){
        narr = globalData.sort((a,b)=> b.price - a.price);
    }else{
        narr = globalData;
    }
    showData(narr);
})
// search functionality for the web page -------------------------------------------

search.addEventListener("input",()=>{
    let value = search.value;
    let narr = [];
    narr = globalData.filter((ele,ind)=>{
        return ele.title.toLowerCase().includes(value.toLowerCase());
    })

    if(narr.length != 0 ){
        result.innerHTML = `<h4>➡️ ${narr.length} result found for ${value}</h4>`;
        showData(narr);
    }else{
        productAppend.innerHTML = ""
        result.innerHTML = `<h4>➡️ Product not found. try something else</h4>`
    }
})

// data for first reload ------------------------------------------------------------
getData("https://fakestoreapi.com/products");
// result for showig-----------------------------------------------------------------

