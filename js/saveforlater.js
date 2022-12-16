/* Requiurements:
Create a functional “Save for later” page for your website, where users can earmark articles, 
images, recipes, etc. in a personal folder to be able to go back and see them later.
    ○ Create a new HTML page for the “Save for later” section, which allows the user to see what is in their folder.

Following features were implemented in 'Hobbies' page:
    ○ Each item/recipe/image, etc. must have the option to “Save for later”.
    ○ When an item is added, an alert should tell the user how many items are in their “Save for later” folder.
*/

// this function will add 'Save for Later' item as a row in the table in 'Save for Later'
// this function will be called when saveforlater.html page is loaded (onlead)
const addRowToTable = () => {
    let saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))               // get the existing records from localStorage

    if (saveForLaterList.length == 0) {                                                 //If no item left in saveForLaterList, hide the table
        document.getElementById("saveLaterTable").style.visibility = "hidden"
        document.querySelector('#noItem').innerText = "There are no saved items"
    }

    const rowArr = document.querySelector('#saveLaterRows')                             // get all the 'tr' elements in table body in saveforlater.html

    for (let item of saveForLaterList) {
        // create a new row for a 'saved for later' item
        let row = document.createElement('tr')
        // add item and corresponding link as 'td'
        for (let key in item) {
            let data = document.createElement('td')
            if (key == 'link') {                                                        // make it a clickable link
                let a = document.createElement('a')
                a.href = item[key]
                a.innerText = item[key]
                data.appendChild(a)
            }
            else {
                data.innerHTML = item[key]
            }
            row.appendChild(data)
        }
        // add Delete button as a child element of a td
        let dataDeleteBtn = document.createElement('td')
        let btnDelete = document.createElement('button')
        btnDelete.innerHTML = 'Delete'
        dataDeleteBtn.appendChild(btnDelete)
        row.appendChild(dataDeleteBtn)

        rowArr.appendChild(row)
    }
    deleteItem()
}

// this function will allow the user to delete an item. 
const deleteItem = () => {
    let saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))                   // get the existing records from localStorage
    let tdList = document.querySelectorAll("td")                                            // list of all 'td' items
    Array.from(tdList).forEach(td => {
        if (td.innerText == 'Delete') {
            td.addEventListener("click", () => {                                            // Add a click event listener to each <td> element having 'Delete' button.
                idx = td.parentElement.rowIndex - 1
                saveForLaterList.splice(idx, 1)                                             // remove this record from saveForLaterList
                localStorage.setItem("savedItems", JSON.stringify(saveForLaterList))        // update the localStorage with the updated saveForLaterList
                td.parentElement.remove()                                                   // remove the entire row from the table

                if (saveForLaterList.length == 0) {                                         //If no item left in saveForLaterList, hide the table
                    document.getElementById("saveLaterTable").style.visibility = "hidden"
                    document.querySelector('#noItem').innerText = "There are no saved items"
                }
            })
        }
    })
}