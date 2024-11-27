export function footer() {
    document.querySelector("footer").innerHTML = `<div class="container foot_container foot_orig">
        <table class="foot_top">
          <thead>

            <tr>
              <th>О нас</th>
              <th>Пользователям</th>
              <th>Для предпринимателей</th>
              <th>Скачать приложение</th>
            </tr>

          </thead>
          <tbody>

            <tr>
              <td>Пункт выдачи</td>
              <td>Связаться с нами</td>
              <td>Продавайте на узум</td>
              <td class="app">
                <button class="btn_app">
                  <img src="/2553039_app_apple_appstore_logo_device_icon.svg">AppStore
                </button>
                <button class="btn_app">
                  <img src="/2553044_logo_market_marketplace_play_playstore_icon.svg">GooglePlay
                </button>
              </td>
            </tr>

            <tr>
              <td>Вакансии</td>
              <td>Вопрос ответ</td>
              <td>Вход для продавцов</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td class="social">
                <h4>Uzum в соцсетях</h4>
                <div>
                  <img class="social_img" src="/6929237_instagram_icon.svg">
                  <img class="social_img" src="/386727_telegram_icon.svg">
                  <img class="social_img" src="/386622_facebook_icon.svg">
                  <img class="social_img" src="/317714_video_youtube_icon.svg">
                </div>
              </td>
            </tr>

          </tbody>
        </table>
        <hr>

        <div class="foot_bottom">
          <h5>
            <a href="#">Соглашене о конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </h5>
          <p>«2024© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»</p>
        </div>
      </div>
  
      <div class="footer_2 container container_footer">
        <div class="foot_btn">
          <h1 class="text">О нас</h1>
          <p>Пункты выдачи</p>
          <p>Вакансии</p>
        </div>

        <div class="foot_btn">
          <h1 class="text">Пользователям</h1>
          <p>Связятся с нами</p>
          <p>Ворпос - ответ</p>
        </div>

        <div class="foot_btn">
          <h1 class="text">Для предпринимателей</h1>
          <p>Продавайте на UZUM</p>
          <p>Пункты выдычи</p>
        </div>
  
        <div class="networks">
          <h4>Uzum в соцсетях</h4>
                <div>
                  <img class="social_img" src="/6929237_instagram_icon.svg">
                  <img class="social_img" src="/386727_telegram_icon.svg">
                  <img class="social_img" src="/386622_facebook_icon.svg">
                  <img class="social_img" src="/317714_video_youtube_icon.svg">
                </div>
        </div>
  
        <h5>
          <a href="#">Соглашене о конфиденциальности</a>
          <a href="#">Пользовательское соглашение</a>
        </h5>
        <p>«2024© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»</p>
      </div>`
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    let btns = document.querySelectorAll('.foot_btn');
  for (const btn of btns) {
    btn.onclick = () => {
      if (btn.classList.contains('foot_active')) {
        btn.classList.remove('foot_active');
      } else {
        for (const btn_2 of btns) {
          btn_2.classList.remove('foot_active');
        }
        btn.classList.add('foot_active');
      }
    }
  }
}