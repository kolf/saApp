module.exports = {
  isPhone: str => /^1[0|3|4|5|7|8|9][0-9]{9}$/.test(str),
  isISBN: str => /^[0-9]{13}$/.test(str),
  isVinCode: str => /^[A-Z0-9]{17}$/g.test(str)
};
