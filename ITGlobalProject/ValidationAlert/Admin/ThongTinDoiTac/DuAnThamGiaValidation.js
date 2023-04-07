$(document).ready(function () {
    //Xóa đối tác
    $('#xoadoitac').on('click', function () {
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Bỏ Đối Tác?',
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
                }).then((xoadoitac) => {
                    if (xoadoitac) {
                        var id = $('#idpart').val();
                        var formData = new FormData();
                        formData.append('id', id);
                        $.ajax({
                            url: $('#requestPath').val() + "admins/thongtindoitac/xoadoitac",
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                            } else {
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Bạn đã xóa thành công.\nChọn xác nhận để quay về trang danh sách!", {
                                            icon: "success",
                                            buttons: {
                                                confirm: {
                                                    className: 'btn btn-success'
                                                }
                                            },
                                        }).then((xacnhan) => {
                                            window.location.href = $('#requestPath').val() + "admins/thongtindoitac/danhSachDoiTac";
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
    //Tìm kiếm
    $('#timkiemDuAn').on('input', function () {
        var formData = new FormData();
        formData.append('id', $('#idpart').val());
        formData.append('noidung', $(this).val());
        formData.append('trangthai', $('#trangthaiduan').val());
        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDuAn',
            data: formData,
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
            }
            else {
                $('#lstContentProject').replaceWith(ketqua);
            }
        });
    });

    //Trạng thái
    $('#trangthaiduan').on('change', function () {
        var formData = new FormData();
        formData.append('id', $('#idpart').val());
        formData.append('noidung', $('#timkiemDuAn').val());
        formData.append('trangthai', $(this).val());
        $.ajax({
            url: $('#requestPath').val() + 'Admins/ThongTinDoiTac/timKiemDuAn',
            data: formData,
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
            }
            else {
                $('#lstContentProject').replaceWith(ketqua);
            }
        });
    });
});