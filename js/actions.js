// containers
const baby_settings_modal_elm = $("#baby_settings_modal")
const baby_add_data_modal_elm = $("#baby_add_data_modal")
// inputs
const full_name_input = $("#full_name_input")
const birthday_input = $("#birthday_input")
const gender_select = $("#gender_select")
const add_new_baby_input_name = $("#add_new_baby_input_name")
const add_new_baby_input_birthday = $("#add_new_baby_input_birthday")
const add_new_baby_input_gender = $("#add_new_baby_input_gender")
// buttons
const get_started_btn = $("#get_started_btn")
const sign_first_baby_up_btn = $("#sign_first_baby_up_btn")
const baby_settings_button = $("#baby_settings_button")
const add_new_baby_btn = $("#add_new_baby_btn")



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
    }
    // save global baby data
    if (newBaby) {
        //if this is the start of adding a baby, initialize the global data
        globalBabyData = []
    }
    if (globalBabyData.length >= 1) {
        // set other active babies to false
        globalBabyData.forEach(b => {
            b.active = false
        });
    }
    // after setting other babies to not active now push new baby
    globalBabyData.push(baby)

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

})