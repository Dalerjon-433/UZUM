let globalLikedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

export function createElement(item) {
    const createElement = (type, className, className2, src = '', text = '') => {
        let elem = document.createElement(type);
        if (className) elem.classList.add(className);
        if (className2) elem.classList.add(className2);
        if (src) elem.src = src;
        if (text) elem.textContent = text;
        return elem;
    };

    let gridelem = createElement('div', 'gridelem', 'swiper-slide');
    let productImgBox = createElement('div', 'productImgBox');
    let likebtn = createElement('div', 'likebtn');
    let likeimg = createElement('img', 'likeimg');
    let productImg = createElement('img', 'productImg', '', item.media[0]);
    let pruductParams = createElement('div', 'pruductParams');
    let title = createElement('div', 'title', '', '', item.title.slice(0, 30) + '...');
    let otzbox = createElement('div', 'otzbox');
    let otzvimg = createElement('img', 'otzimg', '', '/9004759_star_favorite_award_like_icon.svg');
    let otzv = createElement('p', 'otz', '', '', item.rating + ' (' + (item.price - 353) + ' отзывов)');
    let kreditprice = createElement('span', 'kredit_price', '', '', Math.round(item.price / 8).toLocaleString('ru-RU') + " сум/мес");
    let bottomPrdParm = createElement('div', 'bottomPrdParm');
    let priceBox = createElement('div', 'priceBox');
    let oldprice = createElement('p', 'oldprice', '', '', item.salePercentage > 0 ? item.price.toLocaleString('ru-RU') + ' сум' : '');
    let price = createElement('p', 'price', '', '', Math.round(item.price * (1 - item.salePercentage / 100)).toLocaleString('ru-RU') + ' сум');
    let plastProduct = createElement('button', 'plastProduct');
    let plastProductImg = createElement('img', '', '', '/4243341_basic_shopping_app_ux_icon.svg');

    let isLiked = globalLikedItems.some(likedItem => likedItem.id === item.id);

    likeimg.src = isLiked ? '/9022609_heart_straight_duotone_icon.svg' : '/211754_heart_icon.svg';

    function updateLikeIcon(liked) {
        likeimg.src = liked ? '/9022609_heart_straight_duotone_icon.svg' : '/211754_heart_icon.svg';
    }
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    likebtn.onclick = async () => {
        isLiked = !isLiked;
        updateLikeIcon(isLiked);
        localStorage.setItem('likedItems', JSON.stringify(globalLikedItems));

        try {
            const isLiked = globalLikedItems.some(likedItem => likedItem.id === item.id);
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
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    pruductParams.onclick = () => {
        localStorage.setItem('productId', item.id);
        window.location.href = '/pages/products/';
    };

    productImg.onclick = () => {
        localStorage.setItem('productId', item.id);
        window.location.href = '/pages/products/';
    };

    priceBox.append(price);
    if (item.salePercentage > 0) {
        priceBox.append(oldprice);
    }
    plastProduct.append(plastProductImg);
    bottomPrdParm.append(priceBox, plastProduct);
    otzbox.append(otzvimg, otzv);
    pruductParams.append(title, otzbox, kreditprice, bottomPrdParm);
    likebtn.append(likeimg);
    productImgBox.append(productImg, likebtn);
    gridelem.append(productImgBox, pruductParams);

    return gridelem;

}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export function elemSearch(item) {
    const createElement = (type, className, className2, src = '', text = '') => {
        let elem = document.createElement(type);
        if (className) elem.classList.add(className);
        if (className2) elem.classList.add(className2);
        if (src) elem.src = src;
        if (text) elem.textContent = text;
        return elem;
    };

    let gridelem = createElement('div', 'searchElem');
    let productImgBox = createElement('div', 'productImgBox', 'searchproductImgBox');
    let productImg = createElement('img', 'productImg', 'searchproductImg', item.media[0]);
    let pruductParams = createElement('div', 'pruductParams');
    let title = createElement('div', 'title', '', '', item.title.slice(0, 45) + '...');
    let otzbox = createElement('div', 'otzwbox')
    let otzvimg = createElement('img', 'otzimg', '', '/9004759_star_favorite_award_like_icon.svg');
    let otzv = createElement('p', 'otz', '', '', item.rating + ' (' + (item.price - 353) + ' отзывов)');
    let kreditprice = createElement('span', 'kredit_price', '', '', Math.round(item.price / 8).toLocaleString('ru-RU') + " сум/мес");
    let bottomPrdParm = createElement('div', 'bottomPrdParm', 'searchbottomPrdParm');
    let priceBox = createElement('div', 'priceBox');
    let oldprice = createElement('p', 'oldprice', '', '', item.salePercentage > 0 ? item.price.toLocaleString('ru-RU') + ' сум' : '');
    let price = createElement('p', 'price', '', '', Math.round(item.price * (1 - item.salePercentage / 100)).toLocaleString('ru-RU') + ' сум');

    gridelem.onclick = () => {
        localStorage.setItem('productId', item.id);
        window.location.href = '/pages/products/';
    };

    priceBox.append(price);
    if (item.salePercentage > 0) {
        priceBox.append(oldprice);
    }
    bottomPrdParm.append(priceBox);
    otzbox.append(otzvimg, otzv);
    pruductParams.append(title, otzbox, kreditprice, bottomPrdParm);
    productImgBox.append(productImg);
    gridelem.append(productImgBox, pruductParams);
    return gridelem;
}
    