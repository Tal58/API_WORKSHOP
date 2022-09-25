const input = document.querySelector("#city_name")
const submit = document.querySelector("#submit")
const cities = document.querySelector(".cities")
let cityList = []
input.focus()
submit.addEventListener("click", () => {
    document.querySelector("#p").innerText = ""
    document.body.style.backgroundImage = `url(./img/${Math.floor(Math.random()*9)}.png)`
    if (!cityList.includes(input.value)){
        if ((input.value != null)){
            fetchdata(input.value)
            cityList.push(input.value)
            console.log(cityList)
        }
        else{
            document.querySelector("#p").innerText = "Please write a city name you want"
        }input.value =""
    }
    else{
        document.querySelector("#p").innerText =  `You have already selected ${input.value[0].toUpperCase()+input.value.slice(1)}. Please select another city`
        input.value =""
    }
 
})

input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        submit.click()
    }
})
let userData;
const fetchdata = (input) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.toLowerCase()}&appid=2270405c001a3dbac979c0604b27d8f3`).then((response) => {
        if (!response.ok) {
            document.querySelector("#p").innerText = "Please write a city name you want"
            // throw new Error("go down");
        }
        return response.json();
    }).then((data) => updateData(data)).catch((error) => {
        // document.querySelector("#p").innerHTML += error
        document.querySelector("#p").innerText = "You made a mistake. Please write a city name you want"
        cities.lastElementChild.remove()
        cityList.pop()
        console.log(cityList)
    })
}


const updateData = (users) => {
    console.log(users)
    if (cities.childElementCount<3){
       createDiv(users)
       input.value =""
    }else{
        cities.firstElementChild.remove()
        cityList.shift()
        console.log(cityList)
        createDiv(users)
        input.value =""
    }
   

}

function createDiv(users){
    const newDiv = document.createElement("div")
    newDiv.className = "card shadow col-lg-3 col-md-6 col-sm-6 m-2"
    cities.appendChild(newDiv)
    newDiv.innerHTML += `   
    <div class="card-body">
    <h5 class="card-title fs-2 mb-3">${users.name}<sup> <span style="background-color: orange; border-radius: 0.30rem; color:white; padding:1%; font-size: 1rem;">${users.sys.country}</span></h5>
    <h2 class="card-title mb-3">${(parseFloat(users.main.temp)-272.15).toFixed(1)}<sup>&#176C </h2>
    <img src="https://openweathermap.org/img/wn/${users.weather[0].icon}@2x.png" class="card-img-top" alt="...">
    <p class="card-text">${users.weather[0].description.toUpperCase()}</p>
    </div>
`
}




