Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function () { },

    // Function - Will fire on animation completion.
    onAnimationComplete: function () { }
}

Chart.defaults.global.responsive = true;

var chartOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


console.log('in index.js ---- ');


var dataLoaded;
var dataLoadedProcessed;

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function loadExistingData(dataId) {
    $.ajax({
        method: "GET",
        url: "/api/getData?dataId=" + dataId,
        context: document.body
    }).done(function (data) {
        //$( this ).addClass( "done" );
        // console.log('GOT DATA BACK loading data: ' + data);
        dataLoaded = JSON.parse(data);
        dataLoadedProcessed = null;
        LoadDataForIngRomania(); //load data parser for romania
        PlotDaySpending(); // plot
    });
}


function startLoading() {
    var params = getQueryParams(window.location.href);
    if (Object.keys(params)) {
        //request data for this URL
        loadExistingData(params[Object.keys(params)[0]]);
    }

    $(document).ready(function () {
        console.log('starting to load');
        //upload file through ajax
        $('#uploadForm').submit(function () {
            $("#status").empty().text("File is uploading...");
            $(this).ajaxSubmit({
                error: function (xhr) {
                    status('Error: ' + xhr.status);
                },

                success: function (response) {
                    var respObj = JSON.parse(response);
                    $("#status").empty().text(respObj.responseMessage);
                    console.dir(JSON.stringify(respObj.response)); // filename of the banking file
                    window.location.href = "/?dataId=" + respObj.response; //  redirect 
                }
            });
            //Very important line, it disable the page refresh.
            return false;
        });
    });
}

//primivite data template for plots
function entryRow(date, type, value, name, thirdParty) {
    return {
        date: date,
        type: type,
        value: value,
        name: name,
        thirdParty: thirdParty
    }
}



function LoadDataForIngRomania() {
    console.dir(dataLoaded);
    var array = dataLoaded.data[0].data;
    dataLoadedProcessed = [];
    var date = null, type = null, name = null, thirdParty = null, value = null;

    for (var i = 1; i < array.length; i++) {
        if (array[i].length > 0 && array[i][1] != null) {
            //first, add saved data till now 
            if (date != null) { //ignore first pass, where there is no date
                var newItem = entryRow(date, type, value, name, thirdParty);
                dataLoadedProcessed.push(newItem);
            }
            
            //convert romanian date to internation date
            var dateToConvert = array[i][1];
            var dateValues = dateToConvert.split(' ');
            var month = null;

            if (dateValues.length > 1) {
                switch (dateValues[1].toLowerCase()) {
                    case 'ianuarie':
                        month = 1;
                        break;

                    case 'februarie':
                        month = 2;
                        break;

                    case 'martie':
                        month = 3;
                        break;

                    case 'aprilie':
                        month = 4;
                        break;

                    case 'mai':
                        month = 5;
                        break;

                    case 'iunie':
                        month = 6;
                        break;

                    case 'iulie':
                        month = 7;
                        break;

                    case 'august':
                        month = 8;
                        break;

                    case 'septembrie':
                        month = 9;
                        break;

                    case 'octombrie':
                        month = 10;
                        break;

                    case 'noiembrie':
                        month = 11;
                        break;

                    case 'decembrie':
                        month = 12;
                        break;

                    default:
                        month = -1;
                        break;
                }
                  console.log("--- dates "+ dateValues[1].toLowerCase()+" / "+month +" / "+ array[i][1]);
            } else {
                console.log('!!! couldnt convert:' + dateToConvert);
            }
            
            //new entry
            date = new Date(dateValues[2], month, dateValues[0]);
            name = array[i][3]; // not generic; ex: Cumparare POS
            type = null; // 'spent' / 'íncome'
            thirdParty = null;
        }


        if (array[i].length >= 5 && array[i][5]) {
            //i got a new 'spend' row; close existing data
            type = 'spent';
            value = parseFloat(array[i][5]);

        } else if (array[i].length >= 7 && array[i][7]) {
            //i got a new 'income' row; close existing data
            type = 'received';
            value = parseFloat(array[i][7]);
        }
        // because there are no general rules, i'm going to search for a specific pattern
        var keyWords = ['terminal', 'ordonator'];
        for (var j = 1; j < array[i]; j++) {
            if (array[i][j] != null && array[i][j].length > 0) {
                keyWords.forEach(function (item) {
                    if (array[i][j].toLowerCase().indexOf(item) > -1) {
                        thirdParty = array[i][j];
                    }
                });
            }
        }


    }

}
///////////// General Plots

function PlotDaySpending() {
    var dict = [];

    dataLoadedProcessed.forEach(function (element) {
        if (element.type === 'spent') {
            if (dict[element.date.toString()] === undefined) {
                dict[element.date.toString()] = 0;
            }

            dict[element.date.toString()] += element.value;
        }

    }, this);
    
    //data
    var values = [];
    Object.keys(dict).forEach(function (item) {
        values.push(dict[item]);
    });

    console.dir(Object.keys(dict));
    console.dir(values);
    console.dir(dataLoadedProcessed);


    var data = {
        labels: Object.keys(dict),
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: values
            }
            // ,
            // {
            //     label: "My Second dataset",
            //     fillColor: "rgba(151,187,205,0.2)",
            //     strokeColor: "rgba(151,187,205,1)",
            //     pointColor: "rgba(151,187,205,1)",
            //     pointStrokeColor: "#fff",
            //     pointHighlightFill: "#fff",
            //     pointHighlightStroke: "rgba(151,187,205,1)",
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
        ]
    };

    var ctx = $("#daySpendingPlot").get(0).getContext("2d");
    var myLineChart = new Chart(ctx).Line(data, chartOptions);
}