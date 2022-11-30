$(document).ready(function () {
    validates();
    function validates() {
    }


    $('#subMitNe').on("click", function (e) {
        let usn = $('#email').val();
        var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
        var formatTextVN = /[àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        let checkusn = false;
        if (usn.length == 0) {
            checkusn = false;
            $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (usn.length < 8 && format.test(usn) === false && formatTextVN.test(usn) === false && usn.indexOf(' ') === -1) {
            checkusn = false
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (usn.length > 50) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (usn.indexOf(' ') != -1) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (format.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        }
        else if (formatTextVN.test(usn) == true) {
            $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại định dạng tài khoản.").show();
        } else {
            checkusn = true;
            $('#UsernameValidateResul').text("").hide();
        }


        if (checkusn === true) {
            $('#AjaxLoader').show();
            e.preventDefault();
            let urls = $('#actionlinks').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { email: usn }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#AjaxLoader').hide();
                    $('#UsernameValidateResul').text("Email không tồn tại vui lòng kiểm tra lại.").show();
                }
                else if (ketqua === "SUCCESS") {
                    $('#AjaxLoader').hide();
                    window.location.href = $('#actionSuccess').data('request-url');
                }
                else {
                    $('#AjaxLoader').hide();
                    $('#UsernameValidateResul').text("Lỗi: " + ketqua).show();
                }
            });
        }
    });
});
