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
let globalThemeData = false;
let defaultData = []
const welcome_section_elm = $("#welcome_section")
const signup_section_elm = $("#signup_section")

// on load
// Need to create baby user

const getCurrentBaby = () => {
    return globalBabyData.find(l => l.active === true)
}


const checkThemeData = () => {
    let theme = localStorage.getItem('BBD_T')

    if (theme !== null) {
        globalThemeData = JSON.parse(theme)
        if (globalThemeData === true) {
            setToDarkTheme()
        }

    } else {
        // set local storage
        saveThemeToLocalStorage()
    }

}

// function to save data to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("BBD", JSON.stringify(globalBabyData))
}
const saveThemeToLocalStorage = () => {
    localStorage.setItem("BBD_T", JSON.stringify(globalThemeData))
}

// html setting functions
const setHomeTitle = () => {
    let baby = getCurrentBaby()
    $("#baby_name_title").text(baby.name)
}
const setHomeGreeting = () => {
    let baby = getCurrentBaby()
    let babyName = baby.name.split(' ')[0]
    $("#home_message").text(`Good ${getTimeOfDay()}, ${babyName}! You are ${getAgeDescription(baby.birthday)} old today!`)
}

const setSelectBabyDropDown = () => {
    const selectBaby = $("#select_baby");
    $(selectBaby).empty()
    if (globalBabyData !== null && globalBabyData.length >= 1) {
        globalBabyData.forEach(baby => {
            const option = $("<option></option>")
                .attr("value", baby._id) 
                .text(baby.name); 
            
            if (baby.active) {
                option.attr("selected", "selected"); 
            }
            
            selectBaby.append(option); 
        });
    }
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
        checkThemeData()
        // load html
        loadHtml()
    }


}

// load html function
const loadHtml = () => {
    // set titles and names
    setHomeTitle()
    setHomeGreeting()
    setSelectBabyDropDown()
    // set data into charts
}

$(() => {
    checkBabyData()
})