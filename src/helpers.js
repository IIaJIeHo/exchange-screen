export function validateInput(value){
    let nonNumericRegex = /[^0-9.]+/g;
    let val = value.replace(nonNumericRegex, "");
    if (val === '.'){
      val = '0.';
    } else if (val === '00'){
      val = '0';
    } else {
      let arr_val = val.split('.');
      if (arr_val.length > 1){
        val = arr_val[0]+'.'+arr_val[1].slice(0,2);
      }
    }
    return val;
}