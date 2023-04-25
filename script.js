const form= document.querySelector('form')
const resultdiv= document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value) 
});

const getWordInfo=async(word)=>{
    try{
    //alert(word + "hello")
    resultdiv.innerHTML="Fetching data.....";
    const res=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const resp=await res.json();
    let defintions= resp[0].meanings[0].definitions[0];
    resultdiv.innerHTML=`
    <h2><b>Word: </b>${resp[0].word}</h2>
    <p class="partofspeech">${resp[0].meanings[0].partOfSpeech}</p>
    <p><b>Meaning: </b>${defintions.definition===undefined?"Not found":defintions.definition}</p>
    <p><b>Example: </b>${defintions.example===undefined?"Not found":defintions.example}</p>
    <p><b>Antonyms</b></p>

    `;
    if(defintions.antonyms.length===0){
        resultdiv.innerHTML+=`<span>Not found</span>`
    }
    else{
    for(let i=0;i<defintions.antonyms.length;i++){
        resultdiv.innerHTML+=`<li>${defintions.antonyms[i]}</li>`
    }
}
//adding read more 
resultdiv.innerHTML+=`<div><a href="${resp[0].sourceUrls}" target="_blank">Read more</a></div>`
}
catch(err){
    resultdiv.innerHTML="Not found"
}
    console.log(resp);

}
