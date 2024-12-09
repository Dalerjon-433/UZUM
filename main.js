import { footer } from "./components/footer";
import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { reload } from "./libs/utils";
import { createElement } from "./components/createProductCard";
import { getData } from "./libs/api";
import { header } from "./components/header";

header()
footer();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let num = 0;
let products = getData('goods');

Promise.all([products])
    .then(([products]) => {
        let rating_res = products.filter(item => item.rating >= 4.5);
        reload(
            rating_res.slice(num, num + 10),
            'grid_dscr',
            createElement
        );

        let show_more = document.querySelector('.show_more');
        if (show_more) {
            show_more.onclick = () => {
                num += 10;

            reload(
                rating_res.slice(num, num + 10),
                'grid_dscr',
                createElement
            );

        if (num + 10 >= rating_res.length) {
            show_more.style.display = 'none';
        }
    };
}

        let price_res = products.filter(item => item.salePercentage > 30);
        reload(
            price_res, 
            'swiper-wrapper-low-price', 
            createElement
        );
        reload(
            products, 
            'swiper-wrapper-all-for-home', 
            createElement
        );
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        direction: 'horizontal',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 1,
            },
            950: {
                slidesPerView: 1,
            },
            900: {
                slidesPerView: 1.2,
            },
            600: {
                slidesPerView: 1.4,
            },
            375: {
                slidesPerView: 1.6,
            },
        }
    });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 
    const swiper_scrol = new Swiper('.swiper_scrol', {
        modules: [ Autoplay],
        direction: 'horizontal',
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