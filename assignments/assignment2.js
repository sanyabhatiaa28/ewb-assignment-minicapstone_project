
// Ques: Take a bill amount and tip percentage using prompt(). Convert the inputs to numbers, calculate the tip and total bill using arithmetic and assignment operators, and display the result.

let bill = Number(prompt("Enter bill amount:"));
let tipPercent = Number(prompt("Enter tip percentage:"));

if (!Number.isFinite(bill) || !Number.isFinite(tipPercent) || bill < 0 || tipPercent < 0) {
  console.log("Please enter valid non-negative numbers.");
} else {
  let tip = bill * tipPercent / 100;
  let total = bill;
  total += tip;

  console.log("Subtotal: $" + bill);
  console.log("Tip Percentage: " + tipPercent + "%");
  console.log("Calculated Tip: $" + tip);
  console.log("Total Amount to Pay: $" + total);
}
