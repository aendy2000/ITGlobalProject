$(document).ready(function (e) {
    $('#EditRoleValidateResul').hide();

    //Click chỉnh sửa
    $('[id^="chinhsua"]').on('click', function (e) {
        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();
        var des = $('#des' + name).val();

        $('#id').val(ids);
        $('#name').val(names);
        $('#descript').val(des);
    });

    //Click lưu
    $('#luuChinhSua').on('click', function (e) {

        $('#EditBoPhanValidateResul').text("");
        $('#MoTaEditBoPhanValidateResul').text("");

        var id = $('#id').val();
        var name = $('#name').val();
        var des = $('#descript').val();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkmota = true;

        if (name.length == 0) {
            checkname = false;
            $('#EditBoPhanValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#EditBoPhanValidateResul').text("Tên bộ phận không hợp lệ! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#EditBoPhanValidateResul').text("Tên bộ phận chỉ tối đa 50 ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (des.length > 200) {
            checkmota = false;
            $('#MoTaEditBoPhanValidateResul').text("Mô tả bộ phận chỉ tối đa 200 ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (checkname == true && checkmota == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('description', des);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucBoPhan/chinhSuaBoPhan",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongChinhSua').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/quanlydanhmucbophan/danhsachbophan";
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