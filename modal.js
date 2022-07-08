'use strict';

//armazena os objetos selecionados no modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
let btnsOpenModal = document.querySelectorAll(".show-modal");

//const closers = [btnCloseModal,overlay];

function openModal() {
    modal.classList.remove("hidden"); // SEM .
    overlay.classList.remove("hidden");
}

function closeModal() {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
}

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", openModal);
}


btnCloseModal.addEventListener("click", closeModal);// sem .
overlay.addEventListener("click", closeModal);

/* document.addEventListener("keydown", function (e) {
    console.log(`The key ${e.key} was pressed.`);

    if (e.key === "Escape" && !modal.classList.contains("hidden"))
        closeModal();
}); */