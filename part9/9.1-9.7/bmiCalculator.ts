const args = process.argv.slice(2);
const height = Number(args[0]);
const weight = Number(args[1]);

const calculateBmi = (height: number, weight: number): string => {
  let bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(height, weight));
