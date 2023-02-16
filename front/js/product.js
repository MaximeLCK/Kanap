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
// Création d'objet articleClient
//------------------------------------------------------------------------
// déclaration objet articleClient prêt à être modifiée 
let articleClient = {};
// id du procuit
articleClient._id = id;
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
