$(document).ready(function () {
    //Cập nhật tổng
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
    //Lưu thay đổi
    $('#btnluuThongTinThayDoiGiaiDoan').on('click', function () {
        var idpro = $('#idpro').val();
        var dem = $('#dem').val();
        var batdau = $('#batdau').val();
        var ketthuc = $('#ketthuc').val();
        for (var i = 1; i <= dem; i++) {
            $('#ngaygd' + i + 'validation').hide();
            $('#gd' + i + 'validation').hide();
        }
        //value and validation giai đoạn

        var check = true;

        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            let ngaygd = $('#ngaygd' + i).val();
            let chiphigd = $('#gd' + i).val();

            //Ngày
            if (ngaygd.length < 1) {
                check = false;
                $('#ngaygd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (Number(ngaygd.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
                check = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (i >= 2 && Number(ngaygd.replace(/-/g, '')) <= Number($('#ngaygd' + (i - 1)).val().replace(/-/g, ''))) {
                check = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn " + i + " phải lớn hơn giai đoạn " + (i - 1) + ".").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            } else if (Number(ngaygd.replace(/-/g, '')) > Number(ketthuc.replace(/-/g, ''))) {
                check = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn không thể lớn hơn ngày kết thúc dự án.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }

            //Gía tiền
            if (chiphigd.length == 0) {
                check = false;
                $('#gd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }
            else if (Number(chiphigd.replace(/,/g, '').trim()) == 0) {
                check = false;
                $('#gd' + i + 'validation').text("Chi phí giai đoạn không thể bằng 0.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }
            else if (chiphigd.indexOf("-") != -1) {
                check = false;
                $('#gd' + i + 'validation').text("Số tiền không thể âm.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }

            //Đúng validaion
            if (check == true) {
                if (i == dem) {
                    giaidoan += ngaygd;
                    chiphi += chiphigd.replace(/,/g, '').trim();
                }
                else {
                    giaidoan += ngaygd + "_";
                    chiphi += chiphigd.replace(/,/g, '').trim() + "_";
                }
            }
        }

        if (check == true) {
            var SweetAlert2Demo = function () {
                var initDemos = function () {
                    swal({
                        title: 'Lưu Thay Đổi?',
                        text: "Sau khi xác nhận lưu thay đổi các giai đoạn thanh toán của dự án, các thông tin về lịch sử giao dịch của các giai đoạn có thể sẽ mất.\nVẫn tiếp tục lưu?",
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
                    }).then((luuthanhtoan) => {
                        if (luuthanhtoan) {
                            var formData = new FormData();
                            formData.append('idpro', idpro);
                            formData.append('giaidoan', giaidoan);
                            formData.append('chiphi', chiphi);

                            $('#AjaxLoader').show();
                            $.ajax({
                                url: $('#requestPath').val() + "Admins/quanlyduan/luuchinhsuachiphi",
                                type: 'POST',
                                dataType: 'html',
                                contentType: false,
                                processData: false,
                                data: formData
                            }).done(function (ketqua) {
                                if (ketqua == "DANHSACH") {
                                    $('#AjaxLoader').hide();
                                    window.location.href = $('#requestPath').val() + "Admins/quanlyduan/danhsachduan";
                                } else {
                                    $('#chinhSuaChiPhi').modal('toggle');
                                    window.setTimeout(function () {
                                        $('#chiTietDuAnPartialID').replaceWith(ketqua);
                                        $.when(
                                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                                            $.Deferred(function (deferred) {
                                                $(deferred.resolve);
                                            })
                                        ).done(function () { });

                                        $('#AjaxLoader').hide();

                                        var content = {};
                                        content.message = 'Đã thay đổi thông tin giai đoạn thanh toán của dự án';
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
                                    }, 300);
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
        }
    });

    //Xóa giai đoạn
    $('#xoabot').on('click', function (e) {
        let sott = Number($('#dem').val());
        if (sott > 1) {
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
        if (sott <= 10) {
            let nd = "'alias': 'decimal', 'groupSeparator': ','";
            $('#appenddayne').replaceWith('<label style="font-weight:bold" for="ipcpgd' + sott + '" class="form-label">Giai đoạn ' + sott + ' <span class="text-danger">*</span></label>'
                + '<div id="ipcpgd' + sott + '" class="mb-3 col-md-6 col-12">'
                + '<input id="gd' + sott + '" name="gd' + sott + '" type="text" style="font-weight:bold;" data-inputmask="' + nd + '" inputmode="numeric" class="form-control text-start text-danger" placeholder="Chi phí giai đoạn ' + sott + '" required />'
                + '<p hidden style="font-size: 13px; color:red;" id="gd' + sott + 'validation"></p></div>'
                + '<div id="ipdgd' + sott + '" class="mb-3 col-md-6 col-12"><div class="input-group me-3"><input id="ngaygd' + sott + '" name="ngaygd' + sott + '" class="form-control flatpickr" type="text" placeholder="Ngày kết thúc giai đoạn ' + sott + '" aria-describedby="basic-addon-gd' + sott + '" required>'
                + '<span class="input-group-text text-muted" id="basic-addon-gd3"><i class="fe fe-calendar"></i></span></div>'
                + '<p hidden style="font-size: 13px; color:red;" id="ngaygd' + sott + 'validation"></p>'
                + '</div><div id="appenddayne"></div>');
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

    //Cập nhật chi phí tự động
    $('#cnfrm').on('input', function (e) {
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
});