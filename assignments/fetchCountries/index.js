let filter = document.querySelector("#filter");
let allCountry = document.querySelector("#allCountry");
let globalData = [];

// geting data form the server-------------------------
let getData = async (url) => {
    try{
        let res = await fetch(url);
        let data = await res.json();
        
        showData(data.data);
    }
    catch(err){
        console.log(err);
    }
}

// show data function ----------------------------->

let showData = (data) =>{
    allCountry.innerHTML = null;
    data.forEach((ele)=>{
        let div = document.createElement("div");

        let title = document.createElement("h1");
        title.innerText = ele.country;

        let rank = document.createElement("h3");
        rank.innerText = `Rank - ${ele.Rank}`;

        let pop = document.createElement("p");
        pop.innerText = `Population - ${ele.population}`;

        div.append(title,rank,pop);
        allCountry.append(div);
    })
}

// filter for the web --------------------------------->

filter.addEventListener("change",()=>{
    let value = filter.value;
    if(value == "dsc"){
        getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&order=desc")
    }else if(value == "asc"){
        getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&order=asc")
    }
})

// awaking the getdata function for page relode ---------------->
getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries")

