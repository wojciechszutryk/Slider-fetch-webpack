import '../sass/style.scss';

class Dog {
    constructor() {
        this.apiURL = 'https://dog.ceo/api';
        this.breedsUl = document.querySelector('.dog-details__list');
        this.spinner = document.querySelector('.spinner');
        this.search = document.querySelector('.header-container input');
        this.init();
        this.search.addEventListener('change', (e)=>this.init(e.target.value));
    }
    showLoading(){
        this.spinner.classList.add('spinner--visible');
    }
    hideLoading(){
        this.spinner.classList.remove('spinner--visible');
    }
    async listBreads(){
        const breedList = [];
        const breeds = await fetch(`${this.apiURL}/breeds/list/all`)
            .then(response => response.json())
            .then(data => {return data.message});
        for (const [breed, subBreeds] of Object.entries(breeds)){
            if (subBreeds.length === 0) breedList.push(breed)
            else {
                for (const subBreed of subBreeds) breedList.push(breed + ' ' + subBreed)
            }
        }
        return breedList;
    };
    async getRandomImage(){
        return await fetch(`${this.apiURL}/breeds/image/random`)
            .then(response => response.json())
            .then(data => {return data.message})
    };
    async getRandomImageByBreed(breed){
        return await fetch(`${this.apiURL}/breed/${breed}/images/random`)
            .then(response => response.json())
            .then(data => {return data.message})
    };
    addBreedToDOM(breed){
        this.showLoading();
        let breedUrl = breed;
        if (breedUrl.includes(' ')) breedUrl = breed.replace(' ', '/')

        const li = document.createElement('li');
        li.className = 'dog-details__image';

        const img = document.createElement('img');
        this.getRandomImageByBreed(breedUrl).then(src => img.setAttribute('src', src));

        const p = document.createElement('p');
        p.className = 'dog-details__description';
        p.textContent = breed;

        li.appendChild(img);
        li.appendChild(p);

        li.addEventListener('click', ()=>{
            this.getRandomImageByBreed(breedUrl).then(src => img.setAttribute('src', src));
        });

        this.breedsUl.appendChild(li);
        this.hideLoading();
    }
    renderFiltered(list,phrase){
        const listToRender = list.filter(item => item.includes(phrase));
        this.breedsUl.innerHTML = '';
        listToRender.forEach(breed => this.addBreedToDOM(breed));
    }

    async init(phrase = ""){
        this.showLoading();
        const list = await this.listBreads();
        this.renderFiltered(list,phrase);
        this.hideLoading();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dog();
})