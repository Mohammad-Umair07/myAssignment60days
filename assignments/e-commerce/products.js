let loginPage = document.querySelector("#login-page");
let showUser = document.querySelector("#showUserName");
let singupPage = document.querySelector("#singup-page");
let productPage = document.querySelector("#product-page");
let logoutBtn = document.querySelector("#logout");
let loginStatusObj = JSON.parse(localStorage.getItem("loginStatus"));
let cartTotal = document.querySelector("#total-cart");
let user = loginStatusObj.userName || "";
// get data  function ------------------------------>

let getData = async (url) => {
    try{
        let res = await fetch(url);
        let data = await res.json();
      
        showData(data)
    }
    catch(err){
        console.log(err);
    }
}

// show data on dom for users ------------------------>
let showData = (data) => {
    productPage.innerHTML = "";
    data.forEach((ele)=>{
        let div = document.createElement("div");
        let imgDiv = document.createElement("div");

        let img = document.createElement("img");
        img.src = ele.src;
        imgDiv.append(img);

        let title = document.createElement("h3");
        title.innerText = ele.title;

        let price = document.createElement("p");
        price.innerHTML = `<b>${ele.price} /-</b>`;

        let rating = document.createElement("p");
        rating.innerText = ele.ratings;
        
        let butDiv = document.createElement("div");

        let addCart = document.createElement("button");
        addCart.innerText = "Add to cart 🛒"

        let delCart = document.createElement("button");
        delCart.innerText = "Delete from cart 🗑️";
// delete cart --------------------------------------------
        delCart.addEventListener("click",()=>{
            delHandler(ele,ele.id);
        })
// add cart----------------------------------------------
        addCart.addEventListener("click",()=>{
            addHandler(ele,ele.id);
        })

        butDiv.append(addCart,delCart);

        div.append(imgDiv,title,price,rating,butDiv);
        productPage.append(div);
    })
}
// delete handler function ---------------------------------

let delHandler = (ele,id)=>{
    
    fetch("http://localhost:3000/allUsersCart")
    .then((res)=>res.json())
    .then((data)=>{
        let flag = false;
        if(data[user]==undefined || data[user].length==0){
            alert("cart is emty");
        }else{
            data[user].forEach((ele,ind)=>{
                if(id==ele.id){
                    flag = true;
                    return;
                }
            })
            if(flag){
                let narr = data[user].filter((ele,ind)=>{
                    return ele.id != id;
                })
                data[user]=narr;
                fetch("http://localhost:3000/allUsersCart",{
                    method:"PATCH",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
                alert(`${ele.title} is deleted from cart`)
            }else{
                alert(`${ele.title} is not available in cart`)
            }
           
           
        }
    })
}

// addCart handler function --------------------------------

let addHandler = (ele,id) =>{
    fetch("http://localhost:3000/allUsersCart")
    .then((res)=>res.json())
    .then((data)=>{
        if(data[user]==undefined){
            data[user]=[];
        }
       let narr = data[user];
       let getId = id;
       let flag = true;
       narr.forEach((ele,ind)=>{
        if(getId == ele.id){
           flag = false;
           return;
        }
       })
      if(flag===true){
        narr.push(ele);
        data[user]=narr;
        fetch("http://localhost:3000/allUsersCart",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        alert(`${ele.title} added to cart`)
      }
      else{
        alert(`${ele.title} already in cart`)
      }
    })
}

// redirecting to the singup page --------------------------

singupPage.addEventListener("click",()=>{
    window.location.href = "./singUp.html"
})
// redirecting to the login page---------------------------
loginPage.addEventListener("click",()=>{
    window.location.href = "./login.html"
})
// logout button for log out -----------------------------

logoutBtn.addEventListener("click",()=>{
    localStorage.setItem("loginStatus",JSON.stringify({
        status : false,
        userName : ""
    }));
    window.location.reload();
})
// total cart value for user's catt ------------------->

let cartValue = () => {
    fetch("http://localhost:3000/allUsersCart")
    .then((res)=>res.json())
    .then((data)=>{
        let arr = data[user] || [];
        let total = arr.reduce((acc,curr)=>{
            return acc+curr.price;
        },0)
        cartTotal.innerHTML = `Cart Total -: <b>${total} /-</b>`
    })
}
cartValue();
// get data for page reload ------------------------->
console.log(loginStatusObj)
if(loginStatusObj.status){
    getData("http://localhost:3000/products");
    showUser.innerHTML = `<p>hi, <b>${loginStatusObj.userName}</b></p>`;
    showUser.style.display = "inline";
    logoutBtn.style.display = "inline"
    loginPage.style.display= "none";
}