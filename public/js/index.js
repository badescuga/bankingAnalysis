console.log('in index.js ---- ');

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

function LoadForParams() {


}