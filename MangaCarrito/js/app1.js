
//Loading and preparation of DOM
document.addEventListener('DOMContentLoaded', () => {

    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);
    
    showImage(currentIndex);
    setInterval(nextImage, 3000);

})    




/*[--CARROUSEL--] */


const images = document.querySelectorAll(".carousel-image");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;



function showImage(index) {
    images.forEach((image, i) => {
        if (i === index) {
            image.style.opacity = 1;
        } else {
            image.style.opacity = 0;
        }
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}















/*[--CAR SHOPPING--] */

const containerMangas = document.querySelector(".section_mangas");
const showManga = document.querySelector(".showMangas")
const allDelete = document.querySelector('.main_table #vaciar-carrito');
const tableMangas = document.querySelector('#car_list')
let countManga = document.querySelector('.submain .count_mangas')
let carListShop = []


function createHtml(){
    clearHtml();


    carListShop.forEach(manga => {
        const table = document.createElement('tr')

        const { Id, Img, Name, Price, Count} = manga

        table.innerHTML = 
        `
            <td>
                <img src="${Img}" class="img_showcar">
            </td>
            <td>
                ${Name}
            </td>  
            <td>
                ${Price}
            </td>
            <td>
                ${Count}
            </td>
            <td>
                <button class="delete_button" data-id="${Id}">X</button>
            </td>
        `

        showManga.appendChild(table)

        if(carListShop.length > 0){
            countManga.innerHTML = carListShop.length;
        }
        
    })
    
}





//Delete a only manga
tableMangas.addEventListener('click', (e)=> {
    if(e.target.classList.contains('delete_button')){
        let elements = e.target.getAttribute('data-id');
        carListShop = carListShop.filter(x => x.Id !== elements);

        if(countManga.textContent === '1'){
            countManga.innerHTML = "";
        }

        createHtml();
    }
})



//Delete all mangas of car
allDelete.addEventListener('click', (e) => {
    e.preventDefault();
    carListShop = []
    countManga.innerHTML = "";
    createHtml();
})




//Get data of the mangas
containerMangas.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('add_car')){
        let elemento = e.target.parentElement
        let price = Number(elemento.children[2].textContent.replace(/\D/g, ""))
        
        
        let infoManga = {
           Id: elemento.children[3].getAttribute('data-id'),
           Img: elemento.children[0].getAttribute('src'),
           Name: elemento.children[1].textContent,
           Price: price,
           Count: 1,
        }
        

        mangaRepeat(infoManga)
        

        createHtml();
    }
})




//Update mangas
function mangaRepeat(manga){
    const existe = carListShop.some(x => x.Id === manga.Id)
    let normal = manga.Price
    if(!existe){
        carListShop.push(manga)
    }else{
        carListShop.map(m => {
            if(m.Id === manga.Id){
                m.Count++;
                m.Price += normal;
            }
        })
    }

    createHtml()
}


//Clear html (For not accumulate mangas and repeat elements)
function clearHtml(){
    while(showManga.firstChild){
        showManga.removeChild(showManga.firstChild)
    }
}











