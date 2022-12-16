$(document).ready(function () {

    //...............

    //Cung cấp tài khoản
    $('#cungCapTaiKhoan').on('change', function () {
        if ($('#cungCapTaiKhoan').prop('checked')) {
            $("#matkhaudangnhap").prop('disabled', false);
            $("#nhaplaimatkhaudangnhap").prop('disabled', false);
            $('#lbNhapMatKhau').prop('hidden', false);
            $('#lbNhapLaiMatKhau').prop('hidden', false);

        }
        else {
            $("#matkhaudangnhap").val('').prop('disabled', true);
            $("#nhaplaimatkhaudangnhap").val('').prop('disabled', true);
            $('#lbNhapMatKhau').prop('hidden', true);
            $('#lbNhapLaiMatKhau').prop('hidden', true);
        }
    });
    //Bộ phận
    $('#bophan').on('change', function () {
        if ($('#bophan :selected').val().length < 1) {
            document.getElementById('vaitro').value = "";
            $('#vaitro').prop('disabled', true);
        } else {
            var formData = new FormData();
            formData.append('id', $('#bophan :selected').val())

            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/luaChonBoPhan',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
                } else {
                    $('#vaitro').replaceWith(ketqua);
                }
            });
        }
    });

    //Loại hợp đồng
    $('#loaiHopDong').on('change', function () {
        if ($('#loaiHopDong :selected').val() == "Hợp đồng có thời hạn") {

            $("#taiAnhHopDong").addClass("col-md-12");
            $("#taiAnhHopDong").removeClass("col-md-4");

            $('#ketthucHopDong').prop('hidden', false);
        } else {
            $("#taiAnhHopDong").addClass("col-md-4");
            $("#taiAnhHopDong").removeClass("col-md-12");

            $('#ketthucHopDong').prop('hidden', true);
        }
    });

    //Chinh Sửa Loại hợp đồng
    $('#chonLoaiHopDongChinhSua').on('change', function () {
        if ($('#chonLoaiHopDongChinhSua :selected').val() == "Hợp đồng có thời hạn") {

            $("#taiAnhHopDongChinhSua").addClass("col-md-12");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-4");

            $('#ketthucHopDongChinhSua').prop('hidden', false);
        } else {
            $("#taiAnhHopDongChinhSua").addClass("col-md-4");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-12");

            $('#ketthucHopDongChinhSua').prop('hidden', true);
        }
    });

    //Xóa Hợp Đồng
    $('[id^="xoaHopDong"]').on('click', function () {
        let id = $(this).attr('name');
        let idus = $('#idus').val();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Hợp đồng?',
                    text: "Bạn có chắc muốn loại bỏ hợp đồng này?",
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
                }).then((xoahopdong) => {
                    if (xoahopdong) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('idus', idus);

                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/xoaHopDong',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANHSACH") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                            } else {
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
                                        swal("Thành Công!", "Đã xóa bỏ một hợp đồng", {
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Sửa hợp đồng
    $('[id^="chinhsuaHD"]').on('click', function () {
        let id = $(this).attr('name');
        $('#chinhsuaidhopdong').val(id);
        $('#chinhsuangaykyhopdong').val($('#ngaybatdauInput' + id).val());
        $('#chinhsuangaygiahanhopdong').val($('#ngayketthucInput' + id).val());

        $('#chonLoaiHopDongChinhSua').val($('#loaihopdongInput' + id).val()).prop('selected', true);
        if ($('#loaihopdongInput' + id).val() == "Hợp đồng có thời hạn") {
            $("#taiAnhHopDongChinhSua").addClass("col-md-12");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-4");

            $('#ketthucHopDongChinhSua').prop('hidden', false);
        } else {
            $("#taiAnhHopDongChinhSua").addClass("col-md-4");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-12");

            $('#ketthucHopDongChinhSua').prop('hidden', true);
        }


        $('#previewEditImage').replaceWith('<img style="margin: 30px 30px 30px 30px; max-width:720px" src="' + $('#hinhanhInput' + id).val() + '" alt="Gallery image 1" class="gallery__img rounded-3" id="previewEditImage">');
    });

    //Chọn ảnh chỉnh sửa hợp đồng
    $('#chinhsuachonanhhopdongmoi').on('click', function () {
        $('#chinhsuaselectFiles').click();
    });

    //Lưu chỉnh sửa hợp đồng
    $('#LuuChinhSuaHopDong').on('click', function () {

        $('#ChinhSualoaihopdongvalidation').text("").hide();
        $('#chinhsuangaykyhopdongvalidation').text("").hide();
        $('#chinhsuangaygiahanhopdongvalidation').text("").hide();
        $('#chinhsuaselectFilesvalidation').text("").hide();

        let idus = $('#idus').val();

        let id = $('#chinhsuaidhopdong').val();
        let batdau = $('#chinhsuangaykyhopdong').val();
        let ketthuc = $('#chinhsuangaygiahanhopdong').val();
        let loaihopdong = $('#chonLoaiHopDongChinhSua :selected').val();


        var checkhopdongtaikhoan = true;


        //Check
        //Loại hợp đồng
        if (loaihopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ChinhSualoaihopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Ngày ký hđ
        if (batdau.length < 1) {
            checkhopdongtaikhoan = false;
            $('#chinhsuangaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        var checkDates = parseInt(ketthuc.replace(/-/g, '').trim()) - parseInt(batdau.replace(/-/g, '').trim());
        //ngày kết thúc hợp đồng
        if (loaihopdong == "Hợp đồng có thời hạn") {
            if (ketthuc.length < 1) {
                checkhopdongtaikhoan = false;
                $('#chinhsuangaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (checkDates < 0) {
                checkhopdongtaikhoan = false;
                $('#chinhsuangaygiahanhopdongvalidation').text("Ngày gia hạn/kết thúc không thể nhỏ hơn ngày bắt đầu.").show();
            }
        }
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            formData.append('anhHopDong', $("#chinhsuaselectFiles")[0].files[0]);
            formData.append('ngaykyhopdong', batdau);
            formData.append('ngaygiahanhopdong', ketthuc);
            formData.append('id', id);
            formData.append('idus', idus);
            formData.append('loaihopdong', loaihopdong);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/suaHopDong',
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
                    $('#dongChinhSuaHopDongCanvas').click();
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
                            swal("Thành Công!", "Đã lưu thông tin chỉnh sửa hợp đồng", {
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Hủy thêm hợp đồng
    $('#dongthemhopdong').on('click', function () {
        $('#previewImage').replaceWith('<img style="max-width: 700px;" src="' + $('#requestPath').val() + 'Content/Admin/assets/images/png/hopdong-default.png" alt="Gallery image 1" class="gallery__img rounded-3" id="previewImage">');

        $("#taiAnhHopDong").addClass("col-md-4");
        $("#taiAnhHopDong").removeClass("col-md-12");

        $('#ketthucHopDong').prop('hidden', true);
    });

    //Chọn ảnh hợp đồng mới
    $('#chonanhhopdongmoi').on('click', function () {
        $('#selectFiles').click();
    });

    //Lưu thêm HĐ mới
    $('#themHopDongMoi').on('click', function () {

        $('#themloaihopdongvalidation').text("").hide();
        $('#ngaykyhopdongvalidation').text("").hide();
        $('#ngaygiahanhopdongvalidation').text("").hide();
        $('#selectFilesvalidation').text("").hide();

        let id = $('#idus').val();

        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let selectFiles = $('#selectFiles').val();
        let loaihopdong = $('#loaiHopDong :selected').val();

        var checkhopdongtaikhoan = true;
        //Check
        //Loại hợp đồng
        if (loaihopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#themloaihopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Ngày ký hđ
        if (ngaykyhopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        var checkDates = parseInt(ngaygiahanhopdong.replace(/-/g, '').trim()) - parseInt(ngaykyhopdong.replace(/-/g, '').trim());
        //ngày kết thúc hợp đồng
        if (loaihopdong == "Hợp đồng có thời hạn") {
            if (ngaygiahanhopdong.length < 1) {
                checkhopdongtaikhoan = false;
                $('#ngaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (checkDates < 0) {
                checkhopdongtaikhoan = false;
                $('#ngaygiahanhopdongvalidation').text("Ngày gia hạn/kết thúc không thể nhỏ hơn ngày bắt đầu.").show();
            }
        }

        if (selectFiles.length < 1) {
            checkhopdongtaikhoan = false;
            $('#selectFilesvalidation').text("Không được bỏ trống thông tin này! Vui lòng tải ảnh hợp đồng.").show();
        }
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            formData.append('anhHopDong', $("#selectFiles")[0].files[0]);
            formData.append('ngaykyhopdong', ngaykyhopdong);
            formData.append('ngaygiahanhopdong', ngaygiahanhopdong);
            formData.append('id', id);
            formData.append('loaihopdong', loaihopdong);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/themHopDongMoi',
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
                    $('#dongModalHopDongMoi').click();
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
                            swal("Thành Công!", "Đã thêm một hợp đồng", {
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

    // LƯU THÔNG TIN LÀM VIỆC
    $('#btnLuuThongTin').on('click', function (e) {

        $('#ngayvaolamvalidation').text("").hide();
        $('#vaitrovalidation').text("").hide();
        $('#hinhthucvalidation').text("").hide();
        $('#usernamevalidation').text("").hide();
        $('#matkhaudangnhapvalidation').text("").hide();
        $('#nhaplaimatkhaudangnhapvalidation').text("").hide();

        let id = $('#idus').val();
        //Hợp đồng & Tài khoản
        let matkhaudangnhap = $('#matkhaudangnhap').val().trim();
        let nhaplaimatkhaudangnhap = $('#nhaplaimatkhaudangnhap').val().trim();
        var captaikhoancheck = false;
        if ($('#cungCapTaiKhoan').prop('checked')) {
            captaikhoancheck = true;
        }

        let ngayvaolam = $('#ngayvaolam').val();
        let bophan = $('#bophan :selected').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var checkhopdongtaikhoan = true;


        //Check
        //Ngày vào làm
        if (ngayvaolam.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngayvaolamvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Bộ phận
        if (bophan.length < 1) {
            checkhopdongtaikhoan = false;
            $('#bophanvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Chức danh
        if (vaitro.length < 1) {
            checkhopdongtaikhoan = false;
            $('#vaitrovalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Hình thức
        if (hinhthuc.length < 1) {
            checkhopdongtaikhoan = false;
            $('#hinhthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Cấp tài khoản
        if ($('#cungCapTaiKhoan').prop('checked')) {
            // Validation mật khẩu
            if (matkhaudangnhap.length == 0) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (matkhaudangnhap.length < 8) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            }
            else if (matkhaudangnhap.length > 20) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            }
            else if (formatss.test(matkhaudangnhap) == false || formatLower.test(matkhaudangnhap) == false || formatUpper.test(matkhaudangnhap) == false || formatnumber.test(matkhaudangnhap) == false) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            }
            // end Validation mật khẩu

            // Validation nhập lại mk
            if (nhaplaimatkhaudangnhap.length < 1) {
                checkhopdongtaikhoan = false;
                $('#nhaplaimatkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (matkhaudangnhap != nhaplaimatkhaudangnhap) {
                checkhopdongtaikhoan = false;
                $('#nhaplaimatkhaudangnhapvalidation').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
            }
            // end Validation nhập lại mk
        }
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Hợp đồng & Tài khoản
            formData.append('ngayvaolam', ngayvaolam);
            formData.append('vaitro', vaitro);
            formData.append('hinhthuc', hinhthuc);
            formData.append('captaikhoancheck', captaikhoancheck);
            formData.append('matkhaudangnhap', matkhaudangnhap);
            e.preventDefault();
            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaViecLamHopDong',
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
        }
    });
    //

    $('#reloadPage').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/hopDongPartial?id=' + $('#idus').val(),
            type: 'GET',
            dataType: 'html'
        }).done(function (ketqua) {
            if (ketqua !== "DANHSACH") {
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
            }
            else {
                window.location.href = $('#actionDanhsach').data('request-url');
            }
        });
    });
});