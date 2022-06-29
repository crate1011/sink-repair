import { getRequests, saveCompletion } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"



export const Requests = () => {
    const requests = getRequests()

    const htmlrequests = (request) => {
        const plumbers = getPlumbers()
        return `<li class="request">${request.description}</li>
    <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
       
        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}--${request.description}">${plumber.name}</option>`
            }
        ).join("")
            }
</select>`
    }
    let html = `
        <ul>
            ${requests.map(htmlrequests).join("")
        }
        </ul>
    `
    return html

}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId, requestJob] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                description: requestJob,
                date_created: Date.now(),
                
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)