# CinéTrack

## Présentation du projet

CinéTrack est une application web qui permet de consulter, rechercher, filtrer et gérer des films et des séries.

L'application permet aux utilisateurs de découvrir des contenus cinématographiques, consulter leurs détails et gérer une liste de favoris de manière simple et intuitive.

Elle dispose également d'un espace d'administration permettant de gérer les films, les séries et leurs commentaires.

## Fonctionnalités

### Catalogue

- Affichage des films et des séries.
- Recherche par titre.
- Filtrage par type de contenu (Film / Série).
- Tri des contenus par ordre alphabétique.
- Affichage des détails des films et des séries.
- Pagination des contenus.
- Affichage dynamique des cartes.

### Favoris

- Ajout et suppression des favoris.
- Gestion des favoris avec `localStorage`.
- Comptage des films et des séries dans la liste des favoris.

### Administration

- Ajout de nouveaux films et séries.
- Modification des contenus existants.
- Suppression des contenus.
- Utilisation d'un formulaire unique pour l'ajout et la modification.
- Validation des champs du formulaire.
- Affichage des messages d'erreur sous les champs concernés.

### Commentaires

- Affichage des commentaires dans la modal.
- Ajout de commentaires.
- Suppression de commentaires.
- Gestion des commentaires via l'API.

## Technologies utilisées

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- API REST (MockAPI)
- Fetch API
- LocalStorage
- Git & GitHub
- Jira
- Vercel

## Structure du projet

```text
CinéTrack/
│
├── index.html
├── admin.html
├── README.md
│
├── css/
│   └── output.css
│
├── js/
│   ├── api.js
│   ├── ui.js
│   ├── validation.js
│   ├── main.js
│   ├── admin.js
│   ├── store.js
│   ├── render.js
│   ├── modal.js
│   └── favorites.js
```

## API utilisées

L'application utilise deux sources de données :

- Une API JSON pour récupérer les données initiales des films et des séries.
- MockAPI pour gérer les contenus et les commentaires avec des requêtes HTTP.

### Endpoints MockAPI

**Base URL :**

`https://6afb516....mockapi.io/api/v1`

| Méthode HTTP | Endpoint                           | Description                 |
| ------------ | ---------------------------------- | --------------------------- |
| GET          | `/content`                         | Récupérer tous les contenus |
| GET          | `/content/:id`                     | Récupérer un contenu par ID |
| POST         | `/content`                         | Ajouter un contenu          |
| PUT          | `/content/:id`                     | Modifier un contenu         |
| DELETE       | `/content/:id`                     | Supprimer un contenu        |
| GET          | `/content/:id/comments`            | Récupérer les commentaires  |
| POST         | `/content/:id/comments`            | Ajouter un commentaire      |
| DELETE       | `/content/:id/comments/:commentId` | Supprimer un commentaire    |

### Exemple de données JSON

```json
{
  "id": "2",
  "title": "Breaking Bad",
  "type": "series",
  "releaseYear": 2008,
  "seasons": [1, 2, 3, 4, 5],
  "image": "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
  "description": "A chemistry teacher turns to manufacturing drugs.",
  "genres": ["Drama", "Crime", "Thriller"],
  "directors": ["Vince Gilligan"],
  "productionCountries": ["USA"]
}
```

### Structure d'un commentaire

```json
{
  "id": "1",
  "name": "Hafssa",
  "text": "Très bonne série !"
}
```

## Gestion des données

- Récupération des données depuis les API à l'aide de `fetch()`.
- Utilisation des méthodes HTTP GET, POST, PUT et DELETE.
- Sauvegarde des favoris dans `localStorage`.
- Organisation du code avec des modules JavaScript.
- Affichage dynamique des contenus dans le DOM.
- Gestion des erreurs HTTP et des erreurs de validation.

## Tests et corrections

- Test de l'ajout des films et des séries.
- Test de la modification des contenus.
- Test de la suppression des contenus.
- Test de l'ajout et de la suppression des commentaires.
- Vérification des fonctionnalités principales.
- Correction des erreurs détectées dans la console.

## Gestion du projet

### Jira

Lien vers le tableau Jira :

https://hafssaboukniter2002.atlassian.net/jira/software/projects/CIN/boards/34?filter=assignee+IN+%28712020%3A27811874-0216-49ae-9b16-5fa51f62c703%2C+empty%29&groupBy=none&atlOrigin=eyJpIjoiNTMzMzBmZjUwMzNhNDNmOWEwM2MxYzcyMGQxMjRlNTIiLCJwIjoiaiJ9

### Déploiement

Lien vers l'application déployée sur Vercel :

https://cin-track-three.vercel.app/

## Installation et lancement

1. Cloner le repository :

```bash
git clone [URL_DU_REPOSITORY]
```

2. Accéder au dossier du projet :

```bash
cd CinéTrack
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer le projet :

```bash
npm run dev
```

## Auteur

**Hafssa Boukniter**
