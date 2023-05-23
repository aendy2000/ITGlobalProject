$(document).ready(function (e) {

    //Click lưu
    $('#themdanhmucngaynghiphep').on('click', function (e) {

        $('#tenNgayNghiValidation').prop('hidden', true);
        $('#NgayNghiValidation').prop('hidden', true);
        $('#loaiNgayNghiBatdauValidation').prop('hidden', true);

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;

        var name = $('#tenngaynghi').val().trim();
        var date = $('#ngaynghi').val().trim();
        var datetype = $('#loaingaynghi :selected').val().trim();
        var check = true;

        if (name.length < 1) {
            check = false;
            $('#tenNgayNghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }
        else if (formatss.test(name.toLowerCase().replace(/\d+/g, '')) == true) {
            check = false;
            $('#tenNgayNghiValidation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
        }
        else if (name.length > 50) {
            check = false;
            $('#tenNgayNghiValidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop('hidden', false);
        }

        if (date.length < 1) {
            check = false;
            $('#NgayNghiValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }

        if (datetype.length < 1) {
            check = false;
            $('#loaiNgayNghiBatdauValidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop('hidden', false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('date', date);
            formData.append('datetype', datetype);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + "Admins/QuanLyDanhMucNgayNghiPhep/themDanhMucNgayNghiPhep",
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#dongthemdanhmuc').click();
                if (ketqua === "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "admins/quanlydanhmucngaynghiphep/danhsachDanhMucNgayNghiPhep";
                } else {
                    $('#danhSachPartial').replaceWith(ketqua);
                    $('#dataTableBasic').DataTable();
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã thêm thành công.", {
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