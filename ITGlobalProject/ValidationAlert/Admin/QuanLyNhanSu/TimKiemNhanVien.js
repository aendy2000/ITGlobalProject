$(document).ready(function () {
    //Nhập tìm kiếm
    $('#searchNhanViens').on('input', function (e) {
        let contents = $('#searchNhanViens').val();
        let types = $('#valueTypes').val();
        let urls = $('#actionTimKiems').data('request-url');
        let listCount = $('#valueListCount').val();

        $.ajax({
            url: urls,
            type: 'POST',
            dataType: 'html',
            data: {
                noidungs: contents,
                typestr: types,
                listCount: listCount
            }
        }).done(function (ketqua) {
            if (ketqua !== "DANGNHAP") {
                $('#pagess2').replaceWith('<div id="pagess2" class="row">' + ketqua + '</div>');
            } else {
                window.location.href($('#actionDangNhap').data('request-url'));
            }
        });
    });

    $('#tabGridActive').on('click', function (e) {
        $('#valueTypes').val('1');
    });

    $('#tabListActive').on('click', function (e) {
        $('#valueTypes').val('2');
    });

    //Số hiển thị
    $('#hienthiphantrang').on('change', function () {

        let types = $('#valueTypes').val();
        let listCount = $('#hienthiphantrang :selected').val();
        $('#valueListCount').val(listCount);

        $.ajax({
            url: $('#requestPath').val() + "Admins/QuanLyNhanSu/SoLuongPhanTrang",
            type: 'POST',
            dataType: 'html',
            data: {
                typestr: types,
                listCount: listCount
            }
        }).done(function (ketqua) {
            if (ketqua !== "DANGNHAP") {
                $('#pagess2').replaceWith('<div id="pagess2" class="row">' + ketqua + '</div>');
            } else {
                window.location.href($('#actionDangNhap').data('request-url'));
            }
        });
    });
});