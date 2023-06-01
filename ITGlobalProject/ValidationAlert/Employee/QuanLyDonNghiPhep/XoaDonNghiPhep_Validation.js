$(document).ready(function () {
    $('[id^="xoa"]').on('click', function () {
        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('idleave', id);

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Đơn Nghỉ Phép?',
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
                }).then((xoadon) => {
                    if (xoadon) {
                        $.ajax({
                            url: $('#requestPath').val() + "employee/quanlydonnghiphep/xoaDon",
                            data: formData,
                            type: "post",
                            dataType: "html",
                            processData: false,
                            contentType: false

                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                            }
                            else {
                                $('#tabContentsss').replaceWith(ketqua);
                                $('#loainghiphep').selectpicker('val', '');
                                $('#quantityleavetype').text('0 ngày');

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
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Đã xóa một đơn xin nghỉ phép!", {
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
});