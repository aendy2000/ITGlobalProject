$(document).ready(function (e) {

    //Click lưu
    $('#themdanhmuckynang').on('click', function (e) {

        $('#DanhMucKyNangValidateResul').text("");
        var name = $('#tendanhmuckynang').val().trim();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;

        if (name.length == 0) {
            checkname = false;
            $('#DanhMucKyNangValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#DanhMucKyNangValidateResul').text("Tên danh mục không hợp lệ! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#DanhMucKyNangValidateResul').text("Tên danh mục chỉ tối đa 50 ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (checkname == true) {
            var formData = new FormData();
            formData.append('name', name);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyKyNangChuyenMon/themdanhmuckynang",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemdanhmuckynang').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/QuanLyKyNangChuyenMon/danhsachdanhmuckynang";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Tuyệt quá! Một danh mục đã được thêm vào danh sách.", {
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