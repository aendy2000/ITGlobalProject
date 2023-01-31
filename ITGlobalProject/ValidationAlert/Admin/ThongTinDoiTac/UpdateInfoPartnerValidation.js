﻿$(document).ready(function () {

    //Chọn ảnh
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    })

    //Xóa ảnh
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#avaCu').val() + '" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
    })

    $('#luuThongTin').on('click', function () {
        //tag Khách hàng
        $('#namednvalidation').hide();
        $('#hotenvalidation').hide();
        $('#cmndvalidation').hide();
        $('#phonevalidation').hide();
        $('#emailvalidation').hide();
        $('#ngaysinhvalidation').hide();
        $('#gioitinhvalidation').hide();
        $('#diahchinhavalidation').hide();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        // value Khách hàng
        var avatar = $("#selectFiles")[0].files[0];
        var namedn = $('#namedn').val().trim();
        var hoten = $('#hoten').val().trim();
        var cmnd = $('#cmnd').val().replace(/_/g, '').trim();
        var phone = $('#phone').val().replace(/_/g, '').trim();
        var email = $('#email').val().trim();
        var ngaysinh = $('#ngaysinh').val().trim();
        var gioitinh = $('#gioitinh :selected').val().trim();
        var diahchinha = $('#diahchinha').val().trim();

        var checkkhachhang = true;
        //Validation tên doanh nghiệp
        if (namedn.length > 100) {
            checkkhachhang = false;
            $('#namednvalidation').text("Tên doanh nghiệp chỉ tối đa 100 ký tự.").show().prop("hidden", false);
            $('#namedn').focus();
        }

        //Validation tên khach hàng
        if (hoten.length < 1) {
            checkkhachhang = false;
            $('#hotenvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#hoten').focus();
        } else if (formatnumber.test(hoten) == true || formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
            checkkhachhang = false;
            $('#hotenvalidation').text("Họ và Tên chưa đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#hoten').focus();
        } else if (hoten.length > 50) {
            checkkhachhang = false;
            $('#hotenvalidation').text("Họ và Tên chỉ tối đa 50 ký tự.").show().prop("hidden", false);
            $('#hoten').focus();
        }

        //Validation cmnd
        if (cmnd.length < 1) {
            checkkhachhang = false;
            $("#cmndvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#cmnd').focus();

        } else if (cmnd.length != 14 && cmnd.length != 11) {
            checkkhachhang = false;
            $("#cmndvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show().prop("hidden", false);
            $('#cmnd').focus();
        }

        //Validation sđt
        if (phone.length < 1) {
            checkkhachhang = false;
            $("#phonevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#phone').focus();

        } else if (phone.length != 12) {
            checkkhachhang = false;
            $("#phonevalidation").text("Vui lòng nhập đầy đủ thông tin này!").show().prop("hidden", false);
            $('#phone').focus();
        }

        //Validation email
        if (email.length < 1) {
            checkkhachhang = false;
            $("#emailvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#email').focus();

        } else if (formatEmail.test(email) == false) {
            checkkhachhang = false;
            $("#emailvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show().prop("hidden", false);
            $('#email').focus();
        }
        else if (email.length > 50) {
            checkkhachhang = false;
            $("#emailvalidation").text("Email chỉ tối đa 50 ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#email').focus();
        }

        //Validation ngày sinh
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        if (ngaysinh.length < 1) {
            checkkhachhang = false;
            $("#ngaysinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#ngaysinh').focus();

        }
        else if (Number(ngaysinh.replace(/-/g, '')) >= Number(yyyy + mm + dd)) {
            checkkhachhang = false;
            $("#ngaysinhvalidation").text("Ngày sinh không thể lớn hơn ngày hiện tại").show().prop("hidden", false);
            $('#ngaysinh').focus();
        }

        //Validation giới tính
        if (gioitinh.length < 1) {
            checkkhachhang = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#gioitinh').focus();
        }
        else if (diahchinha.length > 250) {
            checkkhachhang = false;
            $("#diachinhavalidation").text("Địa chỉ, chỉ tối đa 250 ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#gioitinh').focus();
        }

        //Check đúng hết thì làm
        if (checkkhachhang == true) {
            var formData = new FormData();
            formData.append('id', $('#idpart').val());
            formData.append('avatar', avatar);
            formData.append('namedn', namedn);
            formData.append('hoten', hoten);
            formData.append('cmnd', cmnd);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diahchinha', diahchinha);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/CapNhatThongTin',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại", {
                                icon: "erorr",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-danger'
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
                } else if (ketqua.indexOf("đang được sử dụng bởi") != -1) {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", ketqua, {
                                icon: "warning",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-warning'
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
                else if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
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

                    $('#gioitinh').selectpicker();

                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Thông tin đối tác đã được thay đổi!", {
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

    $('#resetdata').on('click', function () {
        $('#namednvalidation').hide();
        $('#hotenvalidation').hide();
        $('#cmndvalidation').hide();
        $('#phonevalidation').hide();
        $('#emailvalidation').hide();
        $('#ngaysinhvalidation').hide();
        $('#gioitinhvalidation').hide();
        $('#diahchinhavalidation').hide();

        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#avaCu').val() + '" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');

    });
});