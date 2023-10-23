const modelsCars = document.querySelector('#models');
const yearsOfCars = document.querySelector('#yearsCar');
const radios = document.querySelectorAll('#types')
const form = document.querySelector('.form_insurance');
const infoCertificate = document.querySelector('.info_insurance');
const spinner = document.getElementById('spinner');

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

    
    infoCertificate.innerHTML = 
    `
    <h4>Model: ${this.model}</h4>
    <h4>Year: ${this.year}</h4>
    <h4>Plan: ${this.plan} </h4>
    <h4>Price: ${valor}</h4>
    `

    spinner.style.display = "block";
    infoCertificate.style.display = "none"

    setTimeout(() => {
        spinner.style.display = "none";

        infoCertificate.style.display = "block";
        infoCertificate.style.padding = "10px";
        infoCertificate.style.width = "20%";
        infoCertificate.style.margin = "0 auto";
        infoCertificate.style.border = "1px solid black"


        // const h3 = document.createElement('h3')
        // h3.classList.add('success')
        // h3.textContent = "Success!!"
        // form.appendChild(h3);
    },3000)


    
    

 
    
    
    
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



