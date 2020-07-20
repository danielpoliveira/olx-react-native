

/*module.exports = function checkEmpty( obj ) {
  const errors = [];

  for (let elem in obj)
    if(typeof obj[elem] === 'object' && !obj[elem].length || obj[elem] === undefined){
      errors.push({ message: '\''+ elem +'\'' + ' is empty' });    

      console.log('vazio')

    }

  if(!errors.length) 
    return false;
  
  return errors;
}*/

export default obj => {
  const errors = [];

  for (let elem in obj)
    if(typeof obj[elem] === 'object' && !obj[elem].length || obj[elem] === undefined){
      errors.push({ message: '\''+ elem +'\'' + ' is empty' });    
      console.log('vazio')
    }

  if(!errors.length) 
    return false;
  
  return errors;
}