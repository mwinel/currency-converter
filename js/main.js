// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      // Registration was successful
      console.log('Registration successful: ', registration.scope);
    } 
    .catch(function(err) {
      // Registration failed
      console.log('Registration failed: ')
    })
  });
}

// Assign variables to html elements
document.getElementById('convert').addEventListener("click", (e) => {
  e.preventDefault();
  let amount = document.getElementById('Amount');
  let from = document.getElementById('from');
  let to = document.getElementById('to');
  let convResult = document.getElementById('convResult');
  let convertFrom = from.options[from.selectedIndex].value;
  let convertTo = to.options[to.selectedIndex].value;
  let enteredAmount = amount.value;
  convertCurrency(enteredAmount, convertFrom, convertTo);
  amount.focus();   
});
    
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
let convertCurrency = (amount, currencyFrom, currencyTo) => {
  let fromCurrency = encodeURIComponent(currencyFrom);
  let toCurrency = encodeURIComponent(currencyTo);
  let query = `${fromCurrency}_${toCurrency}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  
  fetch(url)
  .then((res) => {
      return res.json();
  })
  .then(rates => {
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
