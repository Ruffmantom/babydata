let globalBabyData;
let defaultData = {
    currentPage: "home", //default
    theme: false,
    babies: [],
    currentFilter: 'most_recent',
    currentData: 'bm_data',
}
const welcome_section_elm = $("#welcome_section")
const signup_section_elm = $("#signup_section")
const bm_chart_cont_elm = $("#bm_chart")
const all_data_cont = $("#all_data")





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
    let age = calculateAge(baby.birthday)
    $("#home_message").text(`Good ${getTimeOfDay()}, ${babyName}! You are ${age.years >= 1 ? `${age.years} year${age.years > 1 ? `s` : ""} and ` : ""}${age.months >= 1 ? `${age.months} month${age.months > 1 ? `s` : ""} and ` : ""}${age.days} days old!`)
}

const setDataPage = () => {
    let baby = getCurrentBaby()
    let babyName = baby.name.split(' ')[0]
    $("#data_page_babys_name").text(`All ${babyName}'s data`)
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

const createWeightChartData = () => {
    let baby = getCurrentBaby()
    let data = baby.weight_data

    // filter data based on chart filter
    console.log('about to check if weekly or monthly')
    if (baby.weight_chart_filter === "weekly") {
        // return this weeks data
        let thisWeeksData = returnThisWeeksData(data)
        if (thisWeeksData.length >= 1) {
            // hide "no data found"
            $("#feed_chart_body>.no_data_note").removeClass("show_no_data") // need to switch charts, wrong chart displaying weight data
            // plot data
            plotWeightData(thisWeeksData)
        }

    } else {
        let thisMonthsData = returnThisMonthsData(data)
        if (thisMonthsData.length >= 1) {
            $("#feed_chart_body>.no_data_note").removeClass("show_no_data")
            // return current months data
            plotWeightData(thisMonthsData)
        }
    }


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
const loadCurrentData = () => {
    const baby = getCurrentBaby();
    const allDataContainer = $(all_data_cont);
    allDataContainer.empty();

    let currentData = [];
    switch (globalBabyData.currentData) {
        case "bm_data":
            currentData = baby.bm_data;
            break;
        case "feed_data":
            currentData = baby.feed_data;
            break;
        default:
            currentData = baby.weight_data;
            break;
    }

    let filteredData = [];

    if (currentData.length >= 1) {
        if (globalBabyData.currentFilter === "most_recent") {
            filteredData = currentData.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            $("#filter_baby_data_by_date_icon").removeClass("rotate_filter")
        } else if (globalBabyData.currentFilter === "oldest_first") {
            filteredData = currentData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            $("#filter_baby_data_by_date_icon").addClass("rotate_filter")
        }
        // console.log(`${globalBabyData.currentData} load filtered data: `, filteredData);
        filteredData.forEach(d => {
            allDataContainer.append(createDataCard(baby, d));
        });
    } else {
        allDataContainer.append(createDataCard(baby, ''));
    }
};


// load current data selector
const loadDataSelect = () => {
    $("#all_data_select").val(globalBabyData.currentData);
}

// load html function
const loadHtml = () => {
    console.log('loading HTML...')
    // set titles and names
    loadCurrentPage()
    setHomeTitle()
    setHomeGreeting()
    setDataPage()
    setSelectBabyDropDown()
    // set data into charts
    setBMChart()
    loadDataSelect()
    loadCurrentData()
}


$(() => {
    checkBabyData()
    createWeightChartData()
})

document.addEventListener("DOMContentLoaded", function () {
    // Your SVG creation code here
});