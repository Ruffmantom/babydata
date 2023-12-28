const createPottyDot = () => {
    // these x coordinates are where the outer circle lands in the middle of the text.
    let sunX = -1605
    let monX = -1554
    let tueX = -1501
    let wedX = -1448
    let thurX = -1394
    let friX = -1346
    let satX = -1303

    let yMinHeight = 1372
    let yMaxHeight = 1093

    const returnCircleCoordinates = ()=>{
        // return a obj that has the outer circle and inner circle coordinates
        let coordinatesObj = {
            outerX:'',
            outerY:'',
            // innerX = this.outerX - (how ever much)
            innerX:'',
            innerY:''
        }

    }
        

    return`
        <g id="potty-dot">
            <circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4"
                transform="translate(0 0)" fill="#fd80ab" />
            <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6"
                transform="translate(0 0)" fill="none" stroke="#fd80ab"
                stroke-width="1" />
        </g>
    `
}


const create_BM_chart_HTML = (data) => {
    // add functions here

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 390">
        <g id="BM-chart" transform="translate(1644 -1045)">
            <rect id="bkg" width="390" height="390" rx="10"
                transform="translate(-1644 1045)" fill="none" />
            <text id="Week_of_Dec_10th" data-name="Week of Dec 10th"
                transform="translate(-1634 1067)" font-size="14"
                >
                <tspan x="0" y="0">Week of Dec 10th</tspan>
            </text>
            <g id="hours">
                <text id="_3" data-name="3" transform="translate(-1626 1198)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">3</tspan>
                </text>
                <text id="_4" data-name="4" transform="translate(-1626 1186)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">4</tspan>
                </text>
                <text id="_5" data-name="5" transform="translate(-1626 1173)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">5</tspan>
                </text>
                <text id="_12" data-name="12" transform="translate(-1626 1234)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">12</tspan>
                </text>
                <text id="_1" data-name="1" transform="translate(-1626 1222)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">1</tspan>
                </text>
                <text id="_2" data-name="2" transform="translate(-1626 1210)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">2</tspan>
                </text>
                <text id="_9" data-name="9" transform="translate(-1626 1271)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">9</tspan>
                </text>
                <text id="_9-2" data-name="9" transform="translate(-1626 1125)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">9</tspan>
                </text>
                <text id="_10" data-name="10" transform="translate(-1626 1259)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">10</tspan>
                </text>
                <text id="_10-2" data-name="10" transform="translate(-1626 1112)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">10</tspan>
                </text>
                <text id="_11" data-name="11" transform="translate(-1626 1247)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">11</tspan>
                </text>
                <text id="_11-2" data-name="11" transform="translate(-1626 1100)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">11</tspan>
                </text>
                <text id="PM" transform="translate(-1626 1088)" font-size="7"
                    >
                    <tspan x="-5.124" y="0">PM</tspan>
                </text>
                <text id="_6" data-name="6" transform="translate(-1626 1308)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">6</tspan>
                </text>
                <text id="_6-2" data-name="6" transform="translate(-1626 1161)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">6</tspan>
                </text>
                <text id="_7" data-name="7" transform="translate(-1626 1295)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">7</tspan>
                </text>
                <text id="_7-2" data-name="7" transform="translate(-1626 1149)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">7</tspan>
                </text>
                <text id="_8" data-name="8" transform="translate(-1626 1283)" font-size="7"
                    >
                    <tspan x="-1.946" y="0">8</tspan>
                </text>
                <text id="_8-2" data-name="8" transform="translate(-1626 1137)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">8</tspan>
                </text>
                <text id="_3-2" data-name="3" transform="translate(-1626 1344)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">3</tspan>
                </text>
                <text id="_4-2" data-name="4" transform="translate(-1626 1332)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">4</tspan>
                </text>
                <text id="_5-2" data-name="5" transform="translate(-1626 1320)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">5</tspan>
                </text>
                <text id="_12-2" data-name="12" transform="translate(-1626 1381)"
                    font-size="7" >
                    <tspan x="-3.892" y="0">12</tspan>
                </text>
                <text id="AM" transform="translate(-1626 1393)" font-size="7"
                    >
                    <tspan x="-5.516" y="0">AM</tspan>
                </text>
                <text id="_1-2" data-name="1" transform="translate(-1626 1369)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">1</tspan>
                </text>
                <text id="_2-2" data-name="2" transform="translate(-1626 1356)"
                    font-size="7" >
                    <tspan x="-1.946" y="0">2</tspan>
                </text>
            </g>
            <g id="week-days">
                <text id="Sun" transform="translate(-1599 1414)" font-size="12"
                    >
                    <tspan x="-10.008" y="0">Sun</tspan>
                </text>
                <text id="Mon" transform="translate(-1547 1414)" font-size="12"
                    >
                    <tspan x="-12.234" y="0">Mon</tspan>
                </text>
                <text id="Wed" transform="translate(-1441 1414)" font-size="12"
                    >
                    <tspan x="-12.558" y="0">Wed</tspan>
                </text>
                <text id="Tue" transform="translate(-1495 1414)" font-size="12"
                    >
                    <tspan x="-9.564" y="0">Tue</tspan>
                </text>
                <text id="Thu" transform="translate(-1388 1414)" font-size="12"
                    >
                    <tspan x="-10.116" y="0">Thu</tspan>
                </text>
                <text id="Sat" transform="translate(-1296 1414)" font-size="12"
                    >
                    <tspan x="-8.442" y="0">Sat</tspan>
                </text>
                <text id="Fri" transform="translate(-1341 1414)" font-size="12"
                    >
                    <tspan x="-6.768" y="0">Fri</tspan>
                </text>
            </g>
            <g id="chart-bkg-lines">
                <line id="Line_3" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1085.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-2" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1098.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-3" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1112.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-4" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1125.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-5" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1138.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-6" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1151.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-7" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1165.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-8" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1178.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-9" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1191.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-10" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1205.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-11" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1218.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-12" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1231.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-13" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1244.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-14" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1258.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-15" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1271.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-16" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1284.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-17" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1298.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-18" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1311.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-19" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1324.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-20" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1337.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-21" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1351.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-22" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1364.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-23" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1377.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
                <line id="Line_3-24" data-name="Line 3" x2="331"
                    transform="translate(-1614.5 1391.5)" fill="none"
                    stroke="var( --chart-bkg-stroke)" stroke-width="1" />
            </g>
            <g id="potty-dot">
                <circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4"
                    transform="translate(0 0)" fill="#fd80ab" />
                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6"
                    transform="translate(0 0)" fill="none" stroke="#fd80ab"
                    stroke-width="1" />
            </g>
        <!-- DOTS ARE MAPPED HERE -->
            <g id="legend" transform="translate(0 -1)">
                <g id="Group_118" data-name="Group 118">
                    <text id="Potty" transform="translate(-1447 1067)" font-size="10"
                        >
                        <tspan x="0" y="0">Potty</tspan>
                    </text>
                    <g id="Group_101" data-name="Group 101"
                        transform="translate(-250 -188)">
                        <circle id="Ellipse_9-9" data-name="Ellipse 9" cx="4" cy="4" r="4"
                            transform="translate(-1212 1248)" fill="#fd80ab" />
                        <circle id="Ellipse_10-9" data-name="Ellipse 10" cx="6" cy="6" r="6"
                            transform="translate(-1214 1246)" fill="none" stroke="#fd80ab"
                            stroke-width="1" />
                    </g>
                </g>
                <g id="Group_119" data-name="Group 119">
                    <text id="Two_For_One" data-name="Two For One"
                        transform="translate(-1341 1067)" font-size="10"
                        >
                        <tspan x="0" y="0">Two For One</tspan>
                    </text>
                    <g id="Group_100" data-name="Group 100"
                        transform="translate(-144 -188)">
                        <circle id="Ellipse_9-10" data-name="Ellipse 9" cx="4" cy="4" r="4"
                            transform="translate(-1212 1248)" fill="#b364f6" />
                        <circle id="Ellipse_10-10" data-name="Ellipse 10" cx="6" cy="6"
                            r="6" transform="translate(-1214 1246)" fill="none"
                            stroke="#b364f6" stroke-width="1" />
                    </g>
                </g>
                <g id="Group_117" data-name="Group 117">
                    <text id="Poopy" transform="translate(-1397 1067)" font-size="10"
                        >
                        <tspan x="0" y="0">Poopy</tspan>
                    </text>
                    <g id="Group_99" data-name="Group 99" transform="translate(-200 -188)">
                        <circle id="Ellipse_9-11" data-name="Ellipse 9" cx="4" cy="4" r="4"
                            transform="translate(-1212 1248)" fill="#64b5f6" />
                        <circle id="Ellipse_10-11" data-name="Ellipse 10" cx="6" cy="6"
                            r="6" transform="translate(-1214 1246)" fill="none"
                            stroke="#64b5f6" stroke-width="1" />
                    </g>
                </g>
            </g>
        </g>
    </svg>
    `
}