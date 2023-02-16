//------------------------------------------------------------------------
// Récupération de la chaine de requête dans l'url
//------------------------------------------------------------------------
const queryString_url_id = window.location.search;
// Récupération de l'url de l'id du produit
const urlSearchParams = new URLSearchParams(queryString_url_id);
// Récupération de l'id du produit
const _id = urlSearchParams.get("_id");
console.log(_id);
// -----------------------------------------------------------------------
// Requête pour récupérer les données du produit
// ------------------------------------------------------------------------
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
    // execution de la fontion lesProduits
    lesProduits(objetProduits);
  })
  .catch((error) => {
    document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>";
    console.log(error);
  });

//------------------------------------------------------------------------
// Fonction pour la structure HTML du produit sur product.html
//------------------------------------------------------------------------
function lesProduits(produit) {
    // déclaration de variable pour la position des produits
    const positionProduits2 = document.querySelector("#item");
