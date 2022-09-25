//variables
const input = document.querySelector("#city_name")
const submit = document.querySelector("#submit")
const cities = document.querySelector(".cities")
let cityList = [] //to get all city name
//to focus input
input.focus()
//click submit button, then all functions start working
submit.addEventListener("click", () => {
    document.querySelector("#p").innerText = "" //to clean previous input
    document.body.style.backgroundImage = `url(./img/${Math.floor(Math.random()*9)}.png)`   //change background randomly
    if (!cityList.includes(input.value)){
        if ((input.value != null)){
            fetchdata(input.value)//fetch data receive input value
            cityList.push(input.value)//push the input value to the array
            console.log(cityList)//to check input values in array in the console
        }
        else{
            document.querySelector("#p").innerText = "Please write a city name you want" //to warn user about empty input
        }input.value =""//to clean previous input
    }
    else{
        document.querySelector("#p").innerText =  `You have already selected ${input.value[0].toUpperCase()+input.value.slice(1)}. Please select another city`
        input.value =""//to clean previous input
    }
 
})
//keydown to enter
input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        submit.click()
    }
})
//to fetch data from openweathermap.org
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
        cities.lastElementChild.remove()//if an error occurs it removes last element
        cityList.pop()//if an error occurs it removes last input from input
        console.log(cityList)//to check input values
    })
}

//update data is a function to check all number values if it reaches 3 child elements, it removes first element
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
//create a div and card including icon image, name of the city,country info and weather condition
function createDiv(users){
    const newDiv = document.createElement("div")
    newDiv.className = "card shadow col-lg-3 col-md-6 m-2"
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



