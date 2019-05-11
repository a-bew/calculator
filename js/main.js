
let input = document.querySelector("#for-input");
let output = document.querySelector("#for-output");
let fields = document.querySelectorAll("button");
let data = [];
let result = null;
var tContent = "";
let resultTemp = "";
let addMore = false

function checkLenght(number){
  n = `${number}`;
  if (n.length<17){
    return number;
  }

  if (n.length>17 && !Number.isInteger(parseFloat(number))){
    const wLength =lenghtOfWhole(number);

    if (wLength>1){
      return number.toFixed(17-wLength);
    }
    return number.toFixed(15);
  }

  return number

}

function lenghtOfWhole(number){
  return `${Math.floor(number)}`.length;
}

function limitInputLength(number){
  if (number.length<17){
    console.log('less than 17', number)
    return number;
  } else {
    let temp = number.split("")
    if (hasSign(number[number.length-2])){
       temp.splice(number.length-3, 3)
    } else {
       temp.pop();
    }            
    number=temp.join("")
    console.log('less than 17',number)
    return number;
  }
}

function run(){
  if (input.textContent==""){
    // set to zero
    input.textContent = 0;
  }
  for (let field of Array.from(fields)) {
    field.addEventListener("click", event => {
      let text = event.target.getAttribute("data-value");
      
      if (text != "=") {

        if (setSpace(text)){ 

          // Handling values from previous calculations
          if (resultTemp){IsAddMore = true}

          // if resultTemp has a value do something
          if (resultTemp && IsAddMore){
            tContent += resultTemp;
            addMore = false;
          }

          // update input screen with space and display arithmetic sign -, +, /, x properly

          // Incase there is a reassgnment of sign(+, -, x, /), update
          if (tContent != "" && hasSign(tContent[tContent.length-2])){
             
            // updating with new sign
//            data[data.length-1] = text
            let temp = tContent.split("")
            temp[temp.length-2] = text;
            tContent = temp.join("");

            // check lenght of user input or number
            tContent = limitInputLength(tContent)
            
            input.textContent = tContent

          }
          else{
            // continue since no reassignment of sign 
            tContent += ` ${text} `;

            // check lenght of user input or number
            tContent = limitInputLength(tContent)
            input.textContent = tContent
//            data[index++] = text; 
//            data[index++] = text;
          }
          resetToFalse = false
          resultTemp = "";

        } else if (text == "back"){
            let temp = tContent.split("")
            if (hasSign(tContent[tContent.length-2])){
               temp.splice(tContent.length-3, 3)
            } else {
               temp.pop();
            }           

            tContent = temp.join("");
            const empty = "";
            if (tContent == ""){
              input.textContent = 0;
            } else {
              input.textContent = tContent
            }
        } else if (text == "clear"){
            // }   
            // tContent = 0;      
            // tContent = temp.join("");
            const empty = "";
            output.textContent = empty

            input.textContent = 0
        }
        else {
          IsAddMore = false;
          // update input screen with numbers
          tContent += `${text}`;

          // check lenght of user input or number
          tContent = limitInputLength(tContent)

          input.textContent = tContent;
          resultTemp = "";

        }
      } else {
        data = new String(input.textContent).split(" ")
        //console.log(data)
        var len = data.length;
        let first = data[0];
        result = parseInt(first, 10)
        let index = 1;

        while(index<data.length){
          let symb = data[index]
          let value = data[index+1]
          result = calc(symb, parseInt(value, 10));
          console.log(index, symb, value, result)
          index+=2;
        }

        result = checkLenght(result)
        output.textContent = `${result}`;
        resultTemp = `${result}`;
        tContent = "";
      }
    });
  }  
}


function setSpace(input){
  switch (input.toLowerCase()) {
    case "-":
      return true;
    case "+":
      return true;
    case "x":
      return true;
    case "/":
      return true;
  };
}

function hasSign(input){
  switch (input) {
    case "-":
      return true;
    case "+":
      return true;
    case "x":
    case  "X":
      return true;
    case "/":
      return true;
  };
}




function calc(sign, value){
  switch (sign) {
    case "+":
      return result+=value;
    case  "-":
      return result-=value;
    case  "x":
      return result*=value;
    case  "X":
      return result*=value;
    case  "/":
      return result/=value;
  };
}

window.onload = run;