class StringUtil {
  static firstCharToLower = (string) => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toLowerCase() + string.slice(1);
  };

  static firstCharToUpper = (string) => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static lastCharEqualsOneOf = (string, lastChars) => {
    for (let i = 0; i < lastChars.length; i++) {
      if (this.lastCharEquals(string, lastChars[i])) {
        return true;
      }
    }
    return false;
  };

  static lastCharEquals = (string, lastChar) => {
    return string.substr(string.length - 1) == lastChar;
  };
}

export { StringUtil };
