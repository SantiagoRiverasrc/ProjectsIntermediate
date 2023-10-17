const form = document.querySelector(".form_twitter");
const inp_result = document.querySelector('#inp_twitter');
const list_result = document.querySelector('#tweets_result');
const buttonDelete = document.querySelector('.btn_deleteAll');
const contaBtn = document.querySelector('.container_btn')
const empty = document.createElement('h3');

empty.textContent = "Empty value, Try again!";
let miArr;


document.addEventListener('DOMContentLoaded', ()=> {
    
    
    if(localStorage.getItem('myArr')){
        miArr = JSON.parse(localStorage.getItem('myArr'));
        creatorTemplate(miArr)

    }else{
        miArr = [];
    }
    
   

    buttonDelete.addEventListener('click', () => {
        localStorage.removeItem('myArr')
        list_result.innerHTML = ""
        miArr = []
    });


    list_result.addEventListener('click', (e)=> {
        let elemento = e.target.textContent;

        miArr = miArr.filter(x => x !== elemento);
        localStorage.removeItem('myArr')
        localStorage.setItem('myArr', JSON.stringify(miArr))
        list_result.innerHTML = "";

        creatorTemplate(miArr)



    })

    



    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let _value = inp_result.value.trim();


        
        if(_value){
            miArr.push(_value)
            
            list_result.innerHTML = "";
            creatorTemplate(miArr);

            if(form.childNodes[7] !== undefined){
                form.lastChild.remove();
            }
            
            inp_result.value = "";
        }else{
            form.appendChild(empty);
        }
        
        localStorage.setItem('myArr', JSON.stringify(miArr));

    })



})




function creatorTemplate(arr){
    arr.forEach(item => {
        const tweet = document.createElement('li');
        tweet.textContent = item;
        tweet.classList.add('li_tweet')
        list_result.appendChild(tweet);
    });
}