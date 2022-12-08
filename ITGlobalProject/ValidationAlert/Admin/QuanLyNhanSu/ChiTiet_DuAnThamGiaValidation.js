$(document).ready(function () {
    $('#searchDuAn').on('input', function (e) {

        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemDuAnThamGia',
            type: 'POST',
            dataType: 'html',
            data: {
                'contents': $("#searchDuAn").val(),
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#ContentSearchAppend').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });
});