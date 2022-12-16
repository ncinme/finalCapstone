// Displaying a message when 'Submit' button is pressed

const displayMsg = () => {
    let yrName = document.getElementById("yourName")
    let yrEmail = document.getElementById("yourEmail")

    if (yrName.value == "" || yrEmail.value == "") {
        alert("Name and Email are required fields")
    }
    else {
        alert(`Dear ${yrName.value}, \n\nThank you for submitting your contact details. I will get in touch with you shortly on your email id ${yrEmail.value}.
    \nRegards,\nMukul`)
    }
}