$(document).ready(function () {
    //Cập nhật dự án
    $('#openCapNhatDuAn').on('click', function () {
        var id = $('#idpro').val();
        var formData = new FormData();
        formData.append("id", id);
        $('#AjaxLoader').fadeIn('slow');
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

                $('[id^="gioitinh-"]').each(function () {
                    $(this).selectpicker();
                });

                //Chọn loại đối tác
                $('[id^="canhandoanhnghiep-"]').on('change', function () {
                    var id = $(this).attr('name');
                    if ($(this).prop("checked")) {
                        $('#doanhnghieps1-' + id).prop("hidden", false);
                        $('#doanhnghieps2-' + id).prop("hidden", false);
                        $('#canhans-' + id).prop("hidden", true);
                    } else {
                        $('#doanhnghieps1-' + id).prop("hidden", true);
                        $('#doanhnghieps2-' + id).prop("hidden", true);
                        $('#canhans-' + id).prop("hidden", false);
                    }
                });

                $('#AjaxLoader').fadeOut('slow');
                
                $('#offcanvasRight').offcanvas("toggle");
            }
        });
    });
});