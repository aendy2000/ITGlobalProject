﻿$(document).ready(function () {
    $('#dongchinhsuaThemMoi').on('click', function () {
        $('#ngaybatdauValidation').prop('hidden', true);
        $('#ngayketthucValidation').prop('hidden', true);
        $('#noidungcapnhatValidation').prop('hidden', true);
    });

    $('#luuThongTin').on('click', function () {
        $('#ngaybatdauValidation').prop('hidden', true);
        $('#ngayketthucValidation').prop('hidden', true);
        $('#noidungcapnhatValidation').prop('hidden', true);

        var ngaybatdau = $('#ngaybatdau').val().trim();
        var ngayketthuc = $('#ngayketthuc').val().trim();
        var ghichu = $('#noidungcapnhat').val().trim();

        var check = true;
        if (ngaybatdau.length < 1) {
            check = false;
            $('#ngaybatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngaybatdau.replace(/-/g, '')) > Number(ngayketthuc.replace(/-/g, ''))) {
            check = false;
            $('#ngaybatdauValidation').text("Ngày bắt đầu không thể lớn hơn ngày kết thúc!").prop('hidden', false);
        }

        if (ngayketthuc.length < 1) {
            check = false;
            $('#ngayketthucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }

        if (ghichu.length > 200) {
            check = false;
            $('#noidungcapnhatValidation').text("Nội dung chỉ tối đa 200 ký tự! Vui lòng kiểm tra lại").prop('hidden', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('startDate', ngaybatdau);
            formData.append('endDate', ngayketthuc);
            formData.append('contents', ghichu);
            formData.append('typeTab', $('#typeTab').val());
            $.ajax({
                url: $('#requestPath').val() + "employee/quanlydonnghiphep/taodonnghiphep",
                data: formData,
                type: "post",
                dataType: "html",
                processData: false,
                contentType: false

            }).done(function (ketqua) {
                if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                }
                else if (ketqua == "success") {
                    $('#dongchinhsuaThemMoi').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thêm một đơn xin nghỉ phép!", {
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
                else {
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

                    $('#dongchinhsuaThemMoi').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thêm một đơn xin nghỉ phép!", {
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
});