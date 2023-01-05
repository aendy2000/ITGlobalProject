$(document).ready(function () {
    $('#xoaDuAn').on('click', function () {
        $('#xacnhantenproject').val("");
        $('#xacnhantenprojectvalidation').hide();

        var ghiChu = '<p id="ghiChuXoaProject">Hãy nhập vào tên dự án: <b class="text-danger">' + $('#nameProject').val() + '</b> nếu bạn đã chắc chắn muốn <b class="text-danger">xóa</b> dự án này!.</p>';
        $('#ghiChuXoaProject').replaceWith(ghiChu);
        $('#modalXoaDuAn').modal("toggle");
    });

    $('#xacnhantenproject').on('input', function () {
        if ($(this).val().length < 1) {
            $('#xacnhantenprojectvalidation').hide();
        }
        else if ($(this).val() !== $('#nameProject').val()) {
            $('#xacnhantenprojectvalidation').text('Tên của dự án chưa trùng khớp.').show().prop("hidden", false);
        } else {
            $('#xacnhantenprojectvalidation').hide();
        }
    });

    $('#btnLuuXoaDuAn').on('click', function () {
        var check = true;
        if ($('#xacnhantenproject').val() < 1) {
            check = false;
            $('#xacnhantenprojectvalidation').text('Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.').show().prop("hidden", false);
        } else if ($('#xacnhantenproject').val() !== $('#nameProject').val()) {
            check = false;
            $('#xacnhantenprojectvalidation').text('Tên của dự án chưa trùng khớp.').show().prop("hidden", false);
        }

        if (check == true) {
            var SweetAlert2Demo = function () {
                var initDemos = function () {
                    swal({
                        title: 'Xóa Dự Án?',
                        text: "Tất cả những thông tin về dự án sẽ được xóa và không thể hoàn tác lại!"
                            + "\nVẫn tiếp tục xóa dự án: " + $('#nameProject').val() + "?",
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
                    }).then((xoaduan) => {
                        if (xoaduan) {
                            var id = $('#idpro').val();
                            var formData = new FormData();
                            formData.append('id', id);
                            $('#AjaxLoader').show();
                            $.ajax({
                                url: $('#requestPath').val() + "Admins/quanlyduan/xoaDuAn",
                                type: 'POST',
                                dataType: 'html',
                                contentType: false,
                                processData: false,
                                data: formData
                            }).done(function (ketqua) {
                                if (ketqua == "DANHSACH") {
                                    window.location.href = $('#requestPath').val() + "Admins/quanlyduan/danhsachduan";
                                }
                                else if (ketqua == "SUCCESS") {
                                    $('#AjaxLoader').hide();
                                    var SweetAlert2Demo = function () {
                                        var initDemos = function () {
                                            swal("Thành Công!", "Dự án đã được xóa bỏ, Tiếp tục đi đến trang xem danh sách.", {
                                                icon: "success",
                                                buttons: {
                                                    confirm: {
                                                        className: 'btn btn-success'
                                                    }
                                                },
                                            }).then(() => {
                                                window.location.href = $('#requestPath').val() + "admins/quanlyduan/danhsachduan";
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
                                else {
                                    $('#AjaxLoader').hide();
                                    var SweetAlert2Demo = function () {
                                        var initDemos = function () {
                                            swal("Thông Báo!", "Đã có lỗi xảy ra, vui lòng thử lại.", {
                                                icon: "error",
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
        }
    });
});