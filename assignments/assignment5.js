
// Ques: Define a regular function and an arrow function to calculate the area of a rectangle using parameters and default values. Demonstrate function scope and block scope.

function rectangleArea(length = 5, width = 4) {
  return length * width;
}

const arrowArea = (length = 5, width = 4) => length * width;

console.log("Standard Function Area (Default 5x4): " + rectangleArea());
console.log("Arrow Function Area (Custom 10x3): " + arrowArea(10, 3));

function scopeTest() {
  var functionVar = "I am function scoped";
  if (true) {
    let blockVar = "I am block scoped";
    console.log("Inside block: " + blockVar);
  }
  console.log("Function scope: " + functionVar);
  try {
    console.log(blockVar);
  } catch (error) {
    console.log("Scope Test Error: " + error);
  }
}

scopeTest();
