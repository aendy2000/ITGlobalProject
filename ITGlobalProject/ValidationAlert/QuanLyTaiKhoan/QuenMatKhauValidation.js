$(document).ready(function () {
    validates();
    function validates() {
        $('#frmQuanMatKhau').on('input', function (e) {
            let usn = $('#email').val();
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
                else {
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
        });
    }


    $('#subMitNe').on("click", function (e) {
        let usn = $('#email').val();
        var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
        var formatTextVN = /[àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        let checkusn = false;
        if (usn.length == 0) {
            checkusn = false;
            $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
        }
        else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
            checkusn = false
            $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
        } else if (usn.length >= 4 && usn.length <= 50) {
            if (usn.length == 0) {
                checkusn = false;
                $('#UsernameValidateResul').text("Không có được bỏ trống Tài Khoản, ơ kìa?").show();
            }
            else if (usn.length < 4 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
                checkusn = false
                $('#UsernameValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
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
            $('#UsernameValidateResul').text("Tên tài khoản mà có dấu là sao?. Xóa điiiiiii").show();
        }

        if (checkusn === true) {
            e.preventDefault();
            let urls = $('#actionlinks').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { email: usn }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#UsernameValidateResul').text("Có tài khoản email cũng nhập sai nữa?").show();
                }
                else if (ketqua === "SUCCESS") {
                    window.location.href = $('#actionSuccess').data('request-url');
                }
                else {
                    $('#UsernameValidateResul').text("Lỗi: " + ketqua).show();
                }
            });
        }
    });
});
