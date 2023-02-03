"use strict"
const SCREEN = document.querySelector(".screen");
const BTN = document.querySelectorAll(".btn");
let saveNumber = "0", operationFlag = false, sign = "";

BTN.forEach((button) => {
   button.addEventListener("click", function () {
      let arrOperation = ["/", "+", "-", "*", "Enter", ["Delete", "Backspace", "."]];
      if (!(arrOperation.includes(this.value)) && !(arrOperation[5].includes(this.value))) {
         return getNumber(this.value);
      }
      if (arrOperation.includes(this.value)) return mathOperation(this.value);
   });
   document.addEventListener('keydown', function (e) {
      if (e.key == button.value) {
         button.click();
         button.classList.add('active');
         setTimeout(function () {
            button.classList.remove('active');
         }, 400)
      }
   })
});

function getNumber(number) {
   if (operationFlag) {
      SCREEN.textContent = number;
      operationFlag = false;
      return
   }
   if (SCREEN.textContent === "0") {
      SCREEN.textContent = number;
      return
   }
   SCREEN.textContent += number;
}

function mathOperation(op) {
   let saveNumberTow = SCREEN.textContent;
   if (operationFlag && !(sign == "Enter")) {
      SCREEN.textContent = saveNumber;
      return
   }

   operationFlag = true;
   switch (sign) {
      case "+":
         saveNumber += +saveNumberTow;
         break;
      case "-":
         saveNumber -= +saveNumberTow;
         break;
      case "*":
         saveNumber *= +saveNumberTow;
         break;
      case "/":
         saveNumber /= +saveNumberTow;
         console.log(saveNumberTow);
         console.log(saveNumber);
         break;
      default:
         saveNumber = +saveNumberTow;
         break;
   }
   SCREEN.textContent = saveNumber;
   sign = op;

   if (saveNumber == Infinity) {
      SCREEN.textContent = `Ділити на нуль не можна`
      operationFlag = false;
      saveNumber = "0";
      sign = "";
   }

   isNaN(saveNumber) && resets();
}

function decimalPoint() {
   if (operationFlag) {
      SCREEN.textContent = "0."
      operationFlag = false;
      return;
   }
   if (SCREEN.textContent.includes(".")) return;
   SCREEN.textContent += ".";
}

function backSpace() {
   let exe = SCREEN.textContent;
   if (operationFlag) {
      delSreen(exe)
      operationFlag = false;
      sign = "";
      return;
   }
   delSreen(exe)
}

function delSreen(exe) {
   SCREEN.textContent = exe.substring(0, exe.length - 1);
}

function resets() {
   SCREEN.textContent = "0"
   operationFlag = false;
   saveNumber = "0";
   sign = "";
}


























