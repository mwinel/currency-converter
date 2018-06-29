
window.onload = () => { 

  let convertButton = document.getElementById('convert');
  let amount = document.getElementById('Amount');
  let from = document.getElementById('from');
  let to = document.getElementById('to');
  let convResult = document.getElementById('convResult');
  amount.focus();
    
  // Make a GET request from the free currencyconverter api
  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
  	// Object with currencyName, currencySymbol and Id
    let currencies = data.results;
      for(const currency in currencies) {     
        const curId = currencies[currency].id;
        const curName = currencies[currency].currencyName;    
        const node = document.createElement('option');
        const text = `${curId} ${curName}`;
        const textnode = document.createTextNode(text);
        node.setAttribute('value', curId);             
        node.appendChild(textnode); 
        from.appendChild(node);            
      }    
      for(const currency in currencies) {    
        const curId = currencies[currency].id;
        const curName = currencies[currency].currencyName;    
        const node = document.createElement('option');
        const text = `${curId} ${curName}`;
        const textnode = document.createTextNode(text);
        node.setAttribute('value', curId);             
        node.appendChild(textnode); 
        to.appendChild(node);         
      }    
  });

  // Currency conversion
  function convertCurrency(amount, currencyFrom, currencyTo ){
    let fromCurrency = encodeURIComponent(currencyFrom);
    let toCurrency = encodeURIComponent(currencyTo);
    let query = `${fromCurrency}_${toCurrency}`;
    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
    
    fetch(url)
    .then((res) => {
        return res.json();
    }).then(rates => {
      let val = rates[query];
      if (val) { 
        let total = val * amount;
        let newTotal = Math.round(total * 100) / 100;
        convResult.value = newTotal;
        console.log(newTotal);
      } else {
        console.log('Something went wrong!');
      }   
    })    
  }
   
  convertButton.addEventListener("click", (e) => {
    e.preventDefault();
    const convertFrom = from.options[from.selectedIndex].value;
    const convertTo = to.options[to.selectedIndex].value;
    const enteredAmount = amount.value;
    convertCurrency(enteredAmount, convertFrom, convertTo);   
  });
}
