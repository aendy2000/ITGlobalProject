$(document).ready(function () {
    $('#luKhachHangCu').hide();
    $('#NavthongTinKhachHangCu').hide();

    //Chọn loại đối tác
    $('#canhandoanhnghiep').on('change', function () {
        if ($(this).prop("checked")) {
            $('[id^="doanhnghieps"]').prop("hidden", false);
            $('#canhans').prop("hidden", true);
        } else {
            $('[id^="doanhnghieps"]').prop("hidden", true);
            $('#canhans').prop("hidden", false);
        }
    });

    //Chọn khách hàng có sẵn
    $('[id^="selectKhachHangCu"]').on('click', function () {
        var id = $(this).attr("name");

        $('#tatDanhSachKHCu').click();

        $('#luKhachHang').hide();
        $('#NavthongTinKhachHang').hide();

        $('#luKhachHangCu').show();
        $('#NavthongTinKhachHangCu').show();

        $('#idKhachHang').val(id);
        alert($('#type' + id).val().toLowerCase());
        if ($('#type' + id).val().toLowerCase() === "true") {
            $('#namedncu').val(
                $('#companys' + id).val()
            ).prop("hidden", false);
            $('#hotennguoidaidiencu').val(
                $('#names' + id).val()
            );
            $('#canhanss').prop("hidden", true);
            $('#doanhnghieps1s').prop("hidden", false);
            $('#doanhnghieps2s').prop("hidden", false);

        }
        else {
            $('#canhanss').prop("hidden", false);
            $('#doanhnghieps1s').prop("hidden", true);
            $('#doanhnghieps2s').prop("hidden", true);
            $('#hotencu').val(
                $('#names' + id).val()
            );
        } 
        
        $('#cmndcu').val(
            $('#cmnds' + id).val()
        );
        $('#phonecu').val(
            $('#sdts' + id).val()
        );
        $('#emailcu').val(
            $('#emails' + id).val()
        );
        $('#ngaysinhcu').val(
            $('#sns' + id).val()
        );
        $('#gioitinhcu').val(
            $('#gioitinhs' + id).val()
        );
        $('#diahchinhacu').val(
            $('#dcs' + id).val()
        );
        $('#masothuecu').val(
            $('#mathue' + id).val()
        );
        $('#urlwebcu').val(
            $('#web' + id).val()
        );
        var avt = $('#avts' + id).val();
        if (avt.length < 1) {
            $('#previewImageCu').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
        } else {
            $('#previewImageCu').replaceWith('<img src="' + avt + '" class="avatar-xxl rounded-circle" alt="" id="previewImageCu" />');
        }

    });

    //Chọn nhập khách hàng mới
    $('#nhapKhachHangMoi').on('click', function () {
        $('#luKhachHang').show();
        $('#NavthongTinKhachHang').show();

        $('#luKhachHangCu').hide();
        $('#NavthongTinKhachHangCu').hide();

    });

    //Chọn ảnh
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    })

    //Xóa ảnh
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
    })

    //Xóa giai đoạn
    $('#xoabot').on('click', function (e) {
        let sott = Number($('#dem').val());
        if (sott > 1) {
            $('label[for=ipcpgd' + sott + ']').remove();
            $('#ipcpgd' + sott).remove();
            $('#ipdgd' + sott).remove();

            var elem = document.getElementById('dem');
            elem.value = sott - 1;

            let totals = 0;
            for (var i = 1; i <= sott - 1; i++) {
                totals += Number($('#gd' + i).val().replace(/,/g, ''));
            }
            if (totals === 0) {
                $('#sums').val("HÃY NHẬP CHI PHÍ Ở CÁC GIAI ĐOẠN");
            } else {
                $('#sums').val(totals);
            }
        }
    });

    //Thêm giai đoạn
    $('#addthem').on('click', function (e) {
        let sott = Number($('#dem').val()) + 1;
        if (sott <= 10) {
            let nd = "'alias': 'decimal', 'groupSeparator': ','";
            $('#appenddayne').replaceWith('<label style="font-weight:bold" for="ipcpgd' + sott + '" class="form-label">Giai đoạn ' + sott + ' </label>'
                + '<div id="ipcpgd' + sott + '" class="mb-3 col-md-6 col-12">'
                + '<input id="gd' + sott + '" name="gd' + sott + '" type="text" style="font-weight:bold;" data-inputmask="' + nd + '" inputmode="numeric" class="form-control text-start text-danger" placeholder="Chi phí giai đoạn ' + sott + '" required />'
                + '<p hidden style="font-size: 13px; color:red;" id="gd' + sott + 'validation"></p></div>'
                + '<div id="ipdgd' + sott + '" class="mb-3 col-md-6 col-12"><div class="input-group me-3"><input id="ngaygd' + sott + '" name="ngaygd' + sott + '" class="form-control flatpickr" type="text" placeholder="Ngày kết thúc giai đoạn ' + sott + '" aria-describedby="basic-addon-gd' + sott + '" required>'
                + '<span class="input-group-text text-muted" id="basic-addon-gd3"><i class="fe fe-calendar"></i></span></div>'
                + '<p hidden style="font-size: 13px; color:red;" id="ngaygd' + sott + 'validation"></p>'
                + '</div><div id="appenddayne"></div>');
            var elem = document.getElementById('dem');
            elem.value = sott;
            if ($("input").length && Inputmask().mask(document.querySelectorAll("input")), $("#editor").length) new Quill("#editor", {
                modules: {
                    toolbar: [
                        [{
                            header: [1, 2, !1]
                        }],
                        [{
                            font: []
                        }],
                        ["bold", "italic", "underline", "strike"],
                        [{
                            size: ["small", !1, "large", "huge"]
                        }],
                        [{
                            list: "ordered"
                        }, {
                            list: "bullet"
                        }],
                        [{
                            color: []
                        }, {
                            background: []
                        }, {
                            align: []
                        }],
                        ["link", "image", "code-block", "video"]
                    ]
                },
                theme: "snow"
            });
            $(".flatpickr").length && flatpickr(".flatpickr", {
                disableMobile: !0
            });
        }
    });

    //Cập nhật chi phí tự động
    $('#frm').on('input', function (e) {
        let sott = Number($('#dem').val());
        let totals = 0;
        for (var i = 1; i <= sott; i++) {
            totals += Number($('#gd' + i).val().replace(/,/g, ''));
        }
        if (totals === 0) {
            $('#sums').val("HÃY NHẬP CHI PHÍ Ở CÁC GIAI ĐOẠN");
        } else {
            $('#sums').val(totals);
        }
    });

    //Click Thêm mới
    $('#luuThongTin').on('click', function () {
        var dem = $('#dem').val();

        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

        for (var i = 1; i <= dem; i++) {
            $('#ngaygd' + i + 'validation').hide();
            $('#gd' + i + 'validation').hide();
        }

        //tag Khách hàng
        $('#namednvalidation').hide();
        $('#hotenvalidation').hide();
        $('#hotennguoidaidienvalidation').hide();
        $('#cmndvalidation').hide();
        $('#phonevalidation').hide();
        $('#emailvalidation').hide();
        $('#ngaysinhvalidation').hide();
        $('#gioitinhvalidation').hide();
        $('#masothuevalidation').hide();
        $('#urlwebvalidation').hide();
        $('#diahchinhavalidation').hide();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        // value Dự án
        var name = $('#name').val().trim();
        var mota = $('#mota').val().trim();
        var batdau = $('#batdau').val().trim();
        var ketthuc = $('#ketthuc').val().trim();

        //validation name
        var checkduan = true;

        if (name.length < 1) {
            checkduan = false;
            $('#namevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#name').focus();
        } else if (name.length > 100) {
            checkduan = false;
            $('#namevalidation').text("Tên dự án chỉ tối đa 100 ký tự.").show().prop("hidden", false);
            $('#name').focus();
        }

        //validation mô tả
        if (mota.length > 0) {
            if (mota.length > 1000) {
                checkduan = false;
                $('#motavalidation').text("Mô tả dự án chỉ tối đa 1000 ký tự.").show().prop("hidden", false);
                $('#mota').focus();
            }
        }

        //validation ngày bắt đầu
        if (batdau.length < 1) {
            checkduan = false;
            $('#batdauvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#batdau').focus();
        }

        //validation ngày kết thúc
        if (ketthuc.length < 1) {
            checkduan = false;
            $('#ketthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (Number(ketthuc.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
            checkduan = false;
            $('#ketthucvalidation').text("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
        }

        //value and validation giai đoạn
        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            let ngaygd = $('#ngaygd' + i).val();
            let chiphigd = $('#gd' + i).val();

            //Ngày
            if (ngaygd.length < 1) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (Number(ngaygd.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (i >= 2 && Number(ngaygd.replace(/-/g, '')) <= Number($('#ngaygd' + (i - 1)).val().replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn " + i + " phải lớn hơn giai đoạn " + (i - 1) + ".").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }

            //Gía tiền
            if (chiphigd.length == 0) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#gd' + i).focus();
            } else if (Number(chiphigd.replace(/,/g, '').trim()) == 0) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Chi phí giai đoạn không thể bằng 0.").show().prop("hidden", false);
                $('#gd' + i).focus();
            } else if (chiphigd.indexOf("-") != -1) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Số tiền không thể âm.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }

            //Đúng validaion
            if (checkduan == true) {
                if (i == dem) {
                    giaidoan += $('#ngaygd' + i).val();
                    chiphi += $('#gd' + i).val();
                }
                else {
                    giaidoan += $('#ngaygd' + i).val() + "_";
                    chiphi += $('#gd' + i).val() + "_";
                }
            }
        }

        // value Khách hàng
        var avatar = $("#selectFiles")[0].files[0];
        var namedn = $('#namedn').val().trim();
        var hotendaidien = $('#hotennguoidaidien').val().trim();
        var hoten = $('#hoten').val().trim();
        var cmnd = $('#cmnd').val().replace(/_/g, '').trim();
        var phone = $('#phone').val().replace(/_/g, '').trim();
        var email = $('#email').val().trim();
        var ngaysinh = $('#ngaysinh').val().trim();
        var gioitinh = $('#gioitinh :selected').val().trim();
        var masothue = $('#masothue').val().replace(/_/g, '').trim();
        var website = $('#urlweb').val().trim();

        var diahchinha = $('#diahchinha').val().trim();

        var checkkhachhang = true;

        if ($('#canhandoanhnghiep').prop("checked")) {
            //Validation tên doanh nghiệp
            if (namedn.length < 1) {
                checkkhachhang = false;
                $('#namednvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#namedn').focus();
            }
            else if (namedn.length > 100) {
                checkkhachhang = false;
                $('#namednvalidation').text("Tên doanh nghiệp chỉ tối đa 100 ký tự.").show().prop("hidden", false);
                $('#namedn').focus();
            }

            //Validation tên người đại diện
            if (hotendaidien.length < 1) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            } else if (formatnumber.test(hotendaidien) == true || formatss.test(hotendaidien.toLowerCase().replace(/\d+/g, '')) == true) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Họ và Tên chưa đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            } else if (hotendaidien.length > 50) {
                checkkhachhang = false;
                $('#hotennguoidaidienvalidation').text("Họ và Tên chỉ tối đa 50 ký tự.").show().prop("hidden", false);
                $('#hotennguoidaidien').focus();
            }
        }
        else {
            //Validation tên khach hàng
            if (hoten.length < 1) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#hoten').focus();
            } else if (formatnumber.test(hoten) == true || formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Họ và Tên chưa đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#hoten').focus();
            } else if (hoten.length > 50) {
                checkkhachhang = false;
                $('#hotenvalidation').text("Họ và Tên chỉ tối đa 50 ký tự.").show().prop("hidden", false);
                $('#hoten').focus();
            }
        }

        //Validation cmnd
        if (cmnd.length < 1) {
            checkkhachhang = false;
            $("#cmndvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#cmnd').focus();

        } else if (cmnd.length != 14 && cmnd.length != 11) {
            checkkhachhang = false;
            $("#cmndvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show().prop("hidden", false);
            $('#cmnd').focus();
        }

        //Validation sđt
        if (phone.length < 1) {
            checkkhachhang = false;
            $("#phonevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#phone').focus();

        } else if (phone.length != 12) {
            checkkhachhang = false;
            $("#phonevalidation").text("Vui lòng nhập đầy đủ thông tin này!").show().prop("hidden", false);
            $('#phone').focus();
        }

        //Validation email
        if (email.length < 1) {
            checkkhachhang = false;
            $("#emailvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#email').focus();

        } else if (formatEmail.test(email) == false) {
            checkkhachhang = false;
            $("#emailvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show().prop("hidden", false);
            $('#email').focus();
        }
        else if (email.length > 50) {
            checkkhachhang = false;
            $("#emailvalidation").text("Email chỉ tối đa 50 ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#email').focus();
        }

        //Validation ngày sinh
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        if (ngaysinh.length < 1) {
            checkkhachhang = false;
            $("#ngaysinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#ngaysinh').focus();

        }
        else if (Number(ngaysinh.replace(/-/g, '')) >= Number(yyyy + mm + dd)) {
            checkkhachhang = false;
            $("#ngaysinhvalidation").text("Ngày sinh không thể lớn hơn ngày hiện tại").show().prop("hidden", false);
            $('#ngaysinh').focus();
        }

        //Validation giới tính
        if (gioitinh.length < 1) {
            checkkhachhang = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#gioitinh').focus();
        }
        else if (diahchinha.length > 250) {
            checkkhachhang = false;
            $("#diachinhavalidation").text("Địa chỉ, chỉ tối đa 250 ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#gioitinh').focus();
        }
        //validation mã số thuế
        if (masothue.length != 10) {
            checkkhachhang = false;
            $("#masothuevalidation").text("Vui lòng nhập đầy đủ thông tin này.").show().prop("hidden", false);
            $('#masothue').focus();
        }

        alert(checkduan + " - " + checkkhachhang);
        //Check đúng hết thì làm
        if (checkduan == true && checkkhachhang == true) {
            var formData = new FormData();
            formData.append('avatar', avatar);
            //Dự án
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
            formData.append('giaidoan', giaidoan);
            formData.append('chiphi', chiphi);
            //Khách hàng
            formData.append('namedn', namedn);
            formData.append('hotennguoidaidien', hotendaidien);
            formData.append('hoten', hoten);
            formData.append('cmnd', cmnd);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diahchinha', diahchinha);

            if ($('#canhandoanhnghiep').prop("checked")) {
                formData.append('loaidoitac', true);
            } else {
                formData.append('loaidoitac', false);
            }
            formData.append('masothue', masothue);
            formData.append('website', website);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/taoDuAnMoi',
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
                                icon: "erorr",
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
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thêm một dự án mới!\nChọn Xác nhận để tiếp tục đi đến trang thông tin của dự án!", {
                                icon: "success",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-success'
                                    }
                                },
                            }).then((dones) => {
                                if (dones) {
                                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/chiTietDuAn?id=' + ketqua;
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

                }
            });
        }
    });

    $('#luuThongTinKHCu').on('click', function () {
        var dem = $('#dem').val();

        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

        for (var i = 1; i <= dem; i++) {
            $('#ngaygd' + i + 'validation').hide();
            $('#gd' + i + 'validation').hide();
        }

        // value Dự án
        var name = $('#name').val().trim();
        var mota = $('#mota').val().trim();
        var batdau = $('#batdau').val().trim();
        var ketthuc = $('#ketthuc').val().trim();

        //validation name
        var checkduan = true;
        if (name.length < 1) {
            checkduan = false;
            $('#namevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#name').focus();
        } else if (name.length > 100) {
            checkduan = false;
            $('#namevalidation').text("Tên dự án chỉ tối đa 100 ký tự.").show().prop("hidden", false);
            $('#name').focus();
        }

        //validation mô tả
        if (mota.length > 0) {
            if (mota.length > 1000) {
                checkduan = false;
                $('#motavalidation').text("Mô tả dự án chỉ tối đa 1000 ký tự.").show().prop("hidden", false);
                $('#mota').focus();
            }
        }

        //validation ngày bắt đầu
        if (batdau.length < 1) {
            checkduan = false;
            $('#batdauvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#batdau').focus();
        }

        //validation ngày kết thúc
        if (ketthuc.length < 1) {
            checkduan = false;
            $('#ketthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (Number(ketthuc.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
            checkduan = false;
            $('#ketthucvalidation').text("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
        }

        //value and validation giai đoạn
        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            let ngaygd = $('#ngaygd' + i).val();
            let chiphigd = $('#gd' + i).val();

            //Ngày
            if (ngaygd.length < 1) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (Number(ngaygd.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (i >= 2 && Number(ngaygd.replace(/-/g, '')) <= Number($('#ngaygd' + (i - 1)).val().replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn " + i + " phải lớn hơn giai đoạn " + (i - 1) + ".").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }

            //Gía tiền
            if (chiphigd.length == 0) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#gd' + i).focus();
            } else if (chiphigd.indexOf("-") != -1) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Số tiền không thể âm.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }

            //Đúng validaion
            if (checkduan == true) {
                if (i == dem) {
                    giaidoan += $('#ngaygd' + i).val();
                    chiphi += $('#gd' + i).val();
                }
                else {
                    giaidoan += $('#ngaygd' + i).val() + "_";
                    chiphi += $('#gd' + i).val() + "_";
                }
            }
        }

        if (checkduan == true) {
            //Khách hàng
            var id = $('#idKhachHang').val();

            var formData = new FormData();
            //Dự án
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
            formData.append('giaidoan', giaidoan);
            formData.append('chiphi', chiphi);
            formData.append('id', id);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/taoDuAnMoi',
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
                                icon: "erorr",
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
                } else if (ketqua.indexOf("đang được sử dụng") != -1) {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", ketqua, {
                                icon: "erorr",
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
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thêm một dự án mới!\nChọn Xác nhận để đi đến trang thôn tin của dự án!", {
                                icon: "success",
                                buttons: {
                                    confirm: {
                                        className: 'btn btn-success'
                                    }
                                },
                            }).then((dones) => {
                                if (dones) {
                                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/chiTietDuAn?id=' + ketqua;
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

                }
            });
        }
    });

});