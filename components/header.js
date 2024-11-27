import { getData } from "../libs/api";
import { elemSearch } from "./createProductCard";
import { reload } from "../libs/utils";

export function header() {
    document.querySelector("header").innerHTML = 
    `<div class="container head_container">
        <div class="header_top">
          <button class="logo logo_orig"><img src="/Group.png" alt=""></button>
          <div class="head_2 all_head">
            <button class="katalog_btn katalog_click">Каталог</button>
            <div class="inp_btn">
              <input type="text" placeholder="Искать товары" class="search">
              <button class="search_btn"><img class="searchBtnImg" src="/211817_search_strong_icon (1).png" alt=""></button>
            </div>
          </div>
          <div class="head_3 all_head">
            <button class="login head_btn">
              <img src="/3643745_human_man_people_person_profile_icon.png" alt="">
              <p class="name_p">Войти</p>
            </button>
            <button class="favorites head_btn">
              <img src="/8664909_heart_like_icon.png" alt="">
              <p>Избранное</p>
            </button>
            <button class="basket head_btn">
              <img src="/622396_bag_shopping_basket_buy_ecommerce_icon.png" alt="">
              <p>Корзина</p>
            </button>
          </div>
        </div>
        <div class="bottom_head">
  <p>Категории товаров</p>
  <a class="href_products" id="furniture" href="#">Мебель <span class="colvo_prd" id="furniture_count"></span></a>
  <a class="href_products" id="PC" href="#">П.К. <span class="colvo_prd" id="PC_count"></span></a>
  <a class="href_products" id="audio" href="#">Аудио <span class="colvo_prd" id="audio_count"></span></a>
  <a class="href_products" id="TV" href="#">Телевизоры <span class="colvo_prd" id="TV_count"></span></a>
  <a class="href_products" id="kitchen" href="#">Для кухни <span class="colvo_prd" id="kitchen_count"></span></a>
</div>
      </div>`
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let bottom_head = document.querySelector('.bottom_head');
let category = document.querySelectorAll('.colvo_prd');
let hrefPrd = document.querySelectorAll('.href_products');
let katalogBtn = document.querySelectorAll('.katalog_click');
let korzinaBtn = document.querySelectorAll('.basket');
let searchInp = document.querySelector(".search")
let searchCont = document.querySelector('.container_search');  
let searchImg = document.querySelector('.searchBtnImg');
let searchBtn = document.querySelector('.search_btn');
let body = document.querySelector('body');
let bk_head = document.querySelector('.back_head');
let favoritesBtn = document.querySelectorAll(".favorites")

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

searchBtn.onclick = () => {
  if (searchCont.style.display == 'none') {
    bk_head.style.display = 'block';
    searchCont.style.display = 'block';
    body.style.overflow = 'hidden';
    searchImg.src = '/211651_close_round_icon.png'
  } else {
    bk_head.style.display = 'none';
    searchCont.style.display = 'none';
    body.style.overflow = 'auto';
    searchImg.src = '/211817_search_strong_icon (1).png'
  }
}

searchInp.addEventListener('keyup', debounce(async () => {
  try {
    const res = await getData('goods');
    const query = searchInp.value.trim().toLowerCase();
    if (query.length === 0) {
      reload(
        [], 
        'search_result', 
        elemSearch
      );
      return;
    }
    const result = res.filter(item => item.title.toLowerCase().includes(query));
    reload(
      result, 
      'search_result', 
      elemSearch
    );
  } catch (error) {
    console.error(error);
  }
}));
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
document.querySelectorAll('.favorites').forEach(elem => elem.onclick = () => {
    window.location.href = '/pages/favorites/'
})

for (let item of hrefPrd) {
  item.onclick = () => {
    localStorage.setItem('type', item.id);
    reWork();
  };
}

for (let item of category) {
  getData(`goods?type=${item.id}`)
    .then(res => {
      item.textContent = `${res.length} товаров`;
    })
    .catch(error => console.error(error));
}

for (let elem of katalogBtn) {
  elem.onclick = () => {
    bottom_head.classList.toggle('visible');
  };
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let cartItems = JSON.parse(localStorage.getItem('reviewItems')) || [];
  for (const elem of korzinaBtn) {
    elem.onclick = () => {
      window.location.href = '/pages/bascket/'
    }

    if (cartItems.length) {
      let span = document.createElement('span');
      span.classList.add('head_span');
      span.textContent = cartItems.length;
      elem.append(span)
    }
  }

  // for (const elem of favoritesBtn) {
  //   elem.onclick = () => {
  //     window.location.href = '/pages/favorites/'
  //   }

  //   if (cartItems.length) {
  //     let span = document.createElement('span');
  //     span.classList.add('head_span');
  //     span.textContent = cartItems.length;
  //     elem.append(span)
  //   }
  // }

      let logo = document.querySelector(".logo")
      logo.onclick = () => {
        window.location.href = "/"
      }
}