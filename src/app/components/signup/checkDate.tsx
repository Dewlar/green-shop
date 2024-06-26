function isOlderThan13(dateString: string) {
  const today = new Date();
  const cutoffDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  const inputDate = new Date(dateString);
  return inputDate <= cutoffDate;
}

export default isOlderThan13;
