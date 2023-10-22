const modelsCars = document.querySelector('#models');
const yearsOfCars = document.querySelector('#yearsCar');
const radios = document.querySelectorAll('#types')
const form = document.querySelector('.form_insurance');
const infoCertificate = document.querySelector('.info_insurance');

let valueModel;
let valueYear;
let valueType;


function InsuranceBuy(model, year, plan){
    this.model = model;
    this.year = year;
    this.plan = plan;
}



InsuranceBuy.prototype.Show = function(){
    let valor;


    valor = this.model === "American" ? 700 : this.model === "European" ? 500 : 300;

    valor += this.year < 2020 ? parseInt((this.year.toString()).split("")[3]) * 100 : (this.year*150)/100;

    valor += this.plan === "Basic" ? 150 : 450
    
    valor = parseInt(valor);

    console.log(valor);

    // infoCertificate.innerHTML = 
    // `
    // <h2>Model: ${this.model}</h2>
    // <h2>Year: ${this.year}</h2>
    // <h2>Price: ${}
    
    
    
    // `
}






const fillModels = () => {
    let types = ["Select", "American", "Asiactic", "European"];
    types.forEach(item => {
        const element = document.createElement('option');
        if(item === "Select"){
            element.value = "";
            element.textContent = item;
        }else{
            element.value = item;
            element.textContent = item;
        }

        modelsCars.appendChild(element);
    })
}


const fillYears = () => {
    for(let i = 2024; i >= 2016; i--){
        const element = document.createElement('option');
        if(i === 2024){
            element.value = "";
            element.textContent = "Select";
            yearsOfCars.appendChild(element);
        }else{
            element.value = i;
            element.textContent = i;
            yearsOfCars.appendChild(element);
        }
    }
}







document.addEventListener('DOMContentLoaded', () => {
    fillModels();
    fillYears();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        valueModel = modelsCars.value
        valueYear = yearsOfCars.value


        radios.forEach(item => {
            if(item.checked){
                valueType = item.value
            }
        })
    
        const car = new InsuranceBuy(valueModel, parseInt(valueYear), valueType)
        car.Show();
    })

    
})



