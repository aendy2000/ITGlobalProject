$(document).ready(function () {
    //Trang chờ duyệt
    $('#choduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepPartial',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#tabContent').replaceWith(ketqua);

            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
            });
        })
    });
    //Trang được duyệt
    $('#duocduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepPartial',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#tabContent').replaceWith(ketqua);

            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
            });
        })
    });
    //Trang bị từ chối
    $('#bituchoiTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepPartial',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#tabContent').replaceWith(ketqua);

            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
            });
        })
    });
});