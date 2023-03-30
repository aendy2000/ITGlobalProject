$(document).ready(function () {
    $('#searchDuAn').on('input', function (e) {

        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlytaikhoan/timKiemDuAnThamGia',
            type: 'POST',
            dataType: 'html',
            data: {
                'contents': $("#searchDuAn").val(),
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "employee/quanlytaikhoan/thongtinchitiet?id=" + $('#idus').val();
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