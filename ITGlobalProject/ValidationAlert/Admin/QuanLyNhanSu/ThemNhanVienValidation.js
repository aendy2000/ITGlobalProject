$(document).ready(function () {
    //Chọn ảnh hợp đồng
    $('#chonanhhopdong').on('click', function () {
        $('#selectFiles').click();
    });

    //Thêm nhân thân
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
                + '</div>'
                + '<div id="grtrinhdongoaingu' + sott + '" class="mb-2 col-12 col-md-9 py-2">'
                + '<label style="font-weight:bold;" class="form-label">Trình độ kỹ năng <span class="text-danger">*</span></label>'
                + '<div class="input-group">'
                + '<span class="input-group-text bg-dark text-light">L</span>'
                + '<select class="form-select text-dark" id="trinhdol' + sott + '" aria-label="Example select with button addon">'
                + '<option selected>Listening</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">S</span>'
                + '<select class="form-select text-dark" id="trinhdos' + sott + '" aria-label="Example select with button addon">'
                + '<option selected>Speaking</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">R</span>'
                + '<select class="form-select text-dark" id="trinhdor' + sott + '" aria-label="Example select with button addon">'
                + '<option selected>Reading</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">W</span>'
                + '<select class="form-select text-dark" id="trinhdow' + sott + '" aria-label="Example select with button addon">'
                + '<option selected>Writing</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '</div>'
                + '</div>'
                + '<div id="appendngoaingudayne" class="col-12"></div>'
            );

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
        //Thông Tin Cá Nhân
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val();
        let quoctich = $('#quoctich').val();
        let honnhan = $('#honnhan :selected').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();

        //Liên Hệ & Thanh Toán
        let sodienthoaididong = $('#sodienthoaididong').val();
        let sodienthoaikhac = $('#sodienthoaikhac').val();
        let diachiemailcongty = $('#diachiemailcongty').val();
        let diachiemailkhac = $('#diachiemailkhac').val();
        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#tenNganHang').val();
        let sotaikhoan = $('#sotaikhoan').val();
        let chutaikhoan = $('#chutaikhoan').val();

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

        //Trình độ ngoại ngữ, lấy biến [trinhdongoaingu]
        let trinhdongoaingu = "";

        let soluongngoaingu = $('#demngoaingu').val();
        if (soluongngoaingu > 0) {
            for (var i = 1; i <= soluongngoaingu; i++) {
                if (i == soluongngoaingu) {
                    trinhdongoaingu += $('#strtenngoaingu' + i).val()
                        + "_" + $('#trinhdol' + i + ' :selected').val()
                        + "_" + $('#trinhdos' + i + ' :selected').val()
                        + "_" + $('#trinhdor' + i + ' :selected').val()
                        + "_" + $('#trinhdow' + i + ' :selected').val();
                }
                else {
                    trinhdongoaingu += $('#strtenngoaingu' + i).val()
                        + "_" + $('#trinhdol' + i + ' :selected').val()
                        + "_" + $('#trinhdos' + i + ' :selected').val()
                        + "_" + $('#trinhdor' + i + ' :selected').val()
                        + "_" + $('#trinhdow' + i + ' :selected').val()
                        + "=";
                }
            }
        }

        //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
        let phuthuocnhanthan = "";
        let soluongnhanthan = $('#dem').val();
        if (soluongnhanthan > 0) {
            for (var i = 1; i <= soluongnhanthan; i++) {
                if (i == soluongnhanthan) {
                    phuthuocnhanthan += $('#hotennhanthan' + i).val()
                        + "_" + $('#moiquanhenhanthan' + i).val()
                        + "_" + $('#ngaysinhnhanthan' + i).val();
                }
                else {
                    phuthuocnhanthan += $('#hotennhanthan' + i).val()
                        + "_" + $('#moiquanhenhanthan' + i).val()
                        + "_" + $('#ngaysinhnhanthan' + i).val()
                        + "=";
                }
            }
        }

        //Trợ Cấp & Phụ Cấp, lấy biến [trocap]
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

        //Hợp đồng & Tài khoản
        let ngayvaolam = $('#ngayvaolam').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();
        let username = $('#username').val();
        let matkhaudangnhap = $('#matkhaudangnhap').val();
        let nhaplaimatkhaudangnhap = $('#nhaplaimatkhaudangnhap').val();
        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let selectFiles = $('#selectFiles').val();

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
                        swal("Thành Công!", "Đã thêm nhân viên mới", {
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
