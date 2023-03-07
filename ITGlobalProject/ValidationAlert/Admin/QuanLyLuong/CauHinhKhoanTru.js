$(document).ready(function () {
    $('#btnLuuThongTinKhoanTru').on('click', function () {
        var check = true;
        var databaohiem = "";

        $('#giamtruphuthuoc-validation').hide();
        $('#giamtrugiacanh-validation').hide();

        $('[id^="baohiem-data-"]').each(function () {
            var id = $(this).attr("name");

            $('#baohiem-validation-' + id).hide();
            $('#muctran-validation-' + id).hide();

            var sobaohiem = $(this).val().trim();
            var muctran = $('#muctran-data-' + id).val().trim();

            if (sobaohiem.length < 1) {
                check = false;
                $('#baohiem-validation-' + id).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $(this).focus();
            }
            databaohiem += id + "-" + sobaohiem + "-" + muctran + "_";
        });
        var datathue = "";
        $('[id^="thunhaptoithieu-data-"]').each(function () {
            var id = $(this).attr("name");
            $('#thunhap-validation-' + id).hide();
            $('#thuesuat-validation-' + id).hide();
            $('#giamtru-validation-' + id).hide();

            var thunhaptoithieu = $(this).val().trim();
            var thunhaptoida = $('#thunhaptoida-data-' + id).val().trim();
            var thuesuat = $('#thuesuat-data-' + id).val().trim();
            var khoangiamtru = $('#giamtru-data-' + id).val().trim();

            if (thunhaptoithieu.length < 1) {
                check = false;
                $('#thunhap-validation-' + id).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $(this).focus();
            }
            if (thunhaptoida.length < 1) {
                check = false;
                $('#thunhap-validation-' + id).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#thunhaptoida-data-' + id).focus();
            }
            if (thuesuat.length < 1) {
                check = false;
                $('#thuesuat-validation-' + id).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#thuesuat-data-' + id).focus();
            }
            if (khoangiamtru.length < 1) {
                check = false;
                $('#giamtru-validation-' + id).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#giamtru-data-' + id).focus();
            }
            datathue += id + "-" + thunhaptoithieu + "-" + thunhaptoida + "-" + thuesuat + "-" + khoangiamtru + "_";
        });

        var dataphuthuoc = $('#giamtruphuthuoc').val();
        if (dataphuthuoc.length < 1) {
            check = false;
            $('#giamtruphuthuoc-validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#giamtruphuthuoc').focus();
        }

        var datagiacanh = $('#giamtrugiacanh').val();
        if (datagiacanh.length < 1) {
            check = false;
            $('#giamtrugiacanh-validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#giamtrugiacanh').focus();
        }

        if (check == true) {
            var formData = new FormData();
            formData.append("baohiem", databaohiem.substring(0, databaohiem.length - 1));
            formData.append("thue", datathue.substring(0, datathue.length - 1));
            formData.append("phuthuoc", dataphuthuoc);
            formData.append("giacanh", datagiacanh);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/quanlyluong/cauhinhkhoangiamtru',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + 'quanlytaikhoan/dangxuat';
                }
                else {
                    $('#AjaxLoader').hide();
                    $('#dongmodaltinhthue').click();
                    var content = {};
                    content.message = 'Đã lưu thông tin thay đổi cấu hình khoản giảm trừ';
                    content.title = 'Thành công!';
                    content.icon = 'nav-icon fe fe-bell me-2';

                    $.notify(content, {
                        type: "success",
                        placement: {
                            from: "bottom",
                            align: "right"
                        },
                        time: 1000,
                        delay: 1000,
                    });
                }
            });
        }
    });
});