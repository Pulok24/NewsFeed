let API_KEY='871fc1a2cad84ca0a2833715764ccc9c'
let url='https://newsapi.org/v2/everything?q='
window.addEventListener('load',()=>fetchNews('India'))


function home() {
    window.location.reload();
}
async function fetchNews(query){
let response=await fetch(`${url}${query}&apiKey=${API_KEY}`)
let data=await response.json()
bindData(data.articles)
}
function bindData(articles){
    let boxcontainer=document.getElementById('boxcontainer')
    let boxtemplate=document.getElementById('boxtemplate')
    boxcontainer.innerHTML=''
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        let boxClone=boxtemplate.content.cloneNode(true)
        fillDataInBox(boxClone,article);
        boxcontainer.appendChild(boxClone)
    });
}






function fillDataInBox(boxClone,article) {
    let newsimg = boxClone.querySelector("#newsimg");
    let newstitle = boxClone.querySelector("#newstitle");
    let  newssource = boxClone.querySelector("#newssource");
    let newsdescription = boxClone.querySelector("#newsdescription");

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdescription.innerHTML = article.description;

    let date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML = `${article.source.name} · ${date}`;

    boxClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curentlink = null;
function press(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curentlink?.classList.remove("active");
    curentlink= navItem;
    curentlink.classList.add("active");
}

let searchButton = document.getElementById("search-button");
let searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    let query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curentlink?.classList.remove("active");
    curentlink= null;
});


// let pr=()=>{
//     let query=searchText.value 
//    if(!query) return;
//    fetchNews(query)
//    curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// }