/**
 * @jest-environment jsdom
 */
const menuToggle = require('./menuToggle');

describe('menuToggle', () => {
  let menuButton, burger, cross, menu;

  beforeEach(() => {
    // Set up the DOM elements before each test
    document.body.innerHTML = `
      <div data-test="siteName">Perennial Weaver</div>
      <div data-test="menuWrapper">
        <div data-test="menuContainer">
            <button data-test="menuButton"></button>
            <div data-test="burger" class="block"></div>
            <div data-test="cross" class="hidden dark-copy"></div>
            <div data-test="menu" class="hidden"></div>
          </div>
      </div>
    `;
    
    menuButton = document.querySelector('[data-test="menuButton"]');
    burger = document.querySelector('[data-test="burger"]');
    cross = document.querySelector('[data-test="cross"]');
    menu = document.querySelector('[data-test="menu"]');

    // Call the function to attach event listeners
    menuToggle();
  });

  test('toggles menu visibility and button states on click', () => {
    // Initial states
    expect(menu.classList.contains('hidden')).toBe(true);
    expect(burger.classList.contains('block')).toBe(true);
    expect(cross.classList.contains('hidden')).toBe(true);
    
    // Click the menu button
    menuButton.click();

    // Check the states after first click
    expect(menu.classList.contains('hidden')).toBe(false);
    expect(menu.classList.contains('menu-styles')).toBe(true);
    expect(menuButton.classList.contains('transition')).toBe(true);
    expect(menuButton.classList.contains('transform-180')).toBe(true);
    expect(burger.classList.contains('block')).toBe(false);
    expect(burger.classList.contains('hidden')).toBe(true);
    expect(cross.classList.contains('block')).toBe(true);
    expect(cross.classList.contains('hidden')).toBe(false);
    
    // Click again to toggle back
    menuButton.click();

    // Check the states after second click
    expect(menu.classList.contains('hidden')).toBe(true);
    expect(menu.classList.contains('menu-styles')).toBe(false);
    expect(menuButton.classList.contains('transition')).toBe(false);
    expect(menuButton.classList.contains('transform-180')).toBe(false);
    expect(burger.classList.contains('block')).toBe(true);
    expect(burger.classList.contains('hidden')).toBe(false);
    expect(cross.classList.contains('block')).toBe(false);
    expect(cross.classList.contains('hidden')).toBe(true);
  });

  test('does not throw error if menuButton is not present', () => {
    // Remove the menuButton
    menuButton.remove();

    // Call the function again
    expect(() => menuToggle()).not.toThrow();
  });
});
