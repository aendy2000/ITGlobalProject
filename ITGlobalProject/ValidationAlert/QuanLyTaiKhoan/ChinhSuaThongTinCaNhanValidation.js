$(document).ready(function () {
    $('#hotenvalidation').hide();
    $('#cmndvalidation').hide();
    $('#sodienthoaivalidation').hide();
    $('#ngaysinhvalidation').hide();
    $('#gioitinhvalidation').hide();
    $('#diachiemailvalidation').hide();

    //Up file avatar
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    });

    //Xóa bỏ avatar
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        let strImg = $('#urlIgmStr').val();
        $('#avatar').val(strImg);
        $('#previewImage').replaceWith('<img src="' + strImg + '" class="avatar-xl rounded-circle border border-4 border-white" alt="" id="previewImage" />');
    });

    //Lưu chỉnh sửa
    $('#luuChinhSua').on('click', function (e) {
        let id = $('#id').val();
        let avatar = $('#avatar').val();
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val();
        let sodienthoai = $('#sodienthoai').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();
        let diachiemail = $('#diachiemail').val();
        var checkshoten = false;
        var checkscmnd = false;
        var checkssodienthoai = false;
        var checksngaysinh = false;
        var checksgioitinh = false;
        var checksdiachiemail = false;
        //Họ và tên
        if (hoten.length < 1) {
            $('#hotenvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#hoten');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkshoten = true;
        }

        //CMND
        if (cmnd.length < 1) {
            $('#cmndvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#cmnd');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkscmnd = true;
        }

        //Điện thoại
        if (sodienthoai.length < 1) {
            $('#sodienthoaivalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#sodienthoai');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkssodienthoai = true;
        }

        //Ngày sinh
        if (ngaysinh.length < 1) {
            $('#ngaysinhvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#ngaysinh');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksngaysinh = true;
        }

        //giới tính
        if (gioitinh.length < 1) {
            $('#gioitinhvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#gioitinh');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksgioitinh = true;
        }

        //Email
        if (diachiemail.length < 1) {
            $('#diachiemailvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#diachiemail');
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksdiachiemail = true;
        }

        if (checkshoten === true && checkscmnd === true && checkssodienthoai === true && checksngaysinh === true &&
            checksgioitinh === true && checksdiachiemail === true) {
            e.preventDefault();
            $('#AjaxLoader').show(); 
            var formData = new FormData();
            formData.append('AvatarImg', $("#selectFiles")[0].files[0]);
            formData.append('ids', id);
            formData.append('hotens', hoten);
            formData.append('cmnds', cmnd);
            formData.append('sodienthoais', sodienthoai);
            formData.append('ngaysinhs', ngaysinh);
            formData.append('diachiemails', diachiemail);
            formData.append('gioitinhs', gioitinh);
            formData.append('diachinhas', diachinha);
            formData.append('avatars', avatar);

            let urls = $('#actionSubmit').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide(); 
                if (ketqua === "Đã có xảy ra lỗi, vui lòng thử lại") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại", {
                                icon: "danger",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-danger'
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
                }
                else if (ketqua === "DANHSACH") {
                    window.location.href($('#actionDanhsach').data('request-url'));
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã lưu thông tin chỉnh sửa!", {
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
                        $.getScript('/ValidationAlert/QuanLyTaiKhoan/ChinhSuaThongTinCaNhanValidation.js'),
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