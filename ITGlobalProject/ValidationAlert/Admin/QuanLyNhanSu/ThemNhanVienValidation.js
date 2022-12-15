$(document).ready(function () {

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

            $("#taiAnhHopDong").addClass("col-md-8");
            $("#taiAnhHopDong").removeClass("col-md-12");

            $('#ketthucHopDong').prop('hidden', false);
        } else {
            $("#taiAnhHopDong").addClass("col-md-12");
            $("#taiAnhHopDong").removeClass("col-md-8");

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

        $('p[id$="alidation"]').each(function () {
            $(this).text("").hide();
        })

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        //Thông Tin Cá Nhân
        let hoten = $('#hoten').val().trim();
        let cmnd = $('#cmnd').val().replace("_", "");
        let quoctich = $('#quoctich').val().trim();
        let honnhan = $('#honnhan :selected').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val().trim();
        let sodienthoaididong = $('#sodienthoaididong').val().replace("_", "");
        let sodienthoaikhac = $('#sodienthoaikhac').val().replace("_", "");
        let diachiemailcongty = $('#diachiemailcongty').val();
        let diachiemailkhac = $('#diachiemailkhac').val();


        var checkthongtincanhan = true;

        if (hoten.length < 1) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        else if (hoten.length > 50) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        else if (formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');

        }
        else if (formatnumber.test(hoten) == true) {
            checkthongtincanhan = false;
            $("#hotenvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }

        if (cmnd.length < 1) {
            checkthongtincanhan = false;
            $("#cmndvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');

        } else if (cmnd.length != 14 && cmnd.length != 11) {
            checkthongtincanhan = false;
            $("#cmndvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        if (quoctich.length < 1) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        else if (quoctich.length > 50) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');

        }
        else if (formatnumber.test(quoctich) == true) {
            checkthongtincanhan = false;
            $("#quoctichvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }

        if (sodienthoaididong.length < 1) {
            checkthongtincanhan = false;

            $("#sodienthoaididongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        } else if (sodienthoaididong.length != 12) {
            checkthongtincanhan = false;
            $("#sodienthoaididongvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }

        if (sodienthoaikhac.length > 0) {
            if (sodienthoaikhac.length != 12) {
                checkthongtincanhan = false;
                $("#sodienthoaikhacvalidation").text("Vui lòng nhập đầy đủ thông tin này!").show();
                $('#collapseOne').collapse('show');
                $('#hoantatttcanhan').addClass('fe-x-circle');
                $('#hoantatttcanhan').addClass('text-danger');
                $('#hoantatttcanhan').removeClass('fe-check-circle');
                $('#hoantatttcanhan').removeClass('text-success');

            }
        }

        if (diachiemailcongty.length < 1) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');

        } else if (formatEmail.test(diachiemailcongty) == false) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        else if (diachiemailcongty.length > 50) {
            checkthongtincanhan = false;
            $("#diachiemailcongtyvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');

        }
        if (diachiemailkhac.length > 0) {
            if (diachiemailkhac.length > 50) {
                checkthongtincanhan = false;
                $("#diachiemailkhacvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
                $('#collapseOne').collapse('show');
                $('#hoantatttcanhan').addClass('fe-x-circle');
                $('#hoantatttcanhan').addClass('text-danger');
                $('#hoantatttcanhan').removeClass('fe-check-circle');
                $('#hoantatttcanhan').removeClass('text-success');
            }
            else if (formatEmail.test(diachiemailkhac) == false) {
                checkthongtincanhan = false;
                $("#diachiemailkhacvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                $('#collapseOne').collapse('show');
                $('#hoantatttcanhan').addClass('fe-x-circle');
                $('#hoantatttcanhan').addClass('text-danger');
                $('#hoantatttcanhan').removeClass('fe-check-circle');
                $('#hoantatttcanhan').removeClass('text-success');
            }
        }

        if (honnhan.length < 1) {
            checkthongtincanhan = false;
            $("#honnhanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        if (ngaysinh.length < 1) {
            checkthongtincanhan = false;
            $("#ngaysinhvalidation").text("Không được bỏ trống thông tin này!").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        if (gioitinh.length < 1) {
            checkthongtincanhan = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }
        if (diachinha > 250) {
            checkthongtincanhan = false;
            $("#diachinhavalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapseOne').collapse('show');
            $('#hoantatttcanhan').addClass('fe-x-circle');
            $('#hoantatttcanhan').addClass('text-danger');
            $('#hoantatttcanhan').removeClass('fe-check-circle');
            $('#hoantatttcanhan').removeClass('text-success');
        }

        if (checkthongtincanhan == true) {
            $("#hotenvalidation").text("").hide();
            $("#cmndvalidation").text("").hide();
            $("#quoctichvalidation").text("").hide();
            $("#honnhanvalidation").text("").hide();
            $("#ngaysinhvalidation").text("").hide();
            $("#diachinhavalidation").text("").hide();
            $("#sodienthoaididongvalidation").text("").hide();
            $("#sodienthoaikhacvalidation").text("").hide();
            $("#gioitinhvalidation").text("").hide();
            $("#diachiemailcongtyvalidation").text("").hide();
            $("#diachiemailkhacvalidation").text("").hide();

            $('#hoantatttcanhan').addClass('fe-check-circle');
            $('#hoantatttcanhan').addClass('text-success');
            $('#hoantatttcanhan').removeClass('fe-x-circle');
            $('#hoantatttcanhan').removeClass('text-danger');

        }

        // Thanh Toán

        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#tenNganHang').val().trim();
        let sotaikhoan = $('#sotaikhoan').val().trim();
        let chutaikhoan = $('#chutaikhoan').val().trim();

        var checklienhethanhtoan = true;


        if (mucluong.length < 1) {
            checklienhethanhtoan = false;
            $("#mucluongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        if (dsNganHang.length < 1) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (dsNganHang.length > 100) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (formatss.test(dsNganHang.toLowerCase().replace(/\d+/g, '')) == true) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');
        }
        else if (formatnumber.test(dsNganHang) == true) {
            checklienhethanhtoan = false;
            $("#tennganhangvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        if (sotaikhoan.length < 1) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (sotaikhoan.length > 50) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (formatTextVN.test(sotaikhoan) == true || formatss.test(sotaikhoan.toLowerCase().replace(/\d+/g, '')) == true) {
            checklienhethanhtoan = false;
            $("#sotaikhoanvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');
        }

        if (chutaikhoan.length < 1) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (chutaikhoan.length > 50) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        else if (formatss.test(chutaikhoan.toLowerCase().replace(/\d+/g, '')) == true) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');
        }
        else if (formatnumber.test(chutaikhoan) == true) {
            checklienhethanhtoan = false;
            $("#chutaikhoanvalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
            $('#collapse2').collapse('show');
            $('#hoantatttlienhe').addClass('fe-x-circle');
            $('#hoantatttlienhe').addClass('text-danger');
            $('#hoantatttlienhe').removeClass('fe-check-circle');
            $('#hoantatttlienhe').removeClass('text-success');

        }
        if (checklienhethanhtoan == true) {

            $("#mucluongvalidation").text("").hide();
            $("#tennganhangvalidation").text("").hide();
            $("#sotaikhoanvalidation").text("").hide();
            $("#chutaikhoanvalidation").text("").hide();

            $('#hoantatttlienhe').addClass('fe-check-circle');
            $('#hoantatttlienhe').addClass('text-success');
            $('#hoantatttlienhe').removeClass('fe-x-circle');
            $('#hoantatttlienhe').removeClass('text-danger');

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
                    if ($('#strtenngoaingu' + i).val().trim().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                        $('#hoantattdngoaingu').addClass('fe-x-circle');
                        $('#hoantattdngoaingu').addClass('text-danger');
                        $('#hoantattdngoaingu').removeClass('fe-check-circle');
                        $('#hoantattdngoaingu').removeClass('text-success');
                    }

                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                        $('#hoantattdngoaingu').addClass('fe-x-circle');
                        $('#hoantattdngoaingu').addClass('text-danger');
                        $('#hoantattdngoaingu').removeClass('fe-check-circle');
                        $('#hoantattdngoaingu').removeClass('text-success');
                    }
                    if (checkngoaingu == true) {
                        $('#strtenngoaingu' + i + 'validation').hide();
                        $('#trinhdo' + i + 'validation').hide();

                        $('#hoantattdngoaingu').addClass('fe-check-circle');
                        $('#hoantattdngoaingu').addClass('text-success');
                        $('#hoantattdngoaingu').removeClass('fe-x-circle');
                        $('#hoantattdngoaingu').removeClass('text-danger');


                        trinhdongoaingu += $('#strtenngoaingu' + i).val()
                            + "_" + $('#trinhdol' + i + ' :selected').val()
                            + "_" + $('#trinhdos' + i + ' :selected').val()
                            + "_" + $('#trinhdor' + i + ' :selected').val()
                            + "_" + $('#trinhdow' + i + ' :selected').val();
                    }
                }
                else {
                    if ($('#strtenngoaingu' + i).val().trim().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                        $('#hoantattdngoaingu').addClass('fe-x-circle');
                        $('#hoantattdngoaingu').addClass('text-danger');
                        $('#hoantattdngoaingu').removeClass('fe-check-circle');
                        $('#hoantattdngoaingu').removeClass('text-success');

                    }

                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse6').collapse('show');
                        $('#hoantattdngoaingu').addClass('fe-x-circle');
                        $('#hoantattdngoaingu').addClass('text-danger');
                        $('#hoantattdngoaingu').removeClass('fe-check-circle');
                        $('#hoantattdngoaingu').removeClass('text-success');
                    }
                    if (checkngoaingu == true) {
                        $('#strtenngoaingu' + i + 'validation').hide();
                        $('#trinhdo' + i + 'validation').hide();

                        $('#hoantattdngoaingu').addClass('fe-check-circle');
                        $('#hoantattdngoaingu').addClass('text-success');
                        $('#hoantattdngoaingu').removeClass('fe-x-circle');
                        $('#hoantattdngoaingu').removeClass('text-danger');

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
        else {
            $('#hoantattdngoaingu').addClass('fe-check-circle');
            $('#hoantattdngoaingu').addClass('text-success');
            $('#hoantattdngoaingu').removeClass('fe-x-circle');
            $('#hoantattdngoaingu').removeClass('text-danger');

        }

        // end validation

        //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
        let phuthuocnhanthan = "";
        let soluongnhanthan = $('#dem').val();

        var checknhanthan = true;

        if (soluongnhanthan > 0) {
            for (var i = 1; i <= soluongnhanthan; i++) {
                if (i == soluongnhanthan) {
                    if ($('#hotennhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    else if (formatnumber.test($('#hotennhanthan' + i).val().trim()) == true || formatss.test($('#hotennhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    if ($('#moiquanhenhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    else if (formatss.test($('#moiquanhenhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    if (checknhanthan == true) {
                        $('#hotennhanthan' + i + 'validation').hide();
                        $('#moiquanhenhanthan' + i + 'validation').hide();
                        $('#ngaysinhnhanthan' + i + 'validation').hide();

                        $('#hoantatnguoiphuthuoc').addClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-success');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-danger');

                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val();
                    }
                }
                else {
                    if ($('#hotennhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    else if (formatnumber.test($('#hotennhanthan' + i).val().trim()) == true || formatss.test($('#hotennhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    if ($('#moiquanhenhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    else if (formatss.test($('#moiquanhenhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                        $('#collapse4').collapse('show');
                        $('#hoantatnguoiphuthuoc').addClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-danger');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-success');
                    }
                    if (checknhanthan == true) {
                        $('#hotennhanthan' + i + 'validation').hide();
                        $('#moiquanhenhanthan' + i + 'validation').hide();
                        $('#ngaysinhnhanthan' + i + 'validation').hide();

                        $('#hoantatnguoiphuthuoc').addClass('fe-check-circle');
                        $('#hoantatnguoiphuthuoc').addClass('text-success');
                        $('#hoantatnguoiphuthuoc').removeClass('fe-x-circle');
                        $('#hoantatnguoiphuthuoc').removeClass('text-danger');

                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val()
                            + "=";
                    }
                }
            }
        } else {
            $('#hoantatnguoiphuthuoc').addClass('fe-check-circle');
            $('#hoantatnguoiphuthuoc').addClass('text-success');
            $('#hoantatnguoiphuthuoc').removeClass('fe-x-circle');
            $('#hoantatnguoiphuthuoc').removeClass('text-danger');
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
        let matkhaudangnhap = $('#matkhaudangnhap').val().trim();
        let nhaplaimatkhaudangnhap = $('#nhaplaimatkhaudangnhap').val().trim();
        var captaikhoancheck = false;
        if ($('#cungCapTaiKhoan').prop('checked')) {
            captaikhoancheck = true;
        }
        let ngayvaolam = $('#ngayvaolam').val();
        let bophan = $('#bophan :selected').val();
        let vaitro = $('#vaitro :selected').val();
        let loaihopdong = $('#loaiHopDong :selected').val();

        let hinhthuc = $('#hinhthuc :selected').val();
        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let selectFiles = $('#selectFiles').val();

        var checkhopdongtaikhoan = true;


        //Bộ phận
        if (bophan.length < 1) {
            checkhopdongtaikhoan = false;
            $('#bophanvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');
        }

        //Loại hợp đồng
        if (loaihopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#loaihopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');
        }

        //Ngày vào làm
        if (ngayvaolam.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngayvaolamvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');
        }

        //Chức danh
        if (vaitro.length < 1) {
            checkhopdongtaikhoan = false;
            $('#vaitrovalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');

        }

        //Hình thức
        if (hinhthuc.length < 1) {
            checkhopdongtaikhoan = false;
            $('#hinhthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');

        }

        //Cấp tài khoản
        if ($('#cungCapTaiKhoan').prop('checked')) {
            // Validation mật khẩu
            if (matkhaudangnhap.length == 0) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');

            }
            else if (matkhaudangnhap.length < 8) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
            else if (matkhaudangnhap.length > 20) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
            else if (formatss.test(matkhaudangnhap) == false || formatLower.test(matkhaudangnhap) == false || formatUpper.test(matkhaudangnhap) == false || formatnumber.test(matkhaudangnhap) == false) {
                checkhopdongtaikhoan = false;
                $('#matkhaudangnhapvalidation').text("Mật khẩu phải tối thiểu 8 ký tự và tối đa 20 ký tự bao gồm chữ thường, chữ hoa, chữ số và ký tự đặc biệt.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
            // end Validation mật khẩu

            // Validation nhập lại mk
            if (nhaplaimatkhaudangnhap.length < 1) {
                checkhopdongtaikhoan = false;
                $('#nhaplaimatkhaudangnhapvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
            else if (matkhaudangnhap != nhaplaimatkhaudangnhap) {
                checkhopdongtaikhoan = false;
                $('#nhaplaimatkhaudangnhapvalidation').text("Xác nhận lại mật khẩu chưa trùng khớp! Vui lòng nhập lại.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
            // end Validation nhập lại mk
        }


        //Ngày ký hđ
        if (ngaykyhopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');
        }

        //ngày kết thúc hợp đồng
        if (loaihopdong == "Hợp đồng có thời hạn") {
            if (ngaygiahanhopdong.length < 1) {
                checkhopdongtaikhoan = false;
                $('#ngaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                $('#collapse3').collapse('show');
                $('#hoantattthopdong').addClass('fe-x-circle');
                $('#hoantattthopdong').addClass('text-danger');
                $('#hoantattthopdong').removeClass('fe-check-circle');
                $('#hoantattthopdong').removeClass('text-success');
            }
        }

        if (selectFiles.length < 1) {
            checkhopdongtaikhoan = false;
            $('#selectFilesvalidation').text("Không được bỏ trống thông tin này! Vui lòng tải ảnh hợp đồng.").show();
            $('#collapse3').collapse('show');
            $('#hoantattthopdong').addClass('fe-x-circle');
            $('#hoantattthopdong').addClass('text-danger');
            $('#hoantattthopdong').removeClass('fe-check-circle');
            $('#hoantattthopdong').removeClass('text-success');
        }
        if (checkhopdongtaikhoan == true) {
            $('#ngayvaolamvalidation').text("").hide();
            $('#vaitrovalidation').text("").hide();
            $('#hinhthucvalidation').text("").hide();
            $('#usernamevalidation').text("").hide();
            $('#matkhaudangnhapvalidation').text("").hide();
            $('#nhaplaimatkhaudangnhapvalidation').text("").hide();
            $('#loaihopdongvalidation').text("").hide();
            $('#ngaykyhopdongvalidation').text("").hide();
            $('#ngaygiahanhopdongvalidation').text("").hide();
            $('#selectFilesvalidation').text("").hide();

            $('#hoantattthopdong').addClass('fe-check-circle');
            $('#hoantattthopdong').addClass('text-success');
            $('#hoantattthopdong').removeClass('fe-x-circle');
            $('#hoantattthopdong').removeClass('text-danger');
        }

        // end validation
        if (checkthongtincanhan == true && checklienhethanhtoan == true && checkngoaingu == true &&
            checknhanthan == true && checkhopdongtaikhoan == true) {
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

            formData.append('sodienthoaididong', sodienthoaididong);
            formData.append('sodienthoaikhac', sodienthoaikhac);
            formData.append('diachiemailcongty', diachiemailcongty);
            formData.append('diachiemailkhac', diachiemailkhac);
            formData.append('diachinha', diachinha);
            //Liên Hệ & Thanh Toán
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
            formData.append('captaikhoancheck', captaikhoancheck);
            formData.append('matkhaudangnhap', matkhaudangnhap);
            formData.append('loaihopdong', loaihopdong);
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
