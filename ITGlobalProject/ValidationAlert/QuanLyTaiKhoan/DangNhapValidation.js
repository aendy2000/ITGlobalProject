$(document).ready(function () {
    validates();
    function validates() {
        $('#frmLogin').on('input', function (e) {
            let usn = $('#username').val();
            let pw = $('#password').val();
            var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
            var formatTextVN = /[àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
            if (usn.length == 0) {
                $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
            }
            else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
                $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            } else if (usn.length >= 4 && usn.length <= 50) {
                if (usn.length == 0) {
                    $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
                }
                else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
                    $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
                }
                else if (usn.length > 50) {
                    $('#UsernameValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á!!").show();
                }
                else if (usn.indexOf(' ') != -1) {
                    $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
                }
                else if (format.test(usn) == true) {
                    $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!. Chỉ được nhập dấu: [@@ . _ -] mà thôi!").show();
                }
                else if (formatTextVN.test(usn) == true) {
                    $('#UsernameValidateResul').text("Tên tài khoản mà có dấu là sao?. Xóa điiiiiii").show();
                } else {
                    $('#UsernameValidateResul').text("").hide();
                }
            }
            else if (usn.length > 50) {
                $('#UsernameValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á!!").show();
            }
            else if (usn.indexOf(' ') != -1) {
                $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
            }
            else if (format.test(usn) == true) {
                $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!. Chỉ được nhập dấu: [@@ . _ -] mà thôi!").show();
            }
            else if (formatTextVN.test(usn) == true) {
                $('#UsernameValidateResul').text("Tên tài khoản mà có dấu là sao?. Xóa điiiiiii").show();
            }

            ////////////////////////////////////////////////////////////////////////////////////

            if (pw.length == 0) {
                $('#PasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
            }
            else if (pw.length < 4) {
                $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            } else if (pw.length >= 4 && pw.length <= 50) {
                if (pw.length == 0) {
                    $('#PasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
                }
                else if (pw.length < 4) {
                    $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
                } else if (pw.length > 50) {
                    $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
                } else {
                    $('#PasswordValidateResul').text("").hide();
                }
            }
            else if (pw.length > 50) {
                $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
            }
        });
    }


    $('#subMitNe').on("click", function (e) {
        let usn = $('#username').val();
        let pw = $('#password').val();
        var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
        var formatTextVN = / àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ/;
        let checkusn = false;
        let checkpw = false;
        if (usn.length == 0) {
            checkusn = false;
            $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
        }
        else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
            checkusn = false;
            $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
        } else if (usn.length >= 4 && usn.length <= 50) {
            if (usn.length == 0) {
                checkusn = false;
                $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
            }
            else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
                checkusn = false;
                $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            } else if (usn.length > 50) {
                checkusn = false;
                $('#UsernameValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á!!").show();
            }
            else if (usn.indexOf(' ') != -1) {
                checkusn = false;
                $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
            }
            else if (format.test(usn) == true) {
                checkusn = false;
                $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!. Chỉ được nhập dấu: [@@ . _ -] mà thôi!").show();
            }
            else if (formatTextVN.test(usn) == true) {
                checkusn = false;
                $('#UsernameValidateResul').text("Tên tài khoản mà có dấu là sao?. Xóa điiiiiii").show();
            } else {
                checkusn = true;
                $('#UsernameValidateResul').text("").hide();
            }
        }
        else if (usn.length > 50) {
            checkusn = false;
            $('#UsernameValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á!!").show();
        }
        else if (usn.indexOf(' ') != -1) {
            checkusn = false;
            $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
        }
        else if (format.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!. Chỉ được nhập dấu: [@@ . _ -] mà thôi!").show();
        }
        else if (formatTextVN.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Tên tài khoản mà có dấu là sao?. Xóa điiiiiii").show();
        }

        ////////////////////////////////////////////////////////////////////////////////////

        if (pw.length == 0) {
            checkpw = false;
            $('#PasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
        }
        else if (pw.length < 4) {
            checkpw = false;
            $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
        } else if (pw.length >= 4 && pw.length <= 50) {
            if (pw.length == 0) {
                checkpw = false;
                $('#PasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
            }
            else if (pw.length < 4) {
                checkpw = false;
                $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            }
            else if (pw.length > 50) {
                checkpw = false;
                $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
            }
            else {
                checkpw = true;
                $('#PasswordValidateResul').text("").hide();
            }
        }
        else if (pw.length > 50) {
            checkpw = false;
            $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
        }

        if (checkusn == true && checkpw == true) {
            e.preventDefault();
            let urls = $('#actionlinks').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { username: usn, password: pw }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#UsernameValidateResul').text("Có tài khoản cũng nhập sai nữa?").show();
                    $('#PasswordValidateResul').text("Tài khoản sai rồi coi lại mật khẩu luôn đi").show();
                }
                else if (ketqua === "MKSAI") {
                    $('#PasswordValidateResul').text("Có cái mật khẩu thôi mà cũng nhập sai nữa. Nhập lại coi!").show();
                }
                else if (ketqua === "KHOA") {
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
                    if (ketqua === "admin")
                        window.location.href = $('#actionAdminSuccess').data('request-url');
                    else if (ketqua === "employee")
                        window.location.href = $('#actionEmployeeSuccess').data('request-url');
                }
            });
        }
    });
});
