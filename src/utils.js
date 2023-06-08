function formatLibrsSubmissionDate(sdate){
    const [librssubdate] = [...sdate.matchAll(/(?<month>[0-9]{2})(?<year>[0-9]{4})/gm)];
    return librssubdate.groups.month + "-" + librssubdate.groups.year;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function genUniqueID(num){
  const abc = "abcdefghijklmnopqrstuvwxyz";
  let code = abc + abc.toUpperCase();
  let uni = [];
  for(let i=0;i<=num;i++){
    uni.push(code[getRandomInt(code.length)])
  }
  return uni.join("");
}
    
export {
    formatLibrsSubmissionDate,
    genUniqueID
}