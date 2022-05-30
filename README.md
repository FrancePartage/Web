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
- [x] Tags populaires
- [x] Afficher une bulle quand il y a une nouvelle notification
  
### Authentification

- [x] Inscription
- [x] Connexion
- [x] Deconnexion
- [X] Rafraichir les tokens

 ### Utilisateurs

 - [ ] Changer son avatar
 - [x] Changer son mot de passe
 - [x] Changer ses informations
 - [x] Consulter un utilisateur
 - [x] Consulter les ressources d'un utilisateur
 - [x] Consulter les relations d'un utilisateur

### Ressources

- [x] Ajouter une ressource
- [x] Systeme d'upload d'image dans Quill
- [x] Afficher les ressources sur la page principale (infinite scroll)
- [x] Consulter une ressource
- [ ] Like/Dislike une ressource
- [x] Afficher les commentaires d'une ressource (pagination)
- [x] Ajouter une commentaire
- [x] Afficher les ressources d'un utilisateur
- [x] Consulter les ressources par tags
- [x] Ajouter du CSS pour le contenu (H1, H2, etc.)

### Relations

- [x] Envoyer une demande d'ajout de relation
- [x] Afficher les requetes reçues
- [x] Accepter une requete
- [x] Refuser une requete
- [x] Annuler une requete
- [x] Supprimer une relation
- [x] Afficher les relations d'un utilisateur
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
- [ ] Corriger le nested link dans la ResourceCard