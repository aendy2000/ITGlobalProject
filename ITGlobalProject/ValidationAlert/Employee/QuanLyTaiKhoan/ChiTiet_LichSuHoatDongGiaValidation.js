$(document).ready(function () {
    $('#searchHistory').on('input', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlytaikhoan/timKiemLichSuHoatDong',
            type: 'POST',
            dataType: 'html',
            data: {
                'idus': $('#idus').val(),
                'date': $('#searchHistory').val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "employee/quanlytaikhoan/thongtinchitiet?id=" + $('#idus').val();
            } else {
                $('#contentLichSuHoatDong').replaceWith(ketqua);
            }
        });
    });
});