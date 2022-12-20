$(document).ready(function (e) {
    $('#EditDanhMucKyNangValidateResul').hide();

    //Click chỉnh sửa
    $('[id^="chinhsua"]').on('click', function (e) {
        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();

        $('#id').val(ids);
        $('#name').val(names);
    });

    //Click lưu
    $('#luuChinhSua').on('click', function (e) {

        $('#EditDanhMucKyNangValidateResul').text("");

        var id = $('#id').val();
        var name = $('#name').val();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;

        if (name.length == 0) {
            checkname = false;
            $('#EditDanhMucKyNangValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#EditDanhMucKyNangValidateResul').text("Tên bộ phận không hợp lệ! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#EditDanhMucKyNangValidateResul').text("Tên bộ phận chỉ tối đa 50 ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (checkname == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyKyNangChuyenMon/chinhSuaDanhMucKyNang",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongChinhSua').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/quanlykynangchuyenmon/danhsachdanhmuckynang";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Tuyệt quá! Thông tin đã được chỉnh sửa thành công.", {
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