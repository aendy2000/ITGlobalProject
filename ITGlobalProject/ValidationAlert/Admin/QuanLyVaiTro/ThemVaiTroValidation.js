$(document).ready(function (e) {
    $('#RoleValidateResul').hide();
    //Click lưu
    $('#themvaitro').on('click', function (e) {

        $('#RoleValidateResul').text('');
        $('#MoTaRoleValidateResul').text('');
        $('#bophanvalidation').text('');

        var name = $('#tenvaitro').val();
        var mota = $('#motavaitro').val();
        var bophan = $('#bophan :selected').val();

        var formats = /[`!#$%^&*()+\=\[\]{};':"\\|@_<>\/?~]/;
        var formatNumber = /[0123456789]/;

        var checkname = true;
        var checkmota = true;
        var checkbophan = true;

        if (name.length == 0) {
            checkname = false;
            $('#RoleValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (formats.test(name) == true || formatNumber.test(name) == true) {
            checkname = false;
            $('#RoleValidateResul').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
        } else if (name.length > 50) {
            checkname = false;
            $('#RoleValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }

        if (mota.length > 200) {
            checkmota = false;
            $('#MoTaRoleValidateResul').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();

        }

        if (bophan.length < 1) {
            checkbophan = false;
            $('#bophanvalidation').text('Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.').show();
        }

        if (checkname == true && checkbophan == true && checkmota == true) {    
            var formData = new FormData();
            formData.append('name', name);
            formData.append('description', mota);
            formData.append('bophan', bophan);

            let urls = $('#actionThem').data('request-url');
            
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemvaitro').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#actionDanhSach').data('request-url');
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