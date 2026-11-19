export function rendreTable(cinetrack){
    const tbody = document.querySelector("#content-table tbody");

    tbody.innerHTML =cinetrack.map(c =>{
        const {id,image,title,type,releaseYear} = c;

        return `
            <tr>
                <td class="p-1 flex mb-2 items-center">
                    <img src="${image}" class="w-15 h-15 p-1 object-cover rounded-xl">
                    <h2 class="text-md text-left font-bold mb-1.5">${title}</h2>
                </td>
                <td>${type}</td>
                <td>${releaseYear}</td>
                <td class="p-3 mb-2">
                    <button data-id="${id}" class="btn-modif"><i class="fa-solid fa-pen"></i></button>
                    <button data-id="${id}" class="btn-supp"><i class="fa-solid fa-trash ms-2"></i></button>
                </td>
            </tr>
        `
    }).join("");
}

export function rendreModalModifier(item){
    const modal = document.getElementById("modal");

    modal.classList.remove("hidden");
    console.log(modal);
    console.log(item);
    modal.classList.add("fixed", "inset-0",  "z-50",  "bg-black/80", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-7");

    if(item.type === "movie"){
        modal.innerHTML = `
            <div class="relative w-full max-w-3xl bg-purple-800 border border-purple-700 rounded-xl">
                <button type="button" id="close-modal" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-purple-800 hover:bg-purple-600 transition">
                <i class="fa-solid fa-xmark text-xl"></i>
                </button>

               <div class="p-6 border-b border-purple-700">
                    <h2 class="text-2xl font-bold">
                        Modifier le film
                    </h2>
                    <p class="text-xl">
                        Modifiez les informations du contenu sélectionné
                    </p>
               </div>

                <form id="movie-edit-content" class="grid grid-cols-2 gap-3 p-3">
                    <div class="flex flex-col bg-brand-soft p-1 gap-2 rounded-full mb-2">
                        <label for="movie-titleM">Titre</label>
                        <input type="text" id="movie-titleM" placeholder="Titre" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-movie-titleM" class="text-red-400 text-sm"></p>
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-yearM">Année</label>
                        <input type="number" id="movie-yearM" placeholder="Année" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-movie-yearM" class="text-red-400 text-sm"></p>
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-durationM">Durée (minutes)</label>
                        <input type="number" placeholder="Durée" id="movie-durationM" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">                    
                        <p id="error-movie-durationM" class="text-red-400 text-sm"></p>
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-imageM">Image</label>
                        <input type="text" id="movie-imageM" placeholder="Image URL" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-movie-imageM" class="text-red-400 text-sm"></p>                    
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-descriptionM">Description</label>
                        <input type="text" id="movie-descriptionM" placeholder="Description" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-genreM">Genre</label>
                        <input name="movie-genre" id="movie-genresM" placeholder="Genres (séparés par des virgules)"  class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-directorsM">Directeur</label>
                        <input placeholder="Directeur (séparés par des virgules)" id="movie-directorsM" gap-2 class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="movie-productionCountriesM">Pays producteurs</label>
                        <input placeholder="Pays producteurs (séparés par des virgules)" id="movie-productionCountriesM" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>

                    <div class="col-span-2 flex justify-end mt-4">
                        <button type="submit" id="btn-update-movie" data-id="${item.id}" class="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fa-solid fa-floppy-disk mr-2"></i>
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        `;
    }else{
        modal.innerHTML = `
            <div class="relative w-full max-w-3xl bg-purple-800 border border-purple-700 rounded-xl">
                <button type="button" id="close-modal" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-purple-800 hover:bg-purple-600 transition">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>

                <div class="p-6 border-b border-purple-700">
                    <h2 class="text-2xl font-bold">
                        Modifier la série
                    </h2>
                    <p class="text-xl">
                        Modifiez les informations du contenu sélectionné
                    </p>
               </div>

                <form id="series-edit-content" class="grid grid-cols-2 items-center bg-purple-800 border border-purple-700 rounded-xl gap-3 p-3">
                    <div class="flex flex-col bg-brand-soft p-1 gap-2 rounded-full mb-2">
                        <label for="serie-titleM">Titre</label>
                        <input type="text" id="serie-titleM" placeholder="Titre" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-serie-titleM" class="text-red-400 text-sm"></p>
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-yearM">Année</label>
                        <input type="number" id="serie-yearM" placeholder="Année" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-serie-yearM" class="text-red-400 text-sm"></p>
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-seasonsM">Seasons</label>
                        <input type="number" id="serie-seasonsM" placeholder="Seasons (séparés par des virgules)" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-serie-seasonsM" class="text-red-400 text-sm"></p>
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-imageM">Image</label>
                        <input type="text" id="serie-imageM" placeholder="Image URL" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                        <p id="error-serie-imageM" class="text-red-400 text-sm"></p>
                        </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-descriptionM">Description</label>
                        <input type="text" id="serie-descriptionM" placeholder="Description" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-genreM">Genre</label>
                        <input id="serie-genresM" placeholder="Genres (séparés par des virgules)" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-directorsM">Directeur</label>
                        <input placeholder="Directeur (séparés par des virgules)"  id="serie-directorsM" gap-2 class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>
                    <div class="flex flex-col bg-brand-soft gap-2 p-1 rounded-full mt-3 mb-2">
                        <label for="serie-productionCountriesM">Pays producteurs</label>
                        <input placeholder="Pays producteurs (séparés par des virgules)" id="serie-productionCountriesM" class="border border-purple-600 rounded-lg px-3 py-2 outline-0">
                    </div>

                    <div class="col-span-2 flex justify-end mt-4">
                        <button type="submit" id="btn-update-serie" data-id="${item.id}" class="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold transition">
                            <i class="fa-solid fa-floppy-disk mr-2"></i>
                            Enregistrer les modifications
                        </button>
                    </div>  
                </form>
            </div>  
        `
    }

    if(item.type === "movie"){
        document.getElementById("movie-titleM").value = item.title;
        document.getElementById("movie-yearM").value = item.releaseYear;
        document.getElementById("movie-durationM").value = item.duration;
        document.getElementById("movie-imageM").value = item.image;
        document.getElementById("movie-descriptionM").value = item.description;
        document.getElementById("movie-genresM").value = item.genres.join(", ");
        document.getElementById("movie-directorsM").value = item.directors.join(", ");
        document.getElementById("movie-productionCountriesM").value = item.productionCountries.join(", ");
    }else{
        document.getElementById("serie-titleM").value = item.title;
        document.getElementById("serie-yearM").value = item.releaseYear;
        document.getElementById("serie-seasonsM").value = item.seasons;
        document.getElementById("serie-imageM").value = item.image;
        document.getElementById("serie-descriptionM").value = item.description;
        document.getElementById("serie-genresM").value = item.genres.join(", ");
        document.getElementById("serie-directorsM").value = item.directors.join(", ");
        document.getElementById("serie-productionCountriesM").value = item.productionCountries.join(", ");
    }

    document.getElementById("close-modal").addEventListener("click", () =>{
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    })
}