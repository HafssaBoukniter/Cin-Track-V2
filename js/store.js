export function getFavorites(){
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function sauvegarderfavorites(favorites){
    localStorage.setItem("favorites",JSON.stringify(favorites));
}