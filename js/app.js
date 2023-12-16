// example data
/*
var babies = [

    {
        _id:"",
        name: "",
        birthday: "",
        gender: "",
        bm_data: [],
        weight_data: [],
        feed_data: [],
    }
]

var bm_data = {
    _id:"",
    type:"",
    note:"",
    captured:"",
}

var weight_data = {
    _id:"",
    weight:"",
    captured:"",
}

var feed_data = {
    _id:"",
    amount:"",
    duration_hr:"",
    duration_min:"",
    captured:"",
}
*/
let globalBabyData;
let defaultData = []
const welcome_section_elm = $("#welcome_section")
const signup_section_elm = $("#signup_section")

// on load
// Need to create baby user

const getCurrentBaby = () => {
    return globalBabyData.find(l => l.active === true)
}

// Load values from local storage
// 1. Check to see if baby data is available
const checkBabyData = () => {
    let babyData = localStorage.getItem('BBD')

    if (babyData !== null) {
        // hide welcome messages and sign first baby up steps
        $(welcome_section_elm).hide()
        $(signup_section_elm).hide()
        // save local values to global storage
        globalBabyData = JSON.parse(babyData)
        // load html
        loadHtml()
    }
}

// function to save data to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("BBD", JSON.stringify(globalBabyData))
}

const setHomeTitle = () => {
    let baby = getCurrentBaby()
    $("#baby_name_title").text(baby.name)
}
const setHomeSubTitle = () => {
    let baby = getCurrentBaby()
    let babyName = baby.name.split(' ')[0]
    $("#home_message").text(`Good ${getTimeOfDay()}, ${babyName}! You are ${getAgeDescription(baby.birthday)} old today!`)
}

const loadHtml = () => {
    // set titles and names
    setHomeTitle()
    setHomeSubTitle()
    // set data into charts
}

$(() => {
    checkBabyData()
})