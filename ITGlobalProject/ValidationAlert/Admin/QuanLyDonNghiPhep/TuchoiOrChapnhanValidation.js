$(document).ready(function () {
   // Xoá chưa liên hệ
    //$('[id^="xoabo"]').on('click', function (e) {
    //    var name = $(this).attr("name");
    //    var SweetAlert2Demo = function () {
    //        var initDemos = function () {
    //            swal({
    //                title: 'Bỏ Liên Hệ Này?',
    //                text: "Bạn có chắc muốn xóa Liên hệ này này?",
    //                type: 'warning',
    //                buttons: {
    //                    cancel: {
    //                        visible: true,
    //                        text: ' Hủy Bỏ ',
    //                        className: 'btn btn-danger'
    //                    },
    //                    confirm: {
    //                        text: 'Xác Nhận',
    //                        className: 'btn btn-success'
    //                    }
    //                }
    //            }).then((xoavaitro) => {
    //                if (xoavaitro) {
    //                    var formData = new FormData();
    //                    formData.append('id', name);
    //                    formData.append('state', false);
    //                    var urls = $('#requestPath').val() + "Admins/LienHeTuVan/XoaLienHe"
    //                    $.ajax({
    //                        url: urls,
    //                        type: 'POST',
    //                        dataType: 'html',
    //                        contentType: false,
    //                        processData: false,
    //                        data: formData
    //                    }).done(function (ketqua) {
    //                        if (ketqua === "DANHSACH") {
    //                            window.location.href = $('#requestPath').val() + "Admins/LienHeTuVan/thongTinLienHeTuVan";
    //                        } else {
    //                            $('#tabContent').replaceWith(ketqua);
    //                            var SweetAlert2Demo = function () {
    //                                var initDemos = function () {
    //                                    swal("Thành Công!", "Đã xóa một liên hệ!", {
    //                                        icon: "success",
    //                                        buttons: {
    //                                            confirm: {
    //                                                className: 'btn btn-success'
    //                                            }
    //                                        },
    //                                    });
    //                                };
    //                                return {
    //                                    init: function () {
    //                                        initDemos();
    //                                    },
    //                                };
    //                            }();

    //                            jQuery(document).ready(function () {
    //                                SweetAlert2Demo.init();
    //                            });

    //                            $.when(
    //                                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
    //                                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

    //                                $.Deferred(function (deferred) {
    //                                    $(deferred.resolve);
    //                                })
    //                            ).done(function () {
    //                            });
    //                        }
    //                    });
    //                }
    //            });
    //        };
    //        return {
    //            init: function () {
    //                initDemos();
    //            },
    //        };
    //    }();

    //    jQuery(document).ready(function () {
    //        SweetAlert2Demo.init();
    //    });
    //});

    //Xoá đã liên hệ
    //$('[id^="DaLienHexoabo"]').on('click', function (e) {
    //    var name = $(this).attr("name");
    //    var SweetAlert2Demo = function () {
    //        var initDemos = function () {
    //            swal({
    //                title: 'Bỏ Liên Hệ Này?',
    //                text: "Bạn có chắc muốn xóa Liên hệ này này?",
    //                type: 'warning',
    //                buttons: {
    //                    cancel: {
    //                        visible: true,
    //                        text: ' Hủy Bỏ ',
    //                        className: 'btn btn-danger'
    //                    },
    //                    confirm: {
    //                        text: 'Xác Nhận',
    //                        className: 'btn btn-success'
    //                    }
    //                }
    //            }).then((xoavaitro) => {
    //                if (xoavaitro) {
    //                    var formData = new FormData();
    //                    formData.append('id', name);
    //                    formData.append('state', true);
    //                    var urls = $('#requestPath').val() + "Admins/LienHeTuVan/XoaLienHe"
    //                    $.ajax({
    //                        url: urls,
    //                        type: 'POST',
    //                        dataType: 'html',
    //                        contentType: false,
    //                        processData: false,
    //                        data: formData
    //                    }).done(function (ketqua) {
    //                        if (ketqua === "DANHSACH") {
    //                            window.location.href = $('#requestPath').val() + "Admins/LienHeTuVan/thongTinLienHeTuVan";
    //                        } else {
    //                            $('#tabContent').replaceWith(ketqua);
    //                            var SweetAlert2Demo = function () {
    //                                var initDemos = function () {
    //                                    swal("Thành Công!", "Đã xóa một liên hệ!", {
    //                                        icon: "success",
    //                                        buttons: {
    //                                            confirm: {
    //                                                className: 'btn btn-success'
    //                                            }
    //                                        },
    //                                    });
    //                                };
    //                                return {
    //                                    init: function () {
    //                                        initDemos();
    //                                    },
    //                                };
    //                            }();

    //                            jQuery(document).ready(function () {
    //                                SweetAlert2Demo.init();
    //                            });

    //                            $.when(
    //                                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
    //                                $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

    //                                $.Deferred(function (deferred) {
    //                                    $(deferred.resolve);
    //                                })
    //                            ).done(function () {
    //                            });
    //                        }
    //                    });
    //                }
    //            });
    //        };
    //        return {
    //            init: function () {
    //                initDemos();
    //            },
    //        };
    //    }();

    //    jQuery(document).ready(function () {
    //        SweetAlert2Demo.init();
    //    });
    //});


    //Xác nhận 
    $('[id^="xacnhan"]').on('click', function (e) {
        var name = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xác Nhận?',
                    text: "Đã hoàn tất cho nghỉ phép?",
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
                }).then((xoavaitro) => {
                    if (xoavaitro) {
                        var formData = new FormData();
                        formData.append('id', name);
                        var urls = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/DuocDuyetNghiPhep"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANHSACH") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/danhSachDonNghiPhep";
                            } else {
                                $('#tabContent').replaceWith(ketqua);
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Đã hoàn thành cho nghỉ phép!", {
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

                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
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