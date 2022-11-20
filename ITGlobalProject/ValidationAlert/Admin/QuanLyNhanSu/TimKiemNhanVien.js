$(document).ready(function () {
    validates();
    function validates() {
        $('#searchNhanViens').on('input', function (e) {
            e.preventDefault();
            let contents = $('#searchNhanViens').val();
            let types = $('#valueTypes').val();
            let urls = $('#actionTimKiems').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: {
                    noidungs: contents,
                    typestr: types
                }
            }).done(function (ketqua) {
                if (ketqua !== "DANGNHAP") {
                    $('#pagess2').replaceWith('<div id="pagess2" class="row">' + ketqua + '</div>');
                } else {
                    window.location.href($('#actionDangNhap').data('request-url'));
                }
            });
        });
    }
    $('#tabGridActive').on('click', function (e) {
        $('#valueTypes').val('1');
    });
    $('#tabListActive').on('click', function (e) {
        $('#valueTypes').val('2');
    });
});