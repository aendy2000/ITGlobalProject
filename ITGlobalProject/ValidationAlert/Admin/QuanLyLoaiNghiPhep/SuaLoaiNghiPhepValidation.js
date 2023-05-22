$(document).ready(function (e) {

    $('[id^="tinhluong-"]').on('change', function () {
        var id = $(this).attr("name");
        var form = new FormData();

        form.append('id', id);
        form.append('tinhluong', $(this).prop("checked"));

        $.ajax({
            type: "POST",
            url: $('#requestPath').val() + "Admins/QuanLyLoaiNghiPhep/thayDoiTrangThai",
            dataType: 'html',
            contentType: false,
            processData: false,
            data: form
        }).done(function (ketqua) {
            var content = {};
            content.message = 'Đã thay đổi trạng thái tính lương.';
            content.title = 'Thành công!';
            content.icon = 'nav-icon fe fe-bell me-2';

            $.notify(content, {
                type: "success",
                placement: {
                    from: "bottom",
                    align: "right"
                },
                time: 1000,
                delay: 1000,
            });
        });
    });
});

//Click chỉnh sửa
$('[id^="chinhsua"]').on('click', function (e) {
    var name = $(this).attr("name");
    var ids = $('#ids' + name).val();
    var names = $('#names' + name).val();
    var tinhluongs = $('#des' + name).val().toLowerCase();

    $('#idchinhsua').val(ids);
    $('#namechinhsua').val(names);

    if (tinhluongs == 'true') {
        $('#tinhluongchinhsua').prop('checked', true);
    }
    else {
        $('#tinhluongchinhsua').prop('checked', false);
    }
});

//Click lưu
$('#luuChinhSua').on('click', function (e) {
    $('#EditLoaiNghiPhepValidateResul').prop('hidden', true).hide();

    var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;

    var id = $('#idchinhsua').val();
    var name = $('#namechinhsua').val();

    var checkname = true;

    if (name.length == 0) {
        checkname = false;
        $('#EditLoaiNghiPhepValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").prop('hidden', false).show();
    } else if (formatss.test(name.toLowerCase().replace(/\d+/g, '')) == true) {
        checkname = false;
        $('#EditLoaiNghiPhepValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").prop("hidden", false).show();
    } else if (name.length > 50) {
        checkname = false;
        $('#EditLoaiNghiPhepValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").prop('hidden', false).show();
    }

    if (checkname == true) {
        var formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);

        if ($('#tinhluongchinhsua').prop("checked") == true) {
            formData.append('tinhluong', true);
        }
        else {
            formData.append("tinhluong", false);
        }
        $.ajax({
            url: $('#requestPath').val() + "Admins/QuanLyLoaiNghiPhep/chinhSuaLoaiNghiPhep",
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#dongChinhSua').click();
            if (ketqua === "DANHSACH") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyLoaiNghiPhep/danhSachLoaiNghiPhep";
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
