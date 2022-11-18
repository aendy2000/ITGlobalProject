$(document).ready(function () {
    $('#btnThemMoi').on('click', function (e) {
        let hoten = $('#hoten').val();
        let cmnd = $('#cmnd').val();
        let sodienthoai = $('#sodienthoai').val();
        let ngaysinh = $('#ngaysinh').val();
        let gioitinh = $('#gioitinh :selected').val();
        let diachinha = $('#diachinha').val();
        let vaitro = $('#vaitro :selected').val();
        let nguoiphuthuoc = $('#nguoiphuthuoc :selected').val();
        let mucluong = $('#mucluong').val();
        let dsNganHang = $('#tenNganHang').val();
        let sotaikhoan = $('#sotaikhoan').val();
        let chutaikhoan = $('#chutaikhoan').val();
        let diachiemail = $('#diachiemail').val();
        let matkhaudangnhap = $('#matkhaudangnhap').val();
        var checkshoten = false;
        var checkscmnd = false;
        var checkssodienthoai = false;
        var checksngaysinh = false;
        var checksgioitinh = false;
        var checksvaitro = false;
        var checksdiachiemail = false;
        var checksmatkhaudangnhap = false;

        //Họ và tên
        if (hoten.length < 1) {
            $('#hotenvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#hoten');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkshoten = true;
        }

        //CMND
        if (cmnd.length < 1) {
            $('#cmndvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#cmnd');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkscmnd = true;
        }

        //Điện thoại
        if (sodienthoai.length < 1) {
            $('#sodienthoaivalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#sodienthoai');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checkssodienthoai = true;
        }

        //Ngày sinh
        if (ngaysinh.length < 1) {
            $('#ngaysinhvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#ngaysinh');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksngaysinh = true;
        }

        //giới tính
        if (gioitinh.length < 1) {
            $('#gioitinhvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#gioitinh');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksgioitinh = true;
        }

        //Vai trò
        if (vaitro < 1) {
            $('#vaitrovalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#vaitro');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksvaitro = true;
        }

        //Email
        if (diachiemail.length < 1) {
            $('#diachiemailvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#diachiemail');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksdiachiemail = true;
        }

        //Mật khẩu
        if (matkhaudangnhap.length < 1) {
            $('#matkhaudangnhapvalidation').text("Không có bỏ trống mà trời?").show();
            var searchInput = $('#matkhaudangnhap');

            // Multiply by 2 to ensure the cursor always ends up at the end;
            // Opera sometimes sees a carriage return as 2 characters.
            var strLength = searchInput.val().length * 2;

            searchInput.focus();
            searchInput[0].setSelectionRange(strLength, strLength);
        }
        else {
            checksmatkhaudangnhap = true;
        }

        if (checkshoten === true && checkscmnd === true && checkssodienthoai === true && checksngaysinh === true &&
            checksgioitinh === true && checksvaitro === true && checksdiachiemail === true && checksmatkhaudangnhap === true) {
            e.preventDefault();
            let urls = $('#actionSubmit').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                data: {
                    hotens: hoten, cmnds: cmnd, sodienthoais: sodienthoai, ngaysinhs: ngaysinh, gioitinhs: gioitinh, diachinhas: diachinha, vaitros: vaitro,
                    nguoiphuthuocs: nguoiphuthuoc, mucluongs: mucluong, dsNganHangs: dsNganHang, sotaikhoans: sotaikhoan, chutaikhoans: chutaikhoan, diachiemails: diachiemail, matkhaudangnhaps: matkhaudangnhap
                }
            }).done(function (ketqua) {
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
        }
    });

});
