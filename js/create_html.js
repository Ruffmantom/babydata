const createBmDot = (bm, index) => {
    // these x coordinates are where the outer circle lands in the middle of the text.
    let coordinates = returnCircleCoordinates(bm.createdAt)
    let typeClassName = returnPottyDotColor(bm.type)
    // console.log(coordinates.innerX)
    // console.log(coordinates.innerY)
    return `
        <div id="data_dot_${index}" class="bm_dot_outer ${typeClassName} chart_dot" style="top:${coordinates.innerY}px; left:${coordinates.innerX}px;">
            <div class="bm_dot_inner ${typeClassName}"></div>
        </div>
    `
}

const create_BM_chart_HTML = (baby) => {
    baby.bm_data.forEach((bm, index) => {
        $("#dot_cont").append(createBmDot(bm, index))
    });
}

const createDataCard = (data) => {
    if (data === '') {
        return `<p>There is no data</p>`
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
        } else if (data.cardType === "feed"){
            return `
                <div data-id="${data._id}" class="data_card">
                <p class="data_card_type">Feeding</p>
                ${data.ounces ? `<p class="data_card_comment"> ${data.ounces} within ${data.hours}hr's and ${data.minutes}min's</p>` : ""}
        
                <p class="data_card_date">${formatDate(data.createdAt)}</p>
            </div>`
        }





    }
}