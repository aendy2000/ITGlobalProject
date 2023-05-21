$(document).ready(function () {
    //Chọn nhân viên => lấy danh sách loại nghỉ phép đc áp dụng cho nhân viên đó
    $('#nhanvien').on('change', function () {
        var idemp = $(this).val();
        var formData = new FormData();
        formData.append('idemp', idemp);
        $.ajax({
            url: $('#requestPath').val() + "admins/quanlydonnghiphep/lietkeloainghiphep",
            data: formData,
            type: "post",
            dataType: "html",
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            $('#loainghiphep').replaceWith(ketqua);
            $('#loainghiphep').select2();
            $('#quantityleavetype').text("0 ngày");
        });
    });

    //Chọn loại nghỉ phép => lấy số lượng còn có thể áp dụng của loại nghỉ phép của nv đó
    $('#loainghiphep').on('change', function () {
        var idemp = $('#nhanvien :selected').val();
        var idleavetype = $(this).val();
        var formData = new FormData();
        formData.append('idemp', idemp);
        formData.append('idleavetype', idleavetype);

        $.ajax({
            url: $('#requestPath').val() + "admins/quanlydonnghiphep/songayconlai",
            data: formData,
            type: "post",
            dataType: "html",
            processData: false,
            contentType: false
        }).done(function (ketqua) {
            $('#quantityleavetype').text(ketqua);
        });
    });
    //LƯU THÔNG TIN
    $('#luuThongTin').on('click', function () {
        $('#nhanvienValidation').prop("hidden", true);
        $('#startDateValidation').prop("hidden", true);
        $('#endDateValidation').prop("hidden", true);
        $('#noidungValidation').prop("hidden", true);
        $('#loainghiphepValidation').prop("hidden", true);
        $('#realleavedateValidation').prop("hidden", true);

        realleavedate
        var idEmp = $('#nhanvien :selected').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var content = $('#noidung').val().trim();
        var leavetype = $('#loainghiphep :selected').val().trim();
        var realleavedate = $('#realleavedate').val().replace(/,/g, '.').trim();

        var check = true;
        if (idEmp.length < 1) {
            check = false;
            $('#nhanvien').focus();
            $('#nhanvienValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (leavetype.length < 1) {
            check = false;
            $('#loainghiphep').focus();
            $('#loainghiphepValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (startDate.length < 1) {
            check = false;
            $('#startDate').focus();
            $('#startDateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }
        else if (Number(startDate.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#startDate').focus();
            $('#startDateValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (endDate.length < 1) {
            check = false;
            $('#endDate').focus();
            $('#endDateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }
        else if (Number(endDate.split('-')[0]) != Number($('#currentyear').val())) {
            check = false;
            $('#endDate').focus();
            $('#endDateValidation').text("Vui lòng chỉ chọn thời gian trong năm " + $('#currentyear').val() + ".").show().prop("hidden", false);
        }

        if (endDate.length > 1 && startDate.length > 1) {
            if (Number(startDate.replace(/-/g, '') > Number(endDate.replace(/-/g, '')))) {
                check = false;
                $('#endDate').focus();
                $('#endDateValidation').text("Ngày nghỉ cuối không thể thấp hơn ngày bắt đầu.").show().prop("hidden", false);
            }
            else {
                let stdate = new Date(startDate);
                let endate = new Date(endDate);

                let difference = endate.getTime() - stdate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

                if (TotalDays > Number($('#quantityleavetype').text().split(' ')[0])) {
                    check = false;
                    $('#endDateValidation').text("Ngày nghỉ vượt quá " + (TotalDays - Number($('#quantityleavetype').text().split(' ')[0])) + " ngày so với ngày nghỉ còn lại được cho phép.").show().prop("hidden", false);
                }
            }
        }

        if (content.length > 200) {
            check = false;
            $('#noidung').focus();
            $('#noidungValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
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
            let stdate = new Date(startDate);
            let endate = new Date(endDate);

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
            formData.append("idEmp", idEmp);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("content", content);
            formData.append("state", $('#trangthai :selected').val());
            formData.append("leavetype", leavetype);
            formData.append("realleavedate", realleavedate);

            if ($('#traluong').prop("checked") == true) {
                formData.append("truluong", false);
            }
            else {
                formData.append("truluong", true);
            }

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + "admins/quanlydonnghiphep/taodonnghiphep",
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
                            swal("Thông Báo!", "Đơn nghỉ phép có ngày nghỉ đã bị trùng với đơn nghỉ phép khác của Nhân viên, vui lòng kiểm tra lại!", {
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
                else if (ketqua == "QUANGAYCHOPHEP") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Số ngày nghỉ vượt quá ngày cho phép, vui lòng kiểm tra lại!", {
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
                else if (ketqua == "CHUAAPDUNGNAMNAY") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Loại nghỉ phép không được áp dụng cho Nhân viên này trong năm " + startDate.split('-')[0] + "!", {
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
                else if (ketqua == "QUANGAYCHOPHEPNAMTRUOC") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Loại nghỉ phép không được áp dụng cho Nhân viên này trong năm " + startDate.split('-')[0] + "!", {
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
                else if (ketqua == "QUANGAYCHOPHEPNAMSAU") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Loại nghỉ phép không được áp dụng cho Nhân viên này trong năm " + endDate.split('-')[0] + "!", {
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
                else if (ketqua == "Error") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại", {
                                icon: "erorr",
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
                }
                else {
                    $('#dongChinhSua').click();
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã tạo đơn thành công.", {
                                icon: "success",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-success'
                                    }
                                },
                            }).then(() => {
                                window.location.href = $('#requestPath').val() + 'admins/quanlydonnghiphep/danhsachdonnghiphep';
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