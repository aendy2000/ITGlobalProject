$(document).ready(function () {

    //Chọn loại nghỉ phép => lấy số lượng còn có thể áp dụng của loại nghỉ phép của nv đó
    $('#chinhsualoainghiphep').on('change', function () {
        var id = $('#idDonChinhSua').val();
        var idleavetype = $(this).val();

        var formData = new FormData();
        formData.append('idleavetype', idleavetype);

        if (idleavetype == $('#leavetype-' + id).val()) {
            formData.append('butru', $('#realleavedate-' + id).val());
        }
        else {
            formData.append('butru', '0');
        }

        $.ajax({
            url: $('#requestPath').val() + "employee/quanlydonnghiphep/songayconlaichinhsua",
            data: formData,
            type: "post",
            dataType: "html",
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            $('#chinhsuaquantityleavetype').text(ketqua);
        });
    });

    $('#chinhsualuuThongTin').on('click', function () {
        $('#chinhsualoainghiphepValidation').prop('hidden', true);
        $('#chinhsuangaybatdauValidation').prop('hidden', true);
        $('#chinhsuangayketthucValidation').prop('hidden', true);
        $('#chinhsuanoidungcapnhatValidation').prop('hidden', true);
        $('#chinhsuarealleavedateValidation').prop('hidden', true);

        var ngaybatdau = $('#chinhsuangaybatdau').val().trim();
        var ngayketthuc = $('#chinhsuangayketthuc').val().trim();
        var ghichu = $('#chinhsuanoidungcapnhat').val().trim();
        var leavetype = $('#chinhsualoainghiphep :selected').val().trim();
        var realleavedate = $('#chinhsuarealleavedate').val().trim();

        var check = true;

        if (leavetype.length < 1) {
            check = false;
            $('#chinhsualoainghiphep').focus();
            $('#chinhsualoainghiphepValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (ngaybatdau.length < 1) {
            check = false;
            $('#chinhsuangaybatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngaybatdau.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#chinhsuangaybatdauValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (ngayketthuc.length < 1) {
            check = false;
            $('#chinhsuangayketthucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngayketthuc.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#chinhsuangayketthucValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (ngayketthuc.length > 1 && ngaybatdau.length > 1) {
            if (Number(ngaybatdau.replace(/-/g, '') > Number(ngayketthuc.replace(/-/g, '')))) {
                check = false;
                $('#chinhsuangayketthuc').focus();
                $('#chinhsuangayketthucValidation').text("Ngày nghỉ cuối không thể thấp hơn ngày bắt đầu.").show().prop("hidden", false);
            }
            else {
                let stdate = new Date(ngaybatdau);
                let endate = new Date(ngayketthuc);

                let difference = endate.getTime() - stdate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

                if (TotalDays > Number($('#chinhsuaquantityleavetype').text().split(' ')[0])) {
                    check = false;
                    $('#chinhsuangayketthucValidation').text("Ngày nghỉ vượt quá " + (TotalDays - Number($('#chinhsuaquantityleavetype').text().split(' ')[0])) + " ngày so với ngày nghỉ còn lại được cho phép.").show().prop("hidden", false);
                }
            }
        }

        if (ghichu.length > 200) {
            check = false;
            $('#chinhsuanoidungcapnhatValidation').text("Nội dung chỉ tối đa 200 ký tự! Vui lòng kiểm tra lại").prop('hidden', false);
        }

        if (realleavedate.length < 1) {
            check = false;
            $('#chinhsuarealleavedate').focus();
            $('#chinhsuarealleavedateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }
        else if (realleavedate.indexOf("-") != -1) {
            check = false;
            $('#chinhsuarealleavedate').focus();
            $('#chinhsuarealleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 ngày đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
        }
        else if (Number(realleavedate) < (1 / 2)) {
            check = false;
            $('#chinhsuarealleavedate').focus();
            $('#chinhsuarealleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 ngày đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
        }
        else {
            let stdate = new Date(ngaybatdau);
            let endate = new Date(ngayketthuc);

            let difference = endate.getTime() - stdate.getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

            if (Number(realleavedate) > TotalDays) {
                check = false;
                $('#chinhsuarealleavedate').focus();
                $('#chinhsuarealleavedateValidation').text("Số ngày nghỉ thực tế phải từ 0.5 đến tổng số ngày nghỉ được chọn.").show().prop("hidden", false);
            }
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('idleave', $('#idDonChinhSua').val());
            formData.append('leavetype', leavetype);
            formData.append('startDate', ngaybatdau);
            formData.append('endDate', ngayketthuc);
            formData.append('contents', ghichu);
            formData.append("realleavedate", realleavedate);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + "employee/quanlydonnghiphep/capNhat",
                data: formData,
                type: "post",
                dataType: "html",
                processData: false,
                contentType: false

            }).done(function (ketqua) {
                if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                }
                else if (ketqua == "TRUNG") {
                    $('#AjaxLoader').hide();
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
                    $('#chinhsuaDong').click();
                    $('#tabContentsss').replaceWith(ketqua);
                    $("#dataTableBasic").DataTable();
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã cập nhật thông tin đơn xin nghỉ phép!", {
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