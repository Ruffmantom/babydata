let globalBabyData;
let defaultData = {
    currentPage: "home", //default
    theme: false,
    babies: [],
    currentFilter:'bm_data',
}
const welcome_section_elm = $("#welcome_section")
const signup_section_elm = $("#signup_section")
const bm_chart_cont_elm = $("#bm_chart")

// on load
// Need to create baby user

const getCurrentBaby = () => {
    return globalBabyData.babies.find(l => l.active === true)
}


const checkThemeData = () => {
        if (globalBabyData.theme === true) {
            setToDarkTheme()
        }
}

// function to save data to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("BBD", JSON.stringify(globalBabyData))
}


// html setting functions
const setHomeTitle = () => {
    let baby = getCurrentBaby()
    $("#baby_name_title").text(baby.name)
}

const setHomeGreeting = () => {
    let baby = getCurrentBaby()
    let babyName = baby.name.split(' ')[0]
    $("#home_message").text(`Good ${getTimeOfDay()}, ${babyName}! You are ${getAgeDescription(baby.birthday)} today!`)
}

const setDataPage = () => {
    let baby = getCurrentBaby()
    let babyName = baby.name.split(' ')[0]
    $("#data_page_babys_name").text(`Viewing ${babyName}'s ${globalBabyData.currentFilter}`)
}

const setSelectBabyDropDown = () => {
    const selectBaby = $("#select_baby");
    $(selectBaby).empty()
    if (globalBabyData !== null && globalBabyData.babies.length >= 1) {
        globalBabyData.babies.forEach(baby => {
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
    let babyData = localStorage.getItem('BBD');

    if (babyData !== null) {
        babyData = JSON.parse(babyData);

        if (babyData.babies && babyData.babies.length >= 1) {
            // console.log('Found Baby data... Loading HTML');
            $(welcome_section_elm).hide();
            $(signup_section_elm).hide();
            globalBabyData = babyData;
            checkThemeData();
            loadHtml();
        } else {
            // console.log('No baby found or incomplete data... Loading default data');
            globalBabyData = defaultData;
            localStorage.setItem('BBD', JSON.stringify(globalBabyData));
        }
    } else {
        // console.log('First time on app... Loading default data');
        globalBabyData = defaultData;
        localStorage.setItem('BBD', JSON.stringify(globalBabyData));
      
    }
}


const setBMChart = () => {
    let baby = getCurrentBaby()
    create_BM_chart_HTML(baby)
}

const loadCurrentPage = () => {
    if (globalBabyData.currentPage === "all_data") {
        $(home_data_page).hide()
        $(all_data_page).show()
        changeActiveFooterButton('all_data')
    } else {
        $(all_data_page).hide()
        $(home_data_page).show()
        changeActiveFooterButton('home')
    }
}

// load html function
const loadHtml = () => {
    // set titles and names
    loadCurrentPage()
    setHomeTitle()
    setHomeGreeting()
    setDataPage()
    setSelectBabyDropDown()
    // set data into charts
    setBMChart()
}
const loadInitialHtml = ()=>{
    
}

$(() => {
    checkBabyData()
})