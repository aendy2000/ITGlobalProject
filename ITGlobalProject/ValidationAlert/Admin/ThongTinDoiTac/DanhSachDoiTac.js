$(document).ready(function () {

    //Phân trang
    $('#hienthiPartner').on('change', function () {
        var formData = new FormData();
        formData.append('noidung', $('#searchPartner').val());
        formData.append('soluong', $(this).val());
        formData.append('trangthai', $('#trangthaiPartner').val());

        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDoiTac',
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
                $('#pagess2').replaceWith('<div id="pagess2" class="row">'
                    + ketqua + '</div>');
            }
        });
    });

    //Tìm kiếm
    $('#searchPartner').on('input', function () {
        var formData = new FormData();
        formData.append('noidung', $(this).val());
        formData.append('soluong', $('#hienthiPartner').val());
        formData.append('trangthai', $('#trangthaiPartner').val());
        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDoiTac',
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
                $('#pagess2').replaceWith('<div id="pagess2" class="row">'
                    + ketqua + '</div>');
            }
        });
    });

    //Trạng thái
    $('#trangthaiPartner').on('change', function () {
        var formData = new FormData();
        formData.append('noidung', $('#searchPartner').val());
        formData.append('soluong', $('#hienthiPartner').val());
        formData.append('trangthai', $(this).val());

        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDoiTac',
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
                $('#pagess2').replaceWith('<div id="pagess2" class="row">'
                    + ketqua + '</div>');
            }
        });
    });
});