const deleteBtn = document.querySelectorAll('[data-action="delete"]');
const todoItem = document.querySelectorAll('[data-action="incomplete"]');
const todoComplete = document.querySelectorAll('[data-action="complete"]');


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// Function to sort and update the table
function sortTable(criteria) {
    const tableBody = document.querySelector("table tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const aValue = a.querySelector(`td[data-${criteria}`).textContent;
        const bValue = b.querySelector(`td[data-${criteria}`).textContent;
        return aValue.localeCompare(bValue);
    });

    // Clear the current table
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Append rows in the new order
    rows.forEach(row => tableBody.appendChild(row));
}

// Event listener for the "Sort" button
document.getElementById("sortButton").addEventListener("click", () => {
    const sortCriteria = document.getElementById("sortCriteria").value;
    sortTable(sortCriteria);
});

// Event listeners for table header clicks to trigger sorting
const tableHeaders = document.querySelectorAll("th[data-sort]");
tableHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const sortCriteria = header.getAttribute("data-sort");
        sortTable(sortCriteria);
    });
});