const quoteContent = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
//  showloading
const loading = () => {
    loader.hidden = false;
    quoteContent.hidden=true;
}

//  hideloader
const complete = () =>{
    if(!loader.hidden){
        quoteContent.hidden = false;
        loader.hidden = true;
    }
}

// get quote from api

const getQuote = async () => {
    loading()
    const proxy = "https://quoteserver1.herokuapp.com/"
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
                  
    try{
        const response = await fetch(proxy+apiUrl)
        
        const {quoteText, quoteAuthor} = await  response.json()
        console.log(quoteText)
        if(quoteAuthor ===''){
            authorText.innerHTML = 'unknown'
        }
        authorText.innerHTML = quoteAuthor;
        if(quoteText.length > 100 ){
            quote.classList.add('long-quote')
        } else {
            quote.classList.remove('long-quote')
        }
        quote.innerHTML = quoteText;
        
        complete()

    }catch(error){
        getQuote(quote)
        console.log('aaaaah no quote,' + error);
    }
}

const tweetQuote = () => {
    const text = quote.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?$text=${text} - ${author}`;
    window.open(twitterUrl,'_blank' ) ;
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en


