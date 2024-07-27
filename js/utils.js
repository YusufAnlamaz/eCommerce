export const saveToLocalStorage = (cart) => {
  // dışarıdan gelen ürünü stringe çevirip localStorage ekledik
  localStorage.setItem("cart", JSON.stringify(cart));
};
// localStorage da veri varsa getir yoksa boş bir dizi döndür
export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};
export const calculateCartTotal = (cart) => {
  /*
  // reduce diziyi tek bir parametreye indirgemek için kullanılır
  //birinci  parametre olarak callback fonksiyon çağırılır bu fonksiyonun parametresine her bir öğenin toplam maliyete eklenmesi i.in kullanılan matematiksel işlemdir
  //ikinci parametre reduce fonksiyonunun başlangıç değeridir 
  */
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const updateCartIcon = (cart) => {
  const cartIcon = document.getElementById("cart-icon");
  const i = document.querySelector(".bx-shopping-bag");
  let totalQantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  i.setAttribute("data-quantity", totalQantity);
};
