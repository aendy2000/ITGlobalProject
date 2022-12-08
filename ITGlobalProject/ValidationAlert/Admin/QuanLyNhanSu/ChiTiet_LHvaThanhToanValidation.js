$(document).ready(function () {

    //...............

    $('#btnLuuThongTin').on('click', function (e) {
        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();

        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#tenNganHang').val();
        let sotaikhoan = $('#sotaikhoan').val();
        let chutaikhoan = $('#chutaikhoan').val();

        //Check

        //Done
        //Lập form
        var formData = new FormData();
        //Thông Tin Cá Nhân
        formData.append('id', id);
        //Liên Hệ & Thanh Toán

        formData.append('mucluong', mucluong);
        formData.append('dsNganHang', dsNganHang);
        formData.append('sotaikhoan', sotaikhoan);
        formData.append('chutaikhoan', chutaikhoan);

        e.preventDefault();
        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaLienHeVaThanhToan',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#AjaxLoader').hide();
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