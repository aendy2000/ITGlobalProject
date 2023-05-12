$(document).ready(function (e) {

    //Click lưu
    $('#thembophan').on('click', function (e) {

        $('#BoPhanValidateResul').text("");
        $('#MoTaBoPhanValidateResul').text("");

        var name = $('#tenbophan').val().trim();
        var mota = $('#motabophan').val().trim();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkmota = true;

        if (name.length == 0) {
            checkname = false;
            $('#BoPhanValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#BoPhanValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#BoPhanValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (mota.length > 200) {
            checkmota = false;
            $('#MoTaBoPhanValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (checkname == true && checkmota == true) {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('description', mota);

            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucBoPhan/themBoPhan",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthembophan').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/quanlydanhmucbophan/danhsachbophan";
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