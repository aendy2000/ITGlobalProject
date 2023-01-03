$(document).ready(function () {
    //Chart
    var options = {
        series: [],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: [],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    var lstSeries = $('#chiPhiDebt').val().split("~");
    var lstLabel = $('#giaiDoanDebt').val().toUpperCase().split("~");

    for (var i = 0; i < lstSeries.length; i++) {
        options.series.push(Number(lstSeries[i]));
        options.labels.push(lstLabel[i]);
    }

    var chart = new ApexCharts(document.querySelector("#traffic"), options);
    chart.render();

    //click thanh toán
    $('[id^="btnThanhToan"]').on('click', function () {
        var id = $(this).attr("name");
        var ghiChu = '<p id="ghiChuThanhToan"><b>' + $('#tongTien' + id).attr("name") + '</b> cần thanh toán: <b class="text-danger">' + $('#tongTien' + id).val() + '</b> nữa.</p>';
        $('#soTienThanhToan').val("");

        $('#ThanhToanModalTitle').text("Thoanh toán chi phí " + $('#tongTien' + id).attr("name"));
        $('#ghiChuThanhToan').replaceWith(ghiChu);
        $('#idThanhToan').val(id);
        $('#ThanhToanModal').modal('toggle');
    });

    //click Lưu thanh toán
    $('#btnLuuThanhToan').on('click', function () {
        $('#soTienThanhToanvalidation').hide();

        var id = $('#idThanhToan').val();
        var price = $('#soTienThanhToan').val().replace(/,/g, '');

        var check = true;
        if (price.length < 1) {
            check = false;
            $('#soTienThanhToanvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }
        else if (Number(price) == 0) {
            check = false;
            $('#soTienThanhToanvalidation').text("Số tiền phải khác 0, vui lòng kiểm tra lại.").show().prop("hidden", false);
        }
        else if (Number($('#tongTien' + id).val().replace(" VND", '').replace(/,/g, '').trim()) <= 0 && Number(price) > 0) {
            check = false;
            $('#soTienThanhToanvalidation').text("Giai đoạn đã được thanh toán hết, không thể thanh toán thêm. Nhập vào số tiền âm nếu trước đó bạn đã thanh toán nhầm số dư!").show().prop("hidden", false);
        }
        else if (Number($('#tongTien' + id).val().replace(" VND", '').replace(/,/g, '').trim()) > 0
            && Number(price) > Number($('#tongTien' + id).val().replace(" VND", '').replace(/,/g, '').trim())) {
            check = false;
            $('#soTienThanhToanvalidation').text("Số tiền cần thanh toán là " + $('#tongTien' + id).val() + ". Vui lòng không nhập hơn!").show().prop("hidden", false);
        }

        if (check == true) {
            var SweetAlert2Demo = function () {
                var initDemos = function () {
                    swal({
                        title: 'Thanh Toán?',
                        text: "Xác nhận thanh toán: " + $('#soTienThanhToan').val() + " VND cho " + $('#tongTien' + id).attr("name") + "?",
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
                            formData.append('id', id);
                            formData.append('price', price);
                            $('#AjaxLoader').show();
                            $.ajax({
                                url: $('#requestPath').val() + "Admins/quanlyduan/thanhToanCongNo",
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
                                    $('#ThanhToanModal').modal('toggle');
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
                                        content.message = 'Đã thêm khoản thanh toán cho ' + $('#tongTien' + id).attr("name");
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
                                    }, 100);
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
});