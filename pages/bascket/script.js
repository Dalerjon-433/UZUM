import { header } from "../../components/header";
import { footer } from "../../components/footer";
import { reload } from "../../libs/utils";

header();
footer();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
let date = (new Date().getDate() + 1) + ' ' + month[new Date().getMonth()];
document.querySelectorAll('.date').forEach(element => element.textContent = date);

let cartItems = [];
try {
    cartItems = JSON.parse(localStorage.getItem('reviewItems')) || [];
} catch (e) {
    console.error(error);
    cartItems = [];
}

if (cartItems.length) {
    document.querySelector('.colvo_product').textContent = cartItems.length + ' товар';
    // console.log(cartItems);
    reload(
        cartItems,
        'prd_box_left_elem', 
        createPrdLeft
    );
    createPrdRight();
} else {
    document.querySelector('.section_2').style.display = 'block';
    document.querySelector('.container_favorites').style.display = 'none';
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function createPrdLeft(item) {
    let quantity = item.colvo;

    document.querySelector('.section_2').style.display = 'none';
    document.querySelector('.container_favorites').style.display = 'block';

    function createElement(type, className, className2, src = '', text = '') {
        let elem = document.createElement(type);
        if (className) elem.classList.add(className);
        if (className2) elem.classList.add(className2);
        if (src) elem.src = src;
        if (text) elem.textContent = text;
        return elem;
    };

    let tovar_elem = createElement('div', 'tovar_elem');
    tovar_elem.setAttribute('data-id', item.id);
    let elem_child = createElement('div', 'elem_child');
    let elem_child1 = createElement('div', 'elem_child1');
    let child1_img = createElement('img', 'child1_img', '', item.media[0]);
    let child1_elem = createElement('div', 'child1_elem');
    let child1_title = createElement('p', 'child1_title', '', '', item.title);
    let child1_btn_box = createElement('div', 'child1_btn_box');
    let btn_box_text = createElement('p', 'btn_box_text', '', '', 'Продавец: ');
    let span = createElement('span', '', '', '', 'Dalerjon');
    let box_btn_colvo = createElement('div', 'box_btn_colvo2');
    let minus = createElement('button', 'minus_btn', '', '', '-');
    let colvo = createElement('p', 'colvo', '', '', quantity);
    let plus = createElement('button', 'plus_btn', '', '', '+');

    box_btn_colvo.append(minus, colvo, plus);
    btn_box_text.append(span);
    child1_btn_box.append(btn_box_text, box_btn_colvo);
    child1_elem.append(child1_title, child1_btn_box);
    elem_child1.append(child1_img, child1_elem);

    let elem_child_2 = createElement('div', 'elem_child2');
    let child_2_btn = createElement('button', 'child_2_btn');
    let child_2_btn_text = createElement('p', 'child_2_btn_text', '', '', 'Удалить');
    let child_2_btn_img = createElement('img', 'child_2_btn_img', '', '/2135797_bin_trash bin_icon.svg');
    let old_price = createElement('p', 'oldprice', '', '', item.salePercentage > 0 ? item.price.toLocaleString('ru-RU') + ' сум' : '');
    let price = createElement('p', 'price', '', '', Math.round(item.price * (1 - item.salePercentage / 100)).toLocaleString('ru-RU') + ' сум');
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    child_2_btn.onclick = () => {
        deleteItem(item.id);
    };

    plus.onclick = () => {
        quantity += 1;
        updateItemQuantity(item.id, quantity);
        upDate();
    };

    minus.onclick = () => {
        if (quantity > 1) {
            quantity -= 1;
            updateItemQuantity(item.id, quantity);
            upDate();
        }
    };
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function upDate() {
        let low_price = Math.round(item.price * (1 - item.salePercentage / 100) * quantity);
        colvo.textContent = quantity;
        price.textContent = low_price.toLocaleString('ru-RU') + ' сум';

        if (item.salePercentage > 0) {
            old_price.textContent = Math.round(item.price * quantity).toLocaleString('ru-RU') + ' сум';
        } else {
            old_price.textContent = '';
        }
        createPrdRight();
    }

    function updateItemQuantity(id, newQuantity) {
        let itemIndex = cartItems.findIndex(cartItem => cartItem.id === id);
        if (itemIndex !== -1) {
            cartItems[itemIndex].colvo = newQuantity;
            localStorage.setItem('reviewItems', JSON.stringify(cartItems));
        }
    }

    function deleteItem(id) {
        cartItems = cartItems.filter(cartItem => cartItem.id !== id);
        localStorage.setItem('reviewItems', JSON.stringify(cartItems));
        tovar_elem.remove();
        createPrdRight();

        if (cartItems.length === 0) {
            document.querySelector('.section_2').style.display = 'block';
            document.querySelector('.container_favorites').style.display = 'none';
        }

        document.querySelector('.colvo_product').textContent = cartItems.length + ' товар';
    }

    child_2_btn.append(child_2_btn_img, child_2_btn_text);
    elem_child_2.append(child_2_btn, price);
    if (item.salePercentage > 0) {
        elem_child_2.append(old_price);
    }
    elem_child.append(elem_child1, elem_child_2);
    tovar_elem.append(elem_child);

    upDate();
    return tovar_elem;
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function createPrdRight() {
    let totalQuantity = cartItems.reduce((total, item) => total + item.colvo, 0);
    let totalPrice = cartItems.reduce((total, item) => total + (item.price * item.colvo), 0);
    let totalPriceSale = cartItems.reduce((total, item) => total + (item.price * item.colvo * (1 - item.salePercentage / 100)), 0);

    document.querySelector('.all_colvo').textContent = totalQuantity;
    document.querySelector('.all_price').textContent = totalPrice.toLocaleString('ru-RU') + ' сум';
    document.querySelector('.concl').textContent = totalPriceSale.toLocaleString('ru-RU') + ' сум';
}

document.querySelector('.buy').onclick = () => {
    localStorage.setItem('reviewItems', JSON.stringify([]));
    cartItems = [];
    document.querySelector('.section_2').style.display = 'block';
    document.querySelector('.container_favorites').style.display = 'none';
    document.querySelector('.colvo_product').textContent = '0 товар';
    document.querySelector('.all_colvo').textContent = '0';
    document.querySelector('.all_price').textContent = '0 сум';
    document.querySelector('.concl').textContent = '0 сум';
};