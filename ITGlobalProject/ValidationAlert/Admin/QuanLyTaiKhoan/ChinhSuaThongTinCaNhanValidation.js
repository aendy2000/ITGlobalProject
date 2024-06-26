﻿$(document).ready(function () {
    $('#hotenvalidation').hide();
    $('#cmndvalidation').hide();
    $('#sodienthoaivalidation').hide();
    $('#ngaysinhvalidation').hide();
    $('#gioitinhvalidation').hide();
    $('#diachiemailvalidation').hide();

    //Up file avatar
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    });

    //Xóa bỏ avatar
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        let strImg = $('#urlIgmStr').val();
        $('#avatar').val(strImg);
        $('#previewImage').replaceWith('<img src="' + strImg + '" class="avatar-xl rounded-circle border border-4 border-white" alt="" id="previewImage" />');
    });

    //Lưu chỉnh sửa
    $('#luuChinhSua').on('click', function (e) {
        let id = $('#id').val();
        let avatar = $('#avatar').val();
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val().replace("_", "");
        let sodienthoai = $('#sodienthoai').val().replace("_", "");
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();
        let diachiemail = $('#diachiemail').val();

        var checkshoten = false;
        var checkscmnd = false;
        var checkssodienthoai = false;
        var checksngaysinh = false;
        var checksgioitinh = false;
        var checksdiachiemail = false
        var checksdiachinha = false;


        var format = /[`!#$%^&*()+\-=\[\]{}._@;':"\\|,<>\/?~]/;
        var formatnumber = /[1234567890]/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


        //Họ và tên
        if (hoten.length < 1) {
            checkshoten = false;
            $('#hotenvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#hoten');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (hoten.length > 50) {
            checkshoten = false;
            $('#hotenvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            var searchInput = $('#hoten');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (format.test(hoten) == true || formatnumber.test(hoten) == true) {
            checkshoten = false;
            $('#hotenvalidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        }
        else {
            checkshoten = true;
            $('#hotenvalidation').hide();
        }
        //CMND
        if (cmnd.length < 1) {
            checkscmnd = false;
            $('#cmndvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#cmnd');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (cmnd.length != 11 && cmnd.length != 14) {
            checkscmnd = false;
            $('#cmndvalidation').text("Vui lòng nhập đầy đủ thông tin này.").show();
            var searchInput = $('#cmnd');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkscmnd = true;
            $('#cmndvalidation').hide();

        }

        //Điện thoại
        if (sodienthoai.length < 1) {
            checkssodienthoai = false;
            $('#sodienthoaivalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#sodienthoai');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (sodienthoai.length != 12) {
            checkssodienthoai = false;
            $('#sodienthoaivalidation').text("Vui lòng nhập đầy đủ thông tin này.").show();
            var searchInput = $('#sodienthoai');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkssodienthoai = true;
            $('#sodienthoaivalidation').text("").hide();
        }

        //Ngày sinh
        if (ngaysinh.length < 1) {
            checksngaysinh = false;
            $('#ngaysinhvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#ngaysinh');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksngaysinh = true
            $('#ngaysinhvalidation').text("").hide();
        }
        //Email
        if (diachiemail.length < 1) {
            checksdiachiemail = false;
            $('#diachiemailvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#diachiemail');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (diachiemail.length > 50) {
            checksdiachiemail = false;
            $('#diachiemailvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            var searchInput = $('#diachiemail');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (emailReg.test(diachiemail) == false) {
            checksdiachiemail = false;
            $('#diachiemailvalidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
            var searchInput = $('#diachiemail');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksdiachiemail = true;
            $('#diachiemailvalidation').text("").hide();
        }
        //giới tính
        if (gioitinh.length < 1) {
            checksgioitinh = false;
            $('#gioitinhvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#gioitinh');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksgioitinh = true;
            $('#gioitinhvalidation').text("").hide();

        }
        if (diachinha.length > 250) {
            checksdiachinha = false;
            $('#diachinhavalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            var searchInput = $('#diachinha');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksdiachinha = true;
            $('#diachinhavalidation').text("").hide();
        }

      
        if (checkshoten === true && checkscmnd === true && checkssodienthoai === true && checksngaysinh === true &&
            checksgioitinh === true && checksdiachiemail === true && checksdiachinha === true) {
            e.preventDefault();
            $('#AjaxLoader').show();
            var formData = new FormData();
            formData.append('AvatarImg', $("#selectFiles")[0].files[0]);
            formData.append('ids', id);
            formData.append('hotens', hoten);
            formData.append('cmnds', cmnd);
            formData.append('sodienthoais', sodienthoai);
            formData.append('ngaysinhs', ngaysinh);
            formData.append('diachiemails', diachiemail);
            formData.append('gioitinhs', gioitinh);
            formData.append('diachinhas', diachinha);
            formData.append('avatars', avatar);

            let urls = $('#actionSubmit').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua === "Đã có xảy ra lỗi, vui lòng thử lại") {
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
                }
                else if (ketqua === "DANHSACH") {
                    window.location.href($('#actionDanhsach').data('request-url'));
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
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
                    $.when(
                        $.getScript($('#getScripts1').val()),
                        $.getScript($('#getScripts2').val()),
                        $.getScript($('#getScripts3').val()),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    ).done(function () {
                        //place your code here, the scripts are all loaded
                    });
                }
            });
        }
    });

    //Đăng xuất
    $('#dangXuats').on('click', function () {
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Đăng Xuất?',
                    text: "Bạn có chắc muốn đăng xuất?",
                    type: 'warning',
                    buttons: {
                        cancel: {
                            visible: true,
                            text: ' Hủy Bỏ ',
                            className: 'btn btn-danger'
                        },
                        confirm: {
                            text: 'Xác Nhận',
                            className: 'btn btn-success'
                        }
                    }
                }).then((khoataikhoans) => {
                    if (khoataikhoans) {
                        window.location.href = $('#actionDangXuat').data('request-url');;
                    }
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
    });

});