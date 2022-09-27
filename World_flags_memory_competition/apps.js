//variables
const screenP = document.querySelector(".p");
const bar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const screen = document.querySelector(".screen");
const selection = document.querySelector(".selection");
const radio = document.querySelector(".form-check-label");
const hiddenP = document.querySelector(".hiddenP");
const scoreP = document.querySelector(".score")
const mistakeP = document.querySelector(".mistake")
let highScore = localStorage.getItem("highScore") || 0;
document.querySelector(".highScore").innerHTML = `<i class="fa-regular fa-chess-king"></i> High Score: ${highScore}`
let allCountry;
let score = 0;
let mistake = 0;
//fetch all countries from restcountries.com
const fetchAllCountries = () => {
    const url = `https://restcountries.com/v3.1/all`
    fetch(url).then((res) => {
        if (!res.ok) {
            renderError(`Something went wrong: ${res.status}`)
            throw new Error()
        }
        return res.json();
    }).then((data) => selectcountry(data)).catch((err) => console.log(err))
}

//to send error message
const renderError = () => {
    const countryDiv = document.querySelector(".countries");
    countryDiv.innerHTML += `
    <h2>Countries can not be fetched</h2>
    <img src ="https://www.webtekno.com/images/editor/default/0003/49/8fff46dc4295076015f364b734750fa59d84c5b6.jpeg" alt=""/>
    `
}


//opening message
async function welcome() {
    let counter = 0;
    const newArr = ["System is loading", "System is loading . .", "System is loading . . .", "System loaded", 'Lets Play <i class="fa-solid fa-face-grin-hearts"></i>']
    for (const x of newArr) {
        let myPromise = new Promise(function (resolve) {
            setTimeout(function () { resolve(`${x}`); }, 750);
        });
        counter += 20
        screenP.innerHTML = await myPromise;
        bar.style.width = `${counter}%`
    }
    setTimeout(clear, 1100);
}

welcome()


//clear screen
const clear = () => {
    screenP.style.display = "none"
    screenP.innerHTML = ""
    progress.style.display = "none"
    game()
}

const selectcountry = (countries) => {
    //in order to keep all info from related source which provide the programme faster
    allCountry = countries
}

fetchAllCountries()
//initialization of the game
const game = () => {
    //create an img
    const flag = document.createElement("img")
    screen.appendChild(flag)
    flag.className = "img-thumbnail"
    flag.style.width = "100%"
    flag.style.height = "100%"
    //create random number
    const randomNumber = Math.floor(Math.random() * 250)
    //randomly made 4 name from all countryList
    hiddenP.innerText = allCountry[randomNumber].name.common
    console.log(allCountry[randomNumber].name.common)
    // randomList = [allCountry[randomNumber].name.common, allCountry[Math.floor(Math.random() * 250)].name.common, allCountry[Math.floor(Math.random() * 250)].name.common, allCountry[Math.floor(Math.random() * 250)].name.common]
    randomList= countryNamegenerator(allCountry[randomNumber].name.common)
    console.log(randomList)
    //to shuffle randomList
    randomList = randomList.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    
    console.log(randomList)
    //img source
    flag.src = `${allCountry[randomNumber].flags.png}`
    //create a new div
    const newDiv = document.createElement("div")
    selection.appendChild(newDiv)
    newDiv.className = "combo-check col-md-4 mx-auto"
    //newDiv randomly gets 4 inputs
    newDiv.innerHTML += `<hr class="hr">`
    for (const x of randomList) {
        newDiv.innerHTML += `
        <div class="form-check ">
          <input class="form-check-input" onclick="game2(this.value)" type="radio" value="${x}" name="flexRadioDefault" id="${x}">
          <label class="form-check-label" for=" ${x}">
            ${x}
          </label>
        </div>
        `}
    newDiv.innerHTML += `
        <hr class="hr">
        <div class="object col text-center mt-2">
        <p>Made with <i class="fa fa-heart-o"></i> by Mihail <i class="fa fa-text-width"></i></p>
    </div>`
}
//gamepart2 start playing
function game2(e) {
    if (e == hiddenP.innerText) {
        clear2()
        game()
        score += 5
        scoreP.innerHTML = `<i class="fa-regular fa-chess-king"></i> Score: ${score}`
        if (mistake > 1) {
            mistakeP.innerHTML = `<i class="fa-regular fa-chess-queen"></i> Mistakes: ${mistake}`
        } else {
            mistakeP.innerHTML = `<i class="fa-regular fa-chess-queen"></i> Mistake: ${mistake}`
        }

    } else {
        mistake++
        if (mistake > 1) {
            mistakeP.innerHTML = `<i class="fa-regular fa-chess-queen"></i> Mistakes: ${mistake}`
        } else {
            mistakeP.innerHTML = `<i class="fa-regular fa-chess-queen"></i> Mistake: ${mistake}`
        }
        if (mistake == 4) {
            screenP.innerHTML = `You failed <i class="fa-regular fa-face-frown fa-2x"></i>`
            if (score > Number(highScore)) {
                localStorage.setItem("highScore", score);
                document.querySelector(".highScore").innerHTML = `<i class="fa-regular fa-chess-king"></i> High Score: ${score}`
            }
            clear2()
            end()
        }
    }

}

//countryname generator
function countryNamegenerator(name) {
    let newArr = [name, allCountry[Math.floor(Math.random() * 250)].name.common, allCountry[Math.floor(Math.random() * 250)].name.common, allCountry[Math.floor(Math.random() * 250)].name.common]
    let checkObje = {}
    let indexno
    for (i = 0; i < 4; i++) {
        if (checkObje[newArr[i]]) {
            checkObje[newArr[i]]++
        } else {
            checkObje[newArr[i]] = 1
        }
    } for (const x of Object.keys(checkObje)) {
        if (checkObje[x] > 1) {
            //find the dublicate element
            indexno = newArr.indexOf(x)
            //delete element and instead of position we generate one more country name
            newArr.splice(indexno,1, allCountry[Math.floor(Math.random() * 250)].name.common)    
        }
    }return newArr

}
//clear radio button and flag
function clear2() {
    selection.querySelector(".combo-check").remove()
    screen.querySelector(".img-thumbnail").remove()
}
//end of the game
async function end() {
    screenP.style.display = "block"
    progress.style.display = "hidden"

    let counter = 0;
    const newArr = ["You made 4 mistakes", `Your Score is: ${score}`, `Never Give Up <i class="fa-regular fa-chess-rook fa-2x"></i>`, `You can do better <i class="fa-solid fa-chess-knight fa-2x"></i>`, `Would you like to play again? <i class="fa-regular fa-flag fa-2x"></i>`]
    for (const x of newArr) {
        let myPromise = new Promise(function (resolve) {
            setTimeout(function () { resolve(`${x}`); }, 950);
        });
        counter += 20
        screenP.innerHTML = await myPromise;
        bar.style.width = `${counter}%`
    }
    const createButton = () => {
        const newDiv = document.createElement("div")
        document.querySelector(".container").prepend(newDiv)
        newDiv.className = "btn again col-md-12 mx-auto d-flex justify-content-center"
        newDiv.innerHTML = `
        <button type="button" class="btn again btn-danger mx-auto">Again</button>
        `
    }
    createButton()
    document.querySelector(".again").addEventListener("click", () => {
        window.location.reload()
    })
    //on off button
    document.querySelector(".btn-off").addEventListener("click", () => {
        if (screen.style.backgroundColor == "rgb(110, 105, 105)") {
            window.location.reload()
        } else {
            close()
        }

    })
}

//on off button
document.querySelector(".btn-off").addEventListener("click", () => {
    if (screen.style.backgroundColor == "rgb(110, 105, 105)") {
        window.location.reload()
    } else {
        clear2()
        close()
    }

})
//closing the screen
async function close() {
    screenP.style.display = "block"
    screenP.innerHTML = 'Hope to see you again <i class="fa-regular fa-chess-knight fa-2x"></i>'
    let myPromise = new Promise(function (resolve) {
        setTimeout(function () { resolve("rgb(110, 105, 105)"); }, 1500);
    });
    screen.style.backgroundColor = await myPromise
    screenP.innerText = ""
    document.querySelector(".container").firstChild.remove()
}
