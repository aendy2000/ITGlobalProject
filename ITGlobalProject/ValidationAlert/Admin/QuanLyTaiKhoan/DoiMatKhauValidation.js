$(document).ready(function () {
    $('#passwordValidation').hide();
    $('#newpasswordValidation').hide();
    $('#repasswordValidation').hide();

    //Lưu mk
    $('#btnSubmit').on('click', function (e) {
        let id = $('#idus').val();
        let pw = $('#password').val();
        let newpw = $('#newpassword').val();
        let repw = $('#repassword').val();
        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|,.@-_<>\/?~]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var checkspw = false;
        var checksnewpw = false;
        var checksrepw = false;

        //MK cũ
        if (pw.length < 1) {
            $('#passwordValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#password');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkspw = true;
            $('#passwordValidation').hide();
        }

        //MK mới
        if (newpw.length < 1) {
            checksnewpw = false;
            $('#newpasswordValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (pw == newpw) {
            $('#newpasswordValidation').text("Mật khẩu mới không được trùng với mật khẩu cũ.").show();
            checksnewpw = false;
        }
        else if (newpw.length < 8) {
            checksnewpw = false;
            $('#newpasswordValidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else if (newpw.length > 20) {
            checksnewpw = false;
            $('#newpasswordValidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else if (formats.test(newpw) == false || formatLower.test(newpw) == false || formatUpper.test(newpw) == false || formatnumber.test(newpw) == false) {
            checksnewpw = false;
            $('#newpasswordValidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else {
            checksnewpw = true;
            $('#newpasswordValidation').hide();
        }
        //

        //Lại mk mới
        if (repw.length < 1) {
            $('#repasswordValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#repassword');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (newpw != repw) {
            $('#repasswordValidation').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
            var searchInput = $('#repassword');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksrepw = true;
            $('#repasswordValidation').hide();
        }
        /////////////////////////////////////////////
        if (checkspw === true && checksnewpw === true && checksrepw === true) {
            e.preventDefault();
            var formData = new FormData();
            formData.append('id', id);
            formData.append('password', pw);
            formData.append('newpassword', newpw);
            let urls = $('#actionSubmitPass').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua === "PASSSAI") {
                    $('#passwordValidation').text("Sai rồi! Vui lòng kiểm tra lại mật khẩu cũ.").show();
                }
                else if (ketqua === "TRANGCHU") {
                    window.location.href($('#actionDanhsach').data('request-url'));
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Tuyệt quá! Bạn đã thay đổi mật khẩu thành công.", {
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
                        $.getScript('/Content/Admin/assets/js/theme.min.js'),
                        $.getScript('/Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.getScript('/ValidationAlert/Admin/QuanLyTaiKhoan/DoiMatKhauValidation.js'),
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