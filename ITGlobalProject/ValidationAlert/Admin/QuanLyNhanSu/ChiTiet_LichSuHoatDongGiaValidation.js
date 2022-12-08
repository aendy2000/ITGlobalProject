$(document).ready(function () {
    $('#searchHistory').on('input', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichSuHoatDong',
            type: 'POST',
            dataType: 'html',
            data: {
                'idus': $('#idus').val(),
                'date': $('#searchHistory').val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#contentLichSuHoatDong').replaceWith(ketqua);
            }
        });
    });
});