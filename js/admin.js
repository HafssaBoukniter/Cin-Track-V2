import {getContents,createContent,updateContent,deleteContent} from "./api.js";
import { rendreModalModifier, rendreTable } from "./ui.js";
import { validerMovie,validerSerie } from "./validation.js";

const movieBtn = document.getElementById("movie-form");
const serieBtn = document.getElementById("serie-form");
const movieContent = document.getElementById("movie-content");
const serieContent = document.getElementById("series-content");
const message = document.getElementById("message");

const errorMovieTitle = document.getElementById("error-movie-title");
const errorMovieYear = document.getElementById("error-movie-year");
const errorMovieDuration = document.getElementById("error-movie-duration");
const errorMovieImage = document.getElementById("error-movie-image");

const errorSerieTitle = document.getElementById("error-serie-title");
const errorSerieYear = document.getElementById("error-serie-year");
const errorSerieSeasons = document.getElementById("error-serie-seasons");
const errorSerieImage = document.getElementById("error-serie-image");

async function afficherTout() {
    const loading = document.getElementById("loading");

    loading.classList.remove("hidden");

    try{
        let items = await getContents();
        console.table(items);
        rendreTable(items);

        document.addEventListener("click", async (e) =>{
            const btn = e.target.closest(".btn-supp");

            if(!btn) return;

            e.preventDefault();

            const id = btn.dataset.id;
            const item = items.find(i => i.id == id);

            if(!item) return;

            if(!confirm(`Supprimer  « ${item.title} » ?`)) return;
            await deleteContent(item.id);
            items = items.filter(i => i.id !== item.id);

            rendreTable(items);
        });

        movieBtn.addEventListener("click",() =>{
            movieContent.classList.remove("hidden");
            serieContent.classList.add("hidden");

            movieBtn.classList.add("bg-purple-400", "text-white");
            serieBtn.classList.remove("bg-purple-400", "text-white");
        });

        serieBtn.addEventListener("click",() =>{
            serieContent.classList.remove("hidden");
            movieContent.classList.add("hidden");

            serieBtn.classList.add("bg-purple-400", "text-white");
            movieBtn.classList.remove("bg-purple-400", "text-white");
        });

        movieContent.addEventListener("submit",async (e) =>{
            e.preventDefault();

            const data = getFormDataMovie();
            
            const errors = validerMovie(data);

            afficherErrorMovie(errors);

            if(Object.keys(errors).length > 0) return;

            try{
                await createContent(data);
                
                message.textContent = "Film ajouté avec succès !";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);

                const content = await getContents();

                items = content;

                rendreTable(content);

                movieContent.reset();
            }catch(error){
                message.textContent = "Erreur lors de l'ajout du film.";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);
            }
        });

        serieContent.addEventListener("submit",async (e) =>{
            e.preventDefault();

            const data = getFormDataSerie();

            const errors = validerSerie(data);

            afficherErrorSerie(errors);

            if (Object.keys(errors).length > 0) return;

            try{
                await createContent(data);
                
                message.textContent = "Série ajouté avec succès !";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);

                const content = await getContents();

                items = content;

                rendreTable(content);

                serieContent.reset();
            }catch(error){
                message.textContent = "Erreur lors de l'ajout du série.";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);
            }
        });

        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-modif");

            if(!btn) return;

            e.preventDefault();

            const id = btn.dataset.id;
            const item = items.find(item => item.id == id);

            rendreModalModifier(item);
        });

        document.addEventListener("click",async (e) =>{
            const btnUpdateMovie = e.target.closest("#btn-update-movie");

            if(!btnUpdateMovie) return;

            e.preventDefault();
            const id = btnUpdateMovie.dataset.id;

            const data = getFormDataUpdateMovie();

            const errors = validerMovie(data);

            afficherErrorUpdateMovie(errors);

            if(Object.keys(errors).length > 0) return;

            try{
                const item = items.find(item => item.id == id);
                const update = {
                    ...item,
                    ...data
                };

                await updateContent(id,update);

                const content = await getContents();

                items = content;

                rendreTable(content);

                message.textContent = "Film modifié avec succès !";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);
            }catch(error){
                message.textContent = "Erreur lors de la modification du film.";
                message.classList.remove("hidden");

                setTimeout(() => {
                    message.classList.add("hidden");
                }, 3000);
            }
        });

        document.addEventListener("click",async(e) =>{
            const btnUpdateSerie = e.target.closest("#btn-update-serie");

            if(!btnUpdateSerie) return; 

            e.preventDefault();
            const id = btnUpdateSerie.dataset.id;

            const data = getFormDataUpdateSerie();

            const errors = validerSerie(data);

            afficherErrorUpdateSerie(errors);

            if(Object.keys(errors).length > 0) return;

            try{
                const item = items.find(item => item.id == id);
                const update = {
                    ...item,
                    ...data
                };

                await updateContent(id,update);

                const content = await getContents();

                items = content;

                rendreTable(content);

                message.textContent = "Série modifié avec succès !";
                message.classList.remove("hidden");

                setTimeout(() =>{
                    message.classList.add("hidden");
                },3000);
            }catch(error){
                message.textContent = "Erreur lors de la modification du série.";
                message.classList.remove("hidden");

                setTimeout(() => {
                    message.classList.add("hidden");
                }, 3000);
            }
        });

    }catch(error){
        console.error(error);
    }finally{
        loading.classList.add("hidden");
    }
}

