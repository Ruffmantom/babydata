// Pages
const home_data_page = $("#home_data_page")
const all_data_page = $("#all_data_page")
// containers
const baby_settings_modal_elm = $("#baby_settings_modal")
const baby_add_data_modal_elm = $("#baby_add_data_modal")
const baby_add_data_modal = $("#baby_add_data_modal")
const add_bm_data_form = $("#add_bm_data_form")
const add_weight_data_form = $("#add_weight_data_form")
const add_feeding_data_form = $("#add_feeding_data_form")
// inputs
const full_name_input = $("#full_name_input")
const birthday_input = $("#birthday_input")
const gender_select = $("#gender_select")
const add_new_baby_input_name = $("#add_new_baby_input_name")
const add_new_baby_input_birthday = $("#add_new_baby_input_birthday")
const add_new_baby_input_gender = $("#add_new_baby_input_gender")
const data_type_select = $("#data_type_select")
// bm
// const bm_data_radio_elm_now = $("#bm_data_radio_elm_now")
// const bm_data_radio_elm_enter = $("#bm_data_radio_elm_enter")
const enter_time_for_bm_data_cont = $("#enter_time_for_bm_data_cont")
// weight
const weight_data_radio_elm_now = $("#weight_data_radio_elm_now")
const weight_data_radio_elm_enter = $("#weight_data_radio_elm_enter")
const enter_time_for_weight_data_cont = $("#enter_time_for_weight_data_cont")
// Feed
const add_data_feed_ounce_input_elm = $("#add_data_feed_ounce_input_elm")
const add_data_feed_hr_input_elm = $("#add_data_feed_hr_input_elm")
const add_data_feed_min_input_elm = $("#add_data_feed_min_input_elm")
const feed_data_radio_elm_now = $("#feed_data_radio_elm_now")
const feed_data_radio_elm_enter = $("#feed_data_radio_elm_enter")
const enter_time_for_feed_data_cont = $("#enter_time_for_feed_data_cont")
// buttons
const get_started_btn = $("#get_started_btn")
const sign_first_baby_up_btn = $("#sign_first_baby_up_btn")
const baby_settings_button = $("#baby_settings_button")
const add_new_baby_btn = $("#add_new_baby_btn")
const add_data_btn = $("#add_data_btn")
const home_btn = $("#home_btn")
const view_all_data_btn = $("#view_all_data_btn")
// data form buttons
const add_data_feed_btn = $("#add_data_feed_btn")
const add_data_weight_btn = $("#add_data_weight_btn")
const add_data_bm_btn = $("#add_data_bm_btn")



// create functions
const createBabyUser = (newBaby, values) => {

    let baby = {
        _id: createId(),
        name: values.name,
        birthday: values.birthday,
        gender: values.gender,
        active: true,
        bm_data: [],
        weight_data: [],
        feed_data: [],
        achievements: [
            {
                achievement: "Cluster Feeding!", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
            },
            {
                achievement: "Most Active Poops!", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
            },
            {
                achievement: "First Recorded Poop!", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
            },
            {
                achievement: "First Recorded Weight!", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
            },
            {
                achievement: "First Recorded Feeding!", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
            },
        ],
        milestones: [
            {
                milestone: "4-6 Month Doubled Birth Weight", // name
                completed: false, // if baby has completed 
                achieved_at: "", // date
                badge: "", // path to badge
            },


        ]
    }
    // achievements will have badges
    // milestones will have notifications
    // save global baby data
    if (newBaby) {
        //if this is the start of adding a baby, initialize the global data
        globalBabyData.babies = []
    }
    if (globalBabyData.babies.length >= 1) {
        // set other active babies to false
        globalBabyData.babies.forEach(b => {
            b.active = false
        });
    }
    // after setting other babies to not active now push new baby
    globalBabyData.babies.push(baby)

    //save to local storage
    saveToLocalStorage()
    // hide signup_section_elm
    $(signup_section_elm).fadeOut()
    // load html
    loadHtml()
    console.log(globalBabyData)
    createNotification(`${baby.name} Has been added!`)
    // set state to true
    babyHasBeenAdded = true
}


let babyName = ""
let babyBirthday = ""
let babyGender = ""
let babyHasBeenAdded = false;

const closeAddData = (dataType) => {
    createNotification(`Data for ${dataType} has been created!`)
    clearInputsAndCloseAddData()
    var timer = setTimeout(() => {
        $(baby_add_data_modal).fadeOut()
        changeActiveFooterButton('home')
        clearTimeout(timer)
    }, 1000);
}

$(() => {
    // confirming the welcome 
    $(get_started_btn).on("click", (e) => {
        e.preventDefault()
        $("#welcome_section").fadeOut()

    })


    // handle inputs
    full_name_input.on('keyup change', (e) => {
        babyName = e.target.value
    })
    birthday_input.on('keyup change', (e) => {
        babyBirthday = e.target.value

    })
    gender_select.on('keyup change', (e) => {
        babyGender = e.target.value

    })
    // reset values
    const clearNewBabyValues = () => {
        babyName = ""
        babyBirthday = ""
        babyGender = ""
        // clear inputs
        $(full_name_input).val('')
        $(birthday_input).val('')
        $(gender_select).val('')
        $(add_new_baby_input_name).val('')
        $(add_new_baby_input_birthday).val('')
        $(add_new_baby_input_gender).val('')
    }

    const gatherNewBabyDataAndCreate = (firstBaby) => {
        let babyValues = {}
        babyValues.name = babyName
        babyValues.birthday = babyBirthday
        babyValues.gender = babyGender
        if (babyValues.name === "") {
            createNotification("Please enter Baby's first and last name.")
            return
        }
        if (babyValues.birthday === "") {
            createNotification("Please enter the Baby's Birthday.")
            return
        }
        if (babyValues.gender === "") {
            createNotification("Please enter the Baby's gender.")
            return
        }
        // create new baby
        createBabyUser(firstBaby, babyValues)
        //clear values
        clearNewBabyValues()
    }
    // first sign up for baby
    $(sign_first_baby_up_btn).on("click", (e) => {
        e.preventDefault()
        gatherNewBabyDataAndCreate(true)
    })

    // open settings modal
    $(baby_settings_button).on("click", (e) => {
        e.preventDefault()
        // open up settings
        $(baby_settings_modal_elm).fadeIn()
        $(baby_settings_modal_elm).addClass('active')
    })
    // close settings modal
    $('#settings_close').on("click", (e) => {
        e.preventDefault()
        // open up settings
        $(baby_settings_modal_elm).fadeOut()
        $(baby_settings_modal_elm).removeClass('active')
        // close form if open
        $("#add_baby_form").hide()
    })
    // theme toggle
    $("#theme_toggle_btn").on('click', () => {
        toggleTheme()
    })

    $(add_new_baby_btn).on('click', (e) => {
        e.preventDefault()
        $("#add_baby_form").fadeIn()
        $(add_new_baby_btn).hide()
    })
    $("#add_new_baby_cancel_btn").on('click', (e) => {
        e.preventDefault()
        // hide form
        $("#add_baby_form").hide()
        //show add baby button
        // clear contents in form
        $(add_new_baby_btn).fadeIn()
        clearNewBabyValues()
    })

    add_new_baby_input_name.on('keyup change', (e) => {
        babyName = e.target.value
    })
    add_new_baby_input_birthday.on('keyup change', (e) => {
        babyBirthday = e.target.value

    })
    add_new_baby_input_gender.on('keyup change', (e) => {
        babyGender = e.target.value

    })

    $("#add_new_baby_add_btn").on("click", (e) => {
        e.preventDefault()
        gatherNewBabyDataAndCreate(false)
        if (babyHasBeenAdded === true) {
            // close form
            // hide form
            $("#add_baby_form").hide()
            //show add baby button
            // clear contents in form
            $(add_new_baby_btn).fadeIn()
            // reset state
            babyHasBeenAdded = false
        }

    })

    // change baby
    $("#select_baby").on('keyup change', (e) => {
        let babyId = e.target.value;
        console.log(e.target.value)
        globalBabyData.babies.forEach(b => {
            b.active = false
            if (b._id === babyId) {
                b.active = true
            }
        })
        // save local
        saveToLocalStorage()
        // load html
        loadHtml()
    })

    // change pages
    $(view_all_data_btn).on('click', (e) => {
        $(home_data_page).hide()
        $(all_data_page).fadeIn()
        // save current page 
        globalBabyData.currentPage = "all_data"
        saveToLocalStorage()
        changeActiveFooterButton('all_data')
    })
    
    $(home_btn).on('click', (e) => {
        $(all_data_page).hide()
        $(home_data_page).fadeIn()
        globalBabyData.currentPage = "home"
        // save to local storage
        saveToLocalStorage()
        changeActiveFooterButton('home')
    })
    

    // add data
    $(add_data_btn).on("click", () => {
        $(baby_add_data_modal).fadeIn()
        // remove active classes if any
        changeActiveFooterButton('add')
    })

    $("#close_data_btn").on("click", (e) => {
        $(baby_add_data_modal).fadeOut()
        // remove active classes if any
        changeActiveFooterButton(globalBabyData.currentPage)
    })

    // selecting the data type
    $(data_type_select).on("keyup change", (e) => {
        console.log(e.target.value)
        let formType = e.target.value
        changeAddDataForm(formType)
    })

    // bm time radios
    $("input[name='bm_time']").change(function () {
        // Toggle visibility of enter_time_for_bm_data_cont based on selected radio button
        if ($(this).data("bmtime") === "choose") {
            $("#enter_time_for_bm_data_cont").slideDown();
        } else {
            $("#enter_time_for_bm_data_cont").hide();
        }
    });

    $("input[name='weight_time']").change(function () {
        // Toggle visibility of enter_time_for_bm_data_cont based on selected radio button
        if ($(this).data("weighttime") === "choose") {
            $("#enter_time_for_weight_data_cont").slideDown();
        } else {
            $("#enter_time_for_weight_data_cont").hide();
        }
    });

    $("input[name='feed_time']").change(function () {
        if ($(this).data("feedtime") === "choose") {
            $("#enter_time_for_feed_data_cont").slideDown();
        } else {
            $("#enter_time_for_feed_data_cont").hide();
        }
    });

    // create and add baby data
    $("#add_data_bm_btn").on("click", (e) => {
        e.preventDefault()
        createBMDataObj()
        // close and notify user
        closeAddData("Baby's Bowel Movement")
    })

    // create weight Data
    $("#add_data_weight_btn").on("click", (e) => {
        e.preventDefault()
        createWeightData()
        // close and notify user
        closeAddData("Baby's Weight")
    })

    // create feed Data
    $("#add_data_feed_btn").on("click", (e) => {
        e.preventDefault()
        createFeedData()
        // close and notify user
        closeAddData("Baby's Feeding")
    })

})