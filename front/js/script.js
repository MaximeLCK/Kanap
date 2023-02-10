//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------ 
fetch("http://localhost:3000/api/products")
  // quand tu as la réponse donne le résultat en json.
  .then((res) => res.json())
  // ce résultat en json est stocké dans la variable objetProduits.
  .then((objetProduits) => {
    // informations sur la console sous forme de tableau
    console.table(objetProduits); 
  })
  // si erreur on remplace le contenu de titles par un h1 "erreur 404" et renvoit l'erreur sur la console.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur récupération produits api:" + err);
  });
