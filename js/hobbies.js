/* Requiurements: 
1. Create a functional “Save for later” feature:
    ○ Each item/recipe/image, etc. must have the option to “Save for later”.
    ○ When an item is added, an alert should tell the user how many items are in their “Save for later” folder.
Note: I have implemented 'Save for Later' links wherever any external links are used in hobbies.html page, e.g. for each hobby.

2. Create a form which allows a user to leave comments.
3. Create forms to allow a user to “like” an item/article/etc.

*/

// this function will be called when hobbies.html page is loaded (onload)
const onLoad = () => {
    let saveForLaterList = []

    // if the page is loading for the first time, initialise the localStorage
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem("savedItems", JSON.stringify(saveForLaterList))
        localStorage.setItem("hasCodeRunBefore", true)
    } else {
        saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))               // get the existing records from localStorage
    }

    // 'Save for Later' option is link in the hobbies.html file. Thus, we collect all 'a' elements. 
    let saveForLater = document.querySelectorAll('a')
    Array.from(saveForLater).forEach(a => {
        if (a.innerText == "Save for Later") {
            // identify the 'a' element in the immediate previous sibling. This is the url that we want to save for later read.
            Array.from(a.previousElementSibling.children).forEach(ele => {
                if (ele.nodeName == "A") {
                    a.addEventListener("click", () => {
                        // check if there are existing items in the saveForLaterList (i.e. in the localStorage)
                        try {
                            existingItems = []
                            for (obj of saveForLaterList) {
                                existingItems.push(obj.link)
                            }
                            // add only those items that are not already there in the existingItems
                            if (!(existingItems.includes(ele.href))) {
                                let listObj = { item: ele.innerText, link: ele.href }
                                saveForLaterList.push(listObj)
                                localStorage.setItem("savedItems", JSON.stringify(saveForLaterList))
                                saveForLaterList = JSON.parse(localStorage.getItem("savedItems"))
                                // When an item is added, an alert should tell the user how many items are in their “Save for later” folder.
                                // Here, I am displaying it in an Array format as there is very little room to format data in an alert box.
                                alert(`The items in 'Save for Later' list are:\n\n ${JSON.stringify(saveForLaterList)}`)
                            }
                            else {
                                alert(`This item is already present in 'Save for Later' list. \n\n ${JSON.stringify(saveForLaterList)}`)
                            }
                        }
                        catch (error) {
                            alert(error)
                        }
                    })
                }
            })
        }
    })
    like()
    comments()
}

// this function changes the color of 'like' icon on click, and increases the like count
const like = () => {
    let count = 0
    let imgEle = document.querySelector(".thumbsup")
    let likeText = document.querySelector(".like")
    let blankImg = imgEle.src
    let filledImg = blankImg.replace('thumbsup_blank', 'thumbsup_filled')

    imgEle.addEventListener('click', () => {
        if (imgEle.src == blankImg) {
            imgEle.src = filledImg
            likeText.style.color = 'blue'
            count++
            likeText.innerText = `Like(${count})`
        }
        else {
            imgEle.src = blankImg
            likeText.style.color = 'black'
        }
    })
}

// this function displays the comment box, and also lists down all the comments entered.
const comments = () => {
    let section = document.getElementById("leaveComment")
    let comment = document.getElementById("comment")
    let box = document.getElementById("yourComment")
    let allComments = document.getElementById("allComments")

    comment.style.color = 'blue'
    box.style.visibility = "hidden"
    allComments.style.visibility = "hidden"

    comment.addEventListener('click', () => {
        box.style.visibility = "visible"
        comment.style.color = '#0d8db4'
    })

    // I am only displaying comments during the session (and not storing it, as the implementation of localStorage 
    // is already been demostrated in 'Save for Later' feature).
    box.addEventListener("keyup", function (e) {
        if (e.key == 'Enter') {
            allComments.style.visibility = "visible"
            let para = document.createElement('p')
            para.innerHTML = box.value
            section.appendChild(para)
            section.className = "section-bg"
            box.value = ""
        }
    })
}
