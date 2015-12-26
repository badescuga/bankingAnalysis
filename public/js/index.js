console.log('in index.js ---- ');
function startLoading() {
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
                }
            });
            //Very important line, it disable the page refresh.
            return false;
        });
    });
}