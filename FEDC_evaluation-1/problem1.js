function rearrangeFruits(fruit){
    let [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10] = fruit;
    fruit.splice(6,4);
    fruit.splice(0,0,f7,f8,f9,f10);
    return fruit;
}

console.log(rearrangeFruits( ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes", "Strawberry", "Watermelon", "Peach", "Kiwi"]));