$(document).ready(function () {
    validates();
    function validates() {
        $('#frmResetPass').on('input', function (e) {
            let pw = $('#password').val();
            let repw = $('#repassword').val();

            if (pw.length == 0) {
                $('#PasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
            }
            else if (pw.length < 4) {
                $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            } else if (pw.length >= 4 && pw.length <= 50) {
                if (pw.length == 0) {
                    $('#PasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
                }
                else if (pw.length < 4) {
                    $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
                }
                else if (pw.length > 50) {
                    $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
                }
                else {
                    $('#PasswordValidateResul').text("").hide();
                }
            }
            else if (pw.length > 50) {
                $('#PasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
            }

            /////////////////////////////////////////////////////////////////////////////////////////

            if (repw.length == 0) {
                $('#RePasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
            }
            else if (repw.length < 4) {
                $('#RePasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            } else if (repw.length >= 4 && repw === pw && repw.length <= 50) {
                if (repw.length == 0) {
                    $('#RePasswordValidateResul').text("Không có được bỏ trống mật khẩu đâu à nghe!").show();
                }
                else if (repw.length < 4) {
                    $('#RePasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
                }
                else if (repw !== pw && repw.length >= 4) {
                    $('#RePasswordValidateResul').text("Mật khẩu phải giống nhau chớớớớ").show();
                }
                else if (repw.length > 50) {
                    $('#RePasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
                }
                else {
                    $('#RePasswordValidateResul').text("").hide();
                }
            }
            else if (repw !== pw && repw.length >= 4) {
                $('#RePasswordValidateResul').text("Mật khẩu phải giống nhau chớớớớ").show();
            }
            else if (repw.length > 50) {
                $('#RePasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
            }
        });
    }


    $('#subMitNe').on("click", function (e) {
        let pw = $('#password').val();
        let repw = $('#repassword').val();
        var checkpw = false;
        var checkrepw = false;
        if (pw.length == 0) {
            checkpw = false;
            $('#PasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
        }
        else if (pw.length < 4) {
            checkpw = false;
            $('#PasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
        } else if (pw.length >= 4 && pw.length <= 50) {
            if (pw.length == 0) {
                checkpw = false;
                $('#PasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
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
        /////////////////////////////////////////////////////////////////////////////////////////
        if (repw.length == 0) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
        }
        else if (repw.length < 4) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
        } else if (repw.length >= 4 && repw === pw && repw.length <= 50) {
            if (repw.length == 0) {
                checkrepw = false;
                $('#RePasswordValidateResul').text("Không có được bỏ trống đâu à nghe!").show();
            }
            else if (repw.length < 4) {
                checkrepw = false;
                $('#RePasswordValidateResul').text("Tối thiểu 4 ký tự. Nhập lại coi nào?").show();
            }
            else if (repw !== pw && repw.length >= 4) {
                checkrepw = false;
                $('#RePasswordValidateResul').text("Mật khẩu phải giống nhau chớớớớ").show();
            }
            else if (repw.length > 50) {
                checkrepw = false;
                $('#RePasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
            }
            else {
                checkrepw = true;
                $('#RePasswordValidateResul').text("").hide();
            }
        }
        else if (repw !== pw && repw.length >= 4) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Mật khẩu phải giống nhau chớớớớ").show();
        }
        else if (repw.length > 50) {
            checkrepw = false;
            $('#RePasswordValidateResul').text("Tối đa 50 ký tự thôi trời ơi là trời á").show();
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
