
// Ques: Evaluate a test score using if...else, determine the letter grade using switch, and use a ternary operator to display whether the student passed or failed.

let score = 85;
let grade;

if (score < 0 || score > 100) {
  console.log("Invalid score");
} else {
  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  switch (grade) {
    case "A":
    case "B":
    case "C":
    case "D":
    case "F":
      console.log("Score: " + score);
      console.log("Grade: " + grade);
      console.log("Status: " + (score >= 40 ? "Passed" : "Failed"));
      break;
    default:
      console.log("Invalid grade");
  }
}
