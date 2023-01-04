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
            $('#appenddayne').replaceWith('<label style="font-weight:bold" for="ipcpgd' + sott + '" class="form-label">Giai đoạn ' + sott + ' <span class="text-danger">*</span> </label>'
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