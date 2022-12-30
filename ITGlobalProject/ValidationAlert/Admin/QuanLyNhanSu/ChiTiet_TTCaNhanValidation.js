$(document).ready(function () {


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

        $("#hotenvalidation").hide();
        $("#cmndvalidation").hide();
        $("#quoctichvalidation").hide();
        $("#honnhanvalidation").hide();
        $("#ngaysinhvalidation").hide();
        $("#diachinhavalidation").hide();
        $("#sodienthoaididongvalidation").hide();
        $("#sodienthoaikhacvalidation").hide();
        $("#gioitinhvalidation").hide();
        $("#diachiemailcongtyvalidation").hide();
        $("#diachiemailkhacvalidation").hide();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        //Thông Tin Cá Nhân
        let avatar = $('#avatar').val();
        let id = $('#idus').val();
        let hoten = $('#hoten').val().trim();
        let cmnd = $('#cmnd').val().replace(/_/g, '').trim();
        let quoctich = $('#quoctich').val().trim();
        let honnhan = $('#honnhan :selected').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val().trim();
        let sodienthoaididong = $('#sodienthoaididong').val().replace(/_/g, '').trim();
        let sodienthoaikhac = $('#sodienthoaikhac').val().replace(/_/g, '').trim();
        let diachiemailcongty = $('#diachiemailcongty').val();
        let diachiemailkhac = $('#diachiemailkhac').val();

        var checkthongtincanhan = true;
        //Check
        // Vali họ tên
        if (hoten.length < 1) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (hoten.length > 50) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();

        }
        else if (formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
        }
        else if (formatnumber.test(hoten) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();

        }
        // Vali CMND
        if (cmnd.length < 1) {
            checkthongtincanhan = false;
            $("#cmndvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (cmnd.length != 14 && cmnd.length != 11) {
            checkthongtincanhan = false;
            $("#cmndvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();

        }
        // Vali quốc tịch
        if (quoctich.length < 1) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();

        }
        else if (quoctich.length > 50) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }
        else if (formatnumber.test(quoctich) == true) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
        }
        else if (formatss.test(quoctich.toLowerCase().replace(/\d+/g, '')) == true) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
        }
        // Vali hôn nhân
        if (honnhan.length < 1) {
            checkthongtincanhan = false;
            $("#honnhanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();

        }
        // Vali Ngày sinh
        if (ngaysinh.length < 1) {
            checkthongtincanhan = false;
            $("#ngaysinhvalidation").text("Không được bỏ trống thông tin này!").show();

        }
        // Vali Giới tính
        if (gioitinh.length < 1) {
            checkthongtincanhan = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();

        }
        // Vali Địa chỉ nhà
        if (diachinha > 250) {
            checkthongtincanhan = false;
            $("#diachinhavalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();

        }
        // Vali Số điện thoại
        if (sodienthoaididong.length < 1) {
            checkthongtincanhan = false;
            $("#sodienthoaididongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();

        } else if (sodienthoaididong.length != 12) {
            checkthongtincanhan = false;
            $("#sodienthoaididongvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();

        }
        // Vali số điện thoại khác
        if (sodienthoaikhac.length > 0) {
            if (sodienthoaikhac.length != 12) {
                checkthongtincanhan = false;
                $("#sodienthoaikhacvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();


            }
        }
        // Vali địa chỉ gmail
        if (diachiemailcongty.length < 1) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();


        }
        else if (formatEmail.test(diachiemailcongty) == false) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();

        }
        else if (diachiemailcongty.length > 50) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();


        }
        // Vali địa chỉ gmail khác
        if (diachiemailkhac.length > 0) {
            if (diachiemailkhac.length > 50) {
                checkthongtincanhan = false;
                $("#diachiemailkhacvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();

            }
            else if (formatEmail.test(diachiemailkhac) == false) {
                checkthongtincanhan = false;
                $("#diachiemailkhacvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();

            }
        }
        //
        if (checkthongtincanhan == true) {
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

            formData.append('sodienthoaididong', sodienthoaididong);
            formData.append('sodienthoaikhac', sodienthoaikhac);
            formData.append('diachiemailcongty', diachiemailcongty);
            formData.append('diachiemailkhac', diachiemailkhac);

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
                else if (ketqua == "EXITS") {
                    $("#diachiemailcongtyvalidation").text("Địa chỉ Email đang được sử dụng bởi một tài khoản khác.").show();
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
        }
    });
});