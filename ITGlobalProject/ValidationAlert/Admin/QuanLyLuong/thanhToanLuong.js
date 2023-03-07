$(document).ready(function () {

    //Thanh toán
    $('#btnthanhtoan').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Hoàn Tất Thanh Toán?',
                    text: "Xác lương đã được thanh toán cho Nhân viên?",
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
                }).then((thanhtoan) => {
                    if (thanhtoan) {
                        $('#AjaxLoader').show();
                        $.ajax({
                            url: $("#requestPath").val() + 'Admins/quanlyluong/thanhtoanluong',
                            data: formData,
                            dataType: 'html',
                            type: 'POST',
                            contentType: false,
                            processData: false
                        }).done(function (ketqua) {
                            $('#AjaxLoader').hide();
                            $('#modalchitietluong').replaceWith(ketqua);
                            $('#tdTrangThai-' + id).empty().append('<span style="width:110px" class="badge text-success bg-light-success ">Đã thanh toán</span>');

                            var soluongdanhanluong = Number($('#IDdaNhanLuong').val()) + 1;
                            $('#daNhanLuong').empty().append(soluongdanhanluong);
                            $('#IDdaNhanLuong').val(soluongdanhanluong);

                            var soluongchuanhanluong = Number($('#IDchuaNhanLuong').val()) - 1;
                            $('#chuaNhanLuong').empty().append(soluongchuanhanluong);
                            $('#IDchuaNhanLuong').val(soluongchuanhanluong);

                            var canthanhtoan = Number($('#DataCanthanhtoan').val()) - Number($('#mucthanhtoan-' + id).val());
                            $('#IDCanthanhtoan').empty().append(canthanhtoan.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                            $('#DataCanthanhtoan').val(canthanhtoan);

                            var SweetAlert2Demo = function () {
                                var initDemos = function () {
                                    swal("Thông báo!", "Thành công! Đã lưu trạng thái lương thành đã thanh toán!", {
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

    //Hủy thanh toán
    $('#btnhuythanhtoan').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append("id", id);

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Hủy Thanh Toán?',
                    text: "Xác nhận để đặt trạng thái bảng lương này thành chưa thanh toán!",
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
                }).then((huythanhtoan) => {
                    if (huythanhtoan) {
                        $('#AjaxLoader').show();
                        $.ajax({
                            url: $("#requestPath").val() + 'Admins/quanlyluong/thanhtoanluong',
                            data: formData,
                            dataType: 'html',
                            type: 'POST',
                            contentType: false,
                            processData: false
                        }).done(function (ketqua) {
                            if (ketqua == "DANGNHAP") {
                                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                            }
                            else {
                                $('#AjaxLoader').hide();
                                $('#modalchitietluong').replaceWith(ketqua);
                                $('#tdTrangThai-' + id).empty().append('<span style="width:110px" class="badge text-danger bg-light-danger ">Chưa thanh toán</span>');

                                var soluongdanhanluong = Number($('#IDdaNhanLuong').val()) - 1;
                                $('#daNhanLuong').empty().append(soluongdanhanluong);
                                $('#IDdaNhanLuong').val(soluongdanhanluong);

                                var soluongchuanhanluong = Number($('#IDchuaNhanLuong').val()) + 1;
                                $('#chuaNhanLuong').empty().append(soluongchuanhanluong);
                                $('#IDchuaNhanLuong').val(soluongchuanhanluong);

                                var canthanhtoan = Number($('#DataCanthanhtoan').val()) + Number($('#mucthanhtoan-' + id).val());
                                $('#IDCanthanhtoan').empty().append(canthanhtoan.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                                $('#DataCanthanhtoan').val(canthanhtoan);

                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thông báo!", "Thành công! Đã lưu trạng thái lương thành chưa thanh toán!", {
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