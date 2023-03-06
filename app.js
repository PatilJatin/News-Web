const API_KEY = "place here you NewsAPI ID";
const sport = document.getElementById("Sports");
const general = document.getElementById("general");
const technology = document.getElementById("Technology");
const entertainment = document.getElementById("Entertainment");
const business = document.getElementById("Business");
const searchForm = document.getElementsByClassName("searchForm")[0];
const newsContainer = document.getElementsByClassName("newsContainer")[0];
const searchtab = document.getElementById("searchtab");
const darkMode = document.querySelector(".toggle-dark");
const modeName = document.getElementsByClassName('modeName')[0];
const modeIcon = document.getElementById('mode-icon');
const errorpage = document.getElementById('errorpage');


const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload= function(){
    fetchNews(HEADLINES_NEWS);
};

async function fetchNews(query) {
    newsContainer.classList.remove("active");
    errorpage.classList.remove("active");
    console.log(query);
    const response = await fetch(`${query}${API_KEY}`);
    if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        console.log(data);
        displayNews(data);
    }
    else {
        
        console.log("error occured")
    }
}

function displayNews(data) {
    newsContainer.classList.add("active");
    errorpage.classList.remove("active");
    newsContainer.innerHTML = "";
    if (data.articles.length === 0) {
        //404 page
        newsContainer.classList.remove("active");
        errorpage.classList.add("active");
        return;
    }
    let newCards = "";
    for (let article of data.articles) {
        // console.log(article.url);
        newCards += `<div class="card dark:bg-[hsl(222,47%,11%)] bg-slate-300 basis-[23%] my-3 flex flex-col  gap-2 rounded-lg drop-shadow-md">
           <div class="h-[40%] object-cover w-full ">
            <img class=" w-[100%] h-[100%] rounded-t-lg" id="newsImg" src=${article.urlToImage} alt="">
        </div>
        <div class=" m-2 rounded-lg shadow-md">
        <h3 id="newsHeading" class="font-bold text-lg px-2 leading-normal">${article.title}</h3>
            <p id="newsDate" class="px-2 text-blue-500 leading-normal">${article.publishedAt.split("T")[0]}</p>
            <p id="newsDetails" class="px-2">${article.description}</p>
        </div>
            <a target="_blank"  class=" text-center m-2 px-4  py-2 rounded-lg bg-blue-600 hover:bg-blue-400 " href=article.url >Read more...</a>
        </div>
        `;
        newCards = newCards.replace("article.url" , `${article.url}`);
    }
    newsContainer.innerHTML = newCards;

}

general.addEventListener('click', function () {
    fetchNews(GENERAL_NEWS);
})
sport.addEventListener('click', function () {
    fetchNews(SPORTS_NEWS);
})
technology.addEventListener('click', function () {
    fetchNews(TECHNOLOGY_NEWS);
})
entertainment.addEventListener('click', function () {
    fetchNews(ENTERTAINMENT_NEWS);
})
business.addEventListener('click', function () {
    fetchNews(BUSINESS_NEWS);
})

searchForm.addEventListener('submit', function (eve) {
    eve.preventDefault();
    if (searchtab.value == null) {
        return;
    }

    if (searchtab.value.length > 1) {
        fetchNews(`${SEARCH_NEWS}${encodeURIComponent(searchtab.value)}&apiKey=`);
    }
})

darkMode.addEventListener('click', function(eve){
    eve.preventDefault();
    document.documentElement.classList.toggle('dark');
    if(modeName.textContent == "Light"){
        modeName.textContent = "Dark";
        modeIcon.src = "./assets/moon-icon.svg"
    }
    else{
        modeName.textContent = "Light"; 
        modeIcon.src = "./assets/sun-icon-d82cf772.svg"
    }
})