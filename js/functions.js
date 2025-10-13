const checkStringLength = (str, targetLength) => {
  return str.length <= targetLength;
};

console.group("checkStringLength");
console.debug(checkStringLength("Кот", 10)); // true
console.debug(checkStringLength("Программирование на JavaScript", 15)); // false
console.debug(checkStringLength("Код", 3)); // true
console.groupEnd();

const isPalindrome = (str) => {
  const clearStr = str.replace(/[^a-zA-Zа-яА-Я0-9]/g, "").toLowerCase();

  let left = 0;
  let right = clearStr.length - 1;

  while (left < right) {
    if (clearStr[left] !== clearStr[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

console.group("isPalindrome");
console.debug(isPalindrome("топот")); // true
console.debug(isPalindrome("level")); // true
console.debug(isPalindrome("привет")); // false
console.debug(isPalindrome("hello")); // false
console.debug(isPalindrome("Was it a car or a cat I saw?")); // true
console.debug(isPalindrome("А роза упала на лапу Азора.")); // true
console.groupEnd();