
//fetch country by name from restcountries.com, I collected all data from fetchAll country instead of this method you can get the result one by one but that takes some time;)
// const fetchCountryByName = (name) => {
//     const url = `https://restcountries.com/v2/name/${name}`
//     fetch(url).then((res) => {
//         if (!res.ok) {
//             renderError(`Something went wrong: ${res.status}`)
//             throw new Error()
//         }
//         return res.json();
//     }).then((data) => renderCountries(data))
//         .catch((err) => console.log(err))
// }

//fetch all country from restcountries.com
const fetchAllCountry = () => {
    const url = `https://restcountries.com/v3.1/all`
    fetch(url).then((res) => {
        if (!res.ok) {
            renderError(`Something went wrong: ${res.status}`)
            throw new Error()
        }
        return res.json();
    }).then((data) => selectcountry(data))
        .catch((err) => console.log(err))
}
//to send erro message
const renderError = () => {
    const countryDiv = document.querySelector(".Countries");
    countryDiv.innerHTML += `
    <h2>Countries can not be fetched</h2>
    <img src ="https://www.webtekno.com/images/editor/default/0003/49/8fff46dc4295076015f364b734750fa59d84c5b6.jpeg" alt=""/>
    `
}
let allCountry
let countryListId = {}
//to create all options according to the data and sort it
const selectcountry = (Countries) => {
    allCountry = Countries
    console.log(allCountry)
    let countryList = []
   
    // console.log(Countries.length)
    //sort the list of countries and collect id of all countries
    for (let i = 0; i < Countries.length; i++) {
        countryList.push(Countries[i].name.common)
        countryListId[Countries[i].name.common] = i
    }
    console.log(countryListId)
    //to create all options
    countryList = countryList.sort()
    for (let i = 0; i < countryList.length; i++) {
        document.querySelector("#countries").appendChild(document.createElement("option"))
        document.querySelector("#countries").lastChild.innerHTML = countryList[i]
    }
}
//event listener
document.querySelector("#countries").addEventListener("change", (event) => {
    //instead of new fetc ı used received data named allcountry
    renderCountries(allCountry[countryListId[event.target.value]])
})


//to choose selected counrty datas
const renderCountries = (data) => {
    console.log(data)
    const countryDiv = document.querySelector(".Countries");
    const { capital, currencies, flags: { svg }, languages, name:{common}, region } = data
    countryDiv.innerHTML = `
<div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
  <img src="${svg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${common}</h5>
    <p class="card-text">${region}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
    <i class="fas fa-lg fa-landmark"></i> ${capital}
    </li>
    <li class="list-group-item">
    <i class="fas fa-lg fa-comments"></i>
    ${Object.values(languages)}</li>
    <li class="list-group-item">
    <i class="fas fa-lg fa-money-bill-wave"></i> ${Object.values(currencies)[0].name}
    </li>
  </ul>

</div>
`
}
fetchAllCountry()



