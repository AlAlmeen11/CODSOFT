//getting input from display
const display =document.getElementById("display")

//update in display
function appendToDisplay (input){
    display.value += input;
}

//backspace
function clearLastChar(){
    display.value = display.value.toString().slice(0,-1);
}

//clear the display
function clearDisplay(){
    display.value = "";
}

//Calculate the value in adisplay
function calculate(){
    try{
        if (display.value === "" || display.value === "Error") {
            display.value = ""
        }
        else{
            display.value = eval(display.value)
        }
    }
    catch(error){
        display.value = "Error";
    }
}