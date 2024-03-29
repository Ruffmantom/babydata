const createBmDot = (bm, index) => {
    // these x coordinates are where the outer circle lands in the middle of the text.
    let coordinates = returnCircleCoordinates(bm.createdAt)
    let typeClassName = returnPottyDotColor(bm.type)
    // console.log(coordinates.innerX)
    // console.log(coordinates.innerY)
    return `
        <div id="data_dot_${index}" data-dotid="${bm._id}" class="bm_dot_outer ${typeClassName} chart_dot"  style="top:${coordinates.innerY}px; left:${coordinates.innerX}%;">
            <div class="bm_dot_inner ${typeClassName}"></div>
            <div class="dot_btn" data-dotid="${bm._id}"></div>
        </div>
    `
}

const create_BM_chart_HTML = (baby) => {
    let thisWeeksData = returnThisWeeksData(baby.bm_data)
    console.log("this weeks data: ",thisWeeksData)
    if (thisWeeksData && thisWeeksData.length >= 1) {
        thisWeeksData.forEach((bm, index) => {
            $(".no_data_note").removeClass("show_no_data")
            $("#dot_cont").append(createBmDot(bm, index))
        })
    } else {
        $(".no_data_note").addClass("show_no_data")
    }
}

const createDataCard = (baby, data) => {
    if (data === '') {
        return `<p>There is no data. To start recording data, click on the lower right button to add a new data point.</p>`
    } else {
        if (data.cardType === "bm") {
            return `
            <div data-id="${data._id}" class="data_card ${data.type === "poopy" ? "poopy" : data.type === "potty" ? "potty" : "two_for_one"}">
               ${data.type ? `<p class="data_card_type">${data.type}</p>` : ""}
               ${data.note ? `<p class="data_card_comment">"${data.note}"</p>` : ""}
                <p class="data_card_date">${formatDate(data.createdAt)}</p>
            </div>`
        } else if (data.cardType === "weight") {
            return `
            <div data-id="${data._id}" class="data_card">
                <p class="data_card_type">Weight</p>
                ${data.pounds || data.ounces ? `<p class="data_card_comment"> ${data.pounds}lbs and ${data.ounces}oz</p>` : ""}
                <p class="data_card_date">${formatDate(data.createdAt)}</p>
                </div>`
        } else if (data.cardType === "feed") {
            return `
                <div data-id="${data._id}" class="data_card">
                <p class="data_card_type">Feeding</p>
                ${data.ounces ? `<p class="data_card_comment">${baby.name} drank ${data.ounces}oz within ${data.hours}hr's and ${data.minutes}min's</p>` : ""}
        
                <p class="data_card_date">${formatDate(data.createdAt)}</p>
            </div>`
        }

    }
}

const createBmDotInfo = (info)=>{
    console.log(info)
    return `
    <div class="dot_info">
        <p class="dot_info_type">${info.type}</p>
        <p class="dot_info_note">"${info.note != "" ? info.note : "No Note was entered"}"</p>
        <p class="dot_info_created_at">${formatDateWithTime(info.createdAt)}</p>
    </div>
    
    `
}