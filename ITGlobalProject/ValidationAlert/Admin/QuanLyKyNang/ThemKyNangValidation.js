$(document).ready(function (e) {
    $('#KyNangValidateResul').hide();
    //Click lưu
    $('#themkynang').on('click', function (e) {

        $('#KyNangValidateResul').text('');
        $('#kynangvalidation').text('');

        var name = $('#tenkynang').val();
        var dmkynang = $('#kynang :selected').val();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkdmkynang = true;

        if (name.length == 0) {
            checkname = false;
            $('#KyNangValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#KyNangValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#KyNangValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (dmkynang.length < 1) {
            checkdmkynang = false;
            $('#kynangvalidation').text('Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.').show();
        }

        if (checkname == true && checkdmkynang == true) {    
            var formData = new FormData();
            formData.append('name', name);
            formData.append('category', dmkynang);
            
            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyKyNangChuyenMon/themKyNang",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemkynang').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyKyNangChuyenMon/danhSachKyNang";
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