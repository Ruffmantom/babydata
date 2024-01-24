var idChars = "3QKXV0F8IYCA7S5T4ZGJDWB9L1N26UHOMRPVE";
const theme_radio_dark = $("#theme_raadio_dark")
const theme_radio_light = $("#theme_raadio_light")
const bm_data_radio_elm_potty = $("#bm_data_radio_elm_potty")
const bm_data_radio_elm_poopy = $("#bm_data_radio_elm_poopy")
const bm_data_radio_elm_two_for_one = $("#bm_data_radio_elm_two_for_one")
const bm_data_radio_elm_now = $("#bm_data_radio_elm_now")
const bm_data_radio_elm_enter = $("#bm_data_radio_elm_enter")
const loader_cont = $(".loader_cont")

const enter_time_for_bm_data_cont = $("#enter_time_for_bm_data_cont")
const enter_time_for_weight_data_cont = $("#enter_time_for_weight_data_cont")
const enter_time_for_feed_data_cont = $("#enter_time_for_feed_data_cont")


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
const formatCreatedAtDate = () => {
  const date = new Date();
  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = offsetMinutes / 60;

  const formattedDate = new Date(date.getTime() - offsetMinutes * 60 * 1000)
    .toISOString()
    .replace('Z', `${offsetHours >= 0 ? '+' : '-'}${Math.abs(offsetHours).toString().padStart(2, '0')}:${Math.abs(offsetMinutes % 60).toString().padStart(2, '0')}`);

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
  // console.log(currentTime)
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

// calculate age
function calculateAge(inputDate) {
  // Input date
  const inputDateObj = new Date(inputDate);

  // Current date
  const currentDate = new Date();

  // Calculate the age
  const ageInMillis = currentDate - inputDateObj;

  // Convert age from milliseconds to years, months, and days
  const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
  const remainingDaysInMillis = ageInMillis % (365.25 * 24 * 60 * 60 * 1000);
  const ageInMonths = Math.floor(remainingDaysInMillis / (30.44 * 24 * 60 * 60 * 1000));
  const remainingDays = Math.floor((remainingDaysInMillis % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

  // Return the result
  return {
    years: ageInYears,
    months: ageInMonths,
    days: remainingDays
  };
}



const toggleTheme = () => {
  if (globalBabyData.theme) {
    globalBabyData.theme = false
    // set to light theme
    $(theme_radio_dark).prop('checked', false);
    $(theme_radio_light).prop('checked', true);
    $(".custom_toggle").removeClass('dark')
    saveToLocalStorage()
  } else {
    globalBabyData.theme = true
    // set to dark theme
    $(theme_radio_dark).prop('checked', true);
    $(theme_radio_light).prop('checked', false);
    // add class to toggle
    $(".custom_toggle").addClass('dark')
    saveToLocalStorage()
  }
}

const setToDarkTheme = () => {
  $(theme_radio_dark).prop('checked', true);
  $(theme_radio_light).prop('checked', false);
  // add class to toggle
  $(".custom_toggle").addClass('dark')
}

const changeActiveFooterButton = (btn) => {
  if (btn === "add") {
    // add data
    $("#footer_menu_all_data").removeClass('active')
    $("#footer_menu_home").removeClass('active')
    $("#footer_menu_add_data").addClass('active')
  } else if (btn === "all_data") {
    // all data page
    $("#footer_menu_home").removeClass('active')
    $("#footer_menu_add_data").removeClass('active')
    $("#footer_menu_all_data").addClass('active')
  } else {
    // home page
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

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatCreatedAtDate()
    console.log("BM data recorded now: " + createdAt)
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
    console.log("BM data manual record: " + createdAt)
  }

  // Now you can use these variables (bmType, note, isNow, enteredTime) as needed
  // For example, you can console.log them or send them to the server
  let bmData = {
    _id: createId(),
    cardType: 'bm',
    type: bmType,
    note: note,
    createdAt: createdAt
  }
  // console.log("BM Data:", bmData);
  // console.log("Global Data BEFORE add BM data: ", globalBabyData)
  let currentBaby = getCurrentBaby()
  currentBaby.bm_data.push(bmData)
  // console.log("Global Data AFTER add BM data: ", globalBabyData)
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

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatCreatedAtDate()
    console.log("Weight data recorded now: " + createdAt)
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
    console.log("Weight data manual record: " + createdAt)
  }
  // Create weightData object
  var weightData = {
    _id: createId(),
    cardType: 'weight',
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

  let createdAt = "";

  if (isNow) {
    // Set createdAt to current time and date
    createdAt = formatCreatedAtDate()
    console.log("Feed data recorded now: " + createdAt)
  } else {
    // Set createdAt to entered date
    createdAt = enteredTime;
    console.log("Feed data manual record: " + createdAt)
  }

  // Do something with the retrieved values (for example, log them)
  // Create weightData object
  var feedData = {
    _id: createId(),
    cardType: 'feed',
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
  // need to adjust this!!
  $('#data_type_select').val('null');
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
  // time forms
  enter_time_for_bm_data_cont.hide()
  enter_time_for_weight_data_cont.hide()
  enter_time_for_feed_data_cont.hide()
}

const dayCoordinates = { // these are based off the top left corner of the container
  sunday: 5, //switching to percentage since sun-sat is set to space between.
  monday: 20,
  tuesday: 35,
  wednesday: 50,
  thursday: 65,
  friday: 79,
  saturday: 92,
}

// min and max coordinates
const minAndMaxCoordinates = {
  yMinHeight: 0,
  yMaxHeight: 261,
}


/*
military time                   
11:00pm = 2300 - Target Px = 263  // difference is 11px
10:00pm = 2200 - Target Px = 252    
09:00pm = 2100 - Target Px = 241  
08:00pm = 2000 - Target Px = 230  
07:00pm = 1900 - Target Px = 219    
06:00pm = 1800 - Target Px = 208  
05:00pm = 1700 - Target Px = 197  
04:00pm = 1600 - Target Px = 186  
03:00pm = 1500 - Target Px = 175  
02:00pm = 1400 - Target Px = 164  
01:00pm = 1300 - Target Px = 153  
12:00pm = 1200 - Target Px = 142  
11:00am = 1100 - Target Px = 131  
10:00am = 1000 - Target Px = 120  
09:00am = 0900 - Target Px = 109  
08:00am = 0800 - Target Px = 98  
07:00am = 0700 - Target Px = 87  
06:00am = 0600 - Target Px = 76  
05:00am = 0500 - Target Px = 65  
04:00am = 0400 - Target Px = 54  
03:00am = 0300 - Target Px = 43  
02:00am = 0200 - Target Px = 32  
01:00am = 0100 - Target Px = 21  
12:00am = 0000 - Target Px = 0
*/

const checkTimeAndReturnPx = (hour, min) => {
  // find the hour switch case
  let m;
  if (parseInt(min) <= 0) {
    m = 0
  } else {
    m = parseInt(min) / 60
  }
  let mx = Math.floor(m * 100) / 100;
  let isMxDecimal = mx % 1 !== 0
  let returnMinPx = isMxDecimal ? mx.toString().split('.')[1] : mx
  // console.log(returnMinPx)
  let returnPx = ''
  switch (hour) {
    case 23:

      returnPx = `263.${returnMinPx}`
      break;
    case 22:

      returnPx = `252.${returnMinPx}`
      break;
    case 21:

      returnPx = `241.${returnMinPx}`
      break;
    case 20:

      returnPx = `230.${returnMinPx}`
      break;
    case 19:

      returnPx = `219.${returnMinPx}`
      break;
    case 18:

      returnPx = `208.${returnMinPx}`
      break;
    case 17:

      returnPx = `197.${returnMinPx}`
      break;
    case 16:

      returnPx = `186.${returnMinPx}`
      break;
    case 15:

      returnPx = `175.${returnMinPx}`
      break;
    case 14:

      returnPx = `164.${returnMinPx}`
      break;
    case 13:

      returnPx = `153.${returnMinPx}`
      break;
    case 12:

      returnPx = `142.${returnMinPx}`
      break;
    case 11:

      returnPx = `131.${returnMinPx}`
      break;
    case 10:

      returnPx = `120.${returnMinPx}`
      break;
    case 9:

      returnPx = `109.${returnMinPx}`
      break;
    case 8:

      returnPx = `98.${returnMinPx}`
      break;
    case 7:

      returnPx = `87.${returnMinPx}`
      break;
    case 6:

      returnPx = `76.${returnMinPx}`
      break;
    case 5:

      returnPx = `65.${returnMinPx}`
      break;
    case 4:

      returnPx = `54.${returnMinPx}`
      break;
    case 3:

      returnPx = `43.${returnMinPx}`
      break;
    case 2:

      returnPx = `32.${returnMinPx}`
      break;
    case 1:

      returnPx = `21.${returnMinPx}`
      break;
    case parseInt("00"):

      returnPx = `10.${returnMinPx}`
      break;
  }
  // console.log("Returned PX: " + returnPx)
  return returnPx
}



const returnDayOfWeekCoordinate = (dateAndTime) => {
  // console.log("returnDayOfWeekCoordinate INCOMING dateAndTime: ", dateAndTime)
  const date = new Date(dateAndTime);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayOfWeek = daysOfWeek[date.getDay()]
  // console.log("returnDayOfWeekCoordinate DAY OF WEEK: ", dayOfWeek)
  let coordinate;
  switch (dayOfWeek) {
    case "Sunday":
      coordinate = dayCoordinates.sunday
      break;
    case "Monday":
      coordinate = dayCoordinates.monday
      break;
    case "Tuesday":
      coordinate = dayCoordinates.tuesday
      break;
    case "Wednesday":
      coordinate = dayCoordinates.wednesday
      break;
    case "Thursday":
      coordinate = dayCoordinates.thursday
      break;
    case "Friday":
      coordinate = dayCoordinates.friday
      break;
    default:
      coordinate = dayCoordinates.saturday
  }
  // console.log("returnDayOfWeekCoordinate RETURNED COORDINATE: ", coordinate)
  return parseInt(coordinate);
}

function returnTimeOfDayCoordinate(timeString) {
  const [hours, minutes] = timeString ? timeString.split(':').map(Number) : "null";
  const time = hours.toString() + minutes.toString()
  // console.log("Time: Hour " + hours + " min " + minutes)
  return checkTimeAndReturnPx(hours, minutes)
}


// return a data dot
const returnCircleCoordinates = (data) => {
  // return an object that has the outer circle and inner circle coordinates
  // take in the date, grab what day of the week it is
  let time = data.split("T")[1];
  // coordinates object
  let coordinatesObj = {
    innerX: returnDayOfWeekCoordinate(data),
    innerY: returnTimeOfDayCoordinate(time),
  };
  // console.log(coordinatesObj)
  return coordinatesObj;
};


const returnPottyDotColor = (type) => {
  let color;
  switch (type) {
    case "potty":
      color = "potty_dot"
      break;
    case "poopy":
      color = "poopy_dot"
      break;
    default:
      color = "two_for_one_dot"
  }
  return color;
}

const renderLoader = (show) => {
  if (show) {
    $(loader_cont).addClass("active")
    $(loader_cont).fadeIn()
  } else {
    $(loader_cont).fadeOut()
    $(loader_cont).removeClass("active")
  }
}

// create the csv data
// create Feed CSV
const createFeedCsvData = (loadedData) => {
  let data = [
    ["ID", "Type", "Ounces", "Length Hr", "Length Min", "Recorded At"],
  ]
  // map the json data 
  loadedData.forEach(d => {
    data.push([d._id, d.cardType, d.ounces, d.hours, d.minutes, formatDate(d.createdAt)])
  });
  return data
}
// Create BM CSV
const createBmCsvData = (loadedData) => {
  let data = [
    ["ID", "Type", "Note", "Recorded At"],
  ]
  // map the json data 
  loadedData.forEach(d => {
    data.push([d._id, d.type, JSON.stringify(d.note), formatDate(d.createdAt)])
  });
  return data
}
// Create Weight CSV
const createWeightCsvData = (loadedData) => {
  let data = [
    ["ID", "Type", "Pounds", "Ounces", "Recorded At"],
  ]
  // map the json data 
  loadedData.forEach(d => {
    data.push([d._id, d.cardType, d.pounds, d.ounces, formatDate(d.createdAt)])
  });
  return data
}
// cvs download
const createCsvDownload = () => {
  let baby = getCurrentBaby()
  let outputData = null;
  let filename = ''
  if (globalBabyData.currentData === "bm_data") {
    outputData = createBmCsvData(baby.bm_data)
    filename = `${baby.name.replace(" ", "_")}_bm_data.csv`
  } else if (globalBabyData.currentData === "weight_data") {
    outputData = createWeightCsvData(baby.weight_data)
    filename = `${baby.name.replace(" ", "_")}_weight_data.csv`
  } else if (globalBabyData.currentData === "feed_data") {
    outputData = createFeedCsvData(baby.feed_data)
    filename = `${baby.name.replace(" ", "_")}_feed_data.csv`
  }
  const csvContent = "data:text/csv;charset=utf-8," + outputData.map(row => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // Append the link to the DOM
  link.click(); // Simulate click to trigger download
  document.body.removeChild(link);
}
// return formatted date for getting start and finish of week
const returnFormattedStartDate = (date) => {
  return date.toString().split(' ').slice(0, 4).join("-")
}
// return this weeks data
const returnThisWeeksData = (data) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  const lastDayOfWeek = new Date(currentDate);
  lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));
  lastDayOfWeek.setHours(23, 59, 59, 999);

  return currentWeekData = data.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
  });
};

