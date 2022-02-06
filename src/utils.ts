export const stringify = (e: any) => {
  const resultArr = [];
  for (const property in e) {
    const line = `${property}=${e[property]}`;
    resultArr.push(line);
  }
  const result = resultArr
    .map((a, i) => {
      if (i === 0) {
        return a;
      } else {
        return `&${a}`;
      }
    })
    .join('');
  return result;
};
