//------------------------------------------------------------------------
// Fonction pour la structure HTML du panier sur cart.html
//------------------------------------------------------------------------
async function affichagePanier() {
    const listCart = JSON.parse(localStorage.getItem("panier"));
    if (listCart != null) {
        for (key in listCart) {
          if (listCart[key].id != undefined) {
            const rep = await fetch(
              "http://localhost:3000/api/products/" + listCart[key].id
            );
            const repCart = await rep.json();
  // déclaration de variable pour la position des produits dans le panier
  const panierList = document.querySelector("#cart_items");
  // Afficher les produits sur la page cart
  panierList.innerHTML += 
  `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
            <img src="${repCart.imageURL}" alt="${repCart.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${repCart.name}</h2>
                <p>${listCart[key].color}</p>
                <p>${repCart.price * listCart[key].quantity}</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>${listCart[key].quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
         </div>
    </article>`;
  }
}
    }
}
//------------------------------------------------------------------------