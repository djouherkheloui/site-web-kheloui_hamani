let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Ajouter un produit au panier
function ajouterAuPanier(nom, prix) {
  if (!nom || prix === undefined) {
    console.error("Nom ou prix manquant !");
    return;
  }

  const index = panier.findIndex(p => p.nom === nom);
  if (index !== -1) {
    panier[index].qnte += 1;
  } else {
    panier.push({ nom, prix, qnte: 1 });
  }

  localStorage.setItem("panier", JSON.stringify(panier));
  alert(nom + " ajouté au panier !");
}

// Afficher le panier dans la page panier.html
function afficherPanier() {
  const tbody = document.getElementById("panier-items");
  const totalElement = document.getElementById("total");

  if (!tbody || !totalElement) return;

  tbody.innerHTML = "";
  let total = 0;

  panier.forEach(produit => {
    const ligne = document.createElement("tr");
    const sousTotal = produit.qnte * produit.prix;
    ligne.innerHTML = `
      <td>${produit.nom}</td>
      <td>${produit.qnte}</td>
      <td>${produit.prix} DA</td>
      <td>${sousTotal} DA</td>
    `;
    tbody.appendChild(ligne);
    total += sousTotal;
  });

  totalElement.textContent = total + " DA";
}

// Vider le panier
function viderPanier() {
  if (confirm("Voulez-vous vraiment vider le panier ?")) {
    panier = [];
    localStorage.removeItem("panier");
    afficherPanier();
    alert("Votre panier est maintenant vide.");
  }
}

// Confirmer la commande
function confirmerCommande() {
  if (panier.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  if (confirm("Confirmez-vous votre commande ?")) {
    panier = [];
    localStorage.removeItem("panier");
    afficherPanier();
    alert("Merci pour votre achat !");
  }
}

// Pour les pages produits : ajouter les boutons
document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".produit button");
  boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
      const parent = bouton.closest(".produit");
      const nom = parent.querySelector("h3").textContent;
      const prixTexte = parent.querySelector("p").textContent;
      const prix = parseInt(prixTexte.replace(/\D/g, ""));
      ajouterAuPanier(nom, prix);

      // Rediriger vers panier
      window.location.href = "panier.html";
    });
  });

  afficherPanier(); // au cas où on est dans panier.html
});

