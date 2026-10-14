
// Ques: Declare variables using var, let and const to store a user's name, age, employment status and skills. Use typeof to check their data types and display them in the console.

var name = "Alice";
let age = 25;
const isEmployed = true;
const skills = ["HTML", "CSS", "JavaScript"];

console.log("Name: " + name + " (Type: " + typeof name + ")");
console.log("Age: " + age + " (Type: " + typeof age + ")");
console.log("Is Employed: " + isEmployed + " (Type: " + typeof isEmployed + ")");
console.log("Skills: " + JSON.stringify(skills) + " (Type: " + typeof skills + ")");
