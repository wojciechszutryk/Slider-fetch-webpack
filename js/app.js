import '../sass/style.scss';

class Dog {
    constructor() {
        this.apiURL = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('.dog-image img');

        this.init();
    }
    async listAllBreads(){
        return await fetch(`${this.apiURL}/breeds/list/all`)
            .then(response => response.json())
            .then(data => {return data.message})
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

    init(){
        this.getRandomImage()
            .then(src => this.imgElement.setAttribute('src', src));
        this.listAllBreads()
            .then(breeds => console.log(breeds))
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dog();
})