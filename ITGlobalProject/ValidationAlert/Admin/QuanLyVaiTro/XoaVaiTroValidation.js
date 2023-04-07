$(document).ready(function (e) {

    //Click chỉnh sửa
    $('[id^="xoa"]').on('click', function (e) {
        var name = $(this).attr("name");
        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Chức danh?',
                    text: "Chắc chắn muốn xóa chứ?",
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
                }).then((xoavaitro) => {
                    if (xoavaitro) {
                        var ids = $('#ids' + name).val();
                        var formData = new FormData();
                        formData.append('id', ids);

                        let urls = $('#actionXoa').data('request-url');
                        $.ajax({
                            url: urls,
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua === "DANHSACH") {
                                window.location.href = $('#actionDanhSach').data('request-url');
                            } else {
                                $('#danhSachPartial').replaceWith(ketqua);
                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Bạn đã xóa thành công.", {
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