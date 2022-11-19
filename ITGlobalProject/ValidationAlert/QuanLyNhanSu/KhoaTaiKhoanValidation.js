$(document).ready(function () {
    $('#khoataikhoan').on('click', function (e) {
        let name = $('#khoataikhoan').text();
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: name + '?',
                    text: "Tài khoản sẽ bị khóa và không thể truy cập vào hệ thống!",
                    type: 'warning',
                    buttons: {
                        cancel: {
                            visible: true,
                            text: 'Hủy bỏ',
                            className: 'btn btn-danger'
                        },
                        confirm: {
                            text: 'Đồng ý',
                            className: 'btn btn-success'
                        }
                    }
                }).then((khoataikhoans) => {
                    if (khoataikhoans) {
                        let ids = $('#idus').val();
                        let urls = $('#actionKhoaTaiKhoan').data('request-url');
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            data: { id: ids }
                        }).done(function (ketqua) {
                            if (ketqua === "DAKHOA") {
                                $('#khoataikhoan').replaceWith('<a id="khoataikhoan" style="width:100%" class="btn btn-outline-success btn-sm">MỞ KHÓA TÀI KHOẢN <i class="mdi mdi-lock "></i></a>');
                                $.when(
                                    $.getScript("/ValidationAlert/QuanLyNhanSu/KhoaTaiKhoanValidation.js"),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                    //place your code here, the scripts are all loaded
                                });
                                swal("Đã khóa tài khoản, chọn mở tài khoản để mở lại tài khoản này!", {
                                    icon: "success",
                                    buttons: {
                                        confirm: {
                                            className: 'btn btn-success'
                                        }
                                    }
                                });
                            }
                            else if (ketqua === "DANHSACH")
                            {
                                window.location.href($('#actionDanhsach').data('request-url'));
                            }
                            else {
                                $('#khoataikhoan').replaceWith('<a id="khoataikhoan" style="width:100%" class="btn btn-outline-danger btn-sm">KHÓA TÀI KHOẢN <i class="mdi mdi-lock "></i></a>');
                                $.when(
                                    $.getScript("/ValidationAlert/QuanLyNhanSu/KhoaTaiKhoanValidation.js"),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                    //place your code here, the scripts are all loaded
                                });
                                swal("Đã mở khóa tài khoản, tài khoản có thể truy cập vào hệ thống từ bây giờ!", {
                                    icon: "success",
                                    buttons: {
                                        confirm: {
                                            className: 'btn btn-success'
                                        }
                                    }
                                });
                            }
                        });
                    }
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
    });
});