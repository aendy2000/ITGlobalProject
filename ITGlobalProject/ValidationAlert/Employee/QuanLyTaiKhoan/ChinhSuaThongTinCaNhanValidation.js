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
        let sodienthoai = $('#sodienthoai').val();
        let tenNganHang = $('#tenNganHang').val();
        let sotaikhoan = $('#sotaikhoan').val();
        let chutaikhoan = $('#chutaikhoan').val();
        let diachinha = $('#diachinha').val();
        var checkssodienthoai = false;

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


        if (checkssodienthoai === true ) {
            e.preventDefault();
            $('#AjaxLoader').show(); 
            var formData = new FormData();
            formData.append('AvatarImg', $("#selectFiles")[0].files[0]);
            formData.append('ids', id);
            formData.append('sodienthoais', sodienthoai);
            formData.append('nganhangs', tenNganHang);
            formData.append('sotaikhoans', sotaikhoan);
            formData.append('chutaikhoans', chutaikhoan);
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
                        $.getScript($('#getScripts1').val()),
                        $.getScript($('#getScripts2').val()),
                        $.getScript($('#getScripts3').val()),
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