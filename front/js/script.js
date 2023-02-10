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
  });
