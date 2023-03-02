const API_URL = `https://api.thecatapi.com/v1/images/search`
const LOADING_SVG_PATH = './assets/images/loading.png';

let isLoading = false;

const generateCatButton = document.querySelector('.cat-img-generate');
generateCatButton.addEventListener('click', generateCat);

const catImg = document.querySelector('.cat-img');

catImg.onload = function(){
	if(!isLoading) {
		this.style.boxShadow = '0 0 15px 5px rgba(255,100,180.5)';
		this.style.border = '1px solid #ff69b4';
	} 
}

function showCat(imageUrl) {
	stopLoading();
	catImg.src = imageUrl;

	const openImageButton = document.querySelector('.cat-img-download');
	openImageButton.onclick = () => openImage(imageUrl);
}

async function generateCat() {
	startLoading();

	const datArr = await getCat();
	const data = datArr[0];
	const { url: imageUrl } = data;

	showCat(imageUrl);
}

async function getCat() {
	try {
		const response = await fetch(API_URL); 	
		return response.json();
	} catch (error) {
		console.log(error);
		return getCat();
	}
	
}

function startLoading() {
	isLoading = true;
	catImg.style.border = 'none';
	catImg.style.boxShadow = 'none';
	catImg.src = LOADING_SVG_PATH;
	generateCatButton.setAttribute('disabled', 'true');
}

function stopLoading() {
	isLoading = false;
	generateCatButton.removeAttribute('disabled');
}

function openImage(url) {
  let a = document.createElement('a');
  a.href = url;
	a.target = "_blank"
  document.body.appendChild(a);
  a.click();
  a.remove();
}

generateCat();