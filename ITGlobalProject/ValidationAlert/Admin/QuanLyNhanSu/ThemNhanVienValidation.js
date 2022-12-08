$(document).ready(function () {

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

    //Chọn ảnh hợp đồng
    $('#chonanhhopdong').on('click', function () {
        $('#selectFiles').click();
    });

    //Thêm ngoại ngữ
    $('#themngoaingu').on('click', function (e) {
        let sott = Number($('#demngoaingu').val()) + 1;
        if (sott > 10) {
            alert("10 thôi nhiều d");
        }
        else {
            $('#appendngoaingudayne').replaceWith(
                '<div id="grtenngoaingu' + sott + '" class="mb-2 col-12 col-md-3 py-2">'
                + '<label style="font-weight:bold;" class="form-label">Ngoại ngữ ' + sott + ' <span class="text-danger">*</span></label>'
                + '<input class="form-control" id="strtenngoaingu' + sott + '" placeholder="Tên ngoại ngữ" />'
                + '<p style="font-size: 13px; color:red;" id="strtenngoaingu' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grtrinhdongoaingu' + sott + '" class="mb-2 col-12 col-md-9 py-2">'
                + '<label style="font-weight:bold;" class="form-label">Trình độ kỹ năng <span class="text-danger">*</span></label>'
                + '<div class="input-group">'
                + '<span class="input-group-text bg-dark text-light">L</span>'
                + '<select class="form-select text-dark" id="trinhdol' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Listening</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">S</span>'
                + '<select class="form-select text-dark" id="trinhdos' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Speaking</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">R</span>'
                + '<select class="form-select text-dark" id="trinhdor' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Reading</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">W</span>'
                + '<select class="form-select text-dark" id="trinhdow' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Writing</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '</div>'

                + '<p style="font-size: 13px; color:red;" id="trinhdo' + sott + 'validation"></p>'

                + '</div>'
                + '<div id="appendngoaingudayne" class="col-12"></div>'
            );

            $('#strtenngoaingu' + sott + 'validation').hide();
            $('#trinhdol' + sott + 'validation').hide();
            $('#trinhdos' + sott + 'validation').hide();
            $('#trinhdor' + sott + 'validation').hide();
            $('#trinhdow' + sott + 'validation').hide();

            var elem = document.getElementById('demngoaingu');
            elem.value = sott;
        }
    });

    //xóa ngoại ngữ
    $('#xoabotngoaingu').on('click', function (e) {
        let sott = Number($('#demngoaingu').val());
        if (sott === 0) {
        }
        else {
            $('#grtenngoaingu' + sott).remove();
            $('#grtrinhdongoaingu' + sott).remove();

            var elem = document.getElementById('demngoaingu');
            elem.value = sott - 1;
        }
    });

    //Thêm nhân thân
    $('#themnhanthan').on('click', function (e) {
        let sott = Number($('#dem').val()) + 1;
        if (sott > 10) {
            alert("10 thôi nhiều d");
        }
        else {
            $('#appenddayne').replaceWith(
                '<div id="grhotennhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label">Họ & Tên nhân thân ' + sott + ' <span class="text-danger">*</span></label>'
                + '<input id="hotennhanthan' + sott + '" name="hotennhanthan' + sott + '" type="text" class="form-control" placeholder="Họ và Tên người phụ thuộc" />'
                + '<p style="font-size: 13px; color:red;" id="hotennhanthan' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grmoiquanhenhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label"> Mối quan hệ <span class="text-danger">*</span></label>'
                + '<input id="moiquanhenhanthan' + sott + '" name="moiquanhenhanthan' + sott + '" type="text" class="form-control" placeholder="Mối quan hệ với người phụ thuộc" />'
                + '<p style="font-size: 13px; color:red;" id="moiquanhenhanthan' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grngaysinhnhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label" > Ngày sinh <span class="text-danger">*</span></label>'
                + '<input type="text" class="form-control flatpickr" placeholder="Chọn ngày sinh" id="ngaysinhnhanthan' + sott + '" name="ngaysinhnhanthan' + sott + '" />'
                + '<p style="font-size: 13px; color:red;" id="ngaysinhnhanthan' + sott + 'validation"></p>'
                + '</div>'
                + ' <div id="appenddayne" class="col-12"></div>');

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

    //xóa nhân thân
    $('#xoabotnhanthan').on('click', function (e) {
        let sott = Number($('#dem').val());
        if (sott === 0) {
        }
        else {
            $('#grhotennhanthan' + sott).remove();
            $('#grmoiquanhenhanthan' + sott).remove();
            $('#grngaysinhnhanthan' + sott).remove();

            var elem = document.getElementById('dem');
            elem.value = sott - 1;
        }
    });

    //Lưu thông tin
    $('#btnThemMoi').on('click', function (e) {

        var format = /[`!#$%^&*()+\=\[\]{};':"\\|,@.-_<>\/?~]/;
        var formatTextVN = / àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        //Thông Tin Cá Nhân
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val();
        let quoctich = $('#quoctich').val();
        let honnhan = $('#honnhan :selected').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();

        var checkthongtincanhan = true;

        if (hoten.length < 1) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
        }
        else if (hoten.length > 50) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
        }
        else if (format.test(hoten) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');

        }
        else if (formatnumber.test(hoten) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
        }

        if (cmnd.length < 1) {
            checkthongtincanhan = false;
            $("#cmndvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');

        }
        if (quoctich.length < 1) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
        }
        else if (quoctich.length > 50) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');

        }
        else if (formatnumber.test(quoctich) == true) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
        }
        if (honnhan.length < 1) {
            checkthongtincanhan = false;
            $("#honnhanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
        }
        if (ngaysinh.length < 1) {
            checkthongtincanhan = false;
            $("#ngaysinhvalidation").text("Không được bỏ trống thông tin này!").show();
            $('#collapseOne').collapse('show');
        }
        if (gioitinh.length < 1) {
            checkthongtincanhan = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
        }
        if (diachinha > 250) {
            checkthongtincanhan = false;
            $("#diachinhavalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
        }
        if (checkthongtincanhan == true) {
            $("#hotenvalidation").text("").hide();
            $("#cmndvalidation").text("").hide();
            $("#quoctichvalidation").text("").hide();
            $("#honnhanvalidation").text("").hide();
            $("#ngaysinhvalidation").text("").hide();
            $("#diachinhavalidation").text("").hide();
        }

        // end validation

        //Liên Hệ & Thanh Toán
        let sodienthoaididong = $('#sodienthoaididong').val();
        let sodienthoaikhac = $('#sodienthoaikhac').val();
        let diachiemailcongty = $('#diachiemailcongty').val();
        let diachiemailkhac = $('#diachiemailkhac').val();
        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#tenNganHang').val();
        let sotaikhoan = $('#sotaikhoan').val();
        let chutaikhoan = $('#chutaikhoan').val();

        var checklienhethanhtoan = true;

        if (sodienthoaididong.length < 1) {
            checklienhethanhtoan = false;
            $("#sodienthoaididongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');
        }
        if (diachiemailcongty.length < 1) {
            checklienhethanhtoan = false;
            $("#diachiemailcongtyvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');

        }
        else if (diachiemailcongty.length > 50) {
            checklienhethanhtoan = false;
            $("#diachiemailcongtyvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');

        }
        if (diachiemailkhac.length > 50) {
            checklienhethanhtoan = false;
            $("#diachiemailkhacvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');

        }
        if (mucluong.length < 1) {
            checklienhethanhtoan = false;
            $("#mucluongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');

        }
        if (dsNganHang.length < 1) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');

        }
        else if (dsNganHang.length > 100) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');

        }
        else if (formatnumber.test(dsNganHang) == true) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');

        }
        if (sotaikhoan.length < 1) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');

        }
        else if (sotaikhoan.length > 50) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');

        }

        else if (format.test(sotaikhoan) == true || formatLower.test(sotaikhoan) == true || formatUpper.test(sotaikhoan) == true || formatTextVN.test(sotaikhoan) == true) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');

        }
        if (chutaikhoan.length < 1) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');

        }
        else if (chutaikhoan.length > 50) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');

        }
        else if (formatnumber.test(chutaikhoan) == true) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');

        }
        if (checklienhethanhtoan == true) {
            $("#sodienthoaididongvalidation").text("").hide();
            $("#diachiemailcongtyvalidation").text("").hide();
            $("#diachiemailkhacvalidation").text("").hide();
            $("#mucluongvalidation").text("").hide();
            $("#tennganhangvalidation").text("").hide();
            $("#sotaikhoanvalidation").text("").hide();
            $("#chutaikhoanvalidation").text("").hide
            $("#mucluongvalidation").text("").hide();
        }

        // end validation

        //Kỹ Năng Chuyên Môn, lấy biến [kynang]
        let kynang = "";

        let tongSoKyNang = $('#slkn').val();
        let tongSoKyNangDuocChon = $('input[name^=checkkynang]:checked').length;
        let demSoLuong = 1;
        for (var i = 1; i <= tongSoKyNang; i++) {

            var checkedKyNang = $('[name="checkkynang' + i + '"]');

            if (demSoLuong === tongSoKyNangDuocChon) {
                if (checkedKyNang.is(':checked')) {
                    kynang += checkedKyNang.attr('id');
                    break;
                }
            }
            else {
                if (checkedKyNang.is(':checked')) {
                    kynang += checkedKyNang.attr('id') + "_";
                    demSoLuong++;
                }
            }
        }



        // end validation

        //Trình độ ngoại ngữ, lấy biến [trinhdongoaingu]
        let trinhdongoaingu = "";
        let soluongngoaingu = $('#demngoaingu').val();

        var checkngoaingu = true;

        if (soluongngoaingu > 0) {
            for (var i = 1; i <= soluongngoaingu; i++) {
                if (i == soluongngoaingu) {
                    if ($('#strtenngoaingu' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                    }

                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                    }
                    if (checkngoaingu == true) {
                        $('#strtenngoaingu' + i + 'validation').hide();
                        $('#trinhdo' + i + 'validation').hide();
                        trinhdongoaingu += $('#strtenngoaingu' + i).val()
                            + "_" + $('#trinhdol' + i + ' :selected').val()
                            + "_" + $('#trinhdos' + i + ' :selected').val()
                            + "_" + $('#trinhdor' + i + ' :selected').val()
                            + "_" + $('#trinhdow' + i + ' :selected').val();
                    }
                }
                else {
                    if ($('#strtenngoaingu' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');

                    }
                   
                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1)  {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                    }
                    if (checkngoaingu == true) {
                        $('#strtenngoaingu' + i + 'validation').hide();
                        $('#trinhdo' + i + 'validation').hide();
                        trinhdongoaingu += $('#strtenngoaingu' + i).val()
                            + "_" + $('#trinhdol' + i + ' :selected').val()
                            + "_" + $('#trinhdos' + i + ' :selected').val()
                            + "_" + $('#trinhdor' + i + ' :selected').val()
                            + "_" + $('#trinhdow' + i + ' :selected').val()
                            + "=";
                    }
                }
            }
        }



        // end validation

        //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
        let phuthuocnhanthan = "";
        let soluongnhanthan = $('#dem').val();

        var checknhanthan = false;

        if (soluongnhanthan > 0) {
            for (var i = 1; i <= soluongnhanthan; i++) {
                if (i == soluongnhanthan) {
                    if ($('#hotennhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if ($('#moiquanhenhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checknhanthan == true) {
                        $('#hotennhanthan' + i + 'validation').hide();
                        $('#moiquanhenhanthan' + i + 'validation').hide();
                        $('#ngaysinhnhanthan' + i + 'validation').hide();
                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val();
                    }
                }
                else {
                    if ($('#hotennhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if ($('#moiquanhenhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checknhanthan == true) {
                        $('#hotennhanthan' + i + 'validation').hide();
                        $('#moiquanhenhanthan' + i + 'validation').hide();
                        $('#ngaysinhnhanthan' + i + 'validation').hide();
                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val()
                            + "=";
                    }
                }
            }
        }
        // end validation

        //Trợ Cấp & Phụ Cấp, lấy biến [trocap] TỚI ĐÂY NÈ
        let trocap = "";

        let tongSoTroCap = $('#sltc').val();
        let tongSoTroCapDuocChon = $('input[name^=checktrocap]:checked').length;
        let demSoLuongTroCap = 1;
        for (var i = 1; i <= tongSoTroCap; i++) {

            var checkedTroCap = $('[name="checktrocap' + i + '"]');

            if (demSoLuongTroCap === tongSoTroCapDuocChon) {
                if (checkedTroCap.is(':checked')) {
                    trocap += checkedTroCap.attr('id').replace("pc", "");
                    break;
                }
            }
            else {
                if (checkedTroCap.is(':checked')) {
                    trocap += checkedTroCap.attr('id').replace("pc", "") + "_";
                    demSoLuongTroCap++;
                }
            }
        }




        // end validation

        //Hợp đồng & Tài khoản
        let ngayvaolam = $('#ngayvaolam').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();
        let matkhaudangnhap = $('#matkhaudangnhap').val();
        let nhaplaimatkhaudangnhap = $('#nhaplaimatkhaudangnhap').val();
        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let loaihopdong = $('#loaiHopDong :selected').val();
        let selectFiles = $('#selectFiles').val();

        var checkhopdongtaikhoan = false;


        if (ngayvaolam.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngayvaolamvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
        }
        if (vaitro.length < 1) {
            checkhopdongtaikhoan = false;
            $('#vaitrovalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');

        }
        if (hinhthuc.length < 1) {
            checkhopdongtaikhoan = false;
            $('#hinhthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');

        }
        if (username.length < 1) {
            checkhopdongtaikhoan = false;
            $('#usernamevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
        }
        else if (username.length > 50) {
            checkhopdongtaikhoan = false;
            $('#usernamevalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse3').collapse('show');
        }
        // Validation mật khẩu
        if (matkhaudangnhap.length == 0) {
            checkhopdongtaikhoan = false;
            $('#matkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');

        }
        else if (matkhaudangnhap.length < 8) {
            checkhopdongtaikhoan = false;
            $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            $('#collapse3').collapse('show');
        }
        else if (matkhaudangnhap.length > 20) {
            checkhopdongtaikhoan = false;
            $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            $('#collapse3').collapse('show');
        }
        else if (format.test(matkhaudangnhap) == false || formatLower.test(matkhaudangnhap) == false || formatUpper.test(matkhaudangnhap) == false || formatnumber.test(matkhaudangnhap) == false) {
            checkhopdongtaikhoan = false;
            $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
            $('#collapse3').collapse('show');
        }
        // end Validation mật khẩu
        // Validation nhập lại mk
        if (nhaplaimatkhaudangnhap.length < 1) {
            checkhopdongtaikhoan = false;
            $('#nhaplaimatkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
        }
        else if (matkhaudangnhap != nhaplaimatkhaudangnhap) {
            checkhopdongtaikhoan = false;
            $('#nhaplaimatkhaudangnhapvalidation').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
            $('#collapse3').collapse('show');
        }
        // end Validation nhập lại mk

        if (ngaykyhopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
        }
        if (ngaygiahanhopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
        }
        if (selectFiles.length < 1) {
            checkhopdongtaikhoan = false;
            $('#selectFilesvalidation').text("Không được bỏ trống thông tin này! Vui lòng tải ảnh hợp đồng.").show();
            $('#collapse3').collapse('show');
        }
        if (checkhopdongtaikhoan == true) {
            $('#ngayvaolamvalidation').text("").hide();
            $('#vaitrovalidation').text("").hide();
            $('#hinhthucvalidation').text("").hide();
            $('#usernamevalidation').text("").hide();
            $('#matkhaudangnhapvalidation').text("").hide();
            $('#nhaplaimatkhaudangnhapvalidation').text("").hide();
            $('#ngaykyhopdongvalidation').text("").hide();
            $('#ngaygiahanhopdongvalidation').text("").hide();
            $('#selectFilesvalidation').text("").hide();
        }

        // end validation
        if (checkthongtincanhan == true && checklienhethanhtoan == true && checkngoaingu == true &&
            checknhantha == true && checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('anhHopDong', $("#selectFiles")[0].files[0]);
            formData.append('hoten', hoten);
            formData.append('cmnd', cmnd);
            formData.append('quoctich', quoctich);
            formData.append('honnhan', honnhan);
            formData.append('ngaysinh', ngaysinh);
            formData.append('gioitinh', gioitinh);
            formData.append('diachinha', diachinha);
            //Liên Hệ & Thanh Toán
            formData.append('sodienthoaididong', sodienthoaididong);
            formData.append('sodienthoaikhac', sodienthoaikhac);
            formData.append('diachiemailcongty', diachiemailcongty);
            formData.append('diachiemailkhac', diachiemailkhac);
            formData.append('mucluong', mucluong);
            formData.append('dsNganHang', dsNganHang);
            formData.append('sotaikhoan', sotaikhoan);
            formData.append('chutaikhoan', chutaikhoan);
            //Kỹ Năng Chuyên Môn, lấy biến [kynang]
            formData.append('kynang', kynang);
            //Trình độ ngoại ngữ, lấy biến [trinhdongoaingu]
            formData.append('trinhdongoaingu', trinhdongoaingu);
            //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
            formData.append('phuthuocnhanthan', phuthuocnhanthan);
            //Trợ Cấp & Phụ Cấp, lấy biến [trocap]
            formData.append('trocap', trocap);
            //Hợp đồng & Tài khoản
            formData.append('ngayvaolam', ngayvaolam);
            formData.append('vaitro', vaitro);
            formData.append('hinhthuc', hinhthuc);
            formData.append('username', username);
            formData.append('matkhaudangnhap', matkhaudangnhap);
            formData.append('ngaykyhopdong', ngaykyhopdong);
            formData.append('ngaygiahanhopdong', ngaygiahanhopdong);

            e.preventDefault();
            $('#AjaxLoader').show();
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
                    alert("Đã có xảy ra lỗi, vui lòng thử lại");
                }
                else {
                    $('#tatcanvas').click();
                    $('#resetDuLieu').click();
                    $('#pagess2').replaceWith('<div id="pagess2" class="row">' + ketqua + '</div>');
                    var soluongNV = parseInt($('#soLuongNV').val()) + 1;
                    $('#showSLNV').text('(' + soluongNV + ')');
                    $('#soLuongNV').val(soluongNV);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Tuyệt quá! Nhân viên đã được thêm vào danh sách.", {
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
    //Reset
    $('#reserData').on('click', function () {
        let dem = $('#demngoaingu').val();
        let bandau = $('#ngoaingubandau').val();
        if (dem > bandau) {
            for (var i = dem; i > bandau; i--) {
                $('#grtenngoaingu' + i).remove();
                $('#grtrinhdongoaingu' + i).remove();
                $('#gachngang' + i).remove();
            }
        }

        let demnhanthan = $('#dem').val();
        let bandaunhanthan = $('#nhanthanbandau').val();
        if (demnhanthan > bandaunhanthan) {
            for (var i = demnhanthan; i > bandaunhanthan; i--) {
                $('#grhotennhanthan' + i).remove();
                $('#grmoiquanhenhanthan' + i).remove();
                $('#grngaysinhnhanthan' + i).remove();
            }
        }

        $("#matkhaudangnhap").prop('disabled', true);
        $("#nhaplaimatkhaudangnhap").prop('disabled', true);
        $('#lbNhapMatKhau').prop('hidden', true);
        $('#lbNhapLaiMatKhau').prop('hidden', true);

        $('#previewImage').replaceWith('<img style="max-width: 700px;" src="' + $('#requestPath').val() + 'Content/Admin/assets/images/png/hopdong-default.png" alt="Gallery image 1" class="gallery__img rounded-3" id="previewImage">');
    });

});