function getFormDataMovie(){
    return{
        title: document.getElementById("movie-title").value,
        type: "movie",
        releaseYear: Number(document.getElementById("movie-year").value),
        duration: Number(document.getElementById("movie-duration").value),
        image: document.getElementById("movie-image").value,
        description: document.getElementById("movie-description").value,
        genres: document.getElementById("movie-genres").value.split(",").map(g => g.trim()),
        directors: document.getElementById("movie-directors").value.split(",").map(d => d.trim()),
        productionCountries: document.getElementById("movie-productionCountries").value.split(",").map(p => p.trim())
    }
}

function getFormDataSerie(){
    return{
        title: document.getElementById("serie-title").value,
        type: "serie",
        releaseYear: Number(document.getElementById("serie-year").value),
        seasons: document.getElementById("serie-seasons").value.split(",").map(s => s.trim()),
        image: document.getElementById("serie-image").value,
        description: document.getElementById("serie-description").value,
        genres: document.getElementById("serie-genres").value.split(",").map(g => g.trim()),
        directors: document.getElementById("serie-directors").value.split(",").map(d => d.trim()),
        productionCountries: document.getElementById("serie-productionCountries").value.split(",").map(p => p.trim())
    }
}

function getFormDataUpdateMovie(){
    return{
        title: document.getElementById("movie-titleM").value,
        type: "movie",
        releaseYear: Number(document.getElementById("movie-yearM").value),
        duration: Number(document.getElementById("movie-durationM").value),
        image: document.getElementById("movie-imageM").value,
        description: document.getElementById("movie-descriptionM").value,
        genres: document.getElementById("movie-genresM").value.split(",").map(g => g.trim()),
        directors: document.getElementById("movie-directorsM").value.split(",").map(d => d.trim()),
        productionCountries: document.getElementById("movie-productionCountriesM").value.split(",").map(p => p.trim())
    }
}

function getFormDataUpdateSerie(){
    return{
        title: document.getElementById("serie-titleM").value,
        type: "serie",
        releaseYear: Number(document.getElementById("serie-yearM").value),
        seasons: document.getElementById("serie-seasonsM").value.split(",").map(s => s.trim()),
        image: document.getElementById("serie-imageM").value,
        description: document.getElementById("serie-descriptionM").value,
        genres: document.getElementById("serie-genresM").value.split(",").map(g => g.trim()),
        directors: document.getElementById("serie-directorsM").value.split(",").map(d => d.trim()),
        productionCountries: document.getElementById("serie-productionCountriesM").value.split(",").map(p => p.trim())
    }
}

function afficherErrorMovie(errors){
    errorMovieTitle.textContent = errors.title;
    errorMovieYear.textContent = errors.releaseYear || "";
    errorMovieDuration.textContent = errors.duration || "";
    errorMovieImage.textContent = errors.image || "";
}

function afficherErrorSerie(errors){
    errorSerieTitle.textContent = errors.title;
    errorSerieYear.textContent = errors.releaseYear || "";
    errorSerieSeasons.textContent = errors.seasons || "";
    errorSerieImage.textContent = errors.image || "";
}

function afficherErrorUpdateMovie(errors) {
    document.getElementById("error-movie-titleM").textContent = errors.title || "";
    document.getElementById("error-movie-yearM").textContent = errors.releaseYear || "";
    document.getElementById("error-movie-durationM").textContent = errors.duration || "";
    document.getElementById("error-movie-imageM").textContent = errors.image || "";
}

function afficherErrorUpdateSerie(errors) {
    document.getElementById("error-serie-titleM").textContent = errors.title || "";
    document.getElementById("error-serie-yearM").textContent = errors.releaseYear || "";
    document.getElementById("error-serie-seasonsM").textContent = errors.seasons || "";
    document.getElementById("error-serie-imageM").textContent = errors.image || "";
}
    

afficherTout();