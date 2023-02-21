$(document).ready(function () {

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

        $('#luKhachHangCu').show().prop("hidden", false);
        $('#NavthongTinKhachHangCu').show().prop("hidden", false);

        $('#idKhachHang').val(id);
        $('#namedncu').val(
            $('#companys' + id).val()
        );
        $('#hotencu').val(
            $('#names' + id).val()
        );
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
    //Chọn ảnh hợp đồng
    $('#chonanhhopdong').on('click', function () {
        $('#selectFileshopdong').click();
    });
    $('#selectFileshopdong').on('change', function () {
        if ($('#selectFileshopdong').val().length > 0) {
            $('#xoahinhanhhopdong').prop("hidden", false);
        }
    });
    $('#xoahinhanhhopdong').on('click', function () {
        $('#selectFileshopdong').val('');
        $(previewImageshopdong).attr('src', $('#anhhopdongcu').val());
        $('#xoahinhanhhopdong').prop("hidden", true);
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

    //Click lưu chỉnh sửa - khách hàng hiện tại
    $('#luuThongTin').on('click', function () {
        
        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

        //tag Khách hàng
        $('#namednvalidation').hide();
        $('#hotennguoidaidienvalidation').hide();
        $('#hotenvalidation').hide();
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
        var idpro = $('#idpro').val();
        var idpart = $('#idPartnerCurrent').val();

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
            $("#masothuevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#masothue').focus();
        }

        //Check đúng hết thì làm
        if (checkduan == true && checkkhachhang == true) {
            var formData = new FormData();
            formData.append('idpro', idpro);
            formData.append('idpart', idpart);
            formData.append('avatar', avatar);
            //Dự án
            formData.append('hopdong', $("#selectFileshopdong")[0].files[0]);
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
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
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaDuAn',
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
                    $('#chiTietDuAnPartialID').replaceWith(ketqua);
                    $('#resetdata_1').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã lưu thông tin cập nhật dự án.", {
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

    $('#luuThongTinKHCu').on('click', function () {
        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

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

        if (checkduan == true) {
            //Khách hàng
            var idpro = $('#idpro').val();
            var id = $('#idKhachHang').val();

            var formData = new FormData();
            //Dự án
            formData.append('idpro', idpro);
            formData.append('hopdong', $("#selectFileshopdong")[0].files[0]);
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
            formData.append('id', id);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaDuAn',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại") {
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
                    $('#chiTietDuAnPartialID').replaceWith(ketqua);
                    $('#resetdata_1').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã lưu thông tin cập nhật dự án.", {
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