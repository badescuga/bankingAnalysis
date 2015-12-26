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
        console.log('GOT DATA BACK loading data: ' + data);
        dataLoaded = data;
        dataLoadedProcessed = null;
        LoadDataForIngRomania(); //load data parser for romania
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
        type: value,
        value: name,
        name: name,
        thirdParty: thirdParty
    }
}



function LoadDataForIngRomania() {
    var array = dataLoaded.data[0].data;
    dataLoadedProcessed = [];
    var date = null, type = null, name = null, thirdParty = null, value = null;

    for (var i = 1; i < array.length; i++) {
        if (array[i].length > 0 && array[i][1] != null) {
            //first, add saved data till now 
            var newItem = entryRow(date, type, value, name, thirdParty);
            dataLoadedProcessed.append(newItem); 
            
            //new entry
            date = array[i][1];
            name = array[i][3];
            type = null;
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