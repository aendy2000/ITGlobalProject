$(document).ready(function () {
    //Chọn loại nghỉ phép => lấy số lượng còn có thể áp dụng của loại nghỉ phép của nv đó
    $('#loainghiphep').on('change', function () {
        var idleavetype = $(this).val();
        var formData = new FormData();
        formData.append('idleavetype', idleavetype);

        $.ajax({
            url: $('#requestPath').val() + "employee/quanlydonnghiphep/songayconlai",
            data: formData,
            type: "post",
            dataType: "html",
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            $('#quantityleavetype').text(ketqua);
        });
    });

    $('#dongchinhsuaThemMoi').on('click', function () {
        $('#loainghiphepValidation').prop('hidden', true);
        $('#ngaybatdauValidation').prop('hidden', true);
        $('#ngayketthucValidation').prop('hidden', true);
        $('#noidungcapnhatValidation').prop('hidden', true);
        $('#realleavedateValidation').prop('hidden', true);
    });

    $('#luuThongTin').on('click', function () {
        $('#ngaybatdauValidation').prop('hidden', true);
        $('#ngayketthucValidation').prop('hidden', true);
        $('#noidungcapnhatValidation').prop('hidden', true);
        $('#loainghiphepValidation').prop('hidden', true);
        $('#realleavedateValidation').prop('hidden', true);

        var ngaybatdau = $('#ngaybatdau').val().trim();
        var ngayketthuc = $('#ngayketthuc').val().trim();
        var ghichu = $('#noidungcapnhat').val().trim();
        var leavetype = $('#loainghiphep :selected').val().trim();
        var realleavedate = $('#realleavedate').val().replace(/,/g, '.').trim();

        var check = true;

        if (leavetype.length < 1) {
            check = false;
            $('#loainghiphep').focus();
            $('#loainghiphepValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (ngaybatdau.length < 1) {
            check = false;
            $('#ngaybatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngaybatdau.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#ngaybatdauValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (ngayketthuc.length < 1) {
            check = false;
            $('#ngayketthucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngayketthuc.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#ngayketthucValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (ngayketthuc.length > 1 && ngaybatdau.length > 1) {
            if (Number(ngaybatdau.replace(/-/g, '') > Number(ngayketthuc.replace(/-/g, '')))) {
                check = false;
                $('#ngayketthuc').focus();
                $('#ngayketthucValidation').text("Ngày nghỉ cuối không thể thấp hơn ngày bắt đầu.").show().prop("hidden", false);
            }
            else {
                let stdate = new Date(ngaybatdau);
                let endate = new Date(ngayketthuc);

                let difference = endate.getTime() - stdate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

                if (TotalDays > (Number($('#quantityleavetype').text().split(' ')[0].split('.')[0]) + 1)) {
                    check = false;
                    $('#ngayketthucValidation').text("Ngày nghỉ vượt quá " + (TotalDays - Number($('#quantityleavetype').text().split(' ')[0])) + " ngày so với ngày nghỉ còn lại được cho phép.").show().prop("hidden", false);
                }
                else if (Number($('#quantityleavetype').text().split(' ')[0]) < realleavedate) {
                    check = false;
                    $('#realleavedateValidation').text("Ngày nghỉ vượt quá " + (TotalDays - Number($('#quantityleavetype').text().split(' ')[0])) + " ngày so với ngày nghỉ còn lại được cho phép.").show().prop("hidden", false);
                }
            }
        }

        if (ghichu.length > 200) {
            check = false;
            $('#noidungcapnhatValidation').text("Nội dung chỉ tối đa 200 ký tự! Vui lòng kiểm tra lại").prop('hidden', false);
        }

        if (realleavedate.length < 1) {
            check = false;
            $('#realleavedate').focus();
            $('#realleavedateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }
        else if (realleavedate.indexOf("-") != -1) {
            check = false;
            $('#realleavedate').focus();
            $('#realleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 ngày đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
        }
        else if (Number(realleavedate) < (1 / 2)) {
            check = false;
            $('#realleavedate').focus();
            $('#realleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 ngày đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
        }
        else {
            let stdate = new Date(ngaybatdau);
            let endate = new Date(ngayketthuc);

            let difference = endate.getTime() - stdate.getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

            if (Number(realleavedate) > TotalDays) {
                check = false;
                $('#realleavedate').focus();
                $('#realleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
            }
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('leavetype', leavetype);
            formData.append('startDate', ngaybatdau);
            formData.append('endDate', ngayketthuc);
            formData.append('contents', ghichu);
            formData.append('typeTab', $('#typeTab').val());
            formData.append("realleavedate", realleavedate);

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
                else if (ketqua == "TRUNG") {
                    $('#AjaxLoader').fadeOut('slow');
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đơn nghỉ phép có ngày nghỉ đã bị trùng với đơn nghỉ phép khác của bạn, vui lòng kiểm tra lại!", {
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
                    $('#AjaxLoader').fadeOut('slow');
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