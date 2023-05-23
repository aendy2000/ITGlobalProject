$(document).ready(function () {

    //...............

    $('#btnLuuThongTin').on('click', function (e) {
        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();
        //Kỹ Năng Chuyên Môn, lấy biến [kynang]
        let kynang = "";

        let tongSoKyNang = $('#slkn').val();
        let tongSoKyNangDuocChon = $('input[name^=checkkynang]:checked').length;
        let demSoLuong = 1;
        for (var i = 1; i <= tongSoKyNang; i++) {

            var checkedKyNang = $('[name="checkkynang' + i + '"]');

            if (demSoLuong === tongSoKyNangDuocChon) {
                if (checkedKyNang.is(':checked')) {
                    kynang += checkedKyNang.attr('id');
                    break;
                }
            }
            else {
                if (checkedKyNang.is(':checked')) {
                    kynang += checkedKyNang.attr('id') + "_";
                    demSoLuong++;
                }
            }
        }

        //Check

        //Done
        //Lập form
        var formData = new FormData();
        //Thông Tin Cá Nhân
        formData.append('id', id);
        //Kỹ Năng Chuyên Môn, lấy biến [kynang]
        formData.append('kynang', kynang);


        e.preventDefault();
        $('#AjaxLoader').fadeIn('slow');
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaKyNangChuyenMon',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#AjaxLoader').fadeOut('slow');
            if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                alert("Đã có xảy ra lỗi, vui lòng thử lại!");
            }
            else if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
            }
            else {
                $('#contentPartial').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );

                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thành Công!", "Đã lưu thông tin chỉnh sửa", {
                            icon: "success",
                            buttons: {
                                confirm: {
                                    className: 'btn btn-success'
                                }
                            },
                        });
                    };
                    return {
                        init: function () {
                            initDemos();
                        },
                    };
                }();

                jQuery(document).ready(function () {
                    SweetAlert2Demo.init();
                });
            }
        });
    });
});