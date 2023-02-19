//------------------------------------------------------------------------
// Récupération de la chaine de requête dans l'url
//------------------------------------------------------------------------
// Récupération de l'url de l'id du produit
const urlParams = new URLSearchParams(window.location.search);
// Récupération de l'id du produit
const id = urlParams.get("_id");
console.log(id);

const itemImg = document.querySelector(".item__img");
const titleProduit = document.getElementById("title");
const priceProduit = document.getElementById("price");
const descriptionProduit = document.getElementById("description");
const couleurProduit = document.getElementById("colors");
const nombreProduitSelectionne = document.getElementById("quantity");

/**
 * La fonction recuperationInformationsProduits() permet d'envoyer une requête fetch HTTP
 * en prenant comme paramètre dans l'URL l'id du produit cliqué sur la page index.HTML.
 * Si la réponse est résolue. Elle est retournée en format textuel JSON et renvoie
 * une nouvelle promesse grâce à la méthode JSON. La 2nde promesse traite les données reçues par
 * l'intermédiaire d'une condition. C'est à dire que si la constante produitSelectionne est vrai donc qu'il y a des
 * données alors j'éxecute la fonction traitementData(produitSelectionne).
 */
function recuperationInformationsProduits() {

    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((objetProduits) => {
      // execution de la fontion lesProduits
      traitementData(objetProduits);
    })
    .catch((err) => {
      document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
      console.log(err);
    });
}
recuperationInformationsProduits();

/**
 * La fonction traitementData(produitSelectionne) permet de traiter les données qui sont dans la constante produitSelectionne.
 * La création de l'élément HTML <img> et d'afficher les informations du produits.
 * Le choix de la couleur se fait via la boucle for...of et permet à l'utilisateur de sélectionner la couleur du produit
 * qui lui convient.
 */
function traitementData(objetProduits) {

  document.querySelector(".item__img").innerHTML+=
        `<img src="${objetProduits.imageUrl}" alt="${objetProduits.name}">`
        
        document.querySelector("title").innerHTML+= `${objetProduits.name}`//title page
        document.querySelector("#title").innerHTML+= `${objetProduits.name}`
        document.querySelector("#price").innerHTML+= `${objetProduits.price}`
        document.querySelector("#description").innerHTML+= `${objetProduits.description}`

        for(color in objetProduits.colors){
        document.querySelector("#colors").innerHTML+= 
            `
                <option value="${objetProduits.colors[color]}">${objetProduits.colors[color]}</option>
            `
        }

    ajoutDuProduitDansPanier();
}

/**
 * La fonction ajoutDuProduitDansPanier(produitSelectionne) permet de gérer l'ajout du produit sélectionné avec la couleur choisie et
 * sa quantité dans le panier. Cet ajout se fait au clic grâce à un écouteur d'événement et il faut que la quantité soit comprise entre 0 et égal ou
 * inférieur à 100.
 * Ces informations lors du clic sur Ajouter au panier sont injecté dans le localStorage du navigateur et il y a traitement spécifique comme par exemple
 * la gestion des doublons. C'est à dire que si l'utilisateur reviens sur le même produit et choisi la même couleur mais une quantité différente. Ce produit
 * s'ajoutera à la 1ère sélection de l'utilisateur.
 */
function ajoutDuProduitDansPanier() {
    
    const ajoutProduitDansPanier = document.getElementById("addToCart");

    ajoutProduitDansPanier.addEventListener("click", function () {
        if (nombreProduitSelectionne.value > 0 && nombreProduitSelectionne.value <= 100 && nombreProduitSelectionne.value != 0) {
            let selectionDeLaCouleur = couleurProduit.value;
            let selectionDeLaQuantite = nombreProduitSelectionne.value;

            const produitsAjouteDansPanier = {
                idProduit: id,
                couleur: selectionDeLaCouleur,
                quantite: selectionDeLaQuantite,
            }
            console.log(produitsAjouteDansPanier);

            let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("panier"));

            if (selectionDeLaCouleur === "" || selectionDeLaQuantite == 0) {
              alert("Veuillez choisir une couleur et une quantité");
            } else if (selectionDeLaQuantite < 0) {
              alert("Veuillez choisir une quantité supérieure à 0");
            } else if (selectionDeLaQuantite > 100) {
              alert("Veuillez choisir une quantité inférieure à 100");
            } 

            //Import du produit dans le localStorage
            //Si le panier comporte déjà un produit.
            if (produitDansLeLocalStorage) {
                const resultat = produitDansLeLocalStorage.find((element) => element.idProduit === id && element.couleur === selectionDeLaCouleur);
                //Si le produit commandé est déjà dans le panier.
                if (resultat) {
                    let nouvelleQuantite = parseInt(produitsAjouteDansPanier.quantite) + parseInt(resultat.quantite);
                    resultat.quantite = nouvelleQuantite;
                    localStorage.setItem("panier", JSON.stringify(produitDansLeLocalStorage));
                    lienPageCart;
                    //Si le produit n'est pas dans le panier
                } else {
                    produitDansLeLocalStorage.push(produitsAjouteDansPanier);
                    localStorage.setItem("panier", JSON.stringify(produitDansLeLocalStorage));
                    lienPageCart;
                }
                //Si le panier est vide
            } else {
                produitDansLeLocalStorage = [];
                produitDansLeLocalStorage.push(produitsAjouteDansPanier);
                localStorage.setItem("panier", JSON.stringify(produitDansLeLocalStorage));
                lienPageCart
            }
        }
    });
}
