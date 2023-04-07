$(document).ready(function (e) {

    $('#khoanValidateResul').hide();
    $('#sotienValidateResul').hide();
    $('#loailuongValidateResul').hide();
    $('#tileValidateResul').hide();
    $('#tinhthueValidateResul').hide();
    $('#tinhbaohiemValidateResul').hide();
    $('#dateValidateResul').hide();

    $('#loailuong').on('change', function () {
        if ($('#loailuong :selected').val().trim() == "false") {
            $('#divthue').prop("hidden", true);
            $('#divbh').prop("hidden", true);
        } else {
            $('#divthue').prop("hidden", false);
            $('#divbh').prop("hidden", false);
        }
    });

    $('#loaitrocap').on('change', function () {
        if ($('#loaitrocap').prop("checked")) {
            $('#divtientrocap').addClass("col-md-12");
            $('#divtientrocap').removeClass("col-md-6");

            $('#divsotien').prop("hidden", true);

            $('#divloailuong').prop("hidden", false);
            $('#divtile').prop("hidden", false);

            //$('[data-id="loailuong"]').attr('title').text("Chọn loại lương tính số tiền trợ cấp");

            if ($('#loailuong :selected').val().trim() == "false") {
                $('#divthue').prop("hidden", true);
                $('#divbh').prop("hidden", true);
            } else {
                $('#divthue').prop("hidden", false);
                $('#divbh').prop("hidden", false);
            }

        } else {
            $('#divtientrocap').addClass("col-md-6");
            $('#divtientrocap').removeClass("col-md-12");

            $('#divsotien').prop("hidden", false);

            $('#divloailuong').prop("hidden", true);
            $('#divtile').prop("hidden", true);

            $('#divthue').prop("hidden", false);
            $('#divbh').prop("hidden", false);
        }
    });

    $('#dongthemtrocap').on('click', function () {
        $('#divtientrocap').addClass("col-md-6");
        $('#divtientrocap').removeClass("col-md-12");

        $('#divsotien').prop("hidden", false);

        $('#divloailuong').prop("hidden", true);
        $('#divtile').prop("hidden", true);

        $('#loailuong').selectpicker('val', '');
        $('#tinhthue').selectpicker('val', '');
        $('#tinhbaohiem').selectpicker('val', '');

        $('#divthue').prop("hidden", false);
        $('#divbh').prop("hidden", false);

        $('#khoanValidateResul').hide();
        $('#sotienValidateResul').hide();
        $('#loailuongValidateResul').hide();
        $('#tileValidateResul').hide();
        $('#tinhthueValidateResul').hide();
        $('#tinhbaohiemValidateResul').hide();
        $('#dateValidateResul').hide();

    });

    //Click lưu
    $('#themkhoantrocap').on('click', function (e) {

        $('#khoanValidateResul').hide();
        $('#sotienValidateResul').hide();
        $('#loailuongValidateResul').hide();
        $('#tileValidateResul').hide();
        $('#tinhthueValidateResul').hide();
        $('#tinhbaohiemValidateResul').hide();
        $('#dateValidateResul').hide();

        var name = $('#tenkhoan').val().trim();
        var sotien = $('#sotien').val().trim();
        var loailuong = $('#loailuong :selected').val().trim();
        var tile = $('#tile').val().trim();
        var tinhthue = $('#tinhthue :selected').val().trim();
        var tinhbaohiem = $('#tinhbaohiem :selected').val().trim();
        var date = $('#date :selected').val().trim();

        //Check validation
        var checkname = true;
        var checksotien = true;
        var checkloailuong = true;
        var checktile = true;
        var checktinhthue = true;
        var checktinhbaohiem = true;
        var checkdate = true;

        //Tên khoản trợ cấp
        if (name.length < 1) {
            checkname = false;
            $('#khoanValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Tỉ lệ trợ cấp theo lương
        if ($('#loaitrocap').prop("checked")) {
            if (loailuong.length < 1) {
                checkloailuong = false;
                $('#loailuongValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }

            if (loailuong.toLowerCase() != "false") {

                //Chọn tính thuế
                if (tinhthue.length < 1) {
                    checktinhthue = false;
                    $('#tinhthueValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                }

                //Chọn tính bảo hiểm
                if (tinhbaohiem.length < 1) {
                    checktinhbaohiem = false;
                    $('#tinhbaohiemValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                }
            }

            if (tile.length < 1) {
                checktile = false;
                $('#tileValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            } else if (tile == "0" || Number(tile.replace(".", "").replace(",", "")) <= 0) {
                checktile = false;
                $('#tileValidateResul').text("Tỉ lệ trợ cấp theo mức lương phải lớn hơn 0.").show();
            }
        }
        //Tiền trợ cấp
        else {
            if (sotien.length < 1) {
                checksotien = false;
                $('#sotienValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            } else if (sotien == "0" || Number(sotien.replace(/,/d, '')) < 1) {
                checksotien = false;
                $('#sotienValidateResul').text("Số tiền trợ cấp không thể bé hơn 1.").show();
            }
        }
     
        //Thời gian dụng
        if (date.length < 1) {
            checkdate = false;
            $('#dateValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Done
        if (checkname == true && checksotien == true && checkloailuong == true && checkdate == true
            && checktile == true && checktinhthue == true && checktinhbaohiem == true) {

            var formData = new FormData();
            formData.append('name', name);
            formData.append('price', sotien);
            formData.append('percentage', tile.replace(",", "."));
            formData.append('basicSalary', loailuong);
            formData.append('date', date);
            formData.append('tax', tinhthue);
            formData.append('insurance', tinhbaohiem);

            var tinhbangtien = true;
            if ($('#loaitrocap').prop("checked")) {
                tinhbangtien = false;
            }
            formData.append('tinhbangtien', tinhbangtien);

            $('#AjaxLoader').show();
            e.preventDefault();
            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyTroCapVaPhuCap/themKhoanTroCapVaPhuCap",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemtrocap').click();
                $('#AjaxLoader').hide();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/QuanLyTroCapVaPhuCap/danhSachKhoanTroCapVaPhuCap";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã thêm thành công.", {
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

                    $.when(
                        $.getScript($('#requestPath').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                        $.getScript($('#requestPath').val() + "Content/Admin/assets/js/theme.min.js"),

                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    ).done(function () {
                    });
                }
            });
        }
    });
});