const form = document.querySelector(".form_twitter");
const inp_result = document.querySelector('#inp_twitter');
const list_result = document.querySelector('#tweets_result');
const empty = document.createElement('h3');
empty.textContent = "Empty value, Try again!";


document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let _value = inp_result.value.trim()

        if(_value){
            const tweet = document.createElement('li');
            tweet.textContent = _value;
            localStorage.setItem('all', tweet.textContent)
            tweet.classList.add('li_tweet')
            list_result.appendChild(tweet);

            if(form.childNodes[7] !== undefined){
                form.lastChild.remove();
            }

            
            inp_result.value = "";
        }else{
            form.appendChild(empty);
        }
    })
})