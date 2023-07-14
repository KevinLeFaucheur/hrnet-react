export const search = (data, input) => {
  /**
   * Return a copy of data rows filtered input
   * 
   */
  let dataCopy = data.filter(row => { 
   
    for (const [key, value] of Object.entries(row)) {
      if(regex(input).test(value)) return true;
    }
    return false;
  });


  return dataCopy;
}

const regex = (search, regex, smart = true, caseInsensitive = true) => {
  if (smart) {
    /* For smart filtering we want to allow the search to work regardless of
     * word order. We also want double quoted text to be preserved, so word
     * order is important - a la google. So this is what we want to
     * generate:
     * 
     * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
     */
    let a = search.match(/"[^"]+"|[^ ]+/g) || [''].map(word => {
      if (word.charAt(0) === '"') {
        let m = word.match(/^"(.*)"$/);
        word = m ? m[1] : word;
      }

      return word.replace('"', '');
    });

    search = '^(?=.*?'+a.join(')(?=.*?')+').*$';
  }
  return new RegExp(search, caseInsensitive ? 'i' : '');
}