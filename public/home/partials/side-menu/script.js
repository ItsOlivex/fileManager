const side_navigation_buttons = document.querySelectorAll('.menu-item');
const dashboard_items = document.querySelectorAll('.dashboard-item');

let dashboard_item_active = (button, i) => {
  dashboard_items.forEach((item, index) => {
    item.classList.remove('active');
    side_navigation_buttons[index].classList.remove('active');
  })
  dashboard_items[i].classList.add('active');
  side_navigation_buttons[i].classList.add('active');
}

side_navigation_buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    dashboard_item_active(button, i);
  })
})