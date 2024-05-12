export default function isOlderThan13(dateString: string) {
  const today = new Date();
  const cutoffDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

  const inputDate = new Date(dateString);
  console.log('8888899999999');
  console.log(inputDate);
  console.log(inputDate <= cutoffDate);
  return inputDate <= cutoffDate;
}

// // Test the function
// console.log(isOlderThan13('2008-05-12')); // true, 13 years old or older
// console.log(isOlderThan13('2010-05-12')); // false, younger than 13
// console.log(isOlderThan13('2008-99-99')); // false, invalid date format
