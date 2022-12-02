$(document).ready(function () {
    //validates();
    //function validates() {

    //}

    $('#PasswordValidateResul').hide();
    $('#RePasswordValidateResul').hide();

    $('#subMitNe').on("click", function (e) {
        let pw = $('#password').val();
        let repw = $('#repassword').val();
        var checkpw = false;
        var checkrepw = false;
        var formatps = /[`!#$%^&*()+\=\[\]{};':"\\|.@-_,<>\/?~]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;

        if (pw.length == 0) {
            checkpw = false;
            $('#PasswordValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (pw.length < 8) {
            checkpw = false;
            $('#PasswordValidateResul').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else if (pw.length > 20) {
            checkpw = false;
            $('#PasswordValidateResul').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else if (formatps.test(pw) == false || formatLower.test(pw) == false || formatUpper.test(pw) == false || formatnumber.test(pw) == false) {
            checkpw = false;
            $('#PasswordValidateResul').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else {
            checkpw = true;
        }
        //

        //Lại mk mới
        if (repw.length < 1) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            var searchInput = $('#repassword');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else if (repw != pw) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
            var searchInput = $('#repassword');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkrepw = true;
        }

        if (checkpw == true && checkrepw == true) {
            e.preventDefault();
            let emails = $('#emailNe').val();
            let urls = $('#actionLuuMatKhau').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { password: pw, email: emails }
            }).done(function (ketqua) {
                if (ketqua === "DANGNHAP") {
                    window.location.href = $('#actionDangNhap').data('request-url');
                }
                else if (ketqua === "SUCCESS") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã đặt lại mật khẩu mới, chọn OK để quay về trang đăng nhập!", {
                                icon: "success",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-success'
                                    }
                                },
                            }).then(function () {
                                window.location.href = $('#actionDangNhap').data('request-url');
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
