"use strict";

{
  function romanToInt(s) {
    // Map of Roman numerals to integers
    const romanMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let total = 0;
    let prevValue = 0;

    // Iterate through the string from right to left
    for (let i = s.length - 1; i >= 0; i--) {
      const currentValue = romanMap[s[i]];

      if (currentValue < prevValue) {
        // Subtraction case
        total -= currentValue;
      } else {
        // Addition case
        total += currentValue;
      }

      // Update the previous value
      prevValue = currentValue;
    }

    return total;
  }

  // Example usage
  console.log(romanToInt("III")); // Output: 3
  console.log(romanToInt("LVIII")); // Output: 58
  console.log(romanToInt("MCMXCIV")); // Output: 1994
}

//or

// {
//   const romanLetter = ["I", "V", "X", "L", "C", "D", "M"];
//   const romanNumber = [1, 5, 10, 50, 100, 500, 1000];
//   let input = "xiii";
 

//     function romanConvert(input) {
//        let index = input.length - 1;
//        let equivalentNumber = 0;
//        let prevalue = 0;
//        let currentValue = 0;
//     while (index >= 0) {
//       currentValue =
//         romanNumber[romanLetter.indexOf(input[index].toUpperCase())];

//       if (currentValue < prevalue) {
//         equivalentNumber -= currentValue;
//       } else {
//         equivalentNumber += currentValue;
//       }

//       prevalue = currentValue;
//       index--;
//         }
//         return equivalentNumber;
//   }

//   console.log(romanConvert(input));
// }
