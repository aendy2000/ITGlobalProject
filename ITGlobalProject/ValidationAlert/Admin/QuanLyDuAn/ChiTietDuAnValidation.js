//Form công nợ
$(document).ready(function () {
    $('#cnxoabot').on('click', function (e) {
        let sott = Number($('#cndem').val());
        if (sott === 1) {
            alert("Còn có 1 cái thôi đừng xóa nữa");
        }
        else {
            $('label[for=cnipcpgd' + sott + ']').remove();
            $('#cnipcpgd' + sott).remove();
            $('#cnipdgd' + sott).remove();

            var elem = document.getElementById('cndem');
            elem.value = sott - 1;

            let totals = 0;
            for (var i = 1; i <= sott - 1; i++) {
                totals += Number($('#cngd' + i).val());
            }

            if (totals === 0) {
                $('#cnsums').text("HÃY NHẬP CHI PHÍ Ở CÁC GIAI ĐOẠN");
            } else {
                $('#cnsums').text(totals);
            }
        }
    });
    $('#cnaddthem').on('click', function (e) {
        let sott = Number($('#cndem').val()) + 1;
        if (sott > 5) {
            alert("5 cái thôi nhiều quá rồi");
        } else {
            $('#cnappenddayne').replaceWith('<label style="font-weight:bold" for="cnipcpgd' + sott + '" class="form-label">Giai đoạn ' + sott + ' </label>'
                + '<div id="cnipcpgd' + sott + '" class="mb-3 col-md-6 col-12"><input id="cngd' + sott + '" name="cngd' + sott + '" type="text" class="form-control" placeholder="Chi phí giai đoạn ' + sott + '" required /></div>'
                + '<div id="cnipdgd' + sott + '" class="mb-3 col-md-6 col-12"><div class="input-group me-3"><input class="form-control flatpickr" type="text" placeholder="Ngày kết thúc giai đoạn ' + sott + '" id="date" aria-describedby="basic-addon-gd' + sott + '" required>'
                + '<span class="input-group-text text-muted" id="basic-addon-gd' + sott + '"><i class="fe fe-calendar"></i></span>'
                + '</div></div><div id="cnappenddayne"></div>');
            var elem = document.getElementById('cndem');
            elem.value = sott;
            $(".flatpickr").length && flatpickr(".flatpickr", {
                disableMobile: !0
            });
        }
    });
    $('#cnfrm').on('input', function (e) {
        let sott = Number($('#cndem').val());
        let totals = 0;
        for (var i = 1; i <= sott; i++) {
            totals += Number($('#cngd' + i).val());
        }
        //let totals = (Number($('#gd1').val()) +
        //    Number($('#gd2').val()) +
        //    Number($('#gd3').val()));
        if (totals === 0) {
            $('#cnsums').text("HÃY NHẬP CHI PHÍ Ở CÁC GIAI ĐOẠN");
        } else {
            $('#cnsums').text(totals);
        }
    });
});

//Form dự án
$(document).ready(function () {
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

});