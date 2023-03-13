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
        var id = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Duyệt Đơn?',
                    text: "Đồng ý chấp nhận đơn nghỉ phép này?",
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
                }).then((dongy) => {
                    if (dongy) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('truluong', $('#truluong-' + id).prop("checked"));
                        formData.append('typeTab', $('#typeTab').val());
                        var urls = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/duyetDon"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/danhSachDonNghiPhep";
                            } else {
                                $('#tabContentsss').replaceWith(ketqua);
                                $("#dataTableBasic").DataTable({
                                    responsive: !0
                                });
                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                });
                                var content = {};
                                content.message = 'Đã duyệt đơn nghỉ phép!';
                                content.title = 'Thành công!';
                                content.icon = 'nav-icon fe fe-bell me-2';

                                $.notify(content, {
                                    type: "success",
                                    placement: {
                                        from: "bottom",
                                        align: "right"
                                    },
                                    time: 1000,
                                    delay: 1000,
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
    $('[id^="tuchoi"]').on('click', function (e) {
        var id = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Từ Chối?',
                    text: "Từ chối đơn nghỉ phép này?",
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
                }).then((dongy) => {
                    if (dongy) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('truluong', $('#truluong-' + id).prop("checked"));
                        formData.append('typeTab', $('#typeTab').val());

                        var urls = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/tuChoiDon"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/danhSachDonNghiPhep";
                            } else {
                                $('#tabContentsss').replaceWith(ketqua);
                                $("#dataTableBasic").DataTable({
                                    responsive: !0
                                });
                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                });
                                var content = {};
                                content.message = 'Đã từ chối đơn nghỉ phép!';
                                content.title = 'Thành công!';
                                content.icon = 'nav-icon fe fe-bell me-2';

                                $.notify(content, {
                                    type: "success",
                                    placement: {
                                        from: "bottom",
                                        align: "right"
                                    },
                                    time: 1000,
                                    delay: 1000,
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
    $('[id^="thaydoi"]').on('click', function (e) {
        var id = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Lưu thay đổi?',
                    text: "Lưu thay đổi phản hồi đơn nghỉ phép này?",
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
                }).then((dongy) => {
                    if (dongy) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('truluong', $('#truluong-' + id).prop("checked"));
                        formData.append('typeTab', $('#typeTab').val());

                        var urls = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/thaydoi"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyDonNghiPhep/danhSachDonNghiPhep";
                            } else {
                                $('#tabContentsss').replaceWith(ketqua);
                                $("#dataTableBasic").DataTable({
                                    responsive: !0
                                });
                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () {
                                });
                                var content = {};
                                content.message = 'Đã lưu thay đổi thông tin phản hồi đơn nghỉ phép!';
                                content.title = 'Thành công!';
                                content.icon = 'nav-icon fe fe-bell me-2';

                                $.notify(content, {
                                    type: "success",
                                    placement: {
                                        from: "bottom",
                                        align: "right"
                                    },
                                    time: 1000,
                                    delay: 1000,
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