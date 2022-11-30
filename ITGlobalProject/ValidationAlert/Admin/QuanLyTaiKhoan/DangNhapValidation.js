$(document).ready(function () {
    validates();
    function validates() {
    }

    $('#subMitNe').on("click", function (e) {
        let usn = $('#username').val();
        let pw = $('#password').val();
        var format = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var formatTextVN = / àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;

        let checkusn = false;
        let checkpw = false;
        if (usn.length == 0) {
            checkusn = false;
            $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (usn.length > 50) {
            checkusn = false;
            $('#UsernameValidateResul').text("Tài khoản tối đa 50 ký tự. Vui lòng nhập lại.").show();
        }
        else if (usn.indexOf(' ') != -1) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (format.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (emailReg.test(usn) == false) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (formatTextVN.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        } else {
            checkusn = true;
            $('#UsernameValidateResul').text("").hide();
        }


        ////////////////////////////////////////////////////////////////////////////////////

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
        else if (format.test(pw) == false || formatLower.test(pw) == false || formatUpper.test(pw) == false || formatnumber.test(pw) == false) {
            checkpw = false;
            $('#PasswordValidateResul').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else {
            checkpw = true;
            $('#PasswordValidateResul').text("").hide();
        }

        if (checkusn == true && checkpw == true) {
            $('#AjaxLoader').show();
            e.preventDefault();
            let urls = $('#actionlinks').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { username: usn, password: pw }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#AjaxLoader').hide();
                    $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.").show();
                }
                else if (ketqua === "MKSAI") {
                    $('#AjaxLoader').hide();
                    $('#PasswordValidateResul').text("Sai rồi! Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.").show();
                }
                else if (ketqua === "KHOA") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Tài khoản của bạn đã bị khóa!", {
                                icon: "error",
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
                else {
                    if (ketqua === "admin") {
                        window.location.href = $('#actionAdminSuccess').data('request-url');
                        $('#AjaxLoader').hide();

                    }
                    else if (ketqua === "employee") {
                        window.location.href = $('#actionEmployeeSuccess').data('request-url');
                        $('#AjaxLoader').hide();
                    }
                }
            });
        }
    });
});
