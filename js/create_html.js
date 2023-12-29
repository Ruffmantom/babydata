const dayCoordinates = {
    sunday: -1605,
    monday: -1554,
    tuesday: -1501,
    wednesday: -1448,
    thursday: -1394,
    friday: -1346,
    saturday: -1303,
}

// min and max coordinates
const minAndMaxCoordinates = {
    yMinHeight: 1372,
    yMaxHeight: 1093,
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
        innerY: returnTimeOfDayCoordinate(time),
    };

    // Calculate inner coordinates based on outer coordinates
    coordinatesObj.outerX = coordinatesObj.innerX - 2;
    coordinatesObj.outerY = coordinatesObj.innerY - 2;

    // Add coordinates strings to the object
    coordinatesObj.outerCoor = `${coordinatesObj.outerX} ${Math.round(coordinatesObj.outerY)}`;
    coordinatesObj.innerCoor = `${coordinatesObj.innerX} ${Math.round(coordinatesObj.innerY)}`;

    console.log("returnCircleCoordinates RETURN coordinatesObj: ", coordinatesObj);
    return coordinatesObj;
};


const returnPottyDotColor = (type) => {
    let color;
    switch (type) {
        case "potty":
            color = "#fd80ab"
            break;
        case "poopy":
            color = "#64b5f6"
            break;

        default:
            color = "#b364f6"
    }
    return color;
}

// const createSVG(tag) {
//     return document.createElementNS('http://www.w3.org/2000/svg', tag);
// }


// const createBmDot = (bm, index) => {
//     // these x coordinates are where the outer circle lands in the middle of the text.
//     let coordinates = returnCircleCoordinates(bm.created_at)
//     let typeColor = returnPottyDotColor(bm.type)
//     // return `
//     //     <g id="bm_dot_${index + 1}">
//     //         <circle id="Ellipse_9-8" data-name="Ellipse 9" cx="4" cy="4" r="4" transform="translate(${coordinates.innerCoor})" fill="${typeColor}"></circle>
//     //         <circle id="Ellipse_10-8" data-name="Ellipse 10" cx="6" cy="6" r="6" transform="translate(${coordinates.outerCoor})" fill="none" stroke="${typeColor}" stroke-width="1"></circle>
//     //     </g>
//     // `

//     var newSvgContent = `<g id="potty-dot">` +
//         `<circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4" transform="translate(${coordinates.innerCoor})" fill="${typeColor}"/>` +
//         `<circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" transform="translate(${coordinates.outerCoor})" fill="none" stroke="${typeColor}" stroke-width="1"/>` +
//         '</g>';

//     // Create a temporary div element
//     var tempDiv = document.createElement('div');
//     tempDiv.innerHTML = newSvgContent;

//     // Get the newly created SVG element from the temporary div
//     var newSvgElement = tempDiv.firstElementChild;

//     // Get the existing SVG container

// }


// const create_BM_chart_HTML = (baby) => {
//     baby.bm_data.forEach((bm, index) => {
//         let coordinates = returnCircleCoordinates(bm.created_at)
//         let typeColor = returnPottyDotColor(bm.type)
//         var newSvgContent = `<g id="potty_dot_${index}">` +
//             `<circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4" transform="translate(${coordinates.innerCoor})" fill="${typeColor}"/>` +
//             `<circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" transform="translate(${coordinates.outerCoor})" fill="none" stroke="${typeColor}" stroke-width="1"/>` +
//             '</g>';

//         // Create a temporary div element
//         var tempDiv = document.createElement('div');
//         tempDiv.innerHTML = newSvgContent;
//         // Get the newly created SVG element from the temporary div
//         var newSvgElement = tempDiv.firstElementChild;
//         // $("#bm_dot_data").append(createBmDot(bm, index))
//         let mainSvg = document.getElementById('bm_dot_data');
//         // Append the new SVG element to the existing SVG container
//         mainSvg.appendChild(newSvgElement);
//     });
// }

const create_BM_chart_HTML = (baby) => {
    baby.bm_data.forEach((bm, index) => {
        let coordinates = returnCircleCoordinates(bm.created_at);
        let typeColor = returnPottyDotColor(bm.type);
        console.log('Coordinates:', coordinates);
        console.log('Type Color:', typeColor);

        var newSvgContent = `<g class="potty_dot_${index}">` +
            `<circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4" transform="translate(${coordinates.innerCoor})" fill="${typeColor}"/></circle>` +
            `<circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" transform="translate(${coordinates.outerCoor})" fill="none" stroke="${typeColor}" stroke-width="1"/></circle>` +
            '</g>';

        console.log('New SVG Content:', newSvgContent);
        
        // Create a temporary div element
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newSvgContent;
        
        // Get the newly created SVG element from the temporary div
        var newSvgElement = tempDiv.firstElementChild;
        
        // Get the existing SVG group with the class 'bm_dot_data'
        let bmDotDataGroup = document.getElementById('bm_dot_data');
        console.log('bmDotDataGroup:', bmDotDataGroup);

        // Append the new SVG element to the existing SVG group with the class 'bm_dot_data'
        bmDotDataGroup.appendChild(newSvgElement);
    });
}
