// const selectCola = document.getElementById('btn-cola');
const btnCola = document.querySelectorAll('.item');

console.log(btnCola)
btnCola.forEach((value) => {
    value.addEventListener('click', () => {
    value.classList.add('push');
    })
});


// const colaItem = document.querySelectorAll(".item");

// colaItem.forEach((value) => {
//   value.addEventListener("click", () => {
//     const cart = document.querySelector(".item-get-list");
//     value.classList.add("active");
//   });
// });
