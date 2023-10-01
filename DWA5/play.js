const a = {b: '7', c: '6'};
const { b , c } = a;

const num1 = parseInt(b);
const num2 = Number(c)
 console.log(isNaN(num1))
 const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  try {
    const dividendValue = Number(dividend);
    const dividerValue = Number(divider);
    if( dividend === '' || divider === '' ){
      throw new Error('Both values are required in inputs.')
    }
    if( dividendValue < 0 || dividerValue <= 0){
        throw new Error('Invalid number provided.')
    }
    if (isNaN(dividendValue) || isNaN(dividerValue)){
      throw new Error('Something critical went wrong. Please reload the page')
    }
    const answer = dividendValue / dividerValue;
    if(Number.isInteger(answer)){
      result.innerText = answer;
    }else{
      result.innerText = Math.floor(answer);
    }
  }
  catch(error){
    result.innerText = `Division not performed. ${error.message} Try again.`;
    if (error.message === 'Invalid number provided.'){
      console.error(error, error.stack); 
    }else if(error.message === 'Something critical went wrong. Please reload the page') {
      document.body.innerHTML = `<h1>${error.message}</h1>`;
      console.error(error, error.stack);
    }
  }
});