$(document).ready(function (e) {

    //Click chỉnh sửa
    $('[id^="chinhsua"]').on('click', function (e) {
        var name = $(this).attr("name");
        var ids = $('#ids' + name).val();
        var names = $('#names' + name).val();
        var dates = $('#dates' + name).val();
        var datetypes = $('#datetypes' + name).val();

        $('#id').val(ids);
        $('#name').val(names);
        $('#date').val(dates);
        $('#datetype').selectpicker('val', datetypes);
    });

    //Click lưu
    $('#luuChinhSua').on('click', function (e) {

        $('#EdittenNgayNghiValidation').prop('hidden', true);
        $('#EditdateValidation').prop('hidden', true);
        $('#EditloaingaynghiValidation').prop('hidden', true);

        var id = $('#id').val();
        var name = $('#name').val().trim();
        var date = $('#date').val().trim();
        var datetype = $('#datetype :selected').val().trim();
        var check = true;

        if (name.length < 1) {
            check = false;
            $('#EdittenNgayNghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }
        else if (name.length > 50) {
            check = false;
            $('#EdittenNgayNghiValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop('hidden', false);
        }

        if (date.length < 1) {
            check = false;
            $('#EditdateValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }

        if (datetype.length < 1) {
            check = false;
            $('#EditloaingaynghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }
      
        if (check == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('date', date);
            formData.append('datetype', datetype);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/chinhSuaDanhMucNgayNghiPhep",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongChinhSua').click();
                if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/danhsachDanhMucNgayNghiPhep";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    $('#dataTableBasic').DataTable();
                    $('#date').flatpickr();
                    $('#AjaxLoader').hide();
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
        }
    });
});