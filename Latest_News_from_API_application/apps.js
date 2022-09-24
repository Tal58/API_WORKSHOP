let isError =false;
const getnews = async function () {
    const API_key = "7e43592ed60240a2acffc73dec383bdb";
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_key;

    try {
        const res = await fetch(url)
        if (!res.ok) {
            isError = true;
            // throw new Error(`Something went wrong: ${res.status}`)
        }
        const data = await res.json();
        // console.log(data.articles)        
        renderNews(data.articles);
    } catch (error) {
        console.log(error)
    }

}

const renderNews = (news) => {
    const newlist = document.getElementById("news-list");
    if (isError){
        newlist.innerHTML += `<h2>News can not be fetched</h2>
        <img src="https://www.webtekno.com/images/editor/default/0003/49/8fff46dc4295076015f364b734750fa59d84c5b6.jpeg" alt=""/>`
    }else{
        news.forEach((item)=>{
            const { title, description, urlToImage,url} = item //destruction
            newlist.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card" >
            <img src="${urlToImage}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>            
            </div>
            <div class="a p-3">
            <a href="${url}" target="_blank" class="btn btn-danger ">Details</a>
            </div> 
            </div>
          </div>`
        })
    }
    
}

//to start working getnews function after completion of the load of the window
window.addEventListener("load", getnews)