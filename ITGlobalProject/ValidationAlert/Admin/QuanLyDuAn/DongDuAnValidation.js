$(document).ready(function () {
    $('#dongDuAn').on('click', function () {

        var tieude = "";
        var noidungthongbao = "";
        var thanhcong = "";
        var types = "";
        var changename = "";
        var removeClasses = "";
        var addClasses = "";
        var appendContent = "";
        var lock = false;

        if ($(this).attr('name') == "dangmo") {
            tieude = "Đóng Lại Dự Án?";
            types = "danger";
            noidungthongbao = "Bạn có chắc muốn đóng lại dự án " + $('#nameProject').val() + "?\nBạn vẫn có thể mở lại dự án này bất cứ lúc nào!";
            thanhcong = "Dự án " + $('#nameProject').val() + " đã được đóng lại.";
            changename = "dangdong";
            addClasses = "btn btn-success me-2";
            removeClasses = "btn btn-danger me-2";
            appendContent = '<i class="fe fe-unlock"></i>&ensp;Mở Dự Án';
            lock = true;
        }
        else {
            tieude = "Mở Dự Án?";
            types = "info";
            noidungthongbao = "Bạn có chắc muốn mở lại dự án " + $('#nameProject').val() + "?";
            thanhcong = "Dự án " + $('#nameProject').val() + " đã được mở lại.";
            changename = "dangmo";
            addClasses = "btn btn-danger me-2";
            removeClasses = "btn btn-success me-2";
            appendContent = '<i class="fe fe-lock"></i>&ensp;Đóng Dự Án';
            lock = false;
        }

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: tieude,
                    text: noidungthongbao,
                    type: types,
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
                }).then((dongduan) => {
                    if (dongduan) {
                        var id = $('#idpro').val();
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('locks', lock);
                        $('#AjaxLoader').fadeIn('slow');
                        $.ajax({
                            url: $('#requestPath').val() + "Admins/quanlyduan/khoaDuAn",
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

                                $('#AjaxLoader').fadeOut('slow');
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", thanhcong, {
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

                                $('#dongDuAn').attr('name', changename);
                                $('#dongDuAn').removeClass(removeClasses);
                                $('#dongDuAn').addClass(addClasses);
                                $('#dongDuAn').empty();
                                $('#dongDuAn').append(appendContent);

                            }
                            else {
                                $('#AjaxLoader').fadeOut('slow');
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thông Báo!", "Đã có lỗi xảy ra, xin vui lòng thử lại sau vài phút!", {
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
    });
});