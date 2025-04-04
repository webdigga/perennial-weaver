/*
  Get product name form URL so we can use it in the form
*/
function getProductName() {

  const searchParams = new URLSearchParams(window.location.search).get("product");

  if(searchParams) {

    const formattedProductName = searchParams.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    const productInput = document.querySelector('[data-test="product"]');

    if(productInput) {
      productInput.value = formattedProductName;
    }
  }
}

getProductName();

if (typeof module === 'object') {
  module.exports = getProductName;
}