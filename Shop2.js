if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready) //
} else {
  ready()
}

//   check to see if the body has been loaded/loading

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)  
      // when user clicks on remove btn, the program is told to remove the item
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      
      var input = quantityInputs[i]
      // whichever iteration of the loop we on, it will get that element from that array 
      //so quantityInputs[i] is going to be each one of our inputs we r gg to have.
      
      input.addEventListener('change', quantityChanged)
      //by putting 'change', it will listen anytime the input changes its value.
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) { //.haschildnodes mean is there any item (children) inside the cart
      cartItems.removeChild(cartItems.firstChild)
      // to remove everything from the cart when purchase id clicked
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove() 
  // parentElement refers to the class= "cart-row". remove () will remove the entir row wen clicked
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target // target is the actual input element tht we need
  if (isNaN(input.value) || input.value <= 0) { // check to see if the input is a valid number or not. || = or
      input.value = 1
  }
  updateCartTotal() 
  // when this fuction is called, everything under this fuction will be executed
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement // is the shop-item
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText // .innerText is to get the name tht comes with the item sold
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText // .innerText is to print/get the price of the item
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src //get the source attribute instead of text, since img does not hv text
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  //.createElements allow to create an element of any type we want
  //.createElement('div') will create a new div tht is not in the HTML
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  // checks to see if the item oredi exists inside the cart b4 adding it in
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
          // will immediately end the code and will not execute the code below this
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
           <img class="cart-item-image" src="${imageSrc}" width="100" height="100"> 
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  //.innerHTML bcos html tags are used instead of normal texts
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
//${imageSrc} / ${title} / ${price} anything that is going to be a variable tht will be evaluated

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0] 
  //.getElementsByClassName returns 'cart-items' as an array, but only want the 1st element inside the array,,done by inserting [0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  // to get the 'cart-rows' that are in the 'cart-items'
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      
      var cartRow = cartRows[i]
      // whichever row we are currenty on , inside this array is wats inside the [i]
      
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      // to get the element that contains the price and get the 1st element only
      
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      // to get the element that contains the quantity and get the 1st element only
      
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      // innerText will get watever text is inside the element , which is the price
      //.replace('$','') is to remove the $ sign form the number so that arithmetic operations can be done on this number
     
      var quantity = quantityElement.value
      // .value is to get the value inside the input( inputs do not have a text inside them)

      total = total + (price * quantity)
      // calc the orignial price after removing item
      // will add total to (price x quantity) everytime....bcos its in a loop
  }
  total = Math.round(total * 100) / 100 //round off th etotal price to nearest whole number and 2dp
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  //display the updated total price 
}