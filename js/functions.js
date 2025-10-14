const checkStringLength = (str, targetLength) => str.length <= targetLength;

checkStringLength('Кот', 10); // true
checkStringLength('Программирование на JavaScript', 15); // false
checkStringLength('Код', 3); // true

const isPalindrome = (str) => {
  const clearStr = str.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').toLowerCase();

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

isPalindrome('топот'); // true
isPalindrome('level'); // true
isPalindrome('привет'); // false
isPalindrome('hello'); // false
isPalindrome('Was it a car or a cat I saw?'); // true
isPalindrome('А роза упала на лапу Азора.'); // true

const extractDigits = (arg) => {
  const digits = arg.toString().match(/\d+/g);
  return digits ? parseInt(digits.join(''), 10) : NaN;
};

extractDigits('2023 год'); // 2023
extractDigits('ECMAScript 2022'); // 2022
extractDigits('1 кефир, 0.5 батона'); // 105
extractDigits('агент 007'); // 7
extractDigits('а я томат'); // NaN
extractDigits(2023); // 2023
extractDigits(-1); // 1
extractDigits(1.5); // 15
