$(document).ready(function () {
    //Cập nhật dự án
    $('#openCapNhatDuAn').on('click', function () {
        var id = $('#idpro').val();
        var formData = new FormData();
        formData.append("id", id);
        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/openChinhSuaDuAn',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "admins/quanlyduan/danhsachduan";
            } else {
                $('#chinhSuaOffcanvas').replaceWith(ketqua);
                $(".flatpickr").length && flatpickr(".flatpickr", {
                    disableMobile: !0
                });
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
                if ($("#dataTableBasic").length && $(document).ready((function () {
                    $("#dataTableBasic").DataTable({
                        responsive: !0
                    })
                })));
                $('#AjaxLoader').hide();
                
                $('#offcanvasRight').offcanvas("toggle");
                $('#gioitinh').selectpicker();
            }
        });
    });
});