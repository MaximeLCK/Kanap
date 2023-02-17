//------------------------------------------------------------------------
// Récupération de la chaine de requête dans l'url
//------------------------------------------------------------------------
// Récupération de l'url de l'id du produit
const urlParams = new URLSearchParams(window.location.search);
// Récupération de l'id du produit
const id = urlParams.get("_id");
// console.log(id);
// -----------------------------------------------------------------------
// Requête pour récupérer les données du produit
// ------------------------------------------------------------------------
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((produits) => {
    // execution de la fontion lesProduits
    affichageProduits(produits);
  })
  .catch((err) => {
    document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>";
    console.log(err);
  });
//------------------------------------------------------------------------
// Fonction pour la structure HTML du produit sur product.html
//------------------------------------------------------------------------
function affichageProduits(product) {
    // déclaration des variables pour la position des produits
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let imgProduit = document.querySelector(".item__img");
    let titreProduit = document.querySelector("#title");
    let couleurChoix = document.querySelector("#colors");
    let titrePage = document.querySelector("title");

    // Boucle pour afficher les produits sur la page product.html
    for (let param of product) {
      if (id === param._id) {
        imgProduit.innerHTML = `<img src="${param.imageUrl}" alt="${param.altTxt}">`;
        titreProduit.innerHTML = `${param.name}`;
        prix.innerHTML = `${param.price}`;
        description.innerHTML = `${param.description}`;
        titrePage.innerHTML = `${param.name}`;

    // Boucle pour afficher les couleurs du produit
    for (let couleur of param.colors) {
      couleurChoix.innerHTML += `<option value="${couleur}">${couleur}</option>`;
    }
  }
}
console.log("affichage produits ok");
}
//------------------------------------------------------------------------
// Panier
//------------------------------------------------------------------------
// Sélection du bouton ajouter au panier
const btnPanier = document.querySelector("#addToCart");
// Ecoute du bouton ajouter au panier
btnPanier.addEventListener("click", (e) => {
  // Empêche le rechargement de la page
  e.preventDefault();
//------------------------------------------------------------------------
// Gestion du Panier & Local Storage
//------------------------------------------------------------------------
// Déclaration de la variable avec les éléments du panier 
let articleClient = {};
  // Récupération de la couleur choisie
  articleClient.couleur = document.querySelector("#colors").value;
  // Récupération de la quantité choisie
  articleClient.quantite = document.querySelector("#quantity").value;
  // Récupération de l'id du produit
  articleClient._id = id;
  // Récupération de l'objet articleClient dans le local storage
  let produitLS = JSON.parse(localStorage.getItem("panier"));
  // Si le panier est vide
  if (produitLS == null) {
    // Création d'un tableau
    produitLS = [];
    // Ajout de l'objet articleClient dans le tableau
    produitLS.push(articleClient);
    // Ajout du tableau dans le local storage
    localStorage.setItem("panier", JSON.stringify(produitLS));

  } else {
    // Ajout de l'objet articleClient dans le tableau
    produitLS.push(articleClient);
    // Ajout du tableau dans le local storage
    localStorage.setItem("panier", JSON.stringify(produitLS));
  }
  // Conditions de validation du panier COULEUR & QUANTITE
if (articleClient.couleur === "" || articleClient.quantite == 0) {
  alert("Veuillez choisir une couleur et une quantité");
} else if (articleClient.quantite < 0) {
  alert("Veuillez choisir une quantité supérieure à 0");
} else if (articleClient.quantite > 100) {
  alert("Veuillez choisir une quantité inférieure à 100");
} 


});




  // // Affichage du nombre d'articles dans le panier
  // document.querySelector("#cart span").innerHTML = panier.length;
  // // Affichage de la confirmation d'ajout au panier
  // document.querySelector("#confirmation").innerHTML = "Produit ajouté au panier";

