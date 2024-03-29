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
        // load charts
        createBmChartData()
        createWeightChartData()
        createFeedChartData()
        // change footer based on last click
        changeActiveFooterButton(globalBabyData.currentPage)
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
        loadCurrentData()
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
        // clear inputs and hide forms
        clearInputsAndCloseAddData()
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
            $(enter_time_for_bm_data_cont).slideDown();
        } else {
            $(enter_time_for_bm_data_cont).hide();
        }
    });

    $("input[name='weight_time']").change(function () {
        // Toggle visibility of enter_time_for_bm_data_cont based on selected radio button
        if ($(this).data("weighttime") === "choose") {
            $(enter_time_for_weight_data_cont).slideDown();
        } else {
            $(enter_time_for_weight_data_cont).hide();
        }
    });

    $("input[name='feed_time']").change(function () {
        if ($(this).data("feedtime") === "choose") {
            $(enter_time_for_feed_data_cont).slideDown();
        } else {
            $(enter_time_for_feed_data_cont).hide();
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

    // change current filter
    // loadHtml()


    $(all_data_select).on("keyup change", (e) => {
        console.log(e.target.value)
        let selectVal = e.target.value
        // save to global
        globalBabyData.currentData = selectVal
        // save to local
        saveToLocalStorage()
        // load section
        renderLoader(true)
        let timer = setTimeout(() => {
            // close loader
            renderLoader(false)
            loadCurrentData();
            clearTimeout(timer)
        }, 2000)
    })

    // filter data
    $(filter_baby_data_by_date_btn).on("click", (e) => {
        let dateFilter = $(e.target).data('datefilter');
        dateFilter = !dateFilter; // Toggle the boolean value

        // Update the button's data attribute with the new boolean value
        $(e.target).data("datefilter", dateFilter);

        if (dateFilter) {
            globalBabyData.currentFilter = "most_recent";
            $("#filter_baby_data_by_date_icon").removeClass("rotate_filter")
        } else {
            globalBabyData.currentFilter = "oldest_first";
            $("#filter_baby_data_by_date_icon").addClass("rotate_filter")
        }

        // Save to local storage and load data
        saveToLocalStorage();
        // start loader
        // this is just for ascetics
        renderLoader(true)
        let timer = setTimeout(() => {
            // close loader
            renderLoader(false)
            loadCurrentData();
            clearTimeout(timer)
        }, 1250)
        // load data
    });


    $(export_csv_btn).on("click", (e) => {
        // set loader
        renderLoader(true)
        let timer = setTimeout(() => {
            // close loader
            renderLoader(false)
            // after loader.. download csv
            console.log("exporting CSV!")
            createCsvDownload()
            clearTimeout(timer)
        }, 2000)
    })
    // dropdowns
    let dropDownElmArr = Array.from($(".widget_dd_item_container"))

    const handleDropDown = (ddId) => {
        dropDownElmArr.forEach(elm=>{
            let elmId = $(elm).data("date_dropdown_id")
            if(ddId === elmId){
                if($(elm).hasClass('active')){
                    $(elm).removeClass('active')
                }else{
                    $(elm).addClass('active')
                }
            }else{
                $(elm).removeClass('active')
            }
        })
    }
 
    
    // // chart drop down functionality
    $(".drop_down_action_btn").on("click", (e) => {
        console.log("clicked!");
        console.log($(e.currentTarget).data("date_dropdown_id"));
        let ddId = $(e.currentTarget).data("date_dropdown_id")
        handleDropDown(ddId)
    });

    
    // Close dropdown if clicked outside of it
    $(document).on("click", (e) => {
        const target = e.target;
        if (!$(target).closest('.drop_down_action_btn').length && !$(target).closest('.widget_setting_dd').length) {
            handleDropDown(null);
        }
    });

})