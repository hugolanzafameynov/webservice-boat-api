# Projet API Webservice boat

## Description

Cette API permet de gérer des utilisateurs, bateaux, sorties de pêche, réservations et carnets de pêche avec des fonctionnalités CRUD (Create, Read, Update, Delete) et d'autres plus métier.

## Technologies utilisées

- Node.js
- Express.js
- Docker
- Sequelize (ORM pour Node.js)
- MySQL (Base de données)

## Installation

1. Cloner le dépôt

```
git clone https://github.com/votre-repo.git
cd votre-repo 
```

2. Installer les dépendances

```
npm install
```

3. Configurer la base de données

Créer un fichier .env à la racine du projet, y ajouter (et modifier si nécessaire) :

```
# Database
DB_HOST=DBContainerName
DB_ROOT_PASSWORD=root
DB_NAME=databaseName
DB_PORT=3306
DB_USER=username
DB_PASSWORD=password

# DB VIEWER
ADMINER_PORT=8080
ADMINER_DESIGN=hydra
```

4. Lancer le docker

```
docker-compose up -d
```

5. Démarrer le serveur

```
npm start
```

Par défaut, l'API est disponible sur http://localhost:3000

## Endpoints API

### Utilisateurs (`/v1/users`)

GET `/v1/users`: Récupère tous les utilisateurs

GET `/v1/users/:id`: Récupère un utilisateur par ID

POST `/v1/users`: Crée un utilisateur

```json
{
    "name": "John",
    "firstName": "Doe",
    "birthDate": "1990-01-01",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St, Anytown",
    "postalCode": "12345",
    "city": "Anytown",
    "status": "individual"
}
```

PUT `/v1/users/:id`: Met à jour un utilisateur

```json
{
    "name": "John",
    "firstName": "Updated"
}
```

DELETE `/v1/users/:id`: Supprime un utilisateur

### Bateaux (/v1/boats)

GET `/v1/boats`: Récupère tous les bateaux

GET `/v1/boats/:id`: Récupère un bateau par ID

POST `/v1/boats`: Crée un bateau

PUT `/v1/boats/:id`: Met à jour un bateau

DELETE `/v1/boats/:id`: Supprime un bateau

### Sorties de pêche (`/v1/trips`)

GET `/v1/trips :`Récupère toutes les sorties de pêche

GET `/v1/trips/:id`: Récupère une sortie par ID

POST `/v1/trips`: Crée une sortie de pêche

PUT `/v1/trips/:id`: Met à jour une sortie

DELETE `/v1/trips/:id`: Supprime une sortie

### Réservations (`/v1/reservations`)

GET `/v1/reservations`: Récupère toutes les réservations

GET `/v1/reservations/:id`: Récupère une réservation par ID

POST `/v1/reservations`: Crée une réservation

PUT `/v1/reservations/:id`: Met à jour une réservation

DELETE `/v1/reservations/:id`: Supprime une réservation

### Carnets de pêche (`/v1/fishing-logs`)

GET `/v1/fishing-logs`: Récupère tous les carnets de pêche

GET `/v1/fishing-logs/:id`: Récupère un carnet de pêche par ID

POST `/v1/fishing-logs`: Crée un carnet de pêche

PUT `/v1/fishing-logs/:id`: Met à jour un carnet de pêche

DELETE `/v1/fishing-logs/:id`: Supprime un carnet de pêche

> ⚠️ **Attention :** Pour plus de details, voir le fichier `swagger.json` à la racine du projet.


## Tests API

Utiliser Postman ou cURL pour tester les endpoints.

Exemple de requête avec cURL pour créer un utilisateur :

```
curl -X POST http://localhost:3000/v1/users \
-H "Content-Type: application/json" \
-d '{"name":"John", "firstName":"Doe", "email":"johndoe@example.com", "status":"individual"}'
```

## Auteurs

[Lanzafame Hugo](https://github.com/hugolanzafameynov)