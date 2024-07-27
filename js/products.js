export const fetchProducts = async () => {
  try {
    // db.json istek atıldı
    const response = await fetch("db.json");
    // hata olursa yani hata oluştur
    if (!response.ok) {
      throw new Error("Üzgünüz bir hata oluştu");
    }
    //veriyi json a çevir dışarı aktar
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const renderProducts = (products, addToCartCallback) => {
  const productlist = document.getElementById("productList");
  productlist.innerHTML = products
    .map(
      (product) => `
    <div class="product">
        <img
            src="${product.image}"
            class="product-img"
        />
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${product.price}$</p>
            <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
        </div>
    </div>`
    )
    .join("");

  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", (event) =>
      addToCartCallback(event, products)
    );
  }
};
