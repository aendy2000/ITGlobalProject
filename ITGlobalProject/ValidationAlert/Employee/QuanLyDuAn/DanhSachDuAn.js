$(document).ready(function () {
    $('#searchDuAn').on('input', function () {
        var content = $(this).val();
        var formData = new FormData();
        formData.append('content', content);
        $.ajax({
            url: $('#requestPath').val() + "Employee/QuanLyCongViec/timKiemDuAn",
            data: formData,
            contentType: false,
            processData: false,
            type: "POST",
            dataType: "html"
        }).done(function (ketqua) {
            $('#danhsachDuAn').replaceWith(ketqua);

            $.when(
                $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () { });
        });
    });
});