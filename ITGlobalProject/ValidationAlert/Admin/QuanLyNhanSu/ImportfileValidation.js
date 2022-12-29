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

    //Đóng ds import
    $('#dongDSImport').on('click', function () {
        $('#lstTempDataEmployee').replaceWith('<div id="lstTempDataEmployee" class="card" data-simplebar></div>');
    });
});