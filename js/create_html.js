const dayCoordinates = {
    sunday: 3,
    monday: 52,
    tuesday: 103,
    wednesday: 153,
    thursday: 204,
    friday: 249,
    saturday: 294,
}

// min and max coordinates
const minAndMaxCoordinates = {
    yMinHeight: 263,
    yMaxHeight: 0,
}

const returnDayOfWeekCoordinate = (dateAndTime) => {
    console.log("returnDayOfWeekCoordinate INCOMING dateAndTime: ", dateAndTime)
    const date = new Date(dateAndTime);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = daysOfWeek[date.getDay()]
    console.log("returnDayOfWeekCoordinate DAY OF WEEK: ", dayOfWeek)
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
    console.log("returnDayOfWeekCoordinate RETURNED COORDINATE: ", coordinate)
    return parseInt(coordinate);
}

function returnTimeOfDayCoordinate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    const minutesInRange = minAndMaxCoordinates.yMaxHeight - minAndMaxCoordinates.yMinHeight;
    const minutesPerDay = 24 * 60;

    // Calculate the proportion of total minutes and map it to the range
    const mappedValue = ((totalMinutes / minutesPerDay) * minutesInRange) + minAndMaxCoordinates.yMinHeight;

    return mappedValue;
}

// return a data dot
const returnCircleCoordinates = (data) => {
    console.log("returnCircleCoordinates INCOMING data: ", data);
    // dateTime will come in this format: 2023-12-23T17:15
    // return an object that has the outer circle and inner circle coordinates
    // take in the date, grab what day of the week it is
    let time = data.split("T")[1];
    // coordinates object
    let coordinatesObj = {
        innerX: returnDayOfWeekCoordinate(data),
        innerY:Math.round( returnTimeOfDayCoordinate(time)),
    };

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


const createBmDot = (bm, index) => {
    // these x coordinates are where the outer circle lands in the middle of the text.
    let coordinates = returnCircleCoordinates(bm.created_at)
    let typeClassName = returnPottyDotColor(bm.type)
    console.log(coordinates.innerX)
    console.log(coordinates.innerY)
    return `
        <div id="data_dot_${index}" class="bm_dot_outer ${typeClassName} chart_dot" style="top:${coordinates.innerY}px; left:${coordinates.innerX}px;">
            <div class="bm_dot_inner ${typeClassName}"></div>
        </div>
    `
}


const create_BM_chart_HTML = (baby) => {
    baby.bm_data.forEach((bm, index) => {
        $("#dot_cont").append(createBmDot(bm,index))
    });
}