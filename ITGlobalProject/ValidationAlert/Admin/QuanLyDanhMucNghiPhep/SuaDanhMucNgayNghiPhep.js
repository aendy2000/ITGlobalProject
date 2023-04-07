$(document).ready(function (e) {

    $('#EdittenNgayNghiValidation').text("");
    $('#EditthangBatdauValidation').text("");
    $('#EditngayBatdauValidation').text("");
    $('#EditthangKetThucValidation').text("");
    $('#EditngayKetThucValidation').text("");

    //Click chỉnh sửa
    $('[id^="chinhsua"]').on('click', function (e) {
        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();
        var stdays = $('#stdays' + name).val();
        var stmonths = $('#stmonths' + name).val();
        var enddays = $('#enddays' + name).val();
        var endmonths = $('#endmonths' + name).val();

        $('#id').val(ids);
        $('#name').val(names);
        $('#startmonth').selectpicker('val', stmonths);
        $('#startday').selectpicker('val', stdays);
        $('#endmonth').selectpicker('val', endmonths);
        $('#endday').selectpicker('val', enddays);
    });

    //Click lưu
    $('#luuChinhSua').on('click', function (e) {

        var id = $('#id').val();
        var name = $('#name').val();
        var stmonth = $('#startmonth :selected').val();
        var stday = $('#startday :selected').val();
        var endmonth = $('#endmonth :selected').val();
        var endday = $('#endday :selected').val();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkthangbatdau = true;
        var checkngaybatdau = true;
        var checkthangketthuc = true;
        var checkngayketthuc = true;

        if (name.length == 0) {
            checkname = false;
            $('#EdittenNgayNghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#EdittenNgayNghiValidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#EdittenNgayNghiValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (stmonth.length == 0) {
            checkthangbatdau = false;
            $('#EditthangBatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (stday.length == 0) {
            checkngaybatdau = false;
            $('#EditngayBatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (endmonth.length == 0) {
            checkthangketthuc = false;
            $('#EditthangKetThucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        if (endday.length == 0) {
            checkngayketthuc = false;
            $('#EditngayKetThucValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }



        if (checkname == true && checkthangbatdau == true && checkngaybatdau == true && checkthangketthuc == true && checkngayketthuc == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('thangbatdau', stmonth);
            formData.append('ngaybatdau', stday);
            formData.append('thangketthuc', endmonth);
            formData.append('ngayketthuc', endday);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/chinhSuaDanhMucNgayNghiPhep",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongChinhSua').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/danhsachDanhMucNgayNghiPhep";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã cập nhật thành công.", {
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