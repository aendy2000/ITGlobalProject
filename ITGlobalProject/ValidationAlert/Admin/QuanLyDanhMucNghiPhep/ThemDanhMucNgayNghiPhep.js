$(document).ready(function (e) {

    //Click lưu
    $('#themdanhmucngaynghiphep').on('click', function (e) {

        $('#tenNgayNghiValidation').text("");
        $('#thangBatdauValidation').text("");
        $('#ngayBatdauValidation').text("");
        $('#thangKetThucValidation').text("");
        $('#ngayKetThucValidation').text("");

        var name = $('#tenngaynghi').val().trim();
        var monthbatdau = $('#thangbatdau :selected').val().trim();
        var daybatdau = $('#ngaybatdau :selected').val().trim();
        var monthketthuc = $('#thangketthuc :selected').val().trim();
        var dayketthuc = $('#ngayketthuc :selected').val().trim();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkthangbatdau = true;
        var checkngaybatdau = true;
        var checkthangketthuc = true;
        var checkngayketthuc = true;


        if (name.length == 0) {
            checkname = false;
            $('#tenNgayNghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#tenNgayNghiValidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#tenNgayNghiValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (monthbatdau.length == 0) {
            checkthangbatdau = false;
            $('#thangBatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (daybatdau.length == 0) {
            checkngaybatdau = false;
            $('#ngayBatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (monthketthuc.length == 0) {
            checkthangketthuc = false;
            $('#thangKetThucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (dayketthuc.length == 0) {
            checkngayketthuc = false;
            $('#ngayKetThucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (checkname == true && checkthangbatdau == true && checkngaybatdau == true && checkthangketthuc == true && checkngayketthuc == true) {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('thangbatdau', monthbatdau);
            formData.append('ngaybatdau', daybatdau);
            formData.append('thangketthuc', monthketthuc);
            formData.append('ngayketthuc', dayketthuc);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/themDanhMucNgayNghiPhep",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemdanhmuc').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/quanlydanhmucngaynghiphep/danhsachDanhMucNgayNghiPhep";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã thêm thành công.", {
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

                    $.when(
                        $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                        $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    ).done(function () {
                    });
                }
            });
        }
    });
});