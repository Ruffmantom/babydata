const createBmDot = (bm, index) => {
    // these x coordinates are where the outer circle lands in the middle of the text.
    let coordinates = returnCircleCoordinates(bm.created_at)
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
    
}