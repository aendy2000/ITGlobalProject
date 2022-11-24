$(document).ready(function () {
    
    //Chọn ảnh
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    })
    //Xóa ảnh
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
    })
    
    //Click Thêm mới
    $('#luuThongTin').on('click', function () {

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Lưu Chỉnh Sửa?',
                    text: "Bạn có chắc chắn muốn thay đổi thông tin dự án?",
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
                }).then((luuchinhsua) => {
                    if (luuchinhsua) {
                        $('#AjaxLoader').show();
                        //Du án
                        var idduan = $('#idduan').val();
                        var name = $('#name').val();
                        var mota = $('#mota').val();
                        var batdau = $('#batdau').val();
                        var ketthuc = $('#ketthuc').val();

                        var dem = $('#dem').val();
                        let giaidoan = "";
                        let chiphi = "";
                        for (var i = 1; i <= dem; i++) {
                            if ($('#ngaygd' + i).val().length == 0) {
                                //Thông báo lỗi lên
                                continue;
                            }

                            if ($('#gd' + i).val().length == 0) {
                                //Thông báo lỗi lên
                                continue;
                            }
                            //Chuẩn r thì làm
                            if (i == dem) {
                                giaidoan += $('#ngaygd' + i).val();
                                chiphi += $('#gd' + i).val();
                            }
                            else {
                                giaidoan += $('#ngaygd' + i).val() + "_";
                                chiphi += $('#gd' + i).val() + "_";
                            }
                        }
                        //Khách hàng
                        var idkh = $('#idkh').val();
                        var avatar = $("#selectFiles")[0].files[0];
                        var namedn = $('#namedn').val();
                        var hoten = $('#hoten').val();
                        var cmnd = $('#cmnd').val();
                        var phone = $('#phone').val();
                        var email = $('#email').val();
                        var ngaysinh = $('#ngaysinh').val();
                        var gioitinh = $('#gioitinh :selected').val();
                        var diahchinha = $('#diahchinha').val();

                        //Check gì đó



                        //Check đúng hết thì làm
                        var formData = new FormData();
                        formData.append('avatar', avatar);
                        formData.append('name', name);
                        formData.append('mota', mota);
                        formData.append('batdau', batdau);
                        formData.append('ketthuc', ketthuc);
                        formData.append('giaidoan', giaidoan);
                        formData.append('chiphi', chiphi);
                        formData.append('namedn', namedn);
                        formData.append('hoten', hoten);
                        formData.append('cmnd', cmnd);
                        formData.append('phone', phone);
                        formData.append('email', email);
                        formData.append('ngaysinh', ngaysinh);
                        formData.append('gioitinh', gioitinh);
                        formData.append('diahchinha', diahchinha);
                        formData.append('idduan', idduan);
                        formData.append('idkh', idkh);

                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaDuAn',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "Đã có xảy ra lỗi, vui lòng thử lại") {
                                $('#AjaxLoader').hide();

                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại sau", {
                                            icon: "danger",
                                            buttons: {
                                                confirm: {
                                                    className: 'btn btn-danger'
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
                            else if (ketqua === "DANHSACH") {
                                $('#AjaxLoader').hide();

                                window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/danhSachDuAn';
                            }
                            else {
                                $('#chiTietDuAnPartialID').replaceWith(ketqua);
                                $('#selectFiles').val(null);
                                $('#dongChinhSuaDuAn').click();
                                $.when(
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                ).done(function () { });
                                if ($("#progressChart").length) {
                                    e = {
                                        series: [$('#tienDoTongTheDuAn').val()],
                                        chart: {
                                            height: 350,
                                            type: "radialBar",
                                            toolbar: {
                                                show: !1
                                            }
                                        },
                                        colors: [window.theme.primary, window.theme.warning],
                                        plotOptions: {
                                            radialBar: {
                                                startAngle: -135,
                                                endAngle: 225,
                                                hollow: {
                                                    margin: 0,
                                                    size: "70%",
                                                    background: window.theme.white,
                                                    image: void 0,
                                                    imageOffsetX: 0,
                                                    imageOffsetY: 0,
                                                    position: "front",
                                                    dropShadow: {
                                                        enabled: !0,
                                                        top: 3,
                                                        left: 0,
                                                        blur: 4,
                                                        opacity: .24
                                                    }
                                                },
                                                track: {
                                                    background: window.theme.white,
                                                    strokeWidth: "67%",
                                                    margin: 0,
                                                    dropShadow: {
                                                        enabled: !0,
                                                        top: -3,
                                                        left: 0,
                                                        blur: 4,
                                                        opacity: .35
                                                    }
                                                },
                                                dataLabels: {
                                                    showOn: "always",
                                                    name: {
                                                        show: !1
                                                    },
                                                    value: {
                                                        formatter: function (e) {
                                                            return parseInt(e) + "%"
                                                        },
                                                        color: window.theme.dark,
                                                        fontSize: "48px",
                                                        fontWeight: "700",
                                                        show: !0
                                                    }
                                                }
                                            }
                                        },
                                        fill: {
                                            type: "gradient",
                                            gradient: {
                                                shade: "dark",
                                                type: "horizontal",
                                                shadeIntensity: .5,
                                                gradientToColors: [window.theme.warning],
                                                inverseColors: !1,
                                                opacityFrom: 1,
                                                opacityTo: 1,
                                                stops: [0, 100]
                                            }
                                        },
                                        stroke: {
                                            lineCap: "round"
                                        }
                                    };
                                    new ApexCharts(document.querySelector("#progressChart"), e).render()
                                }

                                $('#AjaxLoader').hide();
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Đã lưu thông tin chỉnh sửa!", {
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
    });
});