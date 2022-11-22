$(document).ready(function () {
    $('#luKhachHangCu').hide();
    $('#NavthongTinKhachHangCu').hide();

    //Chọn khách hàng có sẵn
    $('[id^="selectKhachHangCu"]').on('click', function () {
        var id = $(this).attr("name");

        $('#tatDanhSachKHCu').click();

        $('#luKhachHang').hide();
        $('#NavthongTinKhachHang').hide();

        $('#luKhachHangCu').show();
        $('#NavthongTinKhachHangCu').show();

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

        var avt = $('#avts').val();
        if (avt.length <= 0) {
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

        $('#idKhachHang').val("");

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
        if (sott === 1) {
            alert("Còn có 1 cái thôi đừng xóa nữa");
        }
        else {
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
        if (sott > 5) {
            alert("5 cái thôi nhiều quá rồi");
        } else {
            let nd = "'alias': 'decimal', 'groupSeparator': ','";
            $('#appenddayne').replaceWith('<label style="font-weight:bold" for="ipcpgd' + sott + '" class="form-label">Giai đoạn ' + sott + ' </label>'
                + '<div id="ipcpgd' + sott + '" class="mb-3 col-md-6 col-12"><input id="gd' + sott + '" name="gd' + sott + '" type="text" style="font-weight:bold;" data-inputmask="' + nd + '" inputmode="numeric" class="form-control text-start text-danger" placeholder="Chi phí giai đoạn ' + sott + '" required /></div>'
                + '<div id="ipdgd' + sott + '" class="mb-3 col-md-6 col-12"><div class="input-group me-3"><input id="ngaygd' + sott + '" name="ngaygd' + sott + '" class="form-control flatpickr" type="text" placeholder="Ngày kết thúc giai đoạn ' + sott + '" aria-describedby="basic-addon-gd' + sott + '" required>'
                + '<span class="input-group-text text-muted" id="basic-addon-gd3"><i class="fe fe-calendar"></i></span>'
                + '</div></div><div id="appenddayne"></div>');
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
        //Du án
        var name = $('#name').val();
        var mota = $('#mota').val();
        var batdau = $('#batdau').val();
        var ketthuc = $('#ketthuc').val();

        var dem = $('#dem').val();
        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            if ($('#ngaygd' + i).val().length == 0) {
                //Thông báo lỗi lên
                continue;
            }

            if ($('#gd' + i).val().length == 0) {
                //Thông báo lỗi lên
                continue;
            }
            //Chuẩn r thì làm
            if (i == dem) {
                giaidoan += $('#ngaygd' + i).val();
                chiphi += $('#gd' + i).val();
            }
            else {
                giaidoan += $('#ngaygd' + i).val() + "_";
                chiphi += $('#gd' + i).val() + "_";
            }
        }
        //Khách hàng
        var avatar = $("#selectFiles")[0].files[0];
        var namedn = $('#namedn').val();
        var hoten = $('#hoten').val();
        var cmnd = $('#cmnd').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var ngaysinh = $('#ngaysinh').val();
        var gioitinh = $('#gioitinh :selected').val();
        var diahchinha = $('#diahchinha').val();

        //Check gì đó



        //Check đúng hết thì làm
        $('#AjaxLoader').show();
        var formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('name', name);
        formData.append('mota', mota);
        formData.append('batdau', batdau);
        formData.append('ketthuc', ketthuc);
        formData.append('giaidoan', giaidoan);
        formData.append('chiphi', chiphi);
        formData.append('namedn', namedn);
        formData.append('hoten', hoten);
        formData.append('cmnd', cmnd);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('ngaysinh', ngaysinh);
        formData.append('gioitinh', gioitinh);
        formData.append('diahchinha', diahchinha);

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

    });

    $('#luuThongTinKHCu').on('click', function () {
        //Du án
        var name = $('#name').val();
        var mota = $('#mota').val();
        var batdau = $('#batdau').val();
        var ketthuc = $('#ketthuc').val();

        var dem = $('#dem').val();
        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            if ($('#ngaygd' + i).val().length == 0) {
                //Thông báo lỗi lên
                continue;
            }

            if ($('#gd' + i).val().length == 0) {
                //Thông báo lỗi lên
                continue;
            }
            //Chuẩn r thì làm
            if (i == dem) {
                giaidoan += $('#ngaygd' + i).val();
                chiphi += $('#gd' + i).val();
            }
            else {
                giaidoan += $('#ngaygd' + i).val() + "_";
                chiphi += $('#gd' + i).val() + "_";
            }
        }
        //Khách hàng
        var id = $('#idKhachHang').val();
        alert(id);

        //Check đúng hết thì làm
        $('#AjaxLoader').show();
        var formData = new FormData();
        formData.append('name', name);
        formData.append('mota', mota);
        formData.append('batdau', batdau);
        formData.append('ketthuc', ketthuc);
        formData.append('giaidoan', giaidoan);
        formData.append('chiphi', chiphi);
        formData.append('id', id);

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

    });

});