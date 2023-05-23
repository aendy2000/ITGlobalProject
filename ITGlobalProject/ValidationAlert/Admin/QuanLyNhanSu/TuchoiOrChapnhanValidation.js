$(document).ready(function () {
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
                        formData.append('idemp', $('#choduyetTab').attr("name"));
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('typeTab', $('#typeTab').val());
                        var urls = $('#requestPath').val() + "Admins/QuanLyNhanSu/duyetDon"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyTaiKhoan/DangNhap";
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
                                content.message = 'Bạn đã duyệt đơn thành công.';
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
                        formData.append('idemp', $('#choduyetTab').attr("name"));
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('typeTab', $('#typeTab').val());

                        var urls = $('#requestPath').val() + "Admins/QuanLyNhanSu/tuChoiDon"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyTaiKhoan/DangNhap";
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
                                content.message = 'Bạn đã từ chối đơn thành công.';
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
                        formData.append('idemp', $('#choduyetTab').attr("name"));
                        formData.append('noidung', $('#noidung-' + id).val().trim());
                        formData.append('typeTab', $('#typeTab').val());

                        var urls = $('#requestPath').val() + "Admins/QuanLyNhanSu/thaydoi"
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyTaiKhoan/dangnhap";
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
                                content.message = 'Bạn đã lưu thông tin phản hồi thành công.';
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