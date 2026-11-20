const erreur = {};
const currentYear = new Date().getFullYear;

export function validerMovie(data){
    if(!data.title.trim()){
        erreur.title = "Le titre est obligatoire.";
    }

    if(data.releasYear === ""){
        erreur.releaseYear = "L'année est obligatoire.";
    }else if(data.releasYear < 1900 || data.releasYear > currentYear){
        erreur.releaseYear = `L'année doit être entre 1900 et ${currentYear}.`;
    }

    const url = new URL(data.image);
    if(url.protocol !== "http:" && url.protocol !== "https:"){
        erreur.image = "URL d'image invalide.";
    }

    if(!data.duration){
        erreur.duration = "La durée est obligatoire.";
    }else if(data.duration <= 0){
        erreur.duration = "La durée doit être supérieure à 0.";
    
    }

    return erreur;
}

export function validerSerie(data){
    if(!data.title.trim()){
        erreur.title = "Le titre est obligatoire.";
    }

    if(data.releasYear === ""){
        erreur.releaseYear = "L'année est obligatoire.";
    }else if(data.releasYear < 1900 || data.releasYear > currentYear){
        erreur.releaseYear = `L'année doit être entre 1900 et ${currentYear}.`;
    }

    const url = new URL(data.image);
    if(url.protocol !== "http:" && url.protocol !== "https:"){
        erreur.image = "URL d'image invalide.";
    }

    if(!data.seasons.length){
        erreur.seasons = "Le nombre de saisons est obligatoire.";
    }else{

        if(data.seasons.some(s => s==="" || Number(s) <= 0)){
            erreur.seasons = "Veuillez saisir des saisons valides.";
        }
    }

    return erreur;
}