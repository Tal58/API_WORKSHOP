// variables
let graph = document.querySelector("#myPlot")
let graph2 = document.querySelector("#myPlot2")
let graph3 = document.querySelector("#myPlot3")
let initialdate = document.querySelector("#initialdate")
let finaldate = document.querySelector("#finaldate")
let submit = document.querySelector(".submit")
let update = document.querySelector(".lastDate")
let cases = document.querySelector(".cases")
let recovered = document.querySelector(".recovered")
let deaths = document.querySelector(".deaths")
let url1 = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
//fetch data
const fetchdata = () => {
    fetch(url1).then((res) => {
        if (!res.ok) {
            renderError(`Something went wrong: ${res.status}`)
            throw new Error()
        }
        return res.json()
    }).then((data) => disease(data)).catch((err) => console.log(err))
}
fetchdata()
let dataDisease 
function disease(data) {
    dataDisease = data //to keep all received info as a variable
    //to find last update in the key values :)
    update.innerText = `Last Update: ${Object.keys(dataDisease.recovered)[Object.values(dataDisease.recovered).indexOf(0)-1]} (MM DD YY)`
    //to find last index value which is not 0 or null (index number is 560)
    console.log(Object.values(dataDisease.recovered).indexOf(0)-1)
    console.log(Object.values(dataDisease.recovered)) //to check last update
}
//this function is used to replace the input date to replace data format
function seperator(date) {
    let newArr = date.split("-")
    let number = newArr[0].slice(2, 4)
    newArr.shift()
    newArr.push(number)
    let newArr2 = []
    for (const x of newArr) {
        if (Number(x) < 10) {
            newArr2.push(x[1])
        } else {
            newArr2.push(x)
        }
    }
    newArr2 = newArr2.join("/")
    return newArr2
}
// event handler 
submit.addEventListener("click", () => {
    let initial = seperator(initialdate.value)//redesing the initial date which is similar to fetched data
    let final = seperator(finaldate.value)//redesing the final date which is similar to fetched data  
    console.log(initial)
    console.log(final)
    console.log(Object.keys(dataDisease.recovered).indexOf(initial))
    console.log(Object.keys(dataDisease.recovered).indexOf(final))
    let indexDiff = Object.keys(dataDisease.recovered).indexOf(final)-Object.keys(dataDisease.recovered).indexOf(initial)
    console.log(indexDiff)
    if (Object.keys(dataDisease.recovered).indexOf(initial)>=0 && Object.keys(dataDisease.recovered).indexOf(initial)<561){
        if (Object.keys(dataDisease.recovered).indexOf(final)>=0 && Object.keys(dataDisease.recovered).indexOf(final)<561)
        {
            console.log(Object.keys(dataDisease.recovered).indexOf(final))
            //to get all deaths keys
            let arrayDeaths = Object.keys(dataDisease.deaths)
            //to get all cases keys
            let arrayCases = Object.keys(dataDisease.cases)
            // to get all recovered keys
            let arrayRecovered = Object.keys(dataDisease.recovered)
            console.log(dataDisease)
            console.log(arrayDeaths)          
            const totalRecovered = (a, b) => {
                let initialindex = arrayRecovered.indexOf(a)
                let finalindex = arrayRecovered.indexOf(b)
                let sum = dataDisease.recovered[arrayRecovered[finalindex]] -dataDisease.recovered[arrayRecovered[initialindex]]
                return sum
            }
            console.log(totalRecovered(initial, final))
        
            const totalDeaths = (a, b) => {
                let initialindex = arrayDeaths.indexOf(a)
                let finalindex = arrayDeaths.indexOf(b)
                let sum = dataDisease.deaths[arrayDeaths[finalindex]] -dataDisease.deaths[arrayDeaths[initialindex]]
                return sum
            }
            const totalCases = (a, b) => {
                let initialindex = arrayCases.indexOf(a)
                let finalindex = arrayCases.indexOf(b)
                let sum = dataDisease.cases[arrayCases[finalindex]] - dataDisease.cases[arrayCases[initialindex]]
                return sum
            }
            // cases.innerText = `Total cases: ${totalCases(initial, final)}`
            // recovered.innerText = `Total number of recovered people for specified dates: ${totalRecovered(initial, final)}`
            // deaths.innerText = `Total number of deaths for specified dates: ${totalDeaths(initial, final)}` 
            console.log(initial)
            console.log(totalDeaths(initial, final))
            console.log(totalRecovered(initial, final))
            console.log(totalCases(initial, final))
            //create script which is child of myplot div and set all the recovered values
            let script = document.createElement("script")
            graph.appendChild(script)
            script.innerHTML = `
        var xArray = [0,${indexDiff/10},${indexDiff*2/10},${indexDiff*3/10},${indexDiff*4/10},${indexDiff*5/10},${indexDiff*6/10},${indexDiff*7/10},${indexDiff*8/10},${indexDiff*9/10},${indexDiff}];
        var yArray = [0,${totalRecovered(initial,final)/10},${totalRecovered(initial,final)*2/10},${totalRecovered(initial,final)*3/10},${totalRecovered(initial,final)*4/10},${totalRecovered(initial,final)*5/10},${totalRecovered(initial,final)*6/10},${totalRecovered(initial,final)*7/10},${totalRecovered(initial,final)*8/10},${totalRecovered(initial,final)*9/10},${totalRecovered(initial,final)}];
        
        // Define Data
        var data = [{
          x: xArray,
          y: yArray,
          mode:"lines"
        }];
        
        // Define Layout
        var layout = {
          xaxis: {range: [0, ${indexDiff}], title: "Specified Dates (Total Days)"},
          yaxis: {range: [0, ${totalRecovered(initial,final)}], title: "Number of Recovered People"},  
          title: "Total recovered people: ${totalRecovered(initial, final)}"
        };
        
        // Display using Plotly
        Plotly.newPlot("myPlot", data, layout);`
        
    //create script which is child of myplot2 div and set all the recovered values
        let script2 = document.createElement("script")
        graph2.appendChild(script2)
        script2.innerHTML = `
    var xArray = [0,${indexDiff/10},${indexDiff*2/10},${indexDiff*3/10},${indexDiff*4/10},${indexDiff*5/10},${indexDiff*6/10},${indexDiff*7/10},${indexDiff*8/10},${indexDiff*9/10},${indexDiff}];
    var yArray = [0,${totalDeaths(initial,final)/10},${totalDeaths(initial,final)*2/10},${totalDeaths(initial,final)*3/10},${totalDeaths(initial,final)*4/10},${totalDeaths(initial,final)*5/10},${totalDeaths(initial,final)*6/10},${totalDeaths(initial,final)*7/10},${totalDeaths(initial,final)*8/10},${totalDeaths(initial,final)*9/10},${totalDeaths(initial,final)}];
    
    // Define Data
    var data = [{
      x: xArray,
      y: yArray,
      mode:"lines"
    }];
    
    // Define Layout
    var layout = {
      xaxis: {range: [0, ${indexDiff}], title: "Specified Dates (Total Days)"},
      yaxis: {range: [0, ${totalDeaths(initial,final)}], title: "Number of Death People"},  
      title: "Total deaths: ${totalDeaths(initial, final)}"
    };
    
    // Display using Plotly
    Plotly.newPlot("myPlot2", data, layout);`
    //create script which is child of myplot3 div and set all the recovered values
    let script3 = document.createElement("script")
        graph2.appendChild(script3)
        script3.innerHTML = `
    var xArray = [0,${indexDiff/10},${indexDiff*2/10},${indexDiff*3/10},${indexDiff*4/10},${indexDiff*5/10},${indexDiff*6/10},${indexDiff*7/10},${indexDiff*8/10},${indexDiff*9/10},${indexDiff}];
    var yArray = [0,${totalDeaths(initial,final)/10},${totalDeaths(initial,final)*2/10},${totalDeaths(initial,final)*3/10},${totalDeaths(initial,final)*4/10},${totalCases(initial,final)*5/10},${totalCases(initial,final)*6/10},${totalCases(initial,final)*7/10},${totalCases(initial,final)*8/10},${totalCases(initial,final)*9/10},${totalCases(initial,final)}];
    
    // Define Data
    var data = [{
      x: xArray,
      y: yArray,
      mode:"lines"
    }];
    
    // Define Layout
    var layout = {
      xaxis: {range: [0, ${indexDiff}], title: "Specified Dates (Total Days)"},
      yaxis: {range: [0, ${totalCases(initial,final)}], title: "Number of Cases"},  
      title: "Total cases: ${totalCases(initial, final)}"
    };
    
    // Display using Plotly
    Plotly.newPlot("myPlot3", data, layout);`
        }
        else{
            alert("Please check your date")
        }
        
    }else{
        alert("Please check your date")
    }})
