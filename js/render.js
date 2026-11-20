import { getComments, createComments } from "./api.js";
import { validerComment } from "./validation.js";


export function renderCard(cinetrack,favList = []){
    const cards = document.getElementById("cards");

    cards.innerHTML = cinetrack.map(c =>{
        const {id,image,title,type,releaseYear} = c;
        const isFav = favList.some(fav => fav.title === title);

        return `
            <div id="card" data-index="${id}" class="cards bg-purple-900 border border-purple-800 rounded-xl overflow-hidden hover:border-purple-500 transition cursor-pointer">
                <div class="relative">
                    <img src=${image} class="w-full h-full object-cover">
                    <button id="btn-fav" data-id="${id}" class="btnFav absolute top-3 right-3 text-white text-xl hover:text-red-500 transition">
                        <i class="${isFav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="text-white font-bold text-xl">${title}</h3>
                    <div class="flex justify-between item-center mt-3">
                        <span class="text-gray-400 text-sm">
                            <i class="fa-regular fa-calendar mr-1"></i>
                            ${releaseYear}
                        </span>
                        <span data-typefilm ="${type}" class="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                            ${type}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

export async function renderModule(cinetrack){
    const module = document.getElementById("module");

    module.classList.remove("hidden");
    module.classList.add("fixed", "inset-0",  "z-50",  "bg-black/80", "backdrop-blur-sm", "flex", "items-center", "justify-center", "p-7");

    module.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div class="card relative bg-purple-900 border-2 border-purple-500 rounded-xl w-full max-w-5xl mx-auto overflow-hidden max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-200/50 ">
                <button id="close-module"
                    class="absolute top-5 right-5 z-30 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 transition text-white text-2xl">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="relative">
                    <div class="relative z-10 p-8 pt-20">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                            <div class="md:col-span-1">
                                <img src="${cinetrack.image}" class="w-full max-w-70 mx-auto h-fit object-cover rounded-xl">
                            </div>
                            <div class="md:col-span-2 text-white">
                                <h2 class="text-xl md:text-2xl font-bold mb-4">
                                    ${cinetrack.title}
                                </h2>
                                <div class="flex items-center gap-3 mb-8">
                                    <span class="bg-purple-600 px-5 py-2 rounded-xl font-bold capitalize">
                                        ${cinetrack.type}
                                    </span>
                                    <span class="text-lg">
                                        <i class="fa-regular fa-calendar mr-2"></i>
                                        ${cinetrack.releaseYear}
                                    </span>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <p class="text-purple-400 font-bold text-lg mb-1">
                                            ${cinetrack.type == "series"
                                                ? '<i class="fa-solid fa-tv mr-2"></i>Seasons'
                                                : '<i class="fa-regular fa-clock mr-2"></i>Duration'}
                                        </p>

                                        <p class="text-gray-200">
                                            ${cinetrack.type == "series"
                                                ? cinetrack.seasons.join(", ")
                                                : `${Math.floor(cinetrack.duration / 60)} h ${cinetrack.duration % 60} min`}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-purple-400 font-bold text-lg mb-1">
                                            <i class="fa-solid fa-tag mr-2"></i>
                                            Genres
                                        </p>
                                        <p class="text-gray-200">
                                            ${cinetrack.genres.join(", ")}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-purple-400 font-bold text-lg mb-1">
                                            <i class="fa-solid fa-user-tie mr-2"></i>
                                            Directors
                                        </p>

                                        <p class="text-gray-200">
                                            ${cinetrack.directors.join(", ")}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-purple-400 font-bold text-lg mb-1">
                                            <i class="fa-solid fa-earth-americas mr-2"></i>
                                            Production countries
                                        </p>
                                        <p class="text-gray-200">
                                            ${cinetrack.productionCountries.join(", ")}
                                        </p>
                                    </div>

                                </div>
                                <div class="border-t border-purple-500 mt-6 pt-5">
                                    <h3 class="font-bold text-xl mb-2">
                                        <i class="fa-solid fa-file-lines text-purple-400 mr-2"></i>
                                        Description
                                    </h3>
                                    <p class="text-gray-300 leading-relaxed">
                                        ${cinetrack.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-t border-purple-600 p-5 md:p-7">
                    <h3 class="text-xl font-bold text-white mb-5">
                        <i class="fa-solid fa-comments text-purple-400 mr-3"></i>
                        Commentaire (<span id="comments-count">0</span>)
                    </h3>
                    <div id="comments-list" class="flex flex-col gap-2 mb-4">
                        
                    </div>
                    <form id="comment-form" class="flex flex-col gap-2">
                        <h4 class="text-xl font-bold text-white">
                            <i class="fa-solid fa-pen text-purple-400 mr-2"></i>
                            Ajouter un commantaire
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="relative">
                                <i class="fa-solid fa-user absolute left-4 top-5 text-purple-400"></i>
                                <input type="text" id="comment-author" placeholder="Votre nom..." class="w-full pl-12 p-4 rounded-xl bg-purple-900 border border-purple-600 text-white placeholder-purple-200 outline-none focus:border-purple-400">
                                <p id="error-comment-nom" class="text-red-400 text-sm"></p>
                            </div>
                            <div class="relative">
                                <i class="fa-solid fa-comment-dots absolute left-4 top-5 text-purple-400"></i>
                                <textarea id="comment-text" rows="1" placeholder="Votre commentaire..." class="w-full pl-12 p-4 rounded-xl bg-purple-900/60 border border-purple-600 text-white placeholder-purple-200 outline-none focus:border-purple-400 resize-none"></textarea>
                                <p id="error-comment-text" class="text-red-400 text-sm"></p>
                            </div>
                        </div>
                        <p id="comment-error" class="text-red-400 text-sm"></p>
                        <button type="submit" class="w-full bg-purple-600 hover:bg-purple-500 transition rounded-xl py-4 text-white font-bold text-lg">
                            <i class="fa-solid fa-paper-plane mr-2"></i>
                            Add comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById("close-module").addEventListener("click", ()=>{
        module.classList.add("hidden");
    });

    const formComments = document.getElementById("comment-form");
    const commentAuthor = document.getElementById("comment-author");
    const commentText = document.getElementById("comment-text");
    const errorNom = document.getElementById("error-comment-nom");
    const errorText = document.getElementById("error-comment-text");
    

    formComments.addEventListener("submit" ,async (e)=>{
        e.preventDefault();

        const data ={
            author: commentAuthor.value.trim(),
            text: commentText.value.trim(),
            createdAt: new Date()
        }

        const error = validerComment(data);

        errorText.textContent = error.text || "";
        errorNom.textContent = error.author || "";

        if(Object.keys(error).length > 0) return;

        try{
            await createComments(cinetrack.id,data);

            await chargerComments(cinetrack.id);

            formComments.reset();
        }catch(error){
            console.log(error);
        }
    });

    await chargerComments(cinetrack.id);
};

export function rechercheFiltrer(cinetrack,typeBtn="tous"){
    const searchInput = document.getElementById("search").value.trim().toLowerCase();

    const ct = cinetrack.filter(c =>{
        const filtrerType = c.type === typeBtn || typeBtn === "tous";
        const rechercher = c.title.toLowerCase().includes(searchInput); 

        return rechercher && filtrerType;
    });
    return ct;
}



export function renderPagination(page,total){
    const pagination = document.getElementById("pagination");
   

    if(!pagination) return;
  
    if(total <= 1){
        pagination.innerHTML = "";
        return;
    }
    
    let pages = "";

    if(page > 1){
        pages += `
            <button type="button" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""} class="px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-600"><</button>
        `;
    }

    for(let i = 1; i <= total; i++){
        pages += `
            <button type="button" data-page="${i}" ${page == i ? "disabled" : ""} class="px-4 py-2 rounded-lg ${page === i ? "bg-purple-500" : "bg-purple-400"} text-white hover:bg-purple-600">${i}</button>
        `;
    }

    if(page < total){
        pages += `
            <button type="button" data-page="${page + 1}" ${page >= total ? "disabled" : ""} class="px-4 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-600">></button>
        `;
    }

    pagination.innerHTML = pages;
}

export function renderFavs(favs){
    const favContainer = document.getElementById("fav-container");
    const favImpty = document.getElementById("fav-impty");
    const favCount = document.getElementById("fav-count");
    const clear = document.getElementById("clear");
    const serieCount = document.getElementById("serie-count");
    const movieCount = document.getElementById("movie-count");

    favImpty.classList.toggle("hidden",favs.length > 0);
    clear.classList.toggle("hidden",favs.length === 0);
    favCount.textContent = favs.length;

    const result = favs.reduce((t,fav) =>{
        if(fav.type === "movie"){
            t.movie++
        }else{
            t.serie++
        }

        return t;
    },{
        movie:0,
        serie:0
    });

    movieCount.textContent = result.movie;
    serieCount.textContent = result.serie;

    return favContainer.innerHTML = favs.map(fav =>{
        return `
            <div id="fav-body" class="p-1 bg-purple-900 border border-purple-600 flex rounded-2xl justify-between mb-2">
                <img src="${fav.image}" class="w-15 h-20 p-1 object-cover rounded-xl">
                <div class="flex flex-col items-start flex-1 p-2">
                    <h2 class="text-md text-left font-bold mb-1.5">${fav.title}</h2>
                    <span class="bg-purple-600 px-3 py-1 rounded-full text-xs">
                        ${fav.type}
                    </span>
                </div>
                <button data-title = "${fav.title}" class="delete-fav text-white text-lg p-2 hover:text-black transition">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
        `;
    }).join("");
}

async function chargerComments(id){
    const commentList = document.getElementById("comments-list");
    const countComment = document.getElementById("comments-count");

    commentList.innerHTML=`
        <p class="text-gray-300 text-center">
            <i class="fa-solid fa-spinner fa-spin mr-2"></i>
            chargement...
        </p>
    `;

    try{
        const comments = await getComments(id) || [];

        const filtredComments = comments.filter(comment => comment.contentId == id);
        
        renderComments(filtredComments);
        countComment.textContent = filtredComments.length;
    }catch(error){
        if (error.message === "error") {
            renderComments([]);
            countComment.textContent = 0;
            return;
        }

        commentList.innerHTML = `
            <p class="text-red-400 text-center">
                Erreur lors du chargement des commentaires.
            </p>
        `;
    }
}

function renderComments(comments){
    const commentList = document.getElementById("comments-list");

    if(comments.length === 0){
        commentList.innerHTML =`
            <p class="text-gray-400 text-center">
                Aucun commentaire
            </p>
        `;
        return;
    }

    commentList.innerHTML=comments.map(comment =>`
        <div class="bg-purple-800 p-3 rounded-xl">
            <div class="flex justify-between items-center mb-2">
                <p class="font-semibold text-purple-300">${comment.author}</p>
                <span class="text-gray-400 text-xs">${new Date(comment.createdAt).toLocaleDateString("fr-FR")}</span>
            </div>
            <p class="text-gray-300">${comment.text}</p>
        </div>
    `).join("");
}