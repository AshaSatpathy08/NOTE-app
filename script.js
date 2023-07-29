// Selecting the necessary DOM elements
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Function to display notes from local storage
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

// Display notes when the page loads
showNotes();

// Function to update the local storage with the current notes
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Adding event listener to create new notes when the button is clicked
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "/images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
});

// Adding event listener to the notes container to handle clicks on delete images and note paragraphs
notesContainer.addEventListener("click", function(e) {
    // If the clicked element is an image (delete button), remove the corresponding note and update storage
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        // If a note paragraph is clicked, update the 'notes' variable to include all current input boxes (notes)
        notes = document.querySelectorAll(".input-box");
        // Add 'onkeyup' event to each note to update storage when the content changes
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            };
        });
    }
});

// Handling the 'Enter' key press to insert a line break instead of creating a new paragraph
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// End of code
