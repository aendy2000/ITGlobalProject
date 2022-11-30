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
        $('#AjaxLoader').show(); 
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
            $('#AjaxLoader').hide();
        });
    });

    $('#xacNhan').on('click', function (e) {
        e.preventDefault();
        let ma = $('#maXacThuc').val();
        var format = /[`!#$%^&*()+\-=\[\]{}._@@;':"\\|,<>\/?~]/;
        var formatTextVN = /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/;
        let checkMa = false;
        if (ma.length < 1) {
            checkMa = false;
            $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (ma.length < 6) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        }
        else if (ma.length > 6) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        }
        else if (ma.indexOf(' ') != -1) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        }
        else if (format.test(ma) == true) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        }
        else if (formatTextVN.test(ma) == true) {
            checkMa = false;
            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        } else {
            checkMa = true;
            $('#UsernameValidateResul').text("").hide();

        }

        if (checkMa === true) {
            $('#AjaxLoader').show();  
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
                    $('#AjaxLoader').hide();
                    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
                }
                else if (ketqua === "HETHANMA") {
                    $('#AjaxLoader').hide(); 
                    swal("Thông Báo!", "Mã của bạn đã quá hạn, chúng tôi sẽ gửi cho bạn một mã mới!", {
                        icon: "error",
                        buttons: {
                            confirm: {
                                className: 'btn btn-danger'
                            }
                        },
                    }).then(function () {
                        $('#AjaxLoader').show();  
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
                            $('#AjaxLoader').hide();  
                        });
                    });

                }
                else if (ketqua === "SUCCESS") {
                    window.location.href = $('#actionSuccess').data('request-url');
                    $('#AjaxLoader').hide();  
                }
                else if (ketqua === "DANGNHAP") {
                    window.location.href = $('#actionFailed').data('request - url');
                    $('#AjaxLoader').hide();  
                }
            });
        }

    });

    validates();
    function validates() {
        //e.preventDefault();
        //let ma = $('#maXacThuc').val();
        //var format = /[`!#$%^&*()+\-=\[\]{}._@@;':"\\|,<>\/?~]/;
        //var formatTextVN = /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/;
        //let checkMa = false;
        //if (ma.length < 1) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        //}
        //else if (ma.length < 6) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //}
        //else if (ma.length === 6) {
        //    if (ma.length < 1) {
        //        checkMa = false;
        //        $('#UsernameValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        //    }
        //    else {
        //        checkMa = true;
        //        $('#UsernameValidateResul').text("").hide();
        //    }
        //}
        //else if (ma.length > 6) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //}
        //else if (ma.indexOf(' ') !== -1) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //}
        //else if (format.test(ma) === true) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //}
        //else if (formatTextVN.test(ma) === true) {
        //    checkMa = false;
        //    $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //}

        //if (checkMa === true) {
        //    $('#AjaxLoader').show();
        //    e.preventDefault();
        //    let valuema = $('#maXacThuc').val();
        //    let emails = $('#emailNe').val();
        //    let urls = $('#actionGuima').data('request-url');
        //    $.ajax({
        //        url: urls,
        //        type: 'POST',
        //        dataType: 'html',
        //        data: { ma: valuema, email: emails }
        //    }).done(function (ketqua) {
        //        if (ketqua === "SAIMA") {
        //            $('#AjaxLoader').hide();
        //            $('#UsernameValidateResul').text("Mã xác nhận chưa đúng! Vui lòng kiểm tra lại.").show();
        //        }
        //        else if (ketqua === "HETHANMA") {
        //            $('#AjaxLoader').hide();
        //            swal("Thông Báo!", "Mã của bạn đã quá hạn, chúng tôi sẽ gửi cho bạn một mã mới!", {
        //                icon: "error",
        //                buttons: {
        //                    confirm: {
        //                        className: 'btn btn-danger'
        //                    }
        //                },
        //            }).then(function () {
        //                $('#AjaxLoader').show();
        //                e.preventDefault();
        //                var emails = $('#emailNe').val();
        //                let urls = $('#actionDatLaiMatKhau').data('request-url');
        //                $.ajax({
        //                    url: urls,
        //                    type: 'POST',
        //                    dataType: 'html',
        //                    data: { email: emails }
        //                }).done(function (ketqua) {
        //                    window.location.href = $('#actionDatLaiMatKhauSuccess').data('request-url');
        //                    $('#AjaxLoader').hide();
        //                });
        //            });

        //        }
        //        else if (ketqua === "SUCCESS") {
        //            window.location.href = $('#actionSuccess').data('request-url');
        //            $('#AjaxLoader').hide();
        //        }
        //        else if (ketqua === "DANGNHAP") {
        //            window.location.href = $('#actionFailed').data('request - url');
        //            $('#AjaxLoader').hide();
        //        }
        //    });
        //}
    }
});