var idChars = "3QKXV0F8IYCA7S5T4ZGJDWB9L1N26UHOMRPVE";
const theme_raadio_dark = $("#theme_raadio_dark")
const theme_raadio_light = $("#theme_raadio_light")
const bm_data_radio_elm_potty = $("#bm_data_radio_elm_potty")
const bm_data_radio_elm_poopy = $("#bm_data_radio_elm_poopy")
const bm_data_radio_elm_two_for_one = $("#bm_data_radio_elm_two_for_one")
const bm_data_radio_elm_now = $("#bm_data_radio_elm_now")
const bm_data_radio_elm_enter = $("#bm_data_radio_elm_enter")


const createId = () => {
  let newId = "";
  for (var i = 0; i < 6; i++) {
    newId += idChars[Math.floor(Math.random() * idChars.length)];
  }
  newId += "-"
  for (var i = 0; i < 6; i++) {
    newId += idChars[Math.floor(Math.random() * idChars.length)];
  }
  newId += "-"
  for (var i = 0; i < 6; i++) {
    newId += idChars[Math.floor(Math.random() * idChars.length)];
  }
  return newId;
};


//helper to format date
function formatDate(inputDate) {
  // Parse the input date string into a Date object
  const dateObject = new Date(inputDate);

  // Extract year, month, and day
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = dateObject.getDate().toString().padStart(2, '0');

  // Format the date as "month/day/year"
  const formattedDate = `${month}/${parseInt(day) + 1}/${year}`;

  return formattedDate;
}

const createNotification = (text) => {
  $(".notification_text").text('')
  $(".notification_text").text(text)
  $(".notification_box").addClass("visible")
  let notificationTimer = setTimeout(() => {
    $(".notification_box").removeClass("visible")
    clearTimeout(notificationTimer)
  }, 3000)
}

function getTimeOfDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}


function getAgeDescription(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDate;

  // Convert milliseconds to days
  const days = Math.floor(timeDifference / (1000 * 3600 * 24));

  // Calculate weeks and remaining days
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  // Calculate months and remaining weeks
  const months = Math.floor(days / 30);
  const remainingWeeks = Math.floor((days % 30) / 7);

  if (days < 7) {
    if (days === 1) {
      return `${days} day old`;
    } else {
      return `${days} days old`;
    }
  } else if (days >= 7 && days < 30) {
    if (days === 7) {
      return `1 week old`;
    } else {
      return `${weeks} weeks and ${remainingDays} days old`;
    }
  } else if (days >= 30 && days < 365) {
    if (days === 30) {
      return `1 month old`;
    } else {
      return `${months} months and ${remainingWeeks} weeks old`;
    }
  } else {
    const years = Math.floor(days / 365);
    if (years === 1) {
      return `1 year old`;
    } else {
      return `${years} years old`;
    }
  }
}


const toggleTheme = () => {
  if (globalThemeData) {
    globalThemeData = false
    // set to light theme
    $(theme_raadio_dark).prop('checked', false);
    $(theme_raadio_light).prop('checked', true);
    $(".custom_toggle").removeClass('dark')
    saveThemeToLocalStorage()
  } else {
    globalThemeData = true
    // set to dark theme
    $(theme_raadio_dark).prop('checked', true);
    $(theme_raadio_light).prop('checked', false);
    // add class to toggle
    $(".custom_toggle").addClass('dark')
    saveThemeToLocalStorage()
  }
}

const setToDarkTheme = () => {
  $(theme_raadio_dark).prop('checked', true);
  $(theme_raadio_light).prop('checked', false);
  // add class to toggle
  $(".custom_toggle").addClass('dark')
}

const changeActiveFooterButton = (btn) => {
  if (btn === "add") {
    $("#footer_menu_all_data").removeClass('active')
    $("#footer_menu_home").removeClass('active')
    $("#footer_menu_add_data").addClass('active')
  } else if (btn === "data") {
    $("#footer_menu_home").removeClass('active')
    $("#footer_menu_add_data").removeClass('active')
    $("#footer_menu_all_data").addClass('active')
  } else {
    $("#footer_menu_add_data").removeClass('active')
    $("#footer_menu_all_data").removeClass('active')
    $("#footer_menu_home").addClass('active')
  }
}

const changeAddDataForm = (formType) => {
  if (formType === 'bm') {
    // hide other forms
    add_weight_data_form.hide()
    add_feeding_data_form.hide()
    add_bm_data_form.fadeIn()
  } else if (formType === "weight") {
    add_bm_data_form.hide()
    add_feeding_data_form.hide()
    add_weight_data_form.fadeIn()

  } else if (formType === "feeding") {
    add_bm_data_form.hide()
    add_weight_data_form.hide()
    add_feeding_data_form.fadeIn()

  } else {
    add_bm_data_form.hide()
    add_weight_data_form.hide()
    add_feeding_data_form.hide()

  }
}

// create BM data
const createBMDataObj = () => {
  // Get selected radio button value
  var bmType = $("input[name='bm_type']:checked").data("bmtype");

  // Get entered note value
  var note = $("textarea[name='note']").val();

  // Get selected time option
  var isNow = $("#bm_data_radio_elm_now").is(":checked");

  var isEnterTime = $("#bm_data_radio_elm_enter").is(":checked");

  // Get entered time value if "Enter Time" is selected
  var enteredTime = isEnterTime ? $("#input-time").val() : null;

  // Helper function to format date and time
  function formatDateTime(date) {
    return date.toISOString().slice(0, 16);
  }

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatDateTime(new Date());
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
  }

  // Now you can use these variables (bmType, note, isNow, enteredTime) as needed
  // For example, you can console.log them or send them to the server
  let bmData = {
    _id: createId(),
    type: bmType,
    note: note,
    created_at: createdAt
  }
  // console.log("BM Data:", bmData);
  console.log("Global Data BEFORE add BM data: ",globalBabyData)
  let currentBaby = getCurrentBaby()
  currentBaby.bm_data.push(bmData)
  console.log("Global Data AFTER add BM data: ",globalBabyData)
  saveToLocalStorage()
};

const createWeightData = () => {
  // Get pounds and ounces values
  var pounds = $("#add_data_pounds_input_elm").val();
  var ounces = $("#add_data_ounces_input_elm").val();

  // Get selected time option
  var isNow = $("#weight_data_radio_elm_now").is(":checked");
  var isEnterTime = $("#weight_data_radio_elm_enter").is(":checked");

  // Get entered time value if "Enter Time" is selected
  var enteredTime = isEnterTime ? $("#input_time_weight").val() : null;

  function formatDateTime(date) {
    return date.toISOString().slice(0, 16);
  }

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatDateTime(new Date());
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
  }
  // Create weightData object
  var weightData = {
    _id: createId(),
    pounds: pounds,
    ounces: ounces,
    createdAt: createdAt
  };

  // Log the weightData object to the console
  // console.log("Weight Data:", weightData)
  let currentBaby = getCurrentBaby()
  currentBaby.weight_data.push(weightData)
  saveToLocalStorage()
};

const createFeedData = () => {
  // Retrieve values from the form
  var ounces = $('#add_data_feed_ounce_input_elm').val();
  var hours = $('#add_data_feed_hr_input_elm').val();
  var minutes = $('#add_data_feed_min_input_elm').val();

  var isNow = $("#feed_data_radio_elm_now").is(":checked");
  var isEnterTime = $("#feed_data_radio_elm_enter").is(":checked");

  // Get entered time value if "Enter Time" is selected
  var enteredTime = isEnterTime ? $("#input_time_feed").val() : null;

  function formatDateTime(date) {
    return date.toISOString().slice(0, 16);
  }

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatDateTime(new Date());
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
  }

  // Do something with the retrieved values (for example, log them)
  // Create weightData object
  var feedData = {
    _id: createId(),
    ounces: ounces,
    hours: hours,
    minutes: minutes,
    createdAt: createdAt
  };
  // console.log("Weight Data: ",feedData)
  // You can perform other actions with these values as needed
  // save to global
  let currentBaby = getCurrentBaby()
  currentBaby.feed_data.push(feedData)
  saveToLocalStorage()
}
// clear inputs and close add data
const clearInputsAndCloseAddData = () => {
  //feed
  $('#add_data_feed_ounce_input_elm').val('0');
  $('#add_data_feed_hr_input_elm').val('0');
  $('#add_data_feed_min_input_elm').val('0');
  $("#feed_data_radio_elm_now").prop('checked', true);
  // .prop('checked', true);
  // weight
  $("#add_data_pounds_input_elm").val("0");
  $("#add_data_ounces_input_elm").val("0");
  $("#weight_data_radio_elm_now").prop('checked', true);
  // bm
  $("textarea[name='note']").val("");
  $("#bm_data_radio_elm_potty").prop('checked', true);
  $("#bm_data_radio_elm_now").prop('checked', true);

  // hide all forms
  add_weight_data_form.hide()
  add_feeding_data_form.hide()
  add_bm_data_form.hide()
}