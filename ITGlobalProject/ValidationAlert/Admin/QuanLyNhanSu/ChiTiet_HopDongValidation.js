$(document).ready(function () {

    //...............

    //Cung cấp tài khoản
    $('#cungCapTaiKhoan').on('change', function () {
        if ($('#cungCapTaiKhoan').prop('checked')) {
            $("#matkhaudangnhap").prop('disabled', false);
            $("#nhaplaimatkhaudangnhap").prop('disabled', false);
            $('#lbNhapMatKhau').prop('hidden', false);
            $('#lbNhapLaiMatKhau').prop('hidden', false);

        } else {
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

    $('#LuuChinhSuaHopDong').on('click', function () {
        let idus = $('#idus').val();

        let id = $('#chinhsuaidhopdong').val();
        let batdau = $('#chinhsuangaykyhopdong').val();
        let ketthuc = $('#chinhsuangaygiahanhopdong').val();
        let loaihopdong = $('#chonLoaiHopDongChinhSua :selected').val();

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
        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let selectFiles = $('#selectFiles').val();
        let id = $('#idus').val();
        let loaihopdong = $('#loaiHopDong :selected').val();

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
    });

    $('#btnLuuThongTin').on('click', function (e) {
        let id = $('#idus').val();
        //Hợp đồng & Tài khoản

        let matkhaudangnhap = $('#matkhaudangnhap').val();
        let nhaplaimatkhaudangnhap = $('#nhaplaimatkhaudangnhap').val();

        let ngayvaolam = $('#ngayvaolam').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();

        let captaikhoancheck = false;
        if ($('#cungCapTaiKhoan').prop('checked')) {
            captaikhoancheck = true;
        }
        //Check

        //Done
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
    });

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