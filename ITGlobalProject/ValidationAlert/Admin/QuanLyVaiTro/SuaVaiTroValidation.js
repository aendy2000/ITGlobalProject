$(document).ready(function (e) {

    //Click chỉnh sửa
    $('[id^="chinhsua"]').on('click', function (e) {
        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();
        var des = $('#des' + name).val();

        $('#id').val(ids);
        $('#name').val(names);
        $('#descript').val(des);
    });

    //Click lưu
    $('#luuChinhSua').on('click', function (e) {
        var id = $('#id').val();
        var name = $('#name').val();
        var des = $('#descript').val();

        var formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', des);

        let urls = $('#actionChinhSua').data('request-url');
        $.ajax({
            url: urls,
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            $('#dongChinhSua').click();
            if (ketqua === "DANHSACH") {
                window.location.href = $('#actionDanhSach').data('request-url');
            } else {
                $('#danhSachPartial').replaceWith(ketqua);
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
                $.when(
                    $.getScript($('#requestScript').val() + "Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js"),
                    $.getScript($('#requestScript').val() + "Content/Admin/assets/js/theme.min.js"),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                ).done(function () {
                });
            }
        });
    });

});