$(document).ready(function () {
    $('#namluong').selectpicker();

    $('#namluong').on("change", function () {
        var nam = $(this).val();
        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('nam', nam);
        formData.append('id', id);

        $.ajax({
            url: $('#requestPath').val() + "employee/quanlytaikhoan/timKiemBangLuongPartial",
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
                $('#appendTimKiemLuongNam').replaceWith(ketqua);
            }
        });
    });

    //Xem chi tiết
    $('[id^="xemchiTietLuong-"]').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append('id', id);

        $('#AjaxLoader').fadeIn('slow');
        $.ajax({
            url: $("#requestPath").val() + 'employee/quanlytaikhoan/chitietluong',
            data: formData,
            dataType: 'html',
            type: 'POST',
            contentType: false,
            processData: false
        }).done(function (ketqua) {
            $('#AjaxLoader').fadeOut('slow');
            $('#modalchitietluong').replaceWith(ketqua);
            $.when(
                $.getScript($('#requestPath').val() + 'Content/jspdf.debug.js', integrity = "sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs", crossorigin = "anonymous"),
                $.getScript($('#requestPath').val() + 'Content/html2canvas.js'),

                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () { });
            $('#xemChiTietLuong').modal('toggle');
        });
    });
});