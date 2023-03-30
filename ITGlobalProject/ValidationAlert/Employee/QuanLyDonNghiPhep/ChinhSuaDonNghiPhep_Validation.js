$(document).ready(function () {

    $('#chinhsualuuThongTin').on('click', function () {
        $('#chinhsuangaybatdauValidation').prop('hidden', true);
        $('#chinhsuangayketthucValidation').prop('hidden', true);
        $('#chinhsuanoidungcapnhatValidation').prop('hidden', true);

        var ngaybatdau = $('#chinhsuangaybatdau').val().trim();
        var ngayketthuc = $('#chinhsuangayketthuc').val().trim();
        var ghichu = $('#chinhsuanoidungcapnhat').val().trim();

        var check = true;
        if (ngaybatdau.length < 1) {
            check = false;
            $('#chinhsuangaybatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }
        else if (Number(ngaybatdau.replace(/-/g, '')) > Number(ngayketthuc.replace(/-/g, ''))) {
            check = false;
            $('#chinhsuangaybatdauValidation').text("Ngày bắt đầu không thể lớn hơn ngày kết thúc!").prop('hidden', false);
        }

        if (ngayketthuc.length < 1) {
            check = false;
            $('#chinhsuangayketthucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false);
        }

        if (ghichu.length > 200) {
            check = false;
            $('#chinhsuanoidungcapnhatValidation').text("Nội dung chỉ tối đa 200 ký tự! Vui lòng kiểm tra lại").prop('hidden', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('idleave', $('#idDonChinhSua').val());
            formData.append('startDate', ngaybatdau);
            formData.append('endDate', ngayketthuc);
            formData.append('contents', ghichu);
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
                else {
                    $('#chinhsuaDong').click();
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