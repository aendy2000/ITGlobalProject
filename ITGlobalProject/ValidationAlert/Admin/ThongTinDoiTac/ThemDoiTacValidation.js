$(document).ready(function () {
    //Chọn ảnh
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    });

    //Xóa ảnh
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
    });

    //Chọn loại đối tác
    $('#canhandoanhnghiep').on('change', function () {
        if ($(this).prop("checked")) {
            $('[id^="doanhnghieps"]').prop("hidden", false);
            $('#canhans').prop("hidden", true);
        } else {
            $('[id^="doanhnghieps"]').prop("hidden", true);
            $('#canhans').prop("hidden", false);
        }
    });

    $('#luuThongTin').on('click', function () {
        //tag Khách hàng
        $('#namednvalidation').hide();
        $('#hotennguoidaidienvalidation').hide();
        $('#hotenvalidation').hide();
        $('#phonevalidation').hide();
        $('#emailvalidation').hide();
        $('#ngaysinhvalidation').hide();
        $('#gioitinhvalidation').hide();
        $('#masothuevalidation').hide();
        $('#urlwebvalidation').hide();
        $('#diahchinhavalidation').hide();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        // value Khách hàng
        var namedn = $('#namedn').val().trim();
        var hotendaidien = $('#hotennguoidaidien').val().trim();
        var hoten = $('#hoten').val().trim();
        var phone = $('#phone').val().replace(/_/g, '').trim();
        var email = $('#email').val().trim();
        var ngaysinh = $('#ngaysinh').val().trim();
        var gioitinh = $('#gioitinh :selected').val().trim();
        var diahchinha = $('#diahchinha').val().trim();
        var masothue = $('#masothue').val().replace(/_/g, '').trim();
        var website = $('#urlweb').val().trim();

        var checkkhachhang = true;

        if ($('#canhandoanhnghiep').prop("checked")) {
            //Validation tên doanh nghiệp
            if (namedn.length < 1) {
                checkkhachhang = false;
                $('#namednvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#namedn').focus();
            }
            else if (namedn.length > 100) {
                checkkhachhang = false;
                $('#namednvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#namedn').focus();
            }

            //Validation tên người đại diện
            if (hotendaidien.length < 1) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            } else if (formatnumber.test(hotendaidien) == true || formatss.test(hotendaidien.toLowerCase().replace(/\d+/g, '')) == true) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            } else if (hotendaidien.length > 50) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            }
        }
        else {
            //Validation tên khach hàng
            if (hoten.length < 1) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#hoten').focus();
            } else if (formatnumber.test(hoten) == true || formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hoten').focus();
            } else if (hoten.length > 50) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hoten').focus();
            }
        }

        //Validation sđt
        if (phone.length < 1) {
            checkkhachhang = false;
            $("#phonevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#phone').focus();

        } else if (phone.length != 12) {
            checkkhachhang = false;
            $("#phonevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#phone').focus();
        }

        //Validation email
        if (email.length < 1) {
            checkkhachhang = false;
            $("#emailvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#email').focus();

        } else if (formatEmail.test(email) == false) {
            checkkhachhang = false;
            $("#emailvalidation").text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#email').focus();
        }
        else if (email.length > 50) {
            checkkhachhang = false;
            $("#emailvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#email').focus();
        }

        //Validation ngày sinh
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        if (ngaysinh.length > 0) {
            if (Number(ngaysinh.replace(/-/g, '')) >= Number(yyyy + mm + dd)) {
                checkkhachhang = false;
                $("#ngaysinhvalidation").text("Ngày sinh không thể lớn hơn ngày hiện tại").show().prop("hidden", false);
                $('#ngaysinh').focus();
            }
        }

        //Validation địa chỉ
        if (diahchinha.length > 250) {
            checkkhachhang = false;
            $("#diachinhavalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#gioitinh').focus();
        }

        //validation mã số thuế
        if (masothue.length != 10) {
            checkkhachhang = false;
            $("#masothuevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#masothue').focus();
        }

        //Check đúng hết thì làm
        if (checkkhachhang == true) {
            var formData = new FormData();
            formData.append('namedn', namedn);
            formData.append('hotennguoidaidien', hotendaidien);
            formData.append('hoten', hoten);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diahchinha', diahchinha);
            formData.append('pageSize', $('#hienthiPartner').val());
            if ($('#canhandoanhnghiep').prop("checked")) {
                formData.append('loaidoitac', true);
            } else {
                formData.append('loaidoitac', false);
            }
            formData.append('masothue', masothue);
            formData.append('website', website);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/themDoiTac',
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
                    $('#pagess2').replaceWith('<div id="pagess2" class="row">' + ketqua + '</div>');

                    $.when(
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    );

                    $('#trangthaiPartner').selectpicker('val', '');
                    $('#searchPartner').val("");
                    $('#resetdata').click();

                    var sl = Number($('#tongSoLuong').attr('name')) + 1;
                    $('#tongSoLuong').replaceWith('<b id="tongSoLuong" name="' + sl + '" class="fs-5 text-muted">(' + sl + ')</b>');

                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã thêm thành công.", {
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