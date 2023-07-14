export const search = (data, input) => {
  /**
   * Return a copy of data rows filtered input
   * 
   */
  let dataCopy = data.filter(row => { 
   
    for (const [key, value] of Object.entries(row)) {
      if(value.includes(input)) return true;
    }

    return false;
  });


  return dataCopy;
}