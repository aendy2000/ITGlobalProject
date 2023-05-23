$(document).ready(function () {
    validates();
    function validates() {
    }


    $('#subMitNe').on("click", function (e) {
        let usn = $('#email').val();
        var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var formatTextVN = /[àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        let checkusn = false;
        if (usn.length == 0) {
            checkusn = false;
            $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (usn.length > 50) {
            checkusn = false;
            $('#UsernameValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }
        else if (usn.indexOf(' ') != -1) {
            checkusn = false;
            $('#UsernameValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        }
        else if (format.test(usn) == true) {
            checkusn = false;
            $('#UsernameValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        }
        else if (emailReg.test(usn) == false) {
            checkusn = false;
            $('#UsernameValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        }
        else if (formatTextVN.test(usn) == true) {
            $('#UsernameValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else {
            checkusn = true;
            $('#UsernameValidateResul').text("").hide();
        }


        if (checkusn === true) {
            $('#AjaxLoader').fadeIn('slow');
            e.preventDefault();
            let urls = $('#actionlinks').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { email: usn }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#AjaxLoader').fadeOut('slow');
                    $('#UsernameValidateResul').text("Email không tồn tại vui lòng kiểm tra lại.").show();
                }
                else if (ketqua === "SUCCESS") {
                    $('#AjaxLoader').fadeOut('slow');
                    window.location.href = $('#actionSuccess').data('request-url');
                }
                else {
                    $('#AjaxLoader').fadeOut('slow');
                    $('#UsernameValidateResul').text("Lỗi: " + ketqua).show();
                }
            });
        }
    });
});
