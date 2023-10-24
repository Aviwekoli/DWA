const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

// Use forEach to console log each name to the console. 
//You are allowed to call console.log seven times.
names.forEach((element) => console.log(element))

// Use forEach to console log each name with a matching province
// (for example Ashwin (Western Cape).
// Note that you are only allowed to call console.log seven times.
let matching = '';
provinces.forEach((province, index) => {
    matching += `${names[index]} (${province})\n`;
})
console.log(matching) 

// Using map loop over all province names and 
// turn the string to all uppercase.
// Log the new array to the console.
const provincesUpperCase = provinces.map( province => province.toUpperCase() );
console.log (provincesUpperCase)

// Create a new array with map that has the amount of characters in each name.
// The result should be: [6, 9, 11, 5, 7, 7]
const nameLength = names.map( name => name.length )
console.log(nameLength)

// Using toSorted to sort all provinces alphabetically.
const provincesAlphabetically = provinces.toSorted();
console.log(provincesAlphabetically);

// Use filter to remove all provinces that have the word Cape in them.
// After filtering the array, return the amount of provinces left. 
//The final value should be 3
const reg = /cape/i;
const filteredLength = provinces.filter(
  province => !(reg.test(province))).length

console.log(filteredLength);

// Create a boolean array by using map and some to determine whether 
//a name contains an S character. 
//The result should be [true, true, false, true, true, false]
const newArr = names.map(name => name.toLowerCase().split('')
                    .some(char => char.includes('s'))
);
console.log(newArr)

// Using only reduce, turn the above into an object
// that indicates the province of an individual.
const obj = names.reduce((acc, name, index) => {
    acc[name] = provinces[index];
    return acc
}, {})
console.log(obj)

// BONUS (Additional Exercises)
const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];

// Use forEach to console.log each product name to the console.
products.forEach(obj => console.log(obj.product));

// Use filter to filter out products that have a name longer than 5 characters
console.log(products.filter(obj => (obj.product).length > 5));

// Using both filter and map. 
// Convert all prices that are strings to numbers, 
// and remove all products from the array that do not have prices.
// After this has been done then use reduce to calculate the combined price of all remaining products.
console.log( products
  .filter(obj => typeof (obj.price) === 'string')
  .map(obj => Number(obj.price))
  .reduce((total, price) => total + price, 0)
);

// Use reduce to concatenate all product names to create the following string:
// banana, mango, potato, avocado, coffee and tea.
console.log(
  products.reduce((acc, obj, index, array) => 
    index === array.length -1 ? acc + 'and ' + obj.product :
    index === array.length - 2 ? acc + obj.product + ', ' :
    acc + obj.product + ', ', '')
);

// Use reduce to calculate both the highest and lowest-priced items. 
// The names should be returned as the following 
//string: Highest: coffee. Lowest: banana.

const result = products.reduce((acc, currentProduct) => {
  const price = parseInt(currentProduct.price);

  if (!isNaN(price) && price > acc.highestPrice) {
    acc.highestProduct = currentProduct.product;
  }

  if (!isNaN(price) && price < acc.lowestPrice) {
    acc.lowestPrice = price;
    acc.lowestProduct = currentProduct.product;
  }

  return acc;
}, { highestPrice: -Infinity, lowestPrice: Infinity });

console.log(`Highest: ${result.highestProduct}. Lowest: ${result.lowestProduct}.`);

// Using only Object.entries and reduce recreate the object with the exact same values.
// However, the following object keys should be changed in the new array:
// product should be changed to name
// price should be changed to cost
console.log(
  products.reduce((acc, obj) => {
    acc.push(
      Object.entries(obj).reduce((obj, [key, value]) => {
        obj[key === 'product' ? 'name' : key === 'price' ? 'cost' : key] = value;
        return obj;
      }, {})
    );
    return acc;
  }, [])
);