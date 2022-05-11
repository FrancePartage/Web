# FrancePartage WEB

Frontend pour la plateforme FrancePartage utilisant le framework NextJS

## Installation (DEV)

- ```npm install```
- ```npm run dev```

## Installation (PROD)

- ```npm install```
- ```npm run build```
- ```npm run start```

## Todo

### Général

- [ ] Rechercher des ressources
- [ ] Rechercher des relations

### Authentification

- [x] Inscription
- [x] Connexion
- [x] Deconnexion
- [X] Rafraichir les tokens

 ### Utilisateurs

 - [ ] Changer son avatar
 - [ ] Changer son mot de passe
 - [ ] Changer ses informations
 - [ ] Consulter un utilisateur

### Ressources

- [x] Ajouter une ressource
- [x] Systeme d'upload d'image dans Quill
- [ ] Afficher les ressources sur la page principale (infinite scroll)
- [ ] Consulter une ressource
- [ ] Like/Dislike une ressource
- [ ] Afficher les commentaires d'une ressource (pagination)
- [ ] Afficher les ressources d'un utilisateur

### Relations

- [ ] Envoyer une demande d'ajout de relation
- [ ] Afficher les requetes reçues
- [ ] Accepter/refuser une requete
- [ ] Afficher les relations d'un utilisateur
- [x] Afficher les suggestions sur le feed

### Administration

- [ ] Afficher les utilisateurs (pagination)
- [ ] Changer le role d'un utilisateur
- [ ] Bannir un utilisateur
- [ ] Afficher les ressources (pagination)
- [ ] Changer le statut d'une ressource

### Bugs

- [x] Corriger l'id différent entre le client et le serveru dans les forms lors du rechargement d'une page
- [ ] Corriger le layout pour les pages de connexion et d'inscription
- [x] Probleme d'insertion de contenu dans l'input Quill dans l'ajout d'une ressource