$(document).ready(function (e) {
    $('#RoleValidateResul').hide();
    //Click lưu
    $('#themvaitro').on('click', function (e) {
        var name = $('#tenvaitro').val();
        var mota = $('#motavaitro').val();
        checkname = false;

        if (name.length == 0) {
            checkname = false;
            $('#RoleValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else {
            checkname = true;
        }
        if (checkname == true) {    
            var formData = new FormData();
            formData.append('name', name);
            formData.append('description', mota);

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
                            swal("Thành Công!", "Đã thêm một vai trò mới!", {
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
                        $.getScript($('#requestScript').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                        $.getScript($('#requestScript').val() + "Content/Admin/assets/js/theme.min.js"),

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