
// Function to register an event handler for the upload button
var uploadHandler = function() {
    $("#uploadButton").click(function() {
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: new FormData($('form#imageForm')[0]),

            cache: false,
            contentType: false,
            processData: false,

            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                        }
                    } , false);
                }
                return myXhr;
            }
        });
        $("#signupModal").modal('hide');
    });
}


$(document).ready(function() {
    uploadHandler();
})
