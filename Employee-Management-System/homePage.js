let tBody = document.querySelector("tbody");
let pButton = document.querySelector("#pre");
let nButton = document.querySelector("#next");
let department = document.querySelector("#Department");
let gender = document.querySelector("#Gender");
let salary = document.querySelector("#Salary");

// decalaring the gloabal data for further use

let gloabalData = [];
// this arr for sorting on filtered arr -------------------------
let arr ;

// golobally deaclaring the page number for dynamic use

let page = 1;

// getting the data form the api
let getData = async (url)=>{
    
    try{
        let res = await fetch(url);
        res = await res.json();
        gloabalData = res.data;
        showData(res.data)
        arr = res.data;
    }
    // if any err comes---------------------
    catch(err){
        console.log(err);
    }
}


// show data function for tbody appending----------------------
let showData = (arr)=>{
    let sr = 1;
    arr.forEach((ele,ind)=>{
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerText = ind+1;
        sr++;

        let td2 = document.createElement("td");
        td2.innerText = ele.name;

        let td3 = document.createElement("td");
        td3.innerText = ele.gender;

        let td4 = document.createElement("td");
        td4.innerText = ele.department;

        let td5 = document.createElement("td");
        td5.innerText = ele.salary;

        tr.append(td1,td2,td3,td4,td5);
        tBody.append(tr);
    })
}

// showing disbled buttons


// for next button for data ---------------------------

nButton.addEventListener("click",()=>{
    if(page<10){
        page++;
        tBody.innerHTML = null;
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`)
    }
})

//  for previous button for data--------------------------
pButton.addEventListener("click",()=>{
    if(page>1){
        page--;
        tBody.innerHTML = null;
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`);
    }
})
// sorting based on salary----------------------------------
let salaryHandler = (arr)=>{
    if(salary.value=="asc"){
        // for assending oreder-----------------
        arr.sort((a,b)=>{
            return a.salary - b.salary;
        })
       
    }else if(salary.value=="desc"){
        // for descending order ------------------------------
        arr.sort((a,b)=>{
            return b.salary - a.salary;
        })
       
    }
    // emtying the body to append the data or for overwritten----------
    tBody.innerHTML = null;
    showData(arr);
}
salary.addEventListener("change",()=>{
    salaryHandler(arr);
});

// for department------------------------------------------
department.addEventListener("change",()=>{
    
    if(department.value == "hr"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.department == "hr"
        })
    }else if(department.value == "finance"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.department=="finance";
        })
    }else if(department.value == "marketing"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.department=="marketing";
        })
    }else if(department.value == "engineering"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.department=="engineering";
        })
    }else if(department.value == "operations"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.department=="operations";
        })
    }else{
        arr=gloabalData;
    }
    
    tBody.innerHTML = null;
    (arr.length>0)?showData(arr):tBody.innerHTML="<h1>Not found</h1>";
})

//  filter functionality of gender--------------------------------

gender.addEventListener("change",()=>{
    
    if(gender.value=="male"){
        arr = gloabalData.filter((ele,ind)=>{
             return ele.gender === "male";
        })
    }else if(gender.value=="female"){
        arr = gloabalData.filter((ele,ind)=>{
            return ele.gender === "female";
       })
    }else{
        arr = gloabalData;
    }
   
    tBody.innerHTML = null;
    (arr.length>0)?showData(arr):tBody.innerHTML="<h1>Not found</h1>";
})

 
// default page no is 1 for home page after reloded----------------
getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`);
