function palindromeArray(array) {
  return array.every((item, index) => item === array[array.length - 1 - index])
}

module.exports = palindromeArray