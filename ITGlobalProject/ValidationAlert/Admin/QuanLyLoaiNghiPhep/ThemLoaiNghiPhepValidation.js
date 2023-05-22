$(document).ready(function (e) {

    //Click lưu
    $('#themloainghiphep').on('click', function (e) {
        $('#LoaiNghiPhepValidateResul').prop('hidden', true).hide();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;

        var name = $('#tenloainghiphep').val().trim();

        var checkname = true;

        if (name.length == 0) {
            checkname = false;
            $('#LoaiNghiPhepValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false).show();
        } else if (formatss.test(name.toLowerCase().replace(/\d+/g, '')) == true) {
            checkname = false;
            $('#LoaiNghiPhepValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").prop("hidden", false).show();
        } else if (name.length > 50) {
            checkname = false;
            $('#LoaiNghiPhepValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").prop('hidden', false).show();
        }
        if (checkname == true) {
            var formData = new FormData();
            formData.append('name', name);
            if ($('#tinhluong').prop("checked") == true) {
                formData.append('tinhluong', true);
            }
            else {
                formData.append("tinhluong", false);
            }

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyLoaiNghiPhep/themlstLoaiNghiPhep",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthembophan').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/QuanLyLoaiNghiPhep/danhSachLoaiNghiPhep";
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