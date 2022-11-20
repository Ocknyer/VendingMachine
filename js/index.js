// 변수 선언
const btnCola = document.querySelectorAll('.item');
const getItemList = document.querySelector('.item-list')
const txtBalance = document.querySelector('.txt-balance')
const inpDeposit = document.querySelector('.inp-deposit')
const btnDeposit = document.querySelector('.btn-deposit')
const btnReturn = document.querySelector('.btn-return')
const btnGet = document.querySelector('.btn-get')
const inhand = document.querySelector('.txt-inhand')
const sum = document.querySelector('.txt-sum')
const cartItems = [];

const createUniqueId = () => {
    const time = `${new Date().getTime()}`.slice(-4);
    const randomNum = ~~(Math.random() * 10000);

    return `cartItems${time}${randomNum}`
}

// 콜라 버튼을 클릭하면 아래 리스트에 생성해주는 기능 구현
function setCartItem(item, id) {
    const src = item.querySelector('img').getAttribute('src')
    const title = item.querySelector('.item-name').textContent;
    const findItemIdx = cartItems.findIndex((item) => item.id === id)
    let quantity = 1;

    if (findItemIdx !== -1) {
        if (cartItems[findItemIdx].quantity >= 4) {
            cartItems[findItemIdx].quantity = 5;
            item.classList.add('sold-out')
            return
        }
        return cartItems[findItemIdx].quantity++;
    }
    cartItems.push({id, src, title, quantity})
};

const renderCartItem = () => {
    getItemList.innerHTML = '';
    
    cartItems.forEach((item) => {
        getItemList.innerHTML += `
        <li>
            <img src=${item.src}>
            <p class="list-txt">${item.title}</p>
            <p class='cola-num'>${item.quantity}</p>
        </li>
        `
    })
};

btnCola.forEach((item) => {
    const id = createUniqueId();

    item.addEventListener('click', () => {
    item.classList.add('push');
    setCartItem(item, id);
    renderCartItem();
    })
});

// 입금액을 입력하고 입금 버튼을 누르면 잔액과 소지금에 변화를 주는 기능
btnDeposit.addEventListener('click', (event)=> {
    event.preventDefault()
    const inputCost = parseInt(inpDeposit.value)
    const myMoney = parseInt(inhand.textContent.replaceAll(',', ''));
    const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));

    if (inputCost) {
        if (inputCost <= myMoney && inputCost > 0) {
            inhand.textContent = new Intl.NumberFormat().format(myMoney - inputCost) + '원'
            txtBalance.textContent = new Intl.NumberFormat().format((balance ? balance : 0) + inputCost) + '원'
        } else {
            alert('소지금이 부족합니다.')
        }
        inhand.value = null;
    }
})