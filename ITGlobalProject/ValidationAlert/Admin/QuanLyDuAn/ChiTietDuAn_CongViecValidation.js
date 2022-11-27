$(document).ready(function () {

    //Thêm task mới
    $('#luuThemTask').on('click', function () {
        var idpro = $("#idpro").val();
        var assign = $('#nguoithuchien :selected').val();
        var taskname = $('#taskName').val();
        var mota = $('#motatask').val();
        var deadline = $('#deadline').val();
        var estimate = $('#estimate').val();

        var tentailieu = $('#tentailieu').val();
        var loaitailieu = $('#loaitailieu :selected').val();
        var duongdantailieu = $('#duongdantailieu').val();

        //Check


        //Check xong thì:

        $('#AjaxLoader').show();

        var formData = new FormData();
        formData.append('idpro', idpro);
        formData.append('idassign', assign);
        formData.append('taskname', taskname);
        formData.append('mota', mota);
        formData.append('deadline', deadline);
        formData.append('estimate', estimate.replace(",", "."));
        formData.append('tentailieu', tentailieu);
        formData.append('loaitailieu', loaitailieu);
        formData.append('duongdantailieu', duongdantailieu);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/themCongViec',
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
                $('#dongthemTask').click();
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
                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thành Công!", "Đã thêm một công việc mới!", {
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

    //Kéo task
    dragula([document.querySelector("#do"),
    document.querySelector("#progress"),
    document.querySelector("#review"),
    document.querySelector("#done")]).on('drop', function (CucDuocKeo, viTriMoi, viTriCu, viTriPhiaTrenCucBiKeo) {
        var target = viTriMoi.innerText.trim();
        var source = viTriCu.innerText.trim();

        alert(viTriMoi.id + " - " + vlue + " - " + viTriCu.id);
    });

    //Load width

});