$(document).ready(function (e) {

    //Xóa từ trang chi tiết
    $('#doitrangthai').on('click', function (e) {
        var name = $(this).attr("name");

        if ($(this).text().trim() == "Ngừng Đăng Tin") {
            var SweetAlert2Demo = function () {
                var initDemos = function () {
                    swal({
                        title: 'Ngừng Đăng Tin?',
                        text: "Chắc chắn muốn hủy bỏ công khai tin tuyển dụng này?",
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
                    }).then((ngungdangbaiviet) => {
                        if (ngungdangbaiviet) {
                            var formData = new FormData();
                            formData.append('id', name);
                            formData.append('active', false);

                            $.ajax({
                                url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/NgungDangTinTuyenDung',
                                type: 'POST',
                                dataType: 'html',
                                contentType: false,
                                processData: false,
                                data: formData
                            }).done(function (ketqua) {
                                if (ketqua === "DANHSACH") {
                                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung';
                                } else {
                                    $('#doitrangthai').replaceWith(
                                        '<a id="doitrangthai" name="' + name + '" class="btn btn-primary me-2" style="width:230px" role="button">'
                                        + '<i class="fe fe-check-square"></i>&ensp;Đăng Bài Viết</a>'
                                    );
                                    $.when(
                                        $.getScript($('#requestPath').val() + "ValidationAlert/Admin/QuanLyTinTuyenDung/DangVaHuyDangBaiVietValidation.js"),

                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                    });
                                    var SweetAlert2Demo = function () {
                                        var initDemos = function () {
                                            swal("Thành Công!", "Tuyệt quá! Bài viết đã được ngừng đăng tuyển công khai.", {
                                                icon: "success",
                                                buttons: {
                                                    confirm: {
                                                        className: 'btn btn-success'
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
        }
        else {
            var SweetAlert2Demo = function () {
                var initDemos = function () {
                    swal({
                        title: 'Đăng Bài Viết?',
                        text: "Chắc chắn muốn đăng bài viết này?",
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
                    }).then((dangbaiviet) => {
                        if (dangbaiviet) {
                            var formData = new FormData();
                            formData.append('id', name);
                            formData.append('active', true);

                            $.ajax({
                                url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/NgungDangTinTuyenDung',
                                type: 'POST',
                                dataType: 'html',
                                contentType: false,
                                processData: false,
                                data: formData
                            }).done(function (ketqua) {
                                
                                if (ketqua === "DANHSACH") {
                                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung';
                                } else {
                                    $('#doitrangthai').replaceWith(
                                        '<a id="doitrangthai" name="' + name + '" class="btn btn-warning me-2" style="width:230px" role="button">'
                                        + '<i class="fe fe-slash"></i>&ensp;Ngừng Đăng Tin</a>'
                                    );

                                    $.when(
                                        $.getScript($('#requestPath').val() + "ValidationAlert/Admin/QuanLyTinTuyenDung/DangVaHuyDangBaiVietValidation.js"),

                                        $.Deferred(function (deferred) {
                                            $(deferred.resolve);
                                        })
                                    ).done(function () {
                                    });

                                    var SweetAlert2Demo = function () {
                                        var initDemos = function () {
                                            swal("Thành Công!", "Tuyệt quá! Bài viết đã được đăng công khai.", {
                                                icon: "success",
                                                buttons: {
                                                    confirm: {
                                                        className: 'btn btn-success'
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
        }
        
    });

});