$(document).ready(function () {

    //...............

    $('#btnLuuThongTin').on('click', function (e) {
        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();

        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#dsNganHang :selected').val().trim();
        let sotaikhoan = $('#sotaikhoan').val().trim();
        let chutaikhoan = $('#chutaikhoan').val().trim();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatnumber = /[1234567890]/;

        $("#mucluongvalidation").text("").hide();
        $("#tennganhangvalidation").text("").hide();
        $("#sotaikhoanvalidation").text("").hide();
        $("#chutaikhoanvalidation").text("").hide();

        var checklienhethanhtoan = true;

        //Check
        // Vali mucluong
        if (mucluong.length < 1) {
            checklienhethanhtoan = false;
            $("#mucluongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (dsNganHang.length > 0 || sotaikhoan.length > 0 || chutaikhoan.length > 0)
        {
            // Vali dsNganHang
            if (dsNganHang.length < 1) {
                checklienhethanhtoan = false;
                $("#tennganhangvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }

            // Vali sotaikhoan
            if (sotaikhoan.length < 1) {
                checklienhethanhtoan = false;
                $("#sotaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();


            }
            else if (sotaikhoan.length > 50) {
                checklienhethanhtoan = false;
                $("#sotaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();


            }
            else if (formatTextVN.test(sotaikhoan) == true || formatss.test(sotaikhoan.toLowerCase().replace(/\d+/g, '')) == true) {
                checklienhethanhtoan = false;
                $("#sotaikhoanvalidation").text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();

            }
            // Vali chutaikhoan
            if (chutaikhoan.length < 1) {
                checklienhethanhtoan = false;
                $("#chutaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();

            }
            else if (chutaikhoan.length > 50) {
                checklienhethanhtoan = false;
                $("#chutaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();


            }
            else if (formatss.test(chutaikhoan.toLowerCase().replace(/\d+/g, '')) == true) {
                checklienhethanhtoan = false;
                $("#chutaikhoanvalidation").text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();

            }
            else if (formatnumber.test(chutaikhoan) == true) {
                checklienhethanhtoan = false;
                $("#chutaikhoanvalidation").text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
            }
        }
        //Done

        if (checklienhethanhtoan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Liên Hệ & Thanh Toán

            formData.append('mucluong', mucluong);
            formData.append('dsNganHang', dsNganHang);
            formData.append('sotaikhoan', sotaikhoan);
            formData.append('chutaikhoan', chutaikhoan);


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
                            swal("Thành Công!", "Bạn đã cập nhật thành công.", {
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
        }
    });
});