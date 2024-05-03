
let button = document.querySelector("#button");
let usersBody = document.querySelector("#users");
let helloDiv = document.querySelector("#hello");

// fetch data -------------------------------

let getData = async (url) => {

    try{
        let res = await fetch(url);
        let data = await res.json();

        console.log(data.data);
        showData(data.data)
    }
    catch(err){
        console.log(err);
    }
}

// show data for dom ----------------------------.

let showData = (data) => {
    usersBody.innerHTML = "";

    data.forEach((ele,ind)=>{
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.src = ele.avatar;

        let name = document.createElement("h2");
        name.innerText = ele.first_name +" "+ele.last_name;

        let mail = document.createElement("p");
        mail.innerText = ele.email;

        div.append(img,name,mail);
        usersBody.append(div);

    })
}

// adding event on button ---------------------------

button.addEventListener("click",()=>{
    helloDiv.innerText = "Hello ReqRes users!"
    getData("https://reqres.in/api/users?page=2")
})