const allSideMenu = document.querySelectorAll('#sidebar .side-menu li a');
const contents = document.querySelectorAll('.main-item');


allSideMenu.forEach((item, index) => {
	const li = item.parentElement;

	item.addEventListener('click', () => {
		allSideMenu.forEach((item, i)=> {
			item.parentElement.classList.remove('active');
			contents[i].classList.remove('active');
		})
		li.classList.add('active');
		contents[index].classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})










const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', () => {
	if(switchMode.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})