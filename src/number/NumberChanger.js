const roundComma = (num) => {
  if(num){
     return(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');
  }else{
     return 0;
  }
}

const convertMc = (num) => {
 if (num >= 1000000000000) {
   return (num / 1000000000000).toFixed(2).replace(/\.00$/, '') + 'T';
}
 if (num >= 1000000000) {
   return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B';
}
if (num >= 1000000) {
   return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
}
if (num >= 1000) {
   return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
}
return num;
} 




export { roundComma, convertMc};