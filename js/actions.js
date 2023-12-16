// containers
const baby_settings_modal_elm = $("#baby_settings_modal")
const baby_add_data_modal_elm = $("#baby_add_data_modal")
// inputs
const full_name_input = $("#full_name_input")
const birthday_input = $("#birthday_input")
const gender_select = $("#gender_select")
// buttons
const get_started_btn = $("#get_started_btn")
const sign_first_baby_up_btn = $("#sign_first_baby_up_btn")



// create functions
const createBabyUser = (values) => {
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
    globalBabyData = []
    globalBabyData.push(baby)

    //save to local storage
    saveToLocalStorage()
    // hide signup_section_elm
    $(signup_section_elm).fadeOut()
    // load html
    loadHtml()
    console.log(globalBabyData)

}

let babyName = ""
let babyBirthday = ""
let babyGender = ""



$(() => {

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

    $(sign_first_baby_up_btn).on("click", (e) => {
        e.preventDefault()
        let babyValues = {}
        babyValues.name = babyName
        babyValues.birthday = babyBirthday
        babyValues.gender = babyGender
        if(babyValues.name === ""){
            createNotification("Please enter Baby's first and last name.")
            return
        }
        if(babyValues.birthday === ""){
            createNotification("Please enter the Baby's Birthday.")
            return
        }
        if(babyValues.gender === ""){
            createNotification("Please enter the Baby's gender.")
            return
        }

        console.log(babyValues)
        createBabyUser(babyValues)
    })



})