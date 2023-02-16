//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
  // quand tu as la réponse donne le résultat en json.
  .then((res) => res.json())
  // ce résultat en json est stocké dans la variable products.
  .then((produits) => {
    // informations sur la console sous forme de tableau
    console.table(produits); 
    // appel de la fonction d'affichage des produits
    affichageProduits(produits);
  })
  // si erreur on remplace le contenu de titles par un h1 "erreur 404" et renvoit l'erreur sur la console.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>";
    console.log(err);
  });
//----------------------------------------------------------------------
// Fonction pour la structure HTML du produit sur index.html
//----------------------------------------------------------------------
function affichageProduits(index) {
  // déclaration de variable pour la position des produits
  const positionProduits = document.querySelector("#items");
  // Boucle pour afficher les produits sur la page index.html
  for (let structureProduits of index) {
    // Afficher les produits sur la page index
    positionProduits.innerHTML += `<a href="./product.html?_id=${structureProduits._id}">
    <article>
      <img src="${structureProduits.imageUrl}" alt="${structureProduits.altTxt}">
      <h3 class="productName">${structureProduits.name}</h3>
      <p class="productDescription">${structureProduits.description}</p>
    </article>
  </a>`;
  }
}
//------------------------------------------------------------------------