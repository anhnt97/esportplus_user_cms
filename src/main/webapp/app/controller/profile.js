var imageData = "";

$(document).ready(function () {

    $("#change_image").on("click", function (e) {
        e.preventDefault();
        $("#choose_image").click();
    });

    $("#btn_edit").on("click", function (e) {
        e.preventDefault();

        var name = $("#acc_name").val();
        var img = imageData;

        if (!checkInputString(name) || name.trim().length < 6) {
            showDialog("Warning", "Name is not empty and min length is 6 character");
            return;
        }

        confirmDialog("Do you want edit profile", "Edit", function (e) {
            var params = {
                acc_name: name,
                base64_image: img
            };

            var req = new Request();
            req.post("update-profile", params, function (data) {
                hideAllModal();
                if (data.rc === 0) {
                    showDialog("Success", "Update profile success");
                } else {
                    showDialog("Error", "Update profile failure");
                }
            })

        });

    });

    $("#choose_image").on("change", function (e) {
        const files = e.target.files;
        if (!files) {
            console.log("File upload not supported by your browser.");
            return;
        }
        if (files && files[0]) {
            const file = files[0];
            const size = parseInt(file.size / 1048576);
            console.log("size = " + size + " MB");

            var fileType = file["type"];
            var ValidImageTypes = ["image/jpeg", "image/png"];

            if ($.inArray(fileType, ValidImageTypes) < 0) {
                showDialog("Warning", "Please choose an image file");
                return;
            }

            if (size >= 10) {
                showDialog("Warning", "Please choose file size less than 30 MB");
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                $("#image").attr("src", e.target.result);
                $("#modalCrop").modal("show");
            };

            reader.readAsDataURL(file);
        }
    });

    var $image = $("#image");
    var cropBoxData;
    var canvasData;
    $("#modalCrop").on("shown.bs.modal", function () {
        $image.cropper({
            viewMode: 1,
            aspectRatio: 1 / 1,
            minCropBoxWidth: 200,
            minCropBoxHeight: 200,
            ready: function () {
                $image.cropper("setCanvasData", canvasData);
                $image.cropper("setCropBoxData", cropBoxData);
            }
        });
    }).on("hidden.bs.modal", function () {
        cropBoxData = $image.cropper("getCropBoxData");
        canvasData = $image.cropper("getCanvasData");
        $image.cropper("destroy");
        $("#choose_image").val("");
    });

    $("#btn_zoom_in").click(function () {
        $image.cropper("zoom", 0.1);
    });

    $("#btn_zoom_out").click(function () {
        $image.cropper("zoom", -0.1);
    });

    $("#btn_crop").click(function () {
        imageData = "";
        imageData = $image.cropper('getCroppedCanvas').toDataURL();
        updatePreview(imageData);
    });

    var req = new Request();
    req.request("get-profile", {}, function (data) {
        hideAllModal();
        if (data.rc === 0) {
            updatePreview(data.item.avatar);
            $("#acc_name").val(data.item.full_name);
        }
    });

});

function updatePreview(url) {
    $("#pic1").css('background-image', 'url("' + url + '")');
    $("#modalCrop").modal("hide");
}

