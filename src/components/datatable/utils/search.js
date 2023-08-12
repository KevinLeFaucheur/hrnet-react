export const search = (data, input) => {
  /**
   * Return a copy of data rows filtered input
   */
  let dataCopy = data.filter(row => 
    Object.values(row).some(value => regex(input).test(value))
  );
  return dataCopy;
}

const regex = (search, regex, smart = true, caseInsensitive = true) => {
  if (smart) {
    let a = search.match(/"[^"]+"|[^ ]+/g) || [''].map(word => {
      if (word.charAt(0) === '"') {
        let m = word.match(/^"(.*)"$/);
        word = m ? m[1] : word;
      }

      return word.replace(/['"]+/g, '');
    });

    search = '^(?=.*?'+a.join(')(?=.*?')+').*$';
  }
  return new RegExp(search, caseInsensitive ? 'i' : '');
}