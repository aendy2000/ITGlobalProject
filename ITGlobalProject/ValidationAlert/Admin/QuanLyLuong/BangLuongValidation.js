$(document).ready(function () {
    $('#namluong').on("change", function () {
        var nam = $(this).val();
        var trangthai = $('#trangthailuong :selected').val();
        var formData = new FormData();
        formData.append('nam', nam);
        formData.append('trangthai', trangthai);

        $.ajax({
            url: $('#requestPath').val() + "admins/quanlyluong/timKiemBangLuong",
            data: formData,
            dataType: 'html',
            type: 'POST',
            contentType: false,
            processData: false
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + 'admins/quanlytaikhoan/dangnhap';
            }
            else {
                $('#BangLuongPartial').replaceWith(ketqua);

                $.when(
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js"),

                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                ).done(function () {
                });
            }
        });
    });

    $('#trangthailuong').on("change", function () {
        var trangthai = $(this).val();
        var nam = $('#namluong :selected').val();
        var formData = new FormData();
        formData.append('nam', nam);
        formData.append('trangthai', trangthai);

        $.ajax({
            url: $('#requestPath').val() + "admins/quanlyluong/timKiemBangLuong",
            data: formData,
            dataType: 'html',
            type: 'POST',
            contentType: false,
            processData: false
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + 'admins/quanlytaikhoan/dangnhap';
            }
            else {
                $('#BangLuongPartial').replaceWith(ketqua);

                $.when(
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js"),
                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js"),

                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                ).done(function () {
                });
            }
        });
    });

});