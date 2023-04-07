$(document).ready(function () {

    //...............

    $('#btnLuuThongTin').on('click', function (e) {
        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();
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


        //Check

        //Done
        //Lập form
        var formData = new FormData();
        //Thông Tin Cá Nhân
        formData.append('id', id);
        //Trợ Cấp & Phụ Cấp, lấy biến [trocap]
        formData.append('trocap', trocap);


        e.preventDefault();
        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaTroCap',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#AjaxLoader').hide();
            if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                alert("Đã có xảy ra lỗi, vui lòng thử lại!");
            }
            else if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
            }
            else {
                $('#contentPartial').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );

                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thành Công!", "Bạn đã cập nhật thành công.", {
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