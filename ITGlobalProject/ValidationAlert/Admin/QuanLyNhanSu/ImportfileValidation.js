$(document).ready(function () {
    //Kiểm tra
    $('#btnSubmitImport').on('click', function () {
        $('#importfilevalidation').hide();
        let fileimport = $('#fileimport').val();
        let fileType = fileimport.substr(fileimport.lastIndexOf('.') + 1).toLowerCase();

        if (fileimport.trim().length < 1) {
            $('#importfilevalidation').text("Bạn chưa chọn file, Hãy chọn file danh sách cần nhập.").show().prop("hidden", false);
        } else if (fileType != "xlsx" && fileType != "xls") {
            $('#importfilevalidation').text("File không đúng định dạng, Vui lòng chọn file có định dạng .xls/.xlsx.").show().prop("hidden", false);
        }
        else {
            var formData = new FormData();
            formData.append('lstNhanVien', $("#fileimport")[0].files[0]);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/imPortNhanVien',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#fileimport').val(null);
                if (ketqua == "INCORRECT") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông báo!", "Dữ liệu file được nhập chưa đúng,\nvui lòng kiểm tra và thực hiện lại.", {
                                icon: "error",
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
                else if (ketqua == "DANHSACH") {
                    $('#AjaxLoader').hide();
                    window.location.href = $('#requestPath').val() + "admins/quanlynhansu/danhsachnhanvien";
                } else if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
                }
                else {
                    $('#lstTempDataEmployee').replaceWith(ketqua);
                    $('#AjaxLoader').hide();
                    $('#openListEmployeeTemp').click();

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
    //Hủy

    $('#reserImport').on('click', function () {
        $('#fileimport').val(null);
        $('#importfilevalidation').hide();
    });

    //Tải xuống toàn danh sách
    $('#taixuongtoanbo').on('click', function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Tải xuống danh sách?',
                    text: "Bạn có muốn tải xuống toàn bộ danh sách,\nbao gồm nhân viên đã được thêm và nhân viên chưa được thêm?",
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
                }).then((taixuong) => {
                    if (taixuong) {
                        $("#tblToanBoDS").table2excel({
                            filename: 'danh-sach-nhan-vien-duoc-nhap-' + yyyy + '-' + mm + '-' + dd + '.xls'
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

    //Tải xuống danh sách đã thêm
    $('#taixuongdsduocthem').on('click', function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Tải xuống danh sách đã thêm?',
                    text: "Bạn có muốn tải xuống danh sách các nhân viên đã được thêm thành công?",
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
                }).then((taixuong) => {
                    if (taixuong) {
                        $("#tblDSDaThem").table2excel({
                            filename: 'danh-sach-nhan-vien-duoc-nhap-thanh-cong-' + yyyy + '-' + mm + '-' + dd + '.xls'
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

    //Tải xuống danh sách chưa thêm
    $('#taixuongdschuathem').on('click', function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Tải xuống danh sách chưa thêm?',
                    text: "Bạn có muốn tải xuống danh sách các nhân viên chưa được thêm thành công?",
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
                }).then((taixuong) => {
                    if (taixuong) {
                        $("#tblDSChuaThem").table2excel({
                            filename: 'danh-sach-nhan-vien-chua-duoc-them-' + yyyy + '-' + mm + '-' + dd + '.xls'
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