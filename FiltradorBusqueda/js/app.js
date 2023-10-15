import { peliculas } from "./base.js";



/*[--SELECTS] --*/
const years = document.querySelector('#Year');
const generes = document.querySelector('#genres');
const titles = document.querySelector('#names');
const resultHtml = document.querySelector('.result');

/*[--Years generate--] for options */
const yearMovieMax = new Date().getFullYear() - 3;
const yearMovieMin = yearMovieMax - 13;


let objMovie = {
    nameMovie: "",
    nameGenere: "",
    yearsMovie: "",

}



const createYears = () => {
    for(let i = yearMovieMax; i >= yearMovieMin; i--){
        generateOption(i, years)
    }


}


const createMovies = () => {
    for(let i = 0; i < peliculas.length; i++){
        let movies = peliculas[i].nombre
        generateOption(movies, titles)
    }
}


const createGeneres = () => {
    let generesAll = [...new Set(peliculas.map(x => x.genero))]
    generesAll.forEach(item => {
        generateOption(item, generes);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    
   createMovies();
   createGeneres();
   createYears();
   createHtml(peliculas);
})


function generateOption(asign, father){
    let elementOption = document.createElement('option');
    elementOption.value = asign;
    elementOption.textContent = asign;
    father.appendChild(elementOption);
}

function createHtml(moviesActually){


    clearHtml();

    if(moviesActually.length <= 0){
        let paragraph = document.createElement('h1');
        paragraph.textContent = "No results have been found with your search";
        resultHtml.appendChild(paragraph);

    }else{
        moviesActually.forEach(item => {

            let cardDiv = document.createElement('div')
            cardDiv.classList.add('cardStyles')
            cardDiv.innerHTML =
            `
                <h3>${item.nombre}</h3>
                <h4>Genre: ${item.genero}</h4>
                <h4>Year: ${item.año}</h4>
                <img src="${item.src}" alt="${item.nombre}">
            `
    
    
            resultHtml.appendChild(cardDiv);
    
        })
    }


} 




function filterMovies(){
    let nuevaMovies = peliculas
    .filter( filterTitle )
    .filter( filterYear )
    .filter( filterGenere );


    createHtml(nuevaMovies);
}





//Functions filters

function filterTitle(movi){
    const { nameMovie } = objMovie;
    return nameMovie ? nameMovie === movi.nombre : movi;
}


function filterYear(movi){
    const { yearsMovie } = objMovie;
    return yearsMovie ? parseInt(yearsMovie) === movi.año : movi;
}

function filterGenere(movi){
    const { nameGenere } = objMovie;
    return nameGenere ? nameGenere === movi.genero : movi;
}






//Filter each taht change

titles.addEventListener('change', (e) => {
    objMovie.nameMovie = e.target.value;
    
    filterMovies();
})


generes.addEventListener('change', (e) => {
    objMovie.nameGenere = e.target.value;
    
    filterMovies()
})



years.addEventListener('change', (e) => {
    objMovie.yearsMovie = e.target.value;
    
    filterMovies()
})




//Function for clear html of the filters

function clearHtml(){
    while(resultHtml.firstChild){
        resultHtml.removeChild(resultHtml.firstChild)
    }
}