// fill in javascript code here
let data = [];
let emName =document.querySelector("#name");
let emId = document.querySelector("#employeeID");
let emDep  = document.querySelector("#department");
let exp = document.querySelector("#exp");
let email = document.querySelector("#email");
let mobile = document.querySelector("#mbl");
let form = document.querySelector("form");
let tableBody = document.querySelector("tbody");

function saveData(){
    localStorage.setItem("data",JSON.stringify(data));
}

function loadData(){
   let storedData = JSON.parse(localStorage.getItem("data"));
   if(storedData){
    data = storedData;
    showData(data);
   }
}

function submitForm(e){
    e.preventDefault();
    
    // console.log(emName.value,emId.value,emDep.value,exp.value,email.value,mobile.value)
    let obj={
        name : emName.value,
        id : emId.value,
        dep : emDep.value,
        exp : exp.value,
        mail : email.value,
        number : mobile.value
    }
    data.push(obj);
    saveData();
    showData(data);
}
form.addEventListener("submit",function(event){
    submitForm(event);
});

function showData(arr){
    tableBody.innerHTML = null;
    arr.forEach(function(ele,ind){
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = ele.name;

        let td2 = document.createElement("td");
        td2.innerText = ele.id;

        let td3 = document.createElement("td");
        td3.innerText = ele.dep;

        let td4 = document.createElement("td");
        td4.innerText = ele.exp;

        let td5 = document.createElement("td");
        td5.innerText = ele.mail;
        
        let td6 = document.createElement("td");
        td6.innerText = ele.number;

        let td7 = document.createElement("td");
        if(ele.exp>5){
            td7.innerText = "Senior";
        }else if(ele.exp>=2 && ele.exp<=5){
            td7.innerText = "Junior";
        }else if(ele.exp <= 1){
            td7.innerText = "fresher";
        }

        let td8 = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.addEventListener("click",function(){
            trDelete(ind);
        })
        td8.append(btn);

        tr.append(td1,td2,td3,td4,td5,td6,td7,td8);

        tableBody.append(tr);
    })
   
}

function trDelete(index){
    data.splice(index,1);
    saveData();
    showData(data);
}

function filterDep(){
    let narr;
    if(emDep.value === "Frontend"){
       narr = data.filter(function(ele,ind){
        return ele.dep === "Frontend";
       })
    }else if(emDep.value === "Backend"){
        narr = data.filter(function(ele,ind){
         return ele.dep === "Backend";
        })
     }else if(emDep.value === "Operations"){
        narr = data.filter(function(ele,ind){
         return ele.dep === "Operations";
        })
     }else if(emDep.value === "HR"){
        narr = data.filter(function(ele,ind){
         return ele.dep === "HR";
        })
     }else if(emDep.value === "IA"){
        narr = data.filter(function(ele,ind){
         return ele.dep === "IA";
        })
     }else{
        narr = data;
     }
     showData(narr);
}

emDep.addEventListener("change",filterDep);

loadData();
