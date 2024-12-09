import { header } from "../../components/header";
import { footer } from "../../components/footer";
import { reload } from "../../libs/utils";
import { createElement } from "../../components/createProductCard";

header();
footer();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
export function favorites() {
    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    if (likedItems.length) {
        console.log(likedItems); 
        document.querySelector('.section_2').style.display = 'none';
        document.querySelector('.container_favorites').style.display = 'block';
        reload(
            likedItems, 
            'grid_dscr', 
            createElement
        );  
    } else {
        document.querySelector('.section_2').style.display = 'block';
        document.querySelector('.container_favorites').style.display = 'none';
    }
}
favorites();
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function clearFavorites() {
    localStorage.removeItem('likedItems');
    document.querySelector('.section_2').style.display = 'block';  
    document.querySelector('.container_favorites').style.display = 'none';  
    updateHeartIcons();  
}
document.getElementById('clearFavorites').addEventListener('click', clearFavorites);
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function upDateIcon() {

    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    document.querySelectorAll('.like-icon').forEach(icon => {
        let itemId = parseInt(icon.dataset.id, 10); 
        let isLiked = likedItems.some(item => item.id === itemId);

        if (isLiked) {
            icon.classList.add('liked');
        } else {
            icon.classList.remove('liked');
        }
    });
}
upDateIcon();

