$(document).ready(function () {
    $('#khoataikhoan').on('click', function (e) {
        let name = $('#khoataikhoan').text();
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                if (name.trim() === "KHÓA TÀI KHOẢN") {
                    swal({
                        title: 'Khóa Tài Khoản?',
                        text: "Xác nhận khóa tài khoản?",
                        type: 'warning',
                        buttons: {
                            cancel: {
                                visible: true,
                                text: ' Hủy Bỏ ',
                                className: 'btn btn-danger'
                            },
                            confirm: {
                                text: 'Xác Nhận',
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
                                    $('#CheckorX').replaceWith('<i id="CheckorX" style="font-size: 22px" class="fe fe-x-circle text-danger" data-bs-toggle="tooltip" data-placement="top" title="Đã ngưng làm"></i>');

                                    if ($('[data-bs-toggle="tooltip"]').length) [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (e) {
                                        return new bootstrap.Tooltip(e)
                                    }));

                                    $.when(
                                        $.getScript($('#reloadScriptLock').val()),
                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                        //place your code here, the scripts are all loaded
                                    });
                                    swal("Đã khóa tài khoản!", {
                                        icon: "success",
                                        buttons: {
                                            confirm: {
                                                className: 'btn btn-success'
                                            }
                                        }
                                    });
                                }
                                else if (ketqua === "DANHSACH") {
                                    window.location.href($('#actionDanhsach').data('request-url'));
                                }
                                else {
                                    $('#khoataikhoan').replaceWith('<a id="khoataikhoan" style="width:100%" class="btn btn-outline-danger btn-sm">KHÓA TÀI KHOẢN <i class="mdi mdi-lock "></i></a>');
                                    $('#CheckorX').replaceWith('<i id="CheckorX" class="mdi mdi-check-circle-outline text-success" data-bs-toggle="tooltip" data-placement="top" title="Hoạt động"></i>');
                                    if ($('[data-bs-toggle="tooltip"]').length) [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (e) {
                                        return new bootstrap.Tooltip(e)
                                    }));
                                    $.when(
                                        $.getScript($('#reloadScriptLock').val()),
                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                        //place your code here, the scripts are all loaded
                                    });
                                    swal("Đã mở khóa tài khoản! Từ bây giờ Tài khoản đã có thể truy cập vào hệ thống!", {
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
                }
                else {
                    swal({
                        title: 'Mở Khóa?',
                        text: "Xác nhận mở khóa tài khoản?",
                        type: 'warning',
                        buttons: {
                            cancel: {
                                visible: true,
                                text: ' Hủy Bỏ ',
                                className: 'btn btn-danger'
                            },
                            confirm: {
                                text: 'Xác Nhận',
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
                                    $('#CheckorX').replaceWith('<i id="CheckorX" style="font-size: 22px" class="fe fe-x-circle text-danger" data-bs-toggle="tooltip" data-placement="top" title="Đã ngưng làm"></i>');
                                    if ($('[data-bs-toggle="tooltip"]').length) [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (e) {
                                        return new bootstrap.Tooltip(e)
                                    }));
                                    $.when(
                                        $.getScript($('#reloadScriptLock').val()),
                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                        //place your code here, the scripts are all loaded
                                    });
                                    swal("Đã khóa tài khoản!", {
                                        icon: "success",
                                        buttons: {
                                            confirm: {
                                                className: 'btn btn-success'
                                            }
                                        }
                                    });
                                }
                                else if (ketqua === "DANHSACH") {
                                    window.location.href($('#actionDanhsach').data('request-url'));
                                }
                                else {
                                    $('#khoataikhoan').replaceWith('<a id="khoataikhoan" style="width:100%" class="btn btn-outline-danger btn-sm">KHÓA TÀI KHOẢN <i class="mdi mdi-lock "></i></a>');
                                    $('#CheckorX').replaceWith('<i id="CheckorX" class="mdi mdi-check-circle-outline text-success" data-bs-toggle="tooltip" data-placement="top" title="Hoạt động"></i>');
                                    if ($('[data-bs-toggle="tooltip"]').length) [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (e) {
                                        return new bootstrap.Tooltip(e)
                                    }));
                                    $.when(
                                        $.getScript($('#reloadScriptLock').val()),
                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                        //place your code here, the scripts are all loaded
                                    });
                                    swal("Đã mở khóa tài khoản!", {
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
                }
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