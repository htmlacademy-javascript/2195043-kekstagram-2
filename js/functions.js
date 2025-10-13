const checkStringLength = (str, targetLength) => {
  return str.length <= targetLength;
};

console.group("checkStringLength");
console.debug(checkStringLength("Кот", 10)); // true
console.debug(checkStringLength("Программирование на JavaScript", 15)); // false
console.debug(checkStringLength("Код", 3)); // true
console.groupEnd();