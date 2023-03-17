$(document).ready(function () {

    //Trang chờ duyệt
    $('#choduyetTab').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachDonNghiPhepPartial',
            dataType: 'html',
            type: "POST",
            contentType: false,
            processData: false,
            data: formData
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

        })
    });

    //Trang được duyệt
    $('#duocduyetTab').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachDonNghiPhepDaDuyet',
            type: "POST",
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
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
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachDonNghiPhepDaTuChoi',
            dataType: 'html',
            type: "POST",
            contentType: false,
            processData: false,
            data: formData
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