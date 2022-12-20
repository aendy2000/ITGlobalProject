$(document).ready(function (e) {

    $('[id^="columnTinhThue"]').on('change', function () {
        var id = $(this).attr("name");
        var form = new FormData();

        form.append('id', id);
        form.append('tinhthue', $(this).prop("checked"));

        $.ajax({
            type: "POST",
            url: $('#requestPath').val() + "Admins/QuanLyTroCapVaPhuCap/thayDoiTinhThue",
            dataType: 'JSON',
            contentType: false,
            processData: false,
            data: form,
        });
    });

    $('[id^="columnTinhBH"]').on('change', function () {
        var id = $(this).attr("name");
        var form = new FormData();

        form.append('id', id);
        form.append('tinhbaohiem', $(this).prop("checked"));

        $.ajax({
            type: "POST",
            url: $('#requestPath').val() + "Admins/QuanLyTroCapVaPhuCap/thayDoiTinhBaoHiem",
            dataType: 'JSON',
            contentType: false,
            processData: false,
            data: form,
        });
    });

    $('#chinhsualoailuong').on('change', function () {
        if ($('#chinhsualoailuong :selected').val().trim() == "false") {
            $('#chinhsuadivthue').prop("hidden", true);
            $('#chinhsuadivbh').prop("hidden", true);
        } else {
            $('#chinhsuadivthue').prop("hidden", false);
            $('#chinhsuadivbh').prop("hidden", false);
        }
    });

    $('#chinhsualoaitrocap').on('change', function () {
        if ($('#chinhsualoaitrocap').prop("checked")) {
            $('#chinhsuadivtientrocap').addClass("col-md-12");
            $('#chinhsuadivtientrocap').removeClass("col-md-6");

            $('#chinhsuadivsotien').prop("hidden", true);

            $('#chinhsuadivloailuong').prop("hidden", false);
            $('#chinhsuadivtile').prop("hidden", false);

            //$('[data-id="loailuong"]').attr('title').text("Chọn loại lương tính số tiền trợ cấp");

            if ($('#chinhsualoailuong :selected').val().trim() == "false") {
                $('#chinhsuadivthue').prop("hidden", true);
                $('#chinhsuadivbh').prop("hidden", true);
            } else {
                $('#chinhsuadivthue').prop("hidden", false);
                $('#chinhsuadivbh').prop("hidden", false);
            }

        } else {
            $('#chinhsuadivtientrocap').addClass("col-md-6");
            $('#chinhsuadivtientrocap').removeClass("col-md-12");

            $('#chinhsuadivsotien').prop("hidden", false);

            $('#chinhsuadivloailuong').prop("hidden", true);
            $('#chinhsuadivtile').prop("hidden", true);

            $('#chinhsuadivthue').prop("hidden", false);
            $('#chinhsuadivbh').prop("hidden", false);
        }
    });

    //Click chỉnh sửa
    $('[id^="chinhsuaTroCap"]').on('click', function (e) {
        $('#chinhsuadivtientrocap').addClass("col-md-6");
        $('#divtientrocap').removeClass("col-md-12");

        $('#chinhsuadivsotien').prop("hidden", false);

        $('#chinhsuadivloailuong').prop("hidden", true);
        $('#chinhsuadivtile').prop("hidden", true);

        $('#chinhsuadivthue').prop("hidden", false);
        $('#chinhsuadivbh').prop("hidden", false);

        $('#chinhsuakhoanValidateResul').hide();
        $('#chinhsuasotienValidateResul').hide();
        $('#chinhsualoailuongValidateResul').hide();
        $('#chinhsuatileValidateResul').hide();
        $('#chinhsuatinhthueValidateResul').hide();
        $('#chinhsuatinhbaohiemValidateResul').hide();
        $('#chinhsuadateValidateResul').hide();

        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();
        var prices = $('#prices' + name).val();
        var percentages = $('#percentages' + name).val();
        var onbasicsalarys = $('#onbasicsalarys' + name).val();
        var dateapplys = $('#dateapplys' + name).val();
        var taxs = $('#taxs' + name).val();
        var insurances = $('#insurances' + name).val();

        $('#id').val(ids);
        $('#chinhsuatenkhoan').val(names);
        $('#chinhsuadate').val(dateapplys);
        if (Number(prices) == 0) {
            $('#chinhsuadivsotien').prop("hidden", true);

            $('#chinhsuadivtientrocap').addClass("col-md-12");
            $('#chinhsuadivtientrocap').removeClass("col-md-6");
            $('#chinhsualoaitrocap').prop("checked", true);
            $('#chinhsuadivloailuong').prop("hidden", false);
            $('#chinhsuadivtile').prop("hidden", false);

            if (onbasicsalarys.toLowerCase() == "false") {
                $('#chinhsualoailuong option[value="false"]').prop("selected", true);
                $('#chinhsuadivthue').prop("hidden", true);
                $('#chinhsuadivbh').prop("hidden", true);
            } else {
                $('#chinhsualoailuong option[value="true"]').prop("selected", true);
            }

            $('#chinhsuatile').val(percentages);
        }
        else {
            $('#chinhsuasotien').val(prices);
            $('#chinhsuadivtientrocap').addClass("col-md-6");
            $('#chinhsuadivtientrocap').removeClass("col-md-12");
        }

        $('#chinhsuatinhthue option[value="' + taxs.toLowerCase() + '"]').prop("selected", true);
        $('#chinhsuatinhbaohiem option[value="' + insurances.toLowerCase() + '"]').prop("selected", true);

    });


    //Click lưu
    $('#luuChinhSua').on('click', function (e) {

        $('#khoanValidateResul').hide();
        $('#sotienValidateResul').hide();
        $('#loailuongValidateResul').hide();
        $('#tileValidateResul').hide();
        $('#tinhthueValidateResul').hide();
        $('#tinhbaohiemValidateResul').hide();
        $('#dateValidateResul').hide();

        var id = $('#id').val().trim();
        var name = $('#chinhsuatenkhoan').val().trim();
        var sotien = $('#chinhsuasotien').val().trim();
        var loailuong = $('#chinhsualoailuong :selected').val().trim();
        var tile = $('#chinhsuatile').val().trim();
        var tinhthue = $('#chinhsuatinhthue :selected').val().trim();
        var tinhbaohiem = $('#chinhsuatinhbaohiem :selected').val().trim();
        var date = $('#chinhsuadate :selected').val().trim();

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
            $('#chinhsuakhoanValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Tỉ lệ trợ cấp theo lương
        if ($('#chinhsualoaitrocap').prop("checked")) {
            if (loailuong.length < 1) {
                checkloailuong = false;
                $('#chinhsualoailuongValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            if (tile.length < 1) {
                checktile = false;
                $('#chinhsuatileValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            } else if (tile == "0" || Number(tile.replace(".", "").replace(",", "")) <= 0) {
                checktile = false;
                $('#chinhsuatileValidateResul').text("Tỉ lệ trợ cấp theo mức lương phải lớn hơn 0.").show();
            }

        }
        //Tiền trợ cấp
        else {
            if (sotien.length < 1) {
                checksotien = false;
                $('#chinhsuasotienValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            } else if (sotien == "0" || Number(sotien.replace(/,/d, '')) < 1) {
                checksotien = false;
                $('#chinhsuasotienValidateResul').text("Số tiền trợ cấp không thể bé hơn 1.").show();
            }
        }

        //Chọn tính thuế
        if (tinhthue.length < 1) {
            checktinhthue = false;
            $('#chinhsuatinhthueValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Chọn tính bảo hiểm
        if (tinhbaohiem.length < 1) {
            checktinhbaohiem = false;
            $('#chinhsuatinhbaohiemValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Thời gian áp dụng
        if (date.length < 1) {
            checkdate = false;
            $('#chinhsuadateValidateResul').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Done
        if (checkname == true && checksotien == true && checkloailuong == true && checkdate == true
            && checktile == true && checktinhthue == true && checktinhbaohiem == true) {

            var formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('price', sotien);
            formData.append('percentage', tile.replace(",", "."));
            formData.append('basicSalary', loailuong);
            formData.append('date', date);
            formData.append('tax', tinhthue);
            formData.append('insurance', tinhbaohiem);

            var tinhbangtien = true;
            if ($('#chinhsualoaitrocap').prop("checked")) {
                tinhbangtien = false;
            }
            formData.append('tinhbangtien', tinhbangtien);

            $('#AjaxLoader').show();
            e.preventDefault();
            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyTroCapVaPhuCap/chinhSuaTroCapVaPhuCap",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongChinhSua').click();
                $('#AjaxLoader').hide();
                if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/QuanLyTroCapVaPhuCap/danhSachKhoanTroCapVaPhuCap";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Tuyệt quá! Đã lưu thông tin chỉnh sửa khoản trợ cấp.", {
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