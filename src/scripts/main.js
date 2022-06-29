import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"
import { deleteRequest } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})