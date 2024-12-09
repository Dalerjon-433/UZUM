import { header } from "../../components/header";
import { footer } from "../../components/footer";
import { getData} from "../../libs/api";
import { reload } from "../../libs/utils";
import { createElement } from "../../components/createProductCard";
import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

header()
footer()
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let id = localStorage.getItem('productId');
let products = getData('goods');
let globalLikedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

Promise.all([products])
    .then(([products]) => {
        // Проверяем, что данные загружены
        if (!products || products.length === 0) {
            console.error("No products available");
            return;
        }
        
        console.log(products);  // Выводим список товаров для отладки

        // Фильтруем товар по id
        let result = products.filter(item => item.id === parseInt(id));  // Убедитесь, что id числа
        console.log(result);  // Для отладки, выводим найденный товар
        
        if (result.length > 0) {
            productCreate(result[0]);
            let res_similar = products.filter(item => item.type === result[0].type);
            reload(res_similar, 'swiper-wrapper-similar', createElement);
        } else {
            console.error("Product not found");
        }
    })
    .catch((error) => console.error(error));

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function productCreate(obj) {
    let i = obj.colvo || 1;
    document.querySelector('.plus').onclick = () => {
        i = i + 1;
        upDate();
    };
    document.querySelector('.minus').onclick = () => {
        if (i > 1) {
            i = i - 1;
            upDate();
        }
    };

    function upDate() {
        let low_price = Math.round(obj.price * (1 - obj.salePercentage / 100) * i);
        document.querySelector('.colvo').textContent = i;
        document.querySelector('.priduct_price').textContent = low_price.toLocaleString('ru-RU') + ' сум';
        document.querySelector('.kredit_price').textContent = Math.round(obj.price / 8 * i).toLocaleString('ru-RU') + ' сум/мес';

        if (obj.salePercentage > 0) {
            let old_price = document.createElement('span');
            old_price.classList.add('oldprice', 'old_price_2');
            old_price.textContent = Math.round(obj.price * i).toLocaleString('ru-RU') + ' сум';
            document.querySelector('.priduct_price').append(old_price);
        }
    }
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.querySelector('.pruduct_name').textContent = obj.title;
    document.querySelector('.otz').textContent = obj.rating + ' (' + (obj.price - 300) + ' отзывов)';
    document.querySelector('.descr').textContent = obj.description;

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';

    obj.media.forEach(element => {
        let swiperSlide = document.createElement('img');
        swiperSlide.src = element;
        swiperSlide.classList.add('swiper-slide');
        swiperWrapper.append(swiperSlide);
    });

    const swiper = new Swiper('.swiper_product', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    if (obj.media.length > 1) {
        document.querySelector('.box_left').style.display = 'block';
        obj.media.forEach(element => {
            let leftElemImg = document.createElement('img');
            leftElemImg.classList.add('left_elem_img');
            leftElemImg.src = element;
            document.querySelector('.box_left').append(leftElemImg);
        });
    } else {
        document.querySelector('.box_left').style.display = 'none';
    }

    let likebtn = document.querySelector('.like_btn_product');
    let cartBtn = document.querySelector('.btn_product');
    let isLiked = globalLikedItems.some(likedItem => likedItem.id === obj.id);
    let cartItems = JSON.parse(localStorage.getItem('reviewItems')) || [];
    let isInCart = cartItems.some(item => item.id === obj.id);

    updateLikeIcon(isLiked);
    updateCartButton(isInCart);

    likebtn.onclick = async () => {
        isLiked = !isLiked;
        updateLikeIcon(isLiked);
        localStorage.setItem('likedItems', JSON.stringify(globalLikedItems));

        try {
            const itemId = likebtn.getAttribute('data-id'); 
        const item = { id: itemId};
            let isLiked = globalLikedItems.some(likedItem => likedItem.id === item.id);
            if (isLiked) {
                globalLikedItems = globalLikedItems.filter(likedItem => likedItem.id !== item.id);
            } else {
                globalLikedItems.push({ ...item }); 
            }

            localStorage.setItem('likedItems', JSON.stringify(globalLikedItems));        
            console.log('Liked items updated locally:', globalLikedItems);
            updateLikeIcon(!isLiked, item.id);
        } catch (error) {
            console.error('Error updating liked items:', error);
        }
        
        
    };
    cartBtn.onclick = () => {
        if (isInCart) {
            cartItems = cartItems.filter(item => item.id !== obj.id);
        } else {
            cartItems.push({ ...obj, colvo: i });
        }
        localStorage.setItem('reviewItems', JSON.stringify(cartItems));
        isInCart = !isInCart;
        if (isInCart) {
            window.location.href = '';
        }
        updateCartButton(isInCart);
    };
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function updateLikeIcon(isLiked) {
        if (isLiked) {
            likebtn.classList.add('active');
            likebtn.textContent = 'В избранном';
        } else {
            likebtn.classList.remove('active');
            likebtn.textContent = 'Добавить в избранное';
        }
    }

    function updateCartButton(isInCart) {
        if (isInCart) {
            cartBtn.classList.add('active');
            cartBtn.textContent = 'В корзине';
        } else {
            cartBtn.classList.remove('active');
            cartBtn.textContent = 'Добавить в корзину';
        }
    }
    upDate();
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const swiperScroll = new Swiper('.swiper_scrol', {
    modules: [FreeMode, Autoplay],
    direction: 'horizontal',
    freeMode: true,
    slidesPerView: 5,
    spaceBetween: 20,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    breakpoints: {
        1260: {
            slidesPerView: 5,
        },
        910: {
            slidesPerView: 4,
        },
        600: {
            slidesPerView: 3.7,
        },
        520: {
            slidesPerView: 3,
        },
        375: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1.9,
        },
    }
});
