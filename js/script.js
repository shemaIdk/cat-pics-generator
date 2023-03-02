const API_URL = `https://api.thecatapi.com/v1/images/search`
const LOADING_SVG_PATH = '../assets/images/loading.png';

const generateCatButton = document.querySelector('.cat-img-generate');
generateCatButton.addEventListener('click', generateCat);

const catImg = document.querySelector('.cat-img');
catImg.onload = stopLoading;

const loadingImg = document.querySelector('.loading-img');

function showCat(imageUrl) {
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
	catImg.style.display = 'none';
	loadingImg.style.display = 'block';
	loadingImg.src = LOADING_SVG_PATH; // update animation image;

	generateCatButton.setAttribute('disabled', 'true');
}

function stopLoading() {
	catImg.style.display = 'block';
	loadingImg.style.display = 'none';
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