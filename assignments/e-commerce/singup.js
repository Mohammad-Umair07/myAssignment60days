
let loginPage = document.querySelector("#login-page");
let homePage = document.querySelector("#home-page");
let form = document.querySelector("form");

// adding event listner to form tag ---------------------------------->

form.addEventListener("submit",(event)=>{
    submitHandler(event);
})
// submit handler function ------------------------------------->

let submitHandler = (e) =>{
e.preventDefault();
let targetValue = e.target;

let name = targetValue[0].value;
let email = targetValue[1].value;
let password = targetValue[2].value;
let confirmPass = targetValue[3].value;

let obj = {
    id : Math.random().toString(),
    name,
    email,
    password
}
console.log(name,email,password,confirmPass)
if(password == confirmPass){
    fetch("http://localhost:3000/users",{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify(obj)
    })
    window.location.href = "login.html"
    alert("Registration Successfull");
}else{
    alert("Password not match")
}
}

// redirecting to the login page --------------------------

loginPage.addEventListener("click",()=>{
    window.location.href = "./login.html"
})
// redirecting to the home page---------------------------
homePage.addEventListener("click",()=>{
    window.location.href = "./index.html"
})