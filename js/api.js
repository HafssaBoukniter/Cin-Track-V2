const BASE_URL = "https://6afb5163730c1d152f3375fc.mockapi.io/api/v1";

export async function request(path,options = {}) {
    try {
        const response = await fetch(BASE_URL + path ,{
            headers : {"Content-type" : "application/json"},
            ...options
        });

        if (!response.ok) {
            throw new Error("error");
        }

        return response.json();
    } catch (error) {
        const errorEl = document.getElementById("error");

        errorEl.textContent = "Une erreur est survenue lors du chargement des données.";
        errorEl.classList.remove("hidden");
    }
}

export const getContents = () => request("/content");
export const createContent = (data) => request("/content",{method : "POST",body : JSON.stringify(data)});
export const updateContent = (id,data) => request(`/content/${id}`,{method : "PUT",body : JSON.stringify(data)});
export const deleteContent = (id) => request(`/content/${id}`,{method : "DELETE"});
export const getComments = () => request("/comments");