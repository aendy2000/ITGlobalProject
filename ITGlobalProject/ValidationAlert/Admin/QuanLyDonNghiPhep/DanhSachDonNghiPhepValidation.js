$(document).ready(function () {
    //Trang chờ duyệt
    $('#choduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepPartial',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#typeTab').val("choduyet");
            $('#tabContentsss').replaceWith(ketqua);
            $("#dataTableBasic").DataTable({
                responsive: !0
            });
            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
            });

        });
    });
    //Trang được duyệt
    $('#duocduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepDaDuyet',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#typeTab').val("duocduyet");
            $('#tabContentsss').replaceWith(ketqua);
            $("#dataTableBasic").DataTable({
                responsive: !0
            });
            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),

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
            url: $('#requestPath').val() + 'Admins/QuanLyDonNghiPhep/danhSachDonNghiPhepDaTuChoi',
            dataType: 'html'
        }).done(function (ketqua) {
            $('#typeTab').val("bituchoi");
            $('#tabContentsss').replaceWith(ketqua);
            $("#dataTableBasic").DataTable({
                responsive: !0
            });
            $.when(
                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),

                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
            });
        })
    });
});