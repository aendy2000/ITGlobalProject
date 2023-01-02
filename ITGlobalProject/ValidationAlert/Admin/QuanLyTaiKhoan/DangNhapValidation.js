$(document).ready(function () {

    //Check captcha
    //let submitButton = document.getElementById("submit-button");
    let userInput = document.getElementById("user-input");
    let canvas = document.getElementById("canvas");
    let reloadButton = document.getElementById("reload-button");
    let text = "";
    //Generate Text
    const textGenerator = () => {
        let generatedText = "";
        /* String.fromCharCode gives ASCII value from a given number */
        // total 9 letters hence loop of 2
        for (let i = 0; i < 2; i++) {
            //65-90 numbers are capital letters
            generatedText += String.fromCharCode(randomNumber(65, 90));
            //97-122 are small letters
            generatedText += String.fromCharCode(randomNumber(97, 122));
            //48-57 are numbers from 0-9
            generatedText += String.fromCharCode(randomNumber(48, 57));
        }
        return generatedText;
    };
    //Generate random numbers between a given range
    const randomNumber = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
    //Canvas part
    function drawStringOnCanvas(string) {
        //The getContext() function returns the drawing context that has all the drawing properties and functions needed to draw on canvas
        let ctx = canvas.getContext("2d");
        //clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //array of text color
        const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
        //space between letters
        const letterSpace = 150 / string.length;
        //loop through string
        for (let i = 0; i < string.length; i++) {
            //Define initial space on X axis
            const xInitialSpace = 25;
            //Set font for canvas element
            ctx.font = "20px Roboto Mono";
            //set text color
            ctx.fillStyle = textColors[randomNumber(0, 1)];
            ctx.fillText(
                string[i],
                xInitialSpace + i * letterSpace,
                randomNumber(25, 40),
                100
            );
        }
    }
    //Initial Function
    function triggerFunction() {
        //clear Input
        userInput.value = "";
        text = textGenerator();
        console.log(text);
        //Randomize the text so that everytime the position of numbers and small letters is random
        text = [...text].sort(() => Math.random() - 0.5).join("");
        drawStringOnCanvas(text);
    }
    //call triggerFunction for reload button
    reloadButton.addEventListener("click", triggerFunction);
    //call triggerFunction when page loads
    window.onload = () => triggerFunction();
    //When user clicks on submit
    //submitButton.addEventListener("click", () => {
    //    //check if user input  == generated text
    //    if (userInput.value === text) {
    //        alert("Success");
    //    } else {
    //        alert("Incorrect");
    //        triggerFunction();
    //    }
    //});

    $('#subMitNe').on("click", function (e) {

        if ($('#correct-number').val() == 4) {
            $('#frm-Captcha').show();
        }
        if ($('#correct-number').val() >= 4) {

        }

        let usn = $('#username').val();
        let pw = $('#password').val();
        var format = /[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
        var formatps = /[`!#$%^&*()+\=\[\]{};':"\\|.@-_,<>\/?~]/;
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
        else if (formatps.test(pw) == false || formatLower.test(pw) == false || formatUpper.test(pw) == false || formatnumber.test(pw) == false) {
            checkpw = false;
            $('#PasswordValidateResul').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
        }
        else {
            checkpw = true;
            $('#PasswordValidateResul').text("").hide();
        }

        //Check mã captcha
        var checkcaptcha = false;
        if ($('#correct-number').val() == 4) {
            $('#frm-Captcha').show().prop("hidden", false);
        }
        if ($('#correct-number').val() > 4) {
            if (userInput.value == text) {
                checkcaptcha = true;
                $('#user-inputValidateResul').hide();
            } else {
                $('#user-inputValidateResul').text('Mã xác thực chưa chính xác!').show();
                var checkcaptcha = false;
                triggerFunction();
            }
        } else {
            var checkcaptcha = true;
        }

        if (checkusn == true && checkpw == true && checkcaptcha == true) {
            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyTaiKhoan/DangNhap',
                type: 'POST',
                dataType: 'html',
                data: { username: usn, password: pw }
            }).done(function (ketqua) {
                if (ketqua === "TKSAI") {
                    $('#AjaxLoader').hide();
                    $('#UsernameValidateResul').text("Sai rồi! Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.").show();
                    if ($('#correct-number').val() < 6) {
                        $('#correct-number').val(Number($('#correct-number').val()) + 1);
                    }
                }
                else if (ketqua === "MKSAI") {
                    $('#AjaxLoader').hide();
                    $('#PasswordValidateResul').text("Sai rồi! Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.").show();
                    if ($('#correct-number').val() < 6) {
                        $('#correct-number').val(Number($('#correct-number').val()) + 1);
                    }
                }
                else if (ketqua === "KHOA") {
                    $('#AjaxLoader').hide();

                    Swal.fire({
                        title: 'Thông Báo!',
                        text: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ cho Quản Trị để biết thêm thông tin!',
                        icon: 'info',
                        confirmButtonText: 'Xác nhận',
                        confirmButtonColor: '#57b846',
                    });
                }
                else {
                    $('#frm-Captcha').hide();
                    if (ketqua === "admin") {
                        window.location.href = $('#actionAdminSuccess').data('request-url');
                        $('#AjaxLoader').hide();

                    }
                    else if (ketqua === "employee") {
                        window.location.href = $('#actionEmployeeSuccess').data('request-url');
                        $('#AjaxLoader').hide();
                    }
                    else {
                        $('#AjaxLoader').hide();
                        swal.fire({
                            html: '<span style="font-size: 16px">Bạn đang sử dụng mật khẩu mặc định của hệ thống, hãy thay đổi sang một mật khẩu mới!</span>'
                                + '<div style="margin-top: 20px" class="wrap-input100 validate-input" data-validate="Nhập vào mật khẩu với tối thiểu 8 ký tự và tối đa 20 ký tự">'
                                + '<input class="input100" type="password" id="matkhau" name="matkhau" placeholder="Nhập mật khẩu mới">'
                                + '<span class="focus-input100"></span><span class="symbol-input100"><i class="fa fa-lock" aria-hidden="true"></i></span></div>'
                                + '<p style="color: red; font-size: 13px; margin-top: -10px" hidden id="matkhauValidate"></p>'

                                + '<div class="wrap-input100 validate-input" data-validate="Nhập vào mật khẩu với tối thiểu 8 ký tự và tối đa 20 ký tự">'
                                + '<input class="input100" type="password" id="nhaplaimatkhau" name="nhaplaimatkhau" placeholder="Nhập lại mật khẩu mới">'
                                + '<span class="focus-input100"></span><span class="symbol-input100"><i class="fa fa-lock" aria-hidden="true"></i></span></div>'
                                + '<p style="color: red; font-size: 13px; margin-top: -10px" hidden id="nhaplaimatkhauValidate"></p>',
                            title: 'Đổi Mật Khẩu',
                            showCancelButton: true,
                            focusConfirm: false,
                            cancelButtonText: 'Hủy bỏ',
                            confirmButtonText: 'Xác nhận',
                            confirmButtonColor: '#57b846',
                            cancelButtonColor: '#e53f3c',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            preConfirm: () => {
                                Swal.showLoading();
                                let pw = $('#matkhau').val();
                                let repw = $('#nhaplaimatkhau').val();

                                $('#matkhauValidate').hide();
                                $('#nhaplaimatkhauValidate').hide();

                                var checkpw = true;
                                var checkrepw = true;

                                var formatps = /[`!#$%^&*()+\=\[\]{};':"\\|.@-_,<>\/?~]/;
                                var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
                                var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
                                var formatnumber = /[1234567890]/;

                                //Mk mới
                                if (pw.length == 0) {
                                    checkpw = false;
                                    $('#matkhauValidate').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                                }
                                else if (pw.length < 8) {
                                    checkpw = false;
                                    $('#matkhauValidate').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                                }
                                else if (pw.length > 20) {
                                    checkpw = false;
                                    $('#matkhauValidate').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                                }
                                else if (formatps.test(pw) == false || formatLower.test(pw) == false || formatUpper.test(pw) == false || formatnumber.test(pw) == false) {
                                    checkpw = false;
                                    $('#matkhauValidate').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                                }

                                //Lại mk mới
                                if (repw.length < 1) {
                                    checkrepw = false;
                                    $('#nhaplaimatkhauValidate').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                                }
                                else if (repw != pw) {
                                    checkrepw = false;
                                    $('#nhaplaimatkhauValidate').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
                                }

                                if (checkpw == true && checkrepw == true) {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                        }).then((result) => {
                            if (result.value) {
                                e.preventDefault();
                                let id = ketqua;
                                let pw = $('#matkhau').val();
                                let urls = $('#requestPath').val() + 'Admins/QuanLyTaiKhoan/doiMatKhauLanDau';
                                $.ajax({
                                    url: urls,
                                    type: 'POST',
                                    traditional: true,
                                    async: false,
                                    cache: false,
                                    context: document.body,
                                    dataType: 'html',
                                    data: {
                                        password: pw,
                                        id: id
                                    }
                                }).done(function (ketquas) {
                                    if (ketquas === "DANGNHAP") {
                                        window.location.href = $('#requestPath').val() + 'Amdins/QuanLyTaiKhoan/DangNhap';
                                    }
                                    else if (ketquas === "SUCCESS") {
                                        Swal.fire({
                                            title: 'Thành công!',
                                            text: 'Mật khẩu của bạn đã được thay đổi.',
                                            icon: 'success',
                                            confirmButtonText: 'Xác nhận',
                                            confirmButtonColor: '#57b846',
                                        }).then(() => {
                                            window.location.href = $('#requestPath').val() + 'Employee';
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        else {
            if ($('#correct-number').val() < 6) {
                $('#correct-number').val(Number($('#correct-number').val()) + 1);
            }
        }
    });
});
