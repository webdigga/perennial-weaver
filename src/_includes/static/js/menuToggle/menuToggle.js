/*
  Click event that toggles menu open and close
*/
function menuToggle() {
  const menuButton = document.querySelector('[data-test="menuButton"]');
  const burger = document.querySelector('[data-test="burger"]');
  const cross = document.querySelector('[data-test="cross"]');

  if(menuButton) {
    menuButton.addEventListener('click', () => {
      const menu = document.querySelector('[data-test="menu"]');
      const menuContainer = document.querySelector('[data-test="menuContainer"]');
      const menuWrapper = document.querySelector('[data-test="menuWrapper"]');
      const siteName = document.querySelector('[data-test="siteName"]');

      if(menu) {
        menu.classList.toggle("hidden");
        menu.classList.toggle("menu-styles");

        menuButton.classList.toggle("transition");
        menuButton.classList.toggle("transform-180");

        menuContainer.classList.toggle("fixed");
        menuContainer.classList.toggle("z-30");

        menuContainer.classList.toggle("left-[50%]");
        menuContainer.classList.toggle("translate-x-[-50%]");

        menuWrapper.classList.toggle("fixed");
        menuWrapper.classList.toggle("z-40");
        menuWrapper.classList.toggle("bg-white");
        menuWrapper.classList.toggle("h-screen");

        burger.classList.toggle("block");
        burger.classList.toggle("hidden");

        cross.classList.toggle("block");
        cross.classList.toggle("hidden");

        siteName.classList.toggle("!text-[color:var(--royal-purple)]")
      }
    });
  }
}

menuToggle();

if (typeof module === 'object') {
  module.exports = menuToggle;
}