const returnThisMonthsData = (data) => {
  // Sort data by "createdAt"
  data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

  return currentMonthData = data.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
  });
};
const returnXAxis = (filter, currentMonth) => {
  if (filter === "weekly") {
    // return weeks day count
    return 7
  } else {
    // return months day amount
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  }
}

const plotWeightData = (data, filter) => {
  let minY = 228
  let minX = 313

  // Create an SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", minX);
  svg.setAttribute("height", minY);
  let pathData = "M "
  data.forEach(function (entry) {
    // create LBS data point
    let xDistance = ''
    let yDistance = ''
    // this is the Y axis
    let ozToLbs = Math.round((entry.ounces / 16) * 100) / 100
    let Lbs = parseFloat(parseInt(entry.pounds) + ozToLbs)

    // get current months amount of days
    let currentMonth = new Date(entry.createdAt)
    let dayAmount = returnXAxis(filter, currentMonth);
    xDistance = Math.round(minX / dayAmount)
    yDistance = Math.round(minY / 30) // 30 is the max of the weight


    let dayOfEntry = currentMonth.getDate();
    // Adjust the day if there's a time zone offset
    if (entry.createdAt.includes('+')) {
      dayOfEntry++;
    }

    // distance * day to get x data point
    let dataPointX = Math.round((xDistance * dayOfEntry) + xDistance)
    let dataPointY = Math.round(minY - (Lbs * yDistance))

    pathData += `${dataPointX} ${dataPointY} `; // finish this
  });
  // Set path attributes
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ff80ab");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-width", 4);

  // Append the path to the SVG
  svg.appendChild(path);

  let div = document.querySelector("#weight_line_cont")
  // Append the SVG to the document body
  div.appendChild(svg);
}

// feed data
const plotFeedData = (data, filter) => {
  let minY = 228
  let minX = 313

  // Create an SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", minX);
  svg.setAttribute("height", minY);
  let pathData = "M "
  data.forEach(function (entry) {
    // create feed data point
    let xDistance = ''
    let yDistance = ''
    // this is the Y axis
    let oz = entry.ounce
    // get current months amount of days
    let currentMonth = new Date(entry.createdAt)
    let dayAmount = returnXAxis(filter, currentMonth);
    xDistance = Math.round(minX / dayAmount)
    yDistance = Math.round(minY / 10)


    let dayOfEntry = currentMonth.getDate();
    // Adjust the day if there's a time zone offset
    if (entry.createdAt.includes('+')) {
      dayOfEntry++;
    }

    // distance * day to get x data point
    let dataPointX = Math.round((xDistance * dayOfEntry) + xDistance)
    let dataPointY = Math.round(minY - (oz * yDistance))

    pathData += `${dataPointX} ${dataPointY} `; // finish this
  });
  // Set path attributes
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ff80ab");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-width", 4);

  // Append the path to the SVG
  svg.appendChild(path);

  let div = document.querySelector("#feed_line_cont")
  // Append the SVG to the document body
  div.appendChild(svg);
}

