// 변수 선언
const btnCola = document.querySelectorAll('.item');
const cashInHand = document.getElementById('cash-inhand');
const btnDeposit = document.querySelector('.btn-deposit');
const restMoney = document.querySelector('.money-rest');
const inpDeposit = document.querySelector('.inp-deposit');



console.log(btnCola)
btnCola.forEach((value) => {
    value.addEventListener('click', () => {
    value.classList.add('push');
    })
});


btnDeposit.addEventListener('submit', (e) => {
    e.preventDefault()
    restMoney.textContent = inpDeposit.value;
})

// const colaItem = document.querySelectorAll(".item");

// colaItem.forEach((value) => {
//   value.addEventListener("click", () => {
//     const cart = document.querySelector(".item-get-list");
//     value.classList.add("active");
//   });
// });


// locationForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const locationOne = job.value
//     const locationTwo = (10000 / time.value).toFixed();
//     resultJob.textContent = locationOne;
//     resultTime.textContent = locationTwo;
//     loadingTime();
//     setTimeout(function () {
//        loadingTimeout();
//     }, 1300);
//  });