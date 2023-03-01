const API_URL = `https://api.thecatapi.com/v1/images/search`
const LOADING_SVG_PATH = './assets/loading.png';

const generateCatButton = document.querySelector('.cat-img-generate');
generateCatButton.addEventListener('click', generateCat);

const catImgEl = document.querySelector('.cat-img');

async function getCat() {
	try {
		const response = await fetch(API_URL); 	
		return response.json();
	} catch (error) {
		console.log(error);
		return getCat();
	}
	
}

function setCat(imageUrl) {
	catImgEl.src = imageUrl;
	generateCatButton.removeAttribute('disabled');
	catImgEl.width = '100%';

	const openImageButton = document.querySelector('.cat-img-download');
	openImageButton.onclick = () => openImage(imageUrl);
}

async function generateCat() {
	generateCatButton.setAttribute('disabled', 'true')
	catImgEl.src = LOADING_SVG_PATH;

	const datArr = await getCat();
	const data = datArr[0];
	const { url: imageUrl } = data;

	setCat(imageUrl);
}


function openImage(url) {
  let a = document.createElement('a');
  a.href = url;
	a.target = "_blank"
  document.body.appendChild(a);
  a.click();
  a.remove();
}