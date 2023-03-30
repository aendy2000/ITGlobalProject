$(document).ready(function () {
    //Nhập tìm kiếm
    $('#timKiemThanhViens').on('input', function (e) {
        let contents = $('#timKiemThanhViens').val();
        let idpro = $('#idpro').val();
        $.ajax({
            url: $('#requestPath').val() + "Employee/QuanLyCongViec/timKiemThanhVien",
            type: 'POST',
            dataType: 'html',
            data: {
                id: idpro,
                noidungs: contents,
            }
        }).done(function (ketqua) {
            if (ketqua !== "DANHSACH") {
                $('#ContentSearchTeams').replaceWith(ketqua);
                tippy(".texttooltip", {
                    content(e) {
                        const t = e.getAttribute("data-template");
                        return document.getElementById(t).innerHTML
                    },
                    allowHTML: !0,
                    animation: "scale"
                });

            } else {
                window.location.href($('#requestPath').val() + "employee/quanlycongviec/danhsachduan");
            }
        });
    });
});