import { getCompletions, deleteCompletion } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("completion--")) {
        const [, completionId] = click.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})

export const completions = () => {
    const completions = getCompletions()

    const completionString = (completion) => {
        let listHTML = `
        <li> 
            ${completion.description}
            <button class="completion__delete" id="completion--${completion.id}">
                 Delete
                 </button>
                 </li>`
        return listHTML
    }
    
    let html = `
    <ul>
    ${completions.map(completionString).join("")}
    </ul>`
    return html

}


