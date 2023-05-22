$(document).ready(function (e) {
    //Xem chi tiết
    $('[id^="xemchitiet-"]').on('click', function () {
        var id = $(this).attr('name');
        var year = $('#namnghiphep :selected').val();
        var formData = new FormData();


        formData.append('id', id);
        formData.append('year', year);

        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyLoaiNghiPhep/XemChiTietApplyNghiPhep',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#partialChiTiet').replaceWith(ketqua);
            $('#DataTableChiTietApply').DataTable();
            $('#AjaxLoader').hide();
            $('#chiTietApplyNghiPhepNhanVien').modal('toggle');
        });
    });

    $('#tatBangChiTiet').on('click', function () {
        $('#chiTietApplyNghiPhepNhanVien').modal('toggle');
        $('#partialChiTiet').replaceWith('<div id="partialChiTiet" class="modal-dialog modal-dialog-centered" role="document"></div>');
    });

    //Chọn năm
    $('#namnghiphep').on('change', function () {
        var year = $(this).val();
        var formData = new FormData();
        formData.append('year', year);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyLoaiNghiPhep/ChonNam',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#ContentsPartial').replaceWith(ketqua);
            $('#namnghiphep').selectpicker();
            $('#loainghiphep').selectpicker();
            $('#dataTableBasic').DataTable();
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
    $('#btnluuthongtinapdung').on('click', function () {
        $('#namnghiphepvalidation').prop('hidden', true);
        $('#loainghiphepvalidation').prop('hidden', true);
        $('#songayhuongvalidation').prop('hidden', true);

        var lstId = "";
        var loai = $('#loainghiphep :selected').val();
        var nam = $('#namnghiphep :selected').val();
        var ngayhuong = $('#songayhuong').val();

        var check = true;
        //Loại
        if (loai.length < 1) {
            check = false;
            $('#loainghiphepvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        //Năm
        if (nam.length < 1) {
            check = false;
            $('#namnghiphepvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        //Validation ngày hưởng
        if (ngayhuong.length < 1) {
            check = false;
            $('#songayhuongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (ngayhuong.indexOf('-') != -1) {
            check = false;
            $('#songayhuongvalidation').text("Số ngày nghỉ phải lớn hơn 0 và không quá 365.").prop('hidden', false);
        }
        else if (Number(ngayhuong) < 1) {
            check = false;
            $('#songayhuongvalidation').text("Số ngày nghỉ phải lớn hơn 0 và không quá 365.").prop('hidden', false);
        }
        else if (Number(ngayhuong) > 365) {
            check = false;
            $('#songayhuongvalidation').text("Số ngày nghỉ phải lớn hơn 0 và không quá 365.").prop('hidden', false);
        }

        //Kiểm tra đúng
        if (check == true) {

            $('#dataTableBasic').DataTable()
                .column(0)
                .nodes()
                .to$()
                .find('input[type=checkbox]:checked').each(function () {
                    lstId += $(this).attr("name") + "-";
                });

            if (lstId.trim().length > 0) {
                var formData = new FormData();
                formData.append('loai', loai);
                formData.append('nam', nam);
                formData.append('lstId', lstId.substring(0, lstId.length - 1));
                formData.append('ngayhuong', ngayhuong.replace(/,/g, '.'));

                $.ajax({
                    url: $('#requestPath').val() + 'Admins/QuanLyLoaiNghiPhep/kiemTraApplyNgayNghiPhep',
                    type: 'POST',
                    dataType: 'html',
                    contentType: false,
                    processData: false,
                    data: formData
                }).done(function (kiemtra) {
                    if (kiemtra == "Already") {

                        var SweetAlert2Demo = function () {
                            var initDemos = function () {
                                swal({
                                    title: 'Áp Dụng?',
                                    text: "Xác nhận áp dụng lọai nghỉ phép cho nhân viên năm này?",
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
                                }).then((xacnhan) => {
                                    if (xacnhan) {
                                        $('#AjaxLoader').show();
                                        $.ajax({
                                            url: $('#requestPath').val() + 'Admins/QuanLyLoaiNghiPhep/ApplyNgayNghiPhep',
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
                                                                    className: 'btn btn-danger'
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
                                                $('#ContentsPartial').replaceWith(ketqua);
                                                $('#namnghiphep').selectpicker();
                                                $('#loainghiphep').selectpicker();
                                                $('#dataTableBasic').DataTable();
                                                var SweetAlert2Demo = function () {
                                                    var initDemos = function () {
                                                        swal("Thành Công!", "Đã áp dụng loại nghỉ phép cho nhân viên được chỉ định.", {
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
                    else if (kiemtra.indexOf("OnlyExits~") != -1) {

                        var data = kiemtra.split('~')[1];
                        var result = "Loại nghỉ phép này đã được áp dụng cho các nhân viên:\n\n";
                        var lstdata = data.split('#');
                        for (var i = 0; i < lstdata.length; i++) {
                            result += lstdata[i] + "\n";
                        }

                        result += "\nChọn xác nhận để ghi đè dữ liệu mới cho các nhân viên này!";

                        var SweetAlert2Demo = function () {
                            var initDemos = function () {
                                swal({
                                    title: 'Áp Dụng?',
                                    text: result,
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
                                }).then((xacnhan) => {
                                    if (xacnhan) {
                                        if (xacnhan) {
                                            $('#AjaxLoader').show();
                                            $.ajax({
                                                url: $('#requestPath').val() + 'Admins/QuanLyLoaiNghiPhep/ApplyNgayNghiPhep',
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
                                                    $('#ContentsPartial').replaceWith(ketqua);
                                                    $('#namnghiphep').selectpicker();
                                                    $('#loainghiphep').selectpicker();
                                                    $('#dataTableBasic').DataTable();
                                                    var SweetAlert2Demo = function () {
                                                        var initDemos = function () {
                                                            swal("Thành Công!", "Đã áp dụng loại nghỉ phép cho nhân viên được chỉ định.", {
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
                    else if (kiemtra.indexOf("OnlyMax~") != -1) {

                        var data = kiemtra.split('~')[1];
                        var result = "Loại nghỉ phép này đã được dùng cho một số đơn nghỉ phép của một số nhân viên. Không thể thay đổi số ngày nghỉ nhỏ hơn tổng số ngày đã được sử dụng cho đơn nghỉ phép của loại nghỉ phép này, vui lòng điều chỉnh lại thông số tối thiểu cho một số nhân viên sau: \n\n";
                        var lstdata = data.split('#');
                        for (var i = 0; i < lstdata.length; i++) {
                            result += lstdata[i] + "\n";
                        }
                        var SweetAlert2Demo = function () {
                            var initDemos = function () {
                                swal("Thông báo!", result, {
                                    icon: "warning",
                                    buttons: {
                                        confirm: {
                                            className: 'btn btn-warning'
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
            else {
                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thông báo!", "Chưa chọn nhân viên để áp dụng loại nghỉ phép!", {
                            icon: "info",
                            buttons: {
                                confirm: {
                                    className: 'btn btn-info'
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
        }
    });
});
