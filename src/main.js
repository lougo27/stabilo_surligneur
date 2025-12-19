import { createClient } from "@supabase/supabase-js";

class Home {
  //fonction lancée à la création de la classe
  constructor() {
    this.initSupabase();
    this.getDataCouleur();
    // this.getDataType();
    this.carteStabilo = "";
    this.imageStabilo = "";
    this.description = "";
    this.couleurDiv = "";
    this.colorBox = "";
    this.couleurCode = "";
    this.hex = "";
    this.rgb = "";

    this.divCartes = document.getElementById('conteneur_images');
  }

  initSupabase() {
    this.superbase = createClient(
      'https://ooiqcapsnvhygzllwxya.supabase.co',
      'sb_publishable_UWU5Qu_447PWbMS-8wdqdQ_3IYaPbYl'
    );
    console.log(this.superbase)

  }
  
  async getDataCouleur() {
    // Liée la ligne id_modele de la table couleur à la ligne id_modele de la table type
    const { data, error } = await this.superbase
      .from('couleur')
      .select('*, type(id_modele, modele)');
      
    console.log(data);

    data.forEach(ligne => {
      this.carte(ligne);
    });
  }

  carte (ligne) {
    //Creer la carte
      this.carteStabilo = document.createElement('div');
      this.carteStabilo.classList.add('carte');

      //Creer l'image du stabilo
      this.imageStabilo = document.createElement('img');
      this.imageStabilo.src = ligne.image;

      //Creer la div de la description
      this.description = document.createElement('div');
      this.description.classList.add('description');
      // Nom du modèle
      this.modele = document.createElement('h3');
      this.modele.textContent = ligne.type.modele;
      // Nom de la couleur
      this.couleurNom = document.createElement('h3');
      this.couleurNom.textContent = ligne.nom_couleur;
      this.description.appendChild(this.modele);
      this.description.appendChild(this.couleurNom);

      //Creer la div de la couleur
      this.couleurDiv = document.createElement('div');
      this.couleurDiv.classList.add('couleur');
      // Box de la couleur
      this.colorBox = document.createElement('div');
      this.colorBox.classList.add('color-box');
      this.colorBox.style.backgroundColor = ligne.code_hexadecimal;
      // div Code de la couleur
      this.couleurCode = document.createElement('div');
      this.couleurCode.classList.add('couleur_code');
      // Code hexadécimal
      this.hex = document.createElement('p');
      this.hex.textContent = ligne.code_hexadecimal;
      // Code RVB
      this.rgb = document.createElement('p');
      this.rgb.textContent = "RVB " + ligne.code_RVB;

      // Bouton Edit
      this.editButton = document.createElement('button');
      this.editButton.classList.add('edit-button');
      this.editIcon = document.createElement('img');
      this.editIcon.src = '/public/images/crayon_rouge.png';
      this.editIcon.alt = 'Edit';
      this.editButton.appendChild(this.editIcon);

      // Bouton croix 
      this.deleteButton = document.createElement('button');
      this.deleteButton.classList.add('delete-button');
      this.deleteButton.textContent = 'X';
      this.carteStabilo.appendChild(this.deleteButton);

      //TOUS LES APPEND CHILD
      this.couleurCode.appendChild(this.hex);
      this.couleurCode.appendChild(this.rgb);

      this.couleurDiv.appendChild(this.colorBox);
      this.couleurDiv.appendChild(this.couleurCode);

      this.carteStabilo.appendChild(this.imageStabilo);
      this.carteStabilo.appendChild(this.description);
      this.carteStabilo.appendChild(this.couleurDiv);
      this.carteStabilo.appendChild(this.editButton);

      if (ligne.image != null) 
      this.divCartes.appendChild(this.carteStabilo);

    } 
  

  

  // async getDataType() {
  //   const {data, error} = await this.superbase
  //     .from('type')
  //     .select();
      
  //   console.log(data);
  // }
}

new Home()




