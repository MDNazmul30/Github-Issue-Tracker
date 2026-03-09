const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

const container = document.getElementById("issueContainer")
const loader = document.getElementById("loader")

const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")


// load issues
async function loadIssues(){

     loader.classList.remove("hidden")

     const res = await fetch(API)
     const data = await res.json()

    allIssues = data.data

displayIssues(allIssues)

// Set initial count
document.getElementById("issueCount").innerText = allIssues.length + " Total Issues"
   loader.classList.add("hidden")

}
loadIssues()


// display cards
 function displayIssues(issues){

    container.innerHTML = ""

   issues.forEach(issue => {

const card = document.createElement("div")

card.className = `
card bg-white shadow border-t-4 cursor-pointer
${issue.status === "open" ? "border-green-500":"border-purple-500"}
`

// Create labels HTML with separate badges
let labelsHTML = ""
const colors = ["badge-primary", "badge-secondary", "badge-accent", "badge-info", "badge-success", "badge-warning", "badge-error"]

issue.labels.forEach((label, index) => {
    // Different colors based on label content
    let colorClass = "badge-outline"
    
    if(label.includes("bug")){
        colorClass = "badge-error text-white"
    } else if(label.includes("enhancement")){
        colorClass = "badge-info text-white"
    } else if(label.includes("documentation")){
        colorClass = "badge-primary text-white"
    } else if(label.includes("help wanted")){
        colorClass = "badge-warning"
    } else if(label.includes("good first issue")){
        colorClass = "badge-success text-white"
    } else {
        // Cycle through colors if no match
        colorClass = colors[index % colors.length] + " text-white"
    }
    
    labelsHTML += `<span class="badge ${colorClass} gap-2">${label}</span>`
})

card.innerHTML = `

<div class="card-body">

    <div class="flex justify-between items-center">
        <img class="w-6" src="./assets/Open-Status.png">
        <span class="badge badge-warning">${issue.priority}</span>
    </div>

    <h2 class="text-lg font-bold">
        ${issue.title}
    </h2>

    <p class="text-gray-500">
        ${issue.description}
    </p>

    <div class="flex flex-wrap gap-2">
        ${labelsHTML}
    </div>

    <hr>

    <div class="text-sm text-gray-500 flex flex-col justify-between">
        <span>#${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
    </div>

</div>
`

// modal open when card clicked
card.onclick = () => openModal(issue.id)

container.appendChild(card)

})

}


// toggle tabs with dynamic count
function toggleStyle(type){

allBtn.className="btn btn-outline"
openBtn.className="btn btn-outline"
closeBtn.className="btn btn-outline"

   if(type==="all"){
       allBtn.className="btn btn-primary"
       displayIssues(allIssues)
       document.getElementById("issueCount").innerText = allIssues.length + " Total Issues"
    }

   if(type==="open"){
       openBtn.className="btn btn-primary"
       const openIssues = allIssues.filter(i=>i.status==="open")
       displayIssues(openIssues)
       document.getElementById("issueCount").innerText = openIssues.length + " Open Issues"
    }

   if(type==="closed"){
         closeBtn.className="btn btn-primary"
         const closedIssues = allIssues.filter(i=>i.status==="closed")
         displayIssues(closedIssues)
         document.getElementById("issueCount").innerText = closedIssues.length + " Closed Issues"
}

}

