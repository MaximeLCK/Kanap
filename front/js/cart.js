//*--------------------------------------------------------------
//* MAIN | Variables / Constantes / Appels de Fonctions
//*--------------------------------------------------------------
// Formulaire : Écoute des inputs pour contrôle validité
listenToForm()

//*------------------------------------------------------------------------
//* FETCH | Récupération et Transmission des données de l'API
//*------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
    // Obtention des données de l'API => conversion du résultat en .json
    .then((res) => res.json())
    // Les données sont transmises sous forme de paramètre : "products" [...]     
    .then((products) => {
        console.log("API :", products)
        // Appel de la fonction "getProducts" + paramètre "products"
        getPurchaseData(products)
    })
    // Si ERREUR : Affichage via HTML + console
    .catch((err) => {
        document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>"
        console.log("API - erreur 404 : " + err)
    })

//*---------------------------------------------------------------------
//* Récupération/Ajout des données non-stockées dans le Local Storage
//*---------------------------------------------------------------------
function getPurchaseData(products) {
    // Récupération de notre panier "Cart"
    const myCart = JSON.parse(localStorage.getItem("Cart"));
    // Si mon panier n'est pas vide [...]
    if (myCart != null) {
        // Boucle sur les produits du panier 
        for (let purchase of myCart) {
            // Boucle sur les produits de l'API
            for (let a = 0, b = products.length; a < b; a++) {
                // Si id produit PANIER = id produit API
                if (purchase.id === products[a]._id) {
                    // Récupération des informations manquantes
                    purchase.name = products[a].name;
                    purchase.price = products[a].price;
                    purchase.imageUrl = products[a].imageUrl;
                    purchase.altTxt = products[a].altTxt;
                    purchase.description = products[a].description;
                }
            }
        }
        // Affichage console : 
        // "myCart" possède les valeurs du Local Storage + celles récupérées au dessus
        // Les valeurs récupérées ne sont pas envoyées au Local Storage
        console.log("Panier :", myCart)
        // Appel de la fonction "hydrateCart" + paramètre "myCart" qui cumule les valeurs
        hydrateCart(myCart);
    }
    else {
        // Si le Panier est vide : 
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML =
            "Vous n'avez pas d'article dans votre panier";
    }
}

//*--------------------------------------------------------------
//* Affichage du Panier
//* --------------------------------------------------------------
function hydrateCart(myCart) {
    // Déclaration + Pointage de la zone d'affichage du Panier
    const cartArea = document.querySelector("#cart__items");
    // Création du HTML dynamique : Méthode .map() + introduction de data-set
    cartArea.innerHTML += myCart.map((purchase) =>
        `<article class="cart__item" data-id="${purchase.id}" data-color="${purchase.color}" data-quantity="${purchase.quantity}" data-price="${purchase.price}"> 
            <div class="cart__item__img">
                <img src="${purchase.imageUrl}" alt="${purchase.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${purchase.name}</h2>
                    <span>Couleur : ${purchase.color}</span>
                    <p data-price="${purchase.price}">Prix : ${purchase.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${purchase.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${purchase.id}" data-color="${purchase.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    ).join("")
    // ".join()" permet de définir la jonction entre chaque <article> affiché
    // Par défaut c'est une virgule, on la remplace par un espace vide
}


//* --------------------------------------------------------------
//* Modification de la Quantité d'un Produit
//* --------------------------------------------------------------
function updateQuantity() {
    // Déclaration + Pointage de tous les éléments ".cart__item"
    const cartArea = document.querySelectorAll(".cart__item");

    // Écoute des évènements (eQuantity) sur chaque article (".itemQuantity")
    cartArea.forEach((purchase) => {
        purchase.addEventListener("change", (eQuantity) => {
            const myCart = JSON.parse(localStorage.getItem("Cart"))
            // Boucle sur les produits du Panier
            for (product of myCart)
                if (
                    // Si id + color similaires
                    product.id === purchase.dataset.id &&
                    purchase.dataset.color === product.color
                ) {
                    // Modification de la quantité
                    product.quantity = Math.min(eQuantity.target.value, 100)
                    // Envoi au Local Storage
                    localStorage.Cart = JSON.stringify(myCart)
                    // Mise à jour du dataset quantity
                    purchase.dataset.quantity = eQuantity.target.value
                    // Appel de la fonction de Total dynamique
                    totalCart();
                }
            console.log("Article modifié :", product.name, purchase.dataset.color)
            console.log("Panier mis à jour :", myCart)
        })
    })
}

//*--------------------------------------------------------------
//* Calcul et Affichage du Total Panier : Quantité + Prix
//*--------------------------------------------------------------
function totalCart() {
    // Déclaration des variables de "Total" en tant que Number
    let totalProducts = 0
    let totalPrice = 0
    // Déclaration + Pointage de tous les éléments ".cart__item"
    const purchases = document.querySelectorAll(".cart__item")
    // Boucle : pour chaque élément "purchase" des purchaseS
    purchases.forEach((purchase) => {
        // Récupération des quantités des produits via les dataset
        totalProducts += JSON.parse(purchase.dataset.quantity)
        // Calcul de prix panier total via les dataset
        totalPrice += purchase.dataset.quantity * purchase.dataset.price
    });
    // Affichage des résultats dans le HTML
    document.getElementById("totalQuantity").textContent = totalProducts
    document.getElementById("totalPrice").textContent = totalPrice
}
