
let TodoAppend = document.querySelector("#container");
let button = document.querySelector("#button");
let gobalData = [];

// fetching data from server ------------------------------------------------->

let getData = async (url) => {

    try{
        let res = await fetch(url);
        let data = await res.json();

        gobalData = data;
        showData(data)
    }
    catch(err){
        console.log(err);
    }
}

// function for showing data on DOM --------------------------------------------->

let showData = (data)=>{
    TodoAppend.innerHTML = "";
    data.forEach((ele,ind)=>{
        let div = document.createElement("div");

        let title = document.createElement("h2");
        if(ele.completed == true){
            title.innerText = `${ele.title} ✅`
        }else{
            title.innerText = `${ele.title} ❎`
        }

        div.append(title);
        TodoAppend.append(div);
    })
}

// onclick on button for showing data on browser------------------------------->

button.addEventListener("click",()=>{
    getData("https://jsonplaceholder.typicode.com/todos");
})

