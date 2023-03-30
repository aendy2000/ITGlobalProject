$(document).ready(function () {
    $('#namluong').selectpicker();

    $('#namluong').on("change", function () {
        var trangthai = $('#trangthailuong :selected').val();
        var nam = $(this).val();
        var id = $(this).attr('name');

        var formData = new FormData();
        formData.append('nam', nam);
        formData.append('id', id);
        formData.append('trangthai', trangthai);

        $.ajax({
            url: $('#requestPath').val() + "employee/quanlyluong/timKiemBangLuongPartial",
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
            }
        });
    });

    $('#trangthailuong').on("change", function () {
        var trangthai = $(this).val();
        var id = $(this).attr('name');
        var nam = $("#namluong :selected").val();

        var formData = new FormData();
        formData.append('nam', nam);
        formData.append('id', id);
        formData.append('trangthai', trangthai);

        $.ajax({
            url: $('#requestPath').val() + "employee/quanlyluong/timKiemBangLuongPartial",
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
            }
        });
    });
});