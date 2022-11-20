$(document).ready(function () {
    $('#passwordValidation').hide();
    $('#newpasswordValidation').hide();
    $('#repasswordValidation').hide();

    //Lưu mk
    $('#btnSubmit').on('click', function (e) {
        let id = $('#idus').val();
        let pw = $('#password').val();
        let newpw = $('#newpassword').val();
        let repw = $('#repassword').val();
        var checkspw = false;
        var checksnewpw = false;
        var checksrepw = false;

        //MK cũ
        if (pw.length < 1) {
            $('#passwordValidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#hoten');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkspw = true;
        }

        //MK mới
        if (newpw.length < 1) {
            $('#newpasswordValidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#cmnd');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksnewpw = true;
        }

        //Lại mk mới
        if (repw.length < 1) {
            $('#repasswordValidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#sodienthoai');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksrepw = true;
        }

        if (checkspw === true && checksnewpw === true && checksrepw === true) {
            e.preventDefault();
            var formData = new FormData();
            formData.append('id', id);
            formData.append('password', pw);
            formData.append('newpassword', newpw);
            let urls = $('#actionSubmitPass').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua === "PASSSAI") {
                    $('#passwordValidation').text("Mật khẩu chưa chính xác, vui lòng kiểm tra lại.").show();
                }
                else if (ketqua === "TRANGCHU") {
                    window.location.href($('#actionDanhsach').data('request-url'));
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thay đổi mật khẩu đăng nhập!", {
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
                        $.getScript('/Content/Admin/assets/js/theme.min.js'),
                        $.getScript('/Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.getScript('/ValidationAlert/Admin/QuanLyTaiKhoan/DoiMatKhauValidation.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    ).done(function () {
                        //place your code here, the scripts are all loaded
                    });
                }
            });
        }
    });

    //Đăng xuất
    $('#dangXuats').on('click', function () {
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Đăng Xuất?',
                    text: "Bạn có chắc muốn đăng xuất?",
                    type: 'warning',
                    buttons: {
                        cancel: {
                            visible: true,
                            text: ' Hủy Bỏ ',
                            className: 'btn btn-danger'
                        },
                        confirm: {
                            text: 'Xác Nhận',
                            className: 'btn btn-success'
                        }
                    }
                }).then((khoataikhoans) => {
                    if (khoataikhoans) {
                        window.location.href = $('#actionDangXuat').data('request-url');;
                    }
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
    });

});