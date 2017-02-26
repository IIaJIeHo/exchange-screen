export function validateInput(value){
    let nonNumericRegex = /[^0-9.]+/g;
    let val = value.replace(nonNumericRegex, "");
    if (val === '.'){
      val = '0.';
    } else if (val === '00'){
      val = '0';
    } else {
      let arr_val = val.split('.');
      if ((arr_val[0][0] === '0')&&(arr_val[0].length > 1)) {
        val = val.slice(1);
      }
      arr_val = val.split('.');
      if (arr_val.length > 1){
        val = arr_val[0].slice(0,10)+'.'+arr_val[1].slice(0,2);
      } else {
        if (val.indexOf('.') !== -1){
          val=val.slice(0,10)+'.';
        } else {
          val = val.slice(0,10);
        }
      }
    }
    return val;
}

export const sliderId = 'topSlider';

export let availableCurrencies = ['USD','GBP','EUR'];

export function getCurrentSlideNode(ratesAmount) {
  let slide;
  root.querySelectorAll('#'+sliderId+' div.slick-active').forEach(function (el,i) {
    if ((el.dataset['index'] >= 0)&&(el.dataset['index'] < ratesAmount)){
      slide = el;
    }  
  });
  return slide;
}
