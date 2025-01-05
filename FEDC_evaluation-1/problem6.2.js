let voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
  ];
  function analyzeVoterData(data){
    let yv = 0;
    let yp = 0;
    let mv = 0;
    let mp = 0;
    let ov = 0;
    let op = 0;
    for(let i=0;i<=data.length-1;i++){
        if(data[i].age>=18 && data[i].age<=25 && data[i].voted==true){
            yv++;
            yp++;
        }
       else if(data[i].age>=18 && data[i].age<=25){
            yp++;
        }
        else if(data[i].age>=26 && data[i].age<=35 && data[i].voted==true){
            mv++;
            mp++;
        }
        else if(data[i].age>=26 && data[i].age<=35){
            mp++;
        }
        else if(data[i].age>=36 && data[i].voted==true){
            ov++;
            op++;
        }
        else if(data[i].age>=36){
            op++;
        }
        
    }
    return { 
  numYoungVotes: yv,
  numYoungPeople: yp,
  numMidVotesPeople: mv,
  numMidsPeople: mp,
  numOldVotesPeople: ov,
  numOldsPeople: op
    }
  }
  console.log(analyzeVoterData(voters));
  