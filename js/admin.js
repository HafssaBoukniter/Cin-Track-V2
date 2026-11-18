import {getContents,createContent,updateContent,deleteContent} from "./api.js";
import { rendreTable } from "./ui.js";

async function afficherTout() {
    const loading = document.getElementById("loading");

    loading.classList.remove("hidden");

    try{
        let items = await getContents();
        console.table(items);

        document.addEventListener("click", async (e) =>{
            const btn = e.target.closest(".btn-supp");

            if(!btn) return;

            const id = btn.dataset.id;
            const item = items.find(i => i.id == id);

            if(!confirm(`Supprimer  « ${item.title} » ?`)) return;
            await deleteContent(item.id);
            items = items.filter(i => i.id !== item.id);

            rendreTable(id);
        });

        rendreTable(items);
    }catch(error){
        console.error(error);
    }finally{
        loading.classList.add("hidden");
    }
}
    

afficherTout();