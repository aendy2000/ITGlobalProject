$(document).ready(function () {
    var m = 10;
    var s = 0;
    var timeout = null;
    start();
    function start() {
        if (s === -1) {
            m -= 1;
            s = 59;
        }

        if (m === -1) {
            clearTimeout(timeout);
            return false;
        }

        $('#minutess').text(m.toString());
        $('#seconds').text(s.toString());

        timeout = setTimeout(function () {
            s--;
            start();
        }, 1000);
    }
});

$(document).ready(function () {
    $('#guiLaiMa').on('click', function (e) {
        e.preventDefault();
        var emails = $('#emailNe').val();
        let urls = $('#actionDatLaiMatKhau').data('request-url');
        $.ajax({
            url: urls,
            type: 'POST',
            dataType: 'html',
            data: { email: emails }
        }).done(function (ketqua) {
            window.location.href = $('#actionDatLaiMatKhauSuccess').data('request-url');
        });
    });

    $('#xacNhan').on('click', function (e) {
        e.preventDefault();
        let ma = $('#maXacThuc').val();
        var format = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
        var formatTextVN = /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/;
        let checkMa = false;
        if (ma.length < 1) {
            checkMa = false;
            $('#UsernameValidateResul').text("Không có được bỏ trống ơ kìa?").show();
        }
        else if (ma.length < 6) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã gồm có 6 số, nhớ nhập đủ 6 số").show();
        }
        else if (ma.length === 6) {
            if (ma.length < 1) {
                checkMa = false;
                $('#UsernameValidateResul').text("Không có được bỏ trống ơ kìa?").show();
            }
            else if (ma.length < 6) {
                checkMa = false;
                $('#UsernameValidateResul').text("Mã gồm có 6 số, nhớ nhập đủ 6 số").show();
            }
            else if (ma.length > 6) {
                checkMa = false;
                $('#UsernameValidateResul').text("Mã có 6 số mà nhập cái gì nhiều quá d?").show();
            }
            else if (ma.indexOf(' ') !== -1) {
                checkMa = false;
                $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
            }
            else if (format.test(ma) === true) {
                checkMa = false;
                $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!").show();
            }
            else if (formatTextVN.test(ma) === true) {
                checkMa = false;
                $('#UsernameValidateResul').text("Mã là số, không có chữ cơ mà?").show();
            }
            else {
                checkMa = true;
                $('#UsernameValidateResul').text("").hide();
            }
        }
        else if (ma.length > 6) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã có 6 số mà nhập cái gì nhiều quá d?").show();
        }
        else if (ma.indexOf(' ') !== -1) {
            checkMa = false;
            $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
        }
        else if (format.test(ma) === true) {
            checkMa = false;
            $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!").show();
        }
        else if (formatTextVN.test(ma) === true) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã là số, không có chữ cơ mà?").show();
        }

        if (checkMa === true) {
            e.preventDefault();
            let valuema = $('#maXacThuc').val();
            let emails = $('#emailNe').val();
            let urls = $('#actionGuima').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: { ma: valuema, email: emails }
            }).done(function (ketqua) {
                if (ketqua === "SAIMA") {
                    $('#UsernameValidateResul').text("Mã đăng nhập sai bét, coi lại đi").show();
                }
                else if (ketqua === "HETHANMA") {
                    swal("Thông Báo!", "Mã của bạn đã quá hạn, chúng tôi sẽ gửi cho bạn một mã mới!", {
                        icon: "error",
                        buttons: {
                            confirm: {
                                className: 'btn btn-danger'
                            }
                        },
                    }).then(function () {
                        e.preventDefault();
                        var emails = $('#emailNe').val();
                        let urls = $('#actionDatLaiMatKhau').data('request-url');
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            data: { email: emails }
                        }).done(function (ketqua) {
                            window.location.href = $('#actionDatLaiMatKhauSuccess').data('request-url');
                        });
                    });

                }
                else if (ketqua === "SUCCESS") {
                    window.location.href = $('#actionSuccess').data('request-url');
                }
                else if (ketqua === "DANGNHAP") {
                    window.location.href = $('#actionFailed').data('request - url');
                }
            });
        }

    });

    validates();
    function validates() {
        $('#frmMaXacThuc').on('input', function (e) {
            let ma = $('#maXacThuc').val();
            var format = /[`!#$%^&*()+\-=\[\]{}._@@;':"\\|,<>\/?~]/;
            var formatTextVN = /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/;
            if (ma.length < 1) {
                $('#UsernameValidateResul').text("Không có được bỏ trống ơ kìa?").show();
            }
            else if (ma.length < 6) {
                $('#UsernameValidateResul').text("Mã gồm có 6 số, nhớ nhập đủ 6 số").show();
            }
            else if (ma.length === 6) {
                if (ma.length < 1) {
                    $('#UsernameValidateResul').text("Không có được bỏ trống ơ kìa?").show();
                }
                else if (ma.length < 6) {
                    $('#UsernameValidateResul').text("Mã gồm có 6 số, nhớ nhập đủ 6 số").show();
                }
                else if (ma.length > 6) {
                    $('#UsernameValidateResul').text("Mã có 6 số mà nhập cái gì nhiều quá d?").show();
                }
                else if (ma.indexOf(' ') != -1) {
                    $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
                }
                else if (format.test(ma) === true) {
                    $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!").show();
                }
                else if (formatTextVN.test(ma) === true) {
                    $('#UsernameValidateResul').text("Mã là số, không có chữ cơ mà?").show();
                }
                else {
                    $('#UsernameValidateResul').text("").hide();
                }
            }
            else if (ma.length > 6) {
                $('#UsernameValidateResul').text("Mã có 6 số mà nhập cái gì nhiều quá d?").show();
            }
            else if (ma.indexOf(' ') !== -1) {
                $('#UsernameValidateResul').text("Bỏ khoảng trắng trước khi t đá dô cái đầu!").show();
            }
            else if (format.test(ma) === true) {
                $('#UsernameValidateResul').text("Bỏ ký tự đặc biệt hoặc bỏ mạng!").show();
            }
            else if (formatTextVN.test(ma) === true) {
                $('#UsernameValidateResul').text("Mã là số, không có chữ cơ mà?").show();
            }
        });
    }
});