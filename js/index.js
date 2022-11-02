// 변수 선언
const btnCola = document.querySelectorAll('.item');
const getItemList = document.querySelector('.item-list')
const cartItems = [];
// const btnDeposit = document.querySelector('.btn-deposit');

const createUniqueId = () => {
    const time = `${new Date().getTime()}`.slice(-4);
    const randomNum = ~~(Math.random() * 10000);

    return `cartItems${time}${randomNum}`
}

function setCartItem(item, id) {
    const src = item.querySelector('img').getAttribute('src')
    const title = item.querySelector('.item-name').textContent;
    const findItemIdx = cartItems.findIndex((item) => item.id === id)
    let quantity = 1;

    if (findItemIdx !== -1) {
        if (cartItems[findItemIdx].quantity >= 5) {
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