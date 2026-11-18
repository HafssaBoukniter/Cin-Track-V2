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