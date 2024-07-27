import {
  calculateCartTotal,
  getCartFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

export let cart = getCartFromLocalStorage();

export const addToCart = (event, products) => {
  // tıkladığımız ürünün idsine dataset ile eriştik
  const productID = Number(event.target.dataset.id);
  const product = products.find((product) => productID === product.id);
  // eğer tıkladığımız ürün bulunursa if bloğu içerisine girsin
  if (product) {
    const existingItem = cart.find((item) => item.id === productID);
    console.log(existingItem);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      console.log("ürün sepete ilk defa eklendi");
      //sepete ilk defa ürürn eklediğimiz için yeni eklenen ürünün miktarını obje içerisinde tanımladık
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    //localStorage dizi ekleme
    saveToLocalStorage(cart);
    // sepete eklenen ürünün a etiketini değiştirme
    event.target.textContent = "Added";

    updateCartIcon(cart);

    displayCartTotal();
  }
};

export const renderCartItems = () => {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
              <img
                width="100"
                src="${item.image}"
                alt=""
              />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id = "${item.id}"
                />
              </div>
              <h2>$${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", changeQuantity);
  }
};
const removeFromCart = (event) => {
  const productID = Number(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  //localStorage güncelleme
  saveToLocalStorage(cart);
  renderCartItems();
  //toplam fiyat güncellendi
  displayCartTotal();

  updateCartIcon(cart);
};
// Inputtaki miktar değiştiğinde çalışır
const changeQuantity = (event) => {
  const productID = Number(event.target.dataset.id);
  const quantity = Number(event.target.value);

  //inputa girilen değer 0 dan büyükse
  if (quantity > 0) {
    // cart dizisi içerisinde güncellemek istediğimiz ürünü idye göre bul
    const cartItem = cart.find((item) => item.id === productID);
    //ürün bulunduysa
    if (cartItem) {
      //bulduğumuz ürünün miktarını inputa girlen miktrala değiştirdik
      cartItem.quantity = quantity;
      //localStorage güncellendi
      saveToLocalStorage(cart);
      // toplam fiyat güncellendi
      displayCartTotal();

      updateCartIcon(cart);
    }
  }
};

export const displayCartTotal = () => {
  const cartTotalElement = document.getElementById("cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total:$${total.toFixed(2)}`;
};
