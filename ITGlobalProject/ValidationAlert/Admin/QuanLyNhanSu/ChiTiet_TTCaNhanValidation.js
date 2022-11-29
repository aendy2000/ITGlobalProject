$(document).ready(function () {

    $('#hotenvalidation').hide();
    $('#cmndvalidation').hide();
    //...............

    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    })
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val(null);
        let strImg = $('#urlIgmStr').val();
        $('#avatar').val(strImg);
        $('#previewImage').replaceWith('<img src="' + strImg + '" class="avatar-xl rounded-circle border border-4 border-white" alt="" id="previewImage" />');
    })

    $('#btnLuuThongTin').on('click', function (e) {
        //Thông Tin Cá Nhân
        let avatar = $('#avatar').val();
        let id = $('#idus').val();
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val();
        let quoctich = $('#quoctich').val();
        let honnhan = $('#honnhan :selected').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();

        //Check

        //Done
        //Lập form
        var formData = new FormData();
        //Thông Tin Cá Nhân
        formData.append('AvatarImg', $("#selectFiles")[0].files[0]);
        formData.append('id', id);
        formData.append('hoten', hoten);
        formData.append('cmnd', cmnd);
        formData.append('quoctich', quoctich);
        formData.append('honnhan', honnhan);
        formData.append('ngaysinh', ngaysinh);
        formData.append('gioitinh', gioitinh);
        formData.append('diachinha', diachinha);
        formData.append('avatars', avatar);

        e.preventDefault();
        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaThongTinCaNhan',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#AjaxLoader').hide();
            if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                alert("Đã có xảy ra lỗi, vui lòng thử lại!");
            }
            else if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
            }
            else {
                $('#contentPartial').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );

                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thành Công!", "Đã lưu thông tin chỉnh sửa", {
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
            }
        });
    });
});