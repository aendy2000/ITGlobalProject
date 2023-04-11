$(document).ready(function () {

    $('#luuThongTin').on('click', function () {
        $('#nhanvienValidation').prop("hidden", true);
        $('#startDateValidation').prop("hidden", true);
        $('#endDateValidation').prop("hidden", true);
        $('#noidungValidation').prop("hidden", true);
        var idEmp = $('#nhanvien :selected').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var content = $('#noidung').val().trim();

        var check = true;
        if (idEmp.length < 1) {
            check = false;
            $('#nhanvien').focus();
            $('#nhanvienValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (startDate.length < 1) {
            check = false;
            $('#startDate').focus();
            $('#startDateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (endDate.length < 1) {
            check = false;
            $('#endDate').focus();
            $('#endDateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        if (endDate.length > 1 && startDate.length > 1) {
            if (Number(startDate.replace(/-/g, '') > Number(endDate.replace(/-/g, '')))) {
                check = false;
                $('#endDate').focus();
                $('#endDateValidation').text("Ngày nghỉ cuối không thể thấp hơn ngày bắt đầu.").show().prop("hidden", false);
            }
        }

        if (content.length > 200) {
            check = false;
            $('#noidung').focus();
            $('#noidungValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append("idEmp", idEmp);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("content", content);
            formData.append("state", $('#trangthai :selected').val());

            if ($('#traluong').prop("checked") == true) {
                formData.append("truluong", false);
            }
            else {
                formData.append("truluong", true);
            }

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
                else if (ketqua == "Error") {
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