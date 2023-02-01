$(document).ready(function () {

    //Tìm kiếm
    $('#timkiemDuAn').on('input', function () {
        var formData = new FormData();
        formData.append('id', $('#idpart').val());
        formData.append('noidung', $(this).val());
        formData.append('trangthai', $('#trangthaiduan').val());
        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDuAn',
            data: formData,
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
            }
            else {
                $('#lstContentProject').replaceWith(ketqua);
            }
        });
    });

    //Trạng thái
    $('#trangthaiduan').on('change', function () {
        var formData = new FormData();
        formData.append('id', $('#idpart').val());
        formData.append('noidung', $('#timkiemDuAn').val());
        formData.append('trangthai', $(this).val());
        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDuAn',
            data: formData,
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
            }
            else {
                $('#lstContentProject').replaceWith(ketqua);
            }
        });
    });
});