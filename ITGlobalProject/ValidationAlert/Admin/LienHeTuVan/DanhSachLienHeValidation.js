$(document).ready(function () {
    //Trang chờ duyệt
    $('#choduyetTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/LienHeTuVan/thongTinLienHeTuVanPartial',
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
    //Trang đã duyệt
    $('#dalienheTab').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/LienHeTuVan/thongTinDaLienHeTuVanPartial',
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