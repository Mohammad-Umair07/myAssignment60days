let singupPage = document.querySelector("#singup-page");
let homePage = document.querySelector("#home-page");
let form = document.querySelector("form");
let logingStatus = false;
let userName = "";
// event on form ----------------------------

form.addEventListener("submit",(event)=>{
    submitHandler(event);
})
// submit handlet ---------------------------------

let submitHandler = (e)=>{
    e.preventDefault();
    let targetValue = e.target;

    let email = targetValue[0].value;
    let password = targetValue[1].value;
    fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
    .then((res)=>res.json())
    .then((data)=>{
        if(data.length == 0){
            alert("Wrong Credentials");
        }else{
            window.location.href="index.html";
            alert("Login Succesfull");
            
            localStorage.setItem("loginStatus",JSON.stringify({
                status : true,
                userName : data[0].name
            }));
        }
    })
    .catch((err)=>console.log(err));
}

// redirecting to the singUp page --------------------------

singupPage.addEventListener("click",()=>{
    window.location.href = "./singUp.html"
})
// redirecting to the home page---------------------------
homePage.addEventListener("click",()=>{
    window.location.href = "./index.html"
})


