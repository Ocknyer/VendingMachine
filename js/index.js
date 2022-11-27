let colaData = [
    {
        name: 'Original_Cola',
        img: '../images/Original_Cola.svg',
        price: 1000,
        stock: 5,
    },
    {
        name: 'Violet_Cola',
        img: '../images/Violet_Cola.svg',
        price: 1000,
        stock: 5,
    },
    {
        name: 'Yellow_Cola',
        img: '../images/Yellow_Cola.svg',
        price: 1000,
        stock: 5,
    },
    {
        name: 'Cool_Cola',
        img: '../images/Cool_Cola.svg',
        price: 1000,
        stock: 5,
    },
    {
        name: 'Green_Cola',
        img: '../images/Green_Cola.svg',
        price: 1000,
        stock: 5,
    },
    {
        name: 'Orange_Cola',
        img: '../images/Orange_Cola.svg',
        price: 1000,
        stock: 5,
    },
]

// 변수 선언
const rightSection = document.querySelector('.btn-cola')
const itemCart = document.querySelector('.item-list')

const txtBalance = document.querySelector('.txt-balance')
const inpDeposit = document.querySelector('.inp-deposit')
const btnDeposit = document.querySelector('.btn-deposit')
const btnReturn = document.querySelector('.btn-return')
const btnGet = document.querySelector('.btn-get')

const inhand = document.querySelector('.txt-inhand')
const total = document.querySelector('.txt-total')
const getItemList = document.querySelector('.get-list')

// 콜라 버튼 렌더링
colaData.forEach((item) => {
    const frag = document.createDocumentFragment();
    const listItem = document.createElement('li');
    const templates = `
    <button type="button" class="item" data-item="${item.name}" data-stock="${item.stock}" data-price="${item.price}" data-img="${item.img}">
        <img src="./images/${item.img}" alt="" class="img-item">
        <p class="item-name">${item.name}</p>
        <span class="txt-price">${item.price}원</span>
    </button>
    `
    listItem.innerHTML = templates;
    frag.appendChild(listItem);
    rightSection.appendChild(frag);
})

// 입금액을 입력하고 입금 버튼을 누르면 잔액과 소지금 변화
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
        inpDeposit.value = null;
    }
})

// 거스름돈 반환
btnReturn.addEventListener('click', (event) => {
    const myMoney = parseInt(inhand.textContent.replaceAll(',', ''));
    const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));
    
    if (balance) {
        inhand.textContent = new Intl.NumberFormat().format(balance + myMoney) + '원';
        txtBalance.textContent = '원';
    }
})

// 콜라 버튼 클릭 시 카트에 리스트 생성
const btnCola = document.querySelectorAll('.item');
const itemPrice = parseInt(document.querySelector('.txt-price').textContent)

btnCola.forEach((item) => {
    item.addEventListener('click', (event) => {
        const targetEl = event.currentTarget;
        const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));
        let isStaged = false;
        const cartItemList = itemCart.querySelectorAll('li')
        
        if (balance >= itemPrice) {
            txtBalance.textContent = new Intl.NumberFormat().format(balance - itemPrice) + '원'

            for (const item of cartItemList) {
                if (item.dataset.item === targetEl.dataset.item) {
                    item.querySelector('.num-counter').textContent++;
                    isStaged = true;
                    break;
                }
            }

            if (!isStaged) {
                const cartItem = document.createElement('li');

                cartItem.dataset.item = item.dataset.item;
                cartItem.dataset.price = item.dataset.price;
                cartItem.innerHTML = `
                    <button type="button" class="btn-cola-minus">
                        <img src="./images/${item.dataset.img}" alt="" class="img-cart-item">
                        <p class="item-name">${item.dataset.item}</p>
                        <span class="num-counter">1</span>
                    </button>
                `;
                itemCart.appendChild(cartItem);
            }

            targetEl.dataset.stock--;

            if (!parseInt(targetEl.dataset.stock)) {
                targetEl.classList.add('sold-out')
                targetEl.disabled = true;
                const soldOut = document.createElement('em');
                soldOut.textContent = '해당 상품은 품절되었습니다.';
                soldOut.classList.add('txt-hide');
                targetEl.parentElement.insertBefore(soldOut, targetEl);
            }
        } else if (balance < itemPrice) {
            alert('잔액이 부족합니다. 돈을 입금해주세요.')
        }
    })
});

// 획득 버튼 클릭 시 획득한 음료 탭으로 음료 이동
btnGet.addEventListener('click', () => {
    let isGot = false;
    let totalPrice = 0;

    for (const itemStaged of itemCart.querySelectorAll('li')) {
        for (const itemGot of getItemList.querySelectorAll('li')) {
            let itemGotCount = itemGot.querySelector('.num-counter');
            if (itemStaged.dataset.item === itemGot.dataset.item) {
                itemGotCount.textContent = ~~(itemGotCount.textContent) + ~~(itemStaged.querySelector('.num-counter').textContent);
                isGot = true;
                break;
            }
        }
        if (!isGot) {
            getItemList.appendChild(itemStaged);
        }
    }
    // 총 금액 표시
    getItemList.querySelectorAll('li').forEach((itemGot) => {
        totalPrice += itemGot.dataset.price * ~~(itemGot.querySelector('.num-counter').textContent);
    })
    total.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)} ₩`;
})