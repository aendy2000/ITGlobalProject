﻿$(document).ready(function () {
   
    //xóa thành viên
    $('[id^="xoaThanhViens"]').on('click', function (e) {
        var idemp = $(this).attr("name");
        var idpro = $('#idpro').val();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Loại bỏ?',
                    text: "Bạn có chắc muốn loại bỏ thành viên này khỏi dự án?",
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
                }).then((themthanhvien) => {
                    if (themthanhvien) {
                        var formData = new FormData();
                        formData.append('idemp', idemp);
                        formData.append('idpro', idpro);

                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/xoaThanhVien',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANHSACH") {
                                window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/danhSachDuAn';
                            } else {
                                $('#chiTietDuAnPartialID').replaceWith(ketqua);

                                var content = {};
                                content.message = 'Bạn đã loại bỏ thành viên thành công.';
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

                                $.when(
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js"),
                                    $.getScript($('#requestPath').val() + "Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js"),

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