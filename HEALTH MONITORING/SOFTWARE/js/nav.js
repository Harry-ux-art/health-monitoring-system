const navToggle = document.getElementById('navToggle');
const head = document.getElementById('headingPhone');
const nav = document.getElementById('navbarSupportedContent');
navToggle.onclick = () => {
	if (nav.classList.contains('show')) {
		setTimeout(() => {
			head.classList.remove('hide');
		}, 500);
	} else {
		head.classList.add('hide');
	}
};
