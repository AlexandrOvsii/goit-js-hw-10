import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', onBreedChange);

function onBreedChange(evt) {
  const breedId = refs.breedSelect.value; //или this.value - this в этом контексте - элемент, который запустил фукнцию. То же, что и refs.breedSelect.value
  console.log(breedId);
  refs.loader.style.display = 'block';
  refs.catInfo.style.display = 'none';
  refs.error.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(breed => {
      console.log(breed);
      addHTMLCatInfo(breed);
      refs.loader.style.display = 'none';
      refs.catInfo.style.display = 'flex';
    })
    .catch(error => {
      console.log(error);
      refs.loader.style.display = 'none';
      refs.error.style.display = 'block';
    });
}

fetchBreeds()
  .then(breeds => {
    console.log(breeds);
    // refs.breedSelect.style.display = 'flex';
    // refs.breedSelect.hidden = false;
    refs.loader.style.display = 'none';
    addHTMLOptions(breeds);
    slim();
  })

  .catch(error => {
    console.log(error);
    refs.breedSelect.style.display = 'none';
    refs.error.style.display = 'block';
  });

function addHTMLCatInfo(breed) {
  refs.catInfo.innerHTML = `<img 
  class="gallery_image" 
  src="${breed[0].url}"
  width=500px
/><div class="wrapper">
<h1 class="title">${breed[0].breeds[0].name}</h1>
<p class="description">${breed[0].breeds[0].description}</p>
<p class="temperament"><b>Temperament:</b> ${breed[0].breeds[0].temperament}</p>
</div>
`;
}

function addHTMLOptions(breeds) {
  const breedsOptionsHTML = breeds
    .map(
      breed => `
  <option value="${breed.id}">${breed.name}</option>
  `
    )
    .join('');
  refs.breedSelect.insertAdjacentHTML('afterbegin', breedsOptionsHTML);
}

function slim() {
  new SlimSelect({
    select: refs.breedSelect,
  });
}
