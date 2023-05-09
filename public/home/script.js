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


/*const newFolder = document.querySelector('.folder.addFolder');
const folderInput = document.querySelector('#folderName');
document.querySelector('#folderName').focus();

folderInput.addEventListener('focus', () => {
	newFolder.classList.remove('active');
});

folderInput.addEventListener('blur', () => {
	const folders = document.querySelectorAll('.folder');
	folders.forEach((folder, i) => {
		if (folder.className.includes('addFolder')) {
      folder.parentNode.insertBefore(folder, folders[folders.length-1].nextSibling);
    }
	});
  newFolder.classList.add('active');
  newFolder.style.width = '100%';
});*/