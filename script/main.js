const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

const container = document.getElementById("issueContainer")
const loader = document.getElementById("loader")

const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")

//===========================================
// load issues
//===========================================
async function loadIssues(){
loader.classList.remove("hidden")
console.log("1. Loader visible - check the screen!")

// Force a 3-second delay so you can SEE the spinner
await new Promise(resolve => setTimeout(resolve, 1000))

const res = await fetch(API)
const data = await res.json()

allIssues = data.data
displayIssues(allIssues)
document.getElementById("issueCount").innerText = allIssues.length + " Total Issues"

loader.classList.add("hidden")
console.log("2. Loader hidden")

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

   <hr class="my-4 flex-1 opacity-75 border-t border-gray-300">

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
//=============================
//           Modal
//=============================
async function openModal(id){
//==========================================================
const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)
//==========================================================
const data = await res.json()
const issue = data.data

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description

const status = document.getElementById("modalStatus")
status.innerText = issue.status

       if(issue.status==="open"){
          status.className="badge badge-success"
       }else{
          status.className="badge badge-secondary"
       }

       document.getElementById("modalAuthor").innerText =
          `by ${issue.author}`

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString()

document.getElementById("modalPriority").innerText =
issue.priority

document.getElementById("modalassign").innerText =
issue.assignee || "Unassigned"


// Show each label as separate badge with different colors
const labelsContainer = document.getElementById("modalLabelsContainer")
labelsContainer.innerHTML = "" 

issue.labels.forEach((label, index) => {
    const labelBadge = document.createElement("span")
    labelBadge.className = "badge gap-2"
    
    // Different colors for different labels
    if(label.includes("bug")){
        labelBadge.classList.add("badge-error", "text-white")
    } else if(label.includes("enhancement")){
        labelBadge.classList.add("badge-info", "text-white")
    } else if(label.includes("documentation")){
        labelBadge.classList.add("badge-primary", "text-white")
    } else if(label.includes("help wanted")){
        labelBadge.classList.add("badge-warning")
    } else if(label.includes("good first issue")){
        labelBadge.classList.add("badge-success", "text-white")
    } else {
        labelBadge.classList.add("badge-outline")
    }
    
    labelBadge.innerText = label
    labelsContainer.appendChild(labelBadge)
})

issueModal.showModal()

}

//========================================
// Search button functionality
//=======================================
document.getElementById("searchBtn").addEventListener("click", async function() {
    const searchInput = document.getElementById("searchInput")
    const text = searchInput.value.trim()
    
    loader.classList.remove("hidden")
    
    if(text === "") {
        displayIssues(allIssues)
        
        toggleStyle("all")
        loader.classList.add("hidden")
        return
    }
    //=========================================================================
    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )
    //========================================================================
    const data = await res.json()
    
    if(data.data && data.data.length > 0) {
        displayIssues(data.data)
        document.getElementById("issueCount").innerText = data.data.length + " Search Results"
    } else {
        container.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-gray-500">No issues found matching "${text}"</p>
            </div>
        `
        document.getElementById("issueCount").innerText = "0 Results"
    }
    
    loader.classList.add("hidden")
})

// Enter key support
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        document.getElementById("searchBtn").click()
    }
})