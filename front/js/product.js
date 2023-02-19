//------------------------------------------------------------------------
// Récupération de la chaine de requête dans l'url
//------------------------------------------------------------------------

// console.log(id);
// -----------------------------------------------------------------------
// Requête pour récupérer les données du produit
// ------------------------------------------------------------------------

ajouthtml();
function ajouthtml(){
  // Récupération de l'url de l'id du produit
const urlParams = new URLSearchParams(window.location.search);
// Récupération de l'id du produit
const idURL = urlParams.get("id");
  const response = fetch("http://localhost:3000/api/products/"+idURL);
const result = response.json();
    document.querySelector(".item__img").innerHTML+=
        `<img src="${result.imageUrl}" alt="${result.name}">`
        
        document.querySelector("title").innerHTML+= `${result.name}`//title page
        document.querySelector("#title").innerHTML+= `${result.name}`
        document.querySelector("#price").innerHTML+= `${result.price}`
        document.querySelector("#description").innerHTML+= `${result.description}`

        for(color in result.colors){
        document.querySelector("#colors").innerHTML+= 
            `
                <option value="${result.colors[color]}">${result.colors[color]}</option>
            `
        }
}

        



//   // Conditions de validation du panier COULEUR & QUANTITE
// if (articleClient.couleur === "" || articleClient.quantite == 0) {
//   alert("Veuillez choisir une couleur et une quantité");
// } else if (articleClient.quantite < 0) {
//   alert("Veuillez choisir une quantité supérieure à 0");
// } else if (articleClient.quantite > 100) {
//   alert("Veuillez choisir une quantité inférieure à 100");
// } 





// //------------------------------------------------------------------------
// // Fonction pour la structure HTML du produit sur product.html
// //------------------------------------------------------------------------
// function affichageProduits(product) {
//     // déclaration des variables pour la position des produits
//     let prix = document.querySelector("#price");
//     let description = document.querySelector("#description");
//     let imgProduit = document.querySelector(".item__img");
//     let titreProduit = document.querySelector("#title");
//     let couleurChoix = document.querySelector("#colors");
//     let titrePage = document.querySelector("title");

//     // Boucle pour afficher les produits sur la page product.html
//     for (let param of product) {
//       if (id === param._id) {
//         imgProduit.innerHTML = `<img src="${param.imageUrl}" alt="${param.altTxt}">`;
//         titreProduit.innerHTML = `${param.name}`;
//         prix.innerHTML = `${param.price}`;
//         description.innerHTML = `${param.description}`;
//         titrePage.innerHTML = `${param.name}`;

//     // Boucle pour afficher les couleurs du produit
//     for (let couleur of param.colors) {
//       couleurChoix.innerHTML += `<option value="${couleur}">${couleur}</option>`;
//     }
//   }
// }
// console.log("affichage produits ok");
// }
// //------------------------------------------------------------------------
// // Déclaration de la variable avec les éléments du panier 
// //------------------------------------------------------------------------
// // let articleClient = {};
 
// //------------------------------------------------------------------------
// // Bouton ajouter au panier
// //------------------------------------------------------------------------
// // Sélection du bouton ajouter au panier
// const btnPanier = document.querySelector("#addToCart");
// // Ecoute du bouton ajouter au panier
// if (btnPanier != null) { btnPanier.addEventListener("click", (e) => {
//   // Empêche le rechargement de la page
//   e.preventDefault();
//    // Récupération de la couleur choisie
//    const couleur = document.querySelector("#colors").value;
//    // Récupération de la quantité choisie
//    const quantite = document.querySelector("#quantity").value;
//    // Récupération de l'id du produit
//    _id = id;
//     // Return de la fonction des conditions de validation du panier
//   if (commandeInvalide()) return;
//    // Appel de la fonction sauvegardeParnier
//    sauvegardePanier();
// }
// )};
// //------------------------------------------------------------------------
// // Fonction ajout du produit au panier
// //------------------------------------------------------------------------
//  function sauvegardePanier() {
//   // Récupération de l'objet articleClient dans le local storage
//   let produitLS = JSON.parse(localStorage.getItem("panier"));
//   // Si le panier est vide
//   if (produitLS == null) {
//     // Création d'un tableau
//     produitLS = [];
//     // Ajout de l'objet articleClient dans le tableau
//     produitLS.push(articleClient);
//     // Ajout du tableau dans le local storage
//     localStorage.setItem("panier", JSON.stringify(produitLS));
//   } else {
//     // Ajout de l'objet articleClient dans le tableau
//     produitLS.push(articleClient);
//     // Ajout du tableau dans le local storage
//     localStorage.setItem("panier", JSON.stringify(produitLS));
//   }
// }
// //------------------------------------------------------------------------
// // Fonction des Conditions de validation du panier COULEUR & QUANTITE
// //------------------------------------------------------------------------
//   function commandeInvalide() {
//   if (articleClient.couleur === "" || articleClient.quantite == 0) {
//     alert("Veuillez choisir une couleur et une quantité");
//   } else if (articleClient.quantite < 0) {
//     alert("Veuillez choisir une quantité supérieure à 0");
//   } else if (articleClient.quantite > 100) {
//     alert("Veuillez choisir une quantité inférieure à 100");
//   } return true; 
// }



  // // Affichage du nombre d'articles dans le panier
  // document.querySelector("#cart span").innerHTML = panier.length;
  // // Affichage de la confirmation d'ajout au panier
  // document.querySelector("#confirmation").innerHTML = "Produit ajouté au panier";

