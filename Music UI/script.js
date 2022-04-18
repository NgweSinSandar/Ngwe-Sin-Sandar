ScrollReveal({ 
   reset: true,
   distance: "80px",
   duration: 2500
});

ScrollReveal().reveal(".container1", {origin: "left"});
ScrollReveal().reveal(".container2", {origin: "right"});

let eng = document.querySelector(".eng");
let choose = document.querySelector(".container3");
const cancel = document.querySelector(".cancel");
const h6Click = document.querySelectorAll(".container3 h6");

eng.addEventListener("click", () => {
   choose.classList.remove("d-none");
});

cancel.addEventListener("click", () => {
   choose.classList.add("d-none");
});

h6Click.forEach(element => {
   element.addEventListener("click", () => {
      setTimeout(() => {
         choose.classList.add("d-none");
      }, 700);
   });
});
