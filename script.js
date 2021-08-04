let tabproduit = [

    { id: 1, libelle: "PC HP", prix: 270000, stock: 10, chemin: "image/images.png", class: "pc" },
    { id: 2, libelle: "IPAD", prix: 300000, stock: 10, chemin: "image/images1.png", class: "ipad" },
    { id: 3, libelle: "IPHONE", prix: 500000, stock: 10, chemin: "image/images2.png", class: "iphone" },
    { id: 4, libelle: "AIRPOD", prix: 10000, stock: 10, chemin: "image/images3.png", class: "airpod" },
    { id: 5, libelle: "SOURIS", prix: 4000, stock: 10, chemin: "image/images4.png", class: "souris" },
    { id: 6, libelle: "CHARGEUR", prix: 5000, stock: 10, chemin: "image/images5.png", class: "chargeur" },
];

let tablepro = [];



const produit = document.getElementById("produit")
const list = document.getElementById("list");
const tab = document.getElementById("tab");
const total = document.getElementById("total");
const desactive = document.getElementById("desactive");
const nom = document.getElementById("nom");
const Adresse = document.getElementById("Adresse");
const telephone = document.getElementById("telephone");
const erreur = document.querySelector(".erreur");
const com = document.querySelector("#com");
const tot = document.querySelector("#tot");
const pdf = document.querySelector("#pdf");
const table = document.querySelector("#table");
const recupere = document.querySelector("#recupere");
const btn = document.querySelector("#btn");



function loadproduit() {
    var html = `<div class="row">`;
    tabproduit.forEach(image => {

        html += `
            
            <div class="col-md-4 mb-2">

            <div class="card">
                <img src="${image.chemin}" height="200" style="border:2px solid white" alt="">
                <div class="card-footer" style="border:2px solid white">
                    <h6>${image.libelle} </h6>
                    <h6>prix:${image.prix}</h6>
                    <h6>stock:${image.stock}</h6> 
                 <a href="#list">  <button  onClick ="Ajout('${image.id}')" class="btn btn-success" >AJOUTER </button></a>
                 <a href="#list">  <button style="display: none;" onClick ="Modifier('${image.id}')" class="btn btn-warning">MODIFIER </button></a>
                 <input type="number" min="1" max="10" value="1" class="${image.class}" >
        
                </div>
                </div>
                </div>`

    });

    html += "</div>";
    produit.innerHTML += html;

}

let somme = 0;
let totale = 0;
let quantite = 0;

function Ajout(e) {

    list.removeAttribute("hidden");

    tabproduit.forEach(element => {



        if (element.id == e) {
            let input = document.querySelector("." + element.class);
            quantite = input.value;
            somme = element.prix * quantite;

            totale += somme;


            input.parentNode.children[3].children[0].style.display = 'none';
            input.parentNode.children[4].children[0].style.display = 'block';
            //input.setAttribute("disabled", "");
            input.parentNode.children[2].innerHTML = "stock: " + (element.stock - quantite);

        }

    });



    var vert = `<tr>`;
    tabproduit.forEach(element => {
        if (e == element.id) {
            vert += `
        
        <td>${element.libelle}</td>
        <td>${element.prix}</td>
        <td id="qt-${element.id}">${quantite}</td>
        <td id="sm-${element.id}">${somme}</td>
        `;
            tablepro.push(element);
        }

    });
    vert += "</tr>";
    tab.innerHTML += vert;

    total.innerHTML = totale;

}

function Modifier(e) {

    tabproduit.forEach(element => {

        if (element.id == e) {
            let input = document.querySelector("." + element.class);
            input.removeAttribute('disabled');
            let _quantite = document.querySelector('#qt-' + element.id);
            let _somme = document.querySelector('#sm-' + element.id);

            let _total = total.innerHTML;
            totale = _total - _somme.innerHTML;

            quantite = input.value;
            somme = element.prix * quantite;

            totale += somme;

            _quantite.innerHTML = quantite;
            _somme.innerHTML = somme;
            total.innerHTML = totale;

        }

    });

}


// pour bouton valide


function btnvalide() {


    if (Adresse.value.trim() == "" || telephone.value.trim() == "") {
        erreur.removeAttribute("hidden");
    }
    else {
        const info = document.getElementById("info");
        erreur.setAttribute("hidden", "");


        commande.removeAttribute("hidden");


        let client = [{ nom: nom.value, Adresse: Adresse.value, telephone: telephone.value }];
        let boir = `<div`
        client.forEach(cli => {
            boir +=
                `<label for=""  class="form-label"><font face="times new roman"> NomCompet : <b> ${cli.nom}</b> </font></label><br>
                <label for=""  class="form-label"> <font face="times new roman"> Adresse :  <b> ${cli.Adresse}</b>  </font></label><br>
                <label for=""  class="form-label"> <font face="times new roman"> Telephone :  <b> ${cli.telephone} </b>  </font> </label><br><hr> 
                <h3>Article de commande</h3>
                `

        })
        boir += "</div>"
        info.innerHTML = boir;

        var test = table.outerHTML;
        recupere.innerHTML = test;
        console.log(typeof (test));
    }
}

function btnvalid(e) {

    const pdf = document.querySelector("#pdf");
    html2pdf(pdf);
    btn.setAttribute("hidden", "");
}






