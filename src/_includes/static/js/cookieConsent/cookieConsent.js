/*
  Cookie consent
*/
function cookieConsent() {
  if(document.body.classList.contains('prod')) {
    const cookieBanner = document.querySelector('[data-test="cookieBanner"]');

    if(!localStorage.getItem('consentGranted')) {
      cookieBanner.classList.remove('hidden');
    }

    document.querySelector('[data-test="consentButton"]').addEventListener('click', () => {
      localStorage.setItem('consentGranted', true);

      loadGtagScript();

      cookieBanner.classList.add('hidden');
    });        

    if(localStorage.getItem("consentGranted")) {
      loadGtagScript();
    }

    function loadGtagScript() {
      function gtag() { dataLayer.push(arguments); }

      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted'
      });

      const gtagScript = document.createElement('script');
      gtagScript.defer = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KTTS1RTRLG';

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(gtagScript,firstScript);
    }
  }
}

cookieConsent();

if (typeof module === 'object') {
  module.exports = cookieConsent;
}
