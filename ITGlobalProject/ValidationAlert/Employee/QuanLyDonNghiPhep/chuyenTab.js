$(document).ready(function () {
    $('#choduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlydonnghiphep/danhSachDonNghiPhepPartial',
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

    $('#duocduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlydonnghiphep/danhSachDonNghiPhepDaDuyetPartial',
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

    $('#bituchoiTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlydonnghiphep/danhSachDonNghiPhepTuChoiPartial',
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
});