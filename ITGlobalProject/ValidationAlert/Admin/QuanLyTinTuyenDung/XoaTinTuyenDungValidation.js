$(document).ready(function (e) {

    //Xóa từ danh sách
    $('[id^="xoatintuyendung"]').on('click', function (e) {
        var name = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Bài Viết?',
                    text: "Chắc chắn muốn xóa chứ?",
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
                }).then((xoabaiviet) => {
                    if (xoabaiviet) {
                        var formData = new FormData();
                        formData.append('id', name);
                        formData.append('active', "danhSachTinTuyenDung");

                        $('#AjaxLoader').show();
                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/XoaTinTuyenDung',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANHSACH") {
                                window.location.href = $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung';
                            } else {
                                $('#pageContentsssss').replaceWith(ketqua);
                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                });
                                $('#AjaxLoader').hide();
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Tuyệt quá! Bài viết đã được xóa thành công.", {
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
    });

    //Xóa từ trang chi tiết
    $('#xoatin').on('click', function (e) {
        var name = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Bài Viết?',
                    text: "Chắc chắn muốn xóa chứ?",
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
                }).then((xoabaiviet) => {
                    if (xoabaiviet) {
                        var formData = new FormData();
                        formData.append('id', name);
                        formData.append('active', "chinhsua");

                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/XoaTinTuyenDung',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANHSACH") {
                                window.location.href = $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung';
                            } else {
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Tuyệt quá! Bài viết đã được xóa thành công.", {
                                            icon: "success",
                                            buttons: {
                                                confirm: {
                                                    className: 'btn btn-success'
                                                }
                                            },
                                        }).then((xacnhan) => {
                                            if (xacnhan) {
                                                window.location.href = $('#requestPath').val() + "Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung";
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