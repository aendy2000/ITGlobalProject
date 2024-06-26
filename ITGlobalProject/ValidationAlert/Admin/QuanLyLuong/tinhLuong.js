﻿$(document).ready(function () {
    //select Tháng
    $('#tinhluongthangs').on('change', function () {
        var thoigian = $(this).val();
        var formData = new FormData();
        formData.append('thoigian', thoigian);

        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/quanlyluong/tinhLuongPartial',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                $('#AjaxLoader').hide();
                window.location.href = $('#AjaxLoader').val() + 'admins/quanlytaikhoan/dangnhap';
            }
            else {
                $('#tinhLuongThangPartial').replaceWith(ketqua);
                $("#dataTableBasic").DataTable({
                    responsive: !0
                });
                $('#AjaxLoader').hide();
            }
        });
    });

    //check all
    $('#checkAlls').on('click', function () {
        $('#dataTableBasic').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]')
            .prop('checked', this.checked);
    });

    //btn tính lương
    $('#btntinhluong').on('click', function () {
        var lstId = "";
        var thang = $('#tinhluongthangs :selected').val();
        $('#dataTableBasic').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]:checked').each(function () {
                lstId += $(this).attr("name") + "-";
            });

        if (lstId.trim().length > 0) {
            var formData = new FormData();
            formData.append('thang', thang);
            formData.append('lstId', lstId.substring(0, lstId.length - 1));

            var checkexists = $('#datinhluong').val();
            if (checkexists == "chuatinh") {

                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal({
                            title: 'Tính Lương?',
                            text: "Xác nhận tính lương cho nhân viên tháng này?",
                            type: 'info',
                            icon: 'info',
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
                        }).then((tinhluong) => {
                            if (tinhluong) {
                                $('#AjaxLoader').show();
                                $.ajax({
                                    url: $('#requestPath').val() + 'Admins/quanlyluong/tinhluong',
                                    type: 'POST',
                                    dataType: 'html',
                                    contentType: false,
                                    processData: false,
                                    data: formData
                                }).done(function (ketqua) {
                                    $('#AjaxLoader').hide();
                                    if (ketqua == "DANGNHAP") {
                                        window.location.href = $('#requestPath').val() + 'quanlytaikhoan/dangxuat';
                                    }
                                    else if (ketqua == "Erorr") {
                                        var SweetAlert2Demo = function () {
                                            var initDemos = function () {
                                                swal("Thông báo!", "Đã có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại sau ít phút!", {
                                                    icon: "erorr",
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
                                    } else {
                                        var SweetAlert2Demo = function () {
                                            var initDemos = function () {
                                                swal("Thành Công!", "Bạn đã tính lương tháng thành công.", {
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
                            title: 'Tính Lại Lương?',
                            text: "Bảng lương mới sẽ được ghi đè lên bảng lương cũ, toàn bộ dữ liệu cũ sẽ không thể hoàn tác! Vẫn tiếp tục?"
                                + "\n\n(Hãy xuất bảng lương cũ trước khi thực hiện tính lại lương mới!)",
                            type: 'info',
                            icon: 'info',
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
                        }).then((tinhluong) => {
                            if (tinhluong) {
                                $('#AjaxLoader').show();
                                $.ajax({
                                    url: $('#requestPath').val() + 'Admins/quanlyluong/tinhluong',
                                    type: 'POST',
                                    dataType: 'html',
                                    contentType: false,
                                    processData: false,
                                    data: formData
                                }).done(function (ketqua) {
                                    $('#AjaxLoader').hide();

                                    if (ketqua == "DANGNHAP") {
                                        window.location.href = $('#requestPath').val() + 'quanlytaikhoan/dangxuat';
                                    }
                                    else if (ketqua == "Erorr") {
                                        var SweetAlert2Demo = function () {
                                            var initDemos = function () {
                                                swal("Thông báo!", "Đã có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại sau ít phút!", {
                                                    icon: "danger",
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
                                    } else {
                                        var SweetAlert2Demo = function () {
                                            var initDemos = function () {
                                                swal("Thành Công!", "Bạn đã tính lương tháng thành công.", {
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
        }
    });
});