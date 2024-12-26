

const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateField = document.querySelector(".time_location span")
const conditionField = document.querySelector(".condition p")
const searchField = document.querySelector(".search_area")
const imageField = document.querySelector("#imgicon")
const form =document.querySelector('form')

form.addEventListener('submit' , searchForLocation)

let target = 'Ammapattinam'

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=bacc3654ff3648e89fc151828242412&q=${targetLocation}&aqi=no&aqi=no`

    const res = await fetch(url)

    const data = await res.json()

    console.log(data)

    let locationName = data.location.name;

    let time = data.location.localtime;

    let temp = data.current.temp_c;

    let icon = data.current.condition.icon;

    let condition = data.current.condition.text;

    updateDetails(temp,locationName,time,condition,icon);

}

function updateDetails(temp,locationName,time,condition,icon) {

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay())

    temperatureField.innerText = temp + ' °C';
    locationField.innerText =locationName;
    dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
    imageField.src = `http:${icon}`;

   


}


function searchForLocation(e) {
    e.preventDefault()

    target = searchField.value

    fetchResults(target)
}

fetchResults(target)

function getDayName(number) {
    switch(number) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}
