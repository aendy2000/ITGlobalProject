$(document).ready(function () {

    //...............

    $('#reserData').on('click', function () {
        let id = $('#idus').val();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/trinhDoNgoaiNguPartial?id=' + id,
            type: 'GET',
            dataType: 'html',
        }).done(function (ketqua) {
            if (ketqua !== "DANHSACH") {
                $('#contentPartial').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
            else {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            }
        });
    });

    //Thêm ngoại ngữ
    $('#themngoaingu').on('click', function (e) {
        let sott = Number($('#demngoaingu').val()) + 1;
        if (sott > 10) {
            alert("10 thôi nhiều d");
        }
        else {
            $('#appendngoaingudayne').replaceWith(
                '<div id="grtenngoaingu' + sott + '" class="mb-3 col-12 col-md-12">'
                + '<label style="font-weight:bold;" class="form-label">Ngoại ngữ ' + sott + ' <span class="text-danger">*</span></label>'
                + '<input class="form-control" id="strtenngoaingu' + sott + '" placeholder="Tên ngoại ngữ" />'
                + '<p style="font-size: 13px; color:red;" id="strtenngoaingu' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grtrinhdongoaingu' + sott + '" class="mb-3 col-12 col-md-12">'
                + '<label style="font-weight:bold;" class="form-label">Trình độ kỹ năng <span class="text-danger">*</span></label>'
                + '<div class="input-group">'
                + '<span class="input-group-text bg-dark text-light">L</span>'
                + '<select class="form-select text-dark" id="trinhdol' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Listening</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">S</span>'
                + '<select class="form-select text-dark" id="trinhdos' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Speaking</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">R</span>'
                + '<select class="form-select text-dark" id="trinhdor' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Reading</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '<span class="input-group-text bg-dark text-light">W</span>'
                + '<select class="form-select text-dark" id="trinhdow' + sott + '" aria-label="Example select with button addon">'
                + '<option value="">Writing</option>'
                + '<option value="Yếu">Yếu</option>'
                + '<option value="Trung Bình">Trung Bình</option>'
                + '<option value="Khá">Khá</option>'
                + '<option value="Giỏi">Giỏi</option>'
                + '</select>'
                + '</div>'
                + '<p style="font-size: 13px; color:red;" id="trinhdo' + sott + 'validation"></p>'
                + '</div>'
                + '<hr id="gachngang' + sott + '" class="my-4" />'
                + '<div id="appendngoaingudayne" class="col-12"></div>'
            );

            var elem = document.getElementById('demngoaingu');
            elem.value = sott;
        }
    });

    //xóa ngoại ngữ
    $('#xoabotngoaingu').on('click', function (e) {
        let sott = Number($('#demngoaingu').val());
        if (sott === 0) {
        }
        else {
            $('#grtenngoaingu' + sott).remove();
            $('#grtrinhdongoaingu' + sott).remove();
            $('#gachngang' + sott).remove();
            var elem = document.getElementById('demngoaingu');
            elem.value = sott - 1;
        }
    });

    //Lưu chỉnh sửa
    $('#btnLuuThongTin').on('click', function (e) {

        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();
        //Trình độ ngoại ngữ, lấy biến [trinhdongoaingu]
        let trinhdongoaingu = "";
        let soluongngoaingu = $('#demngoaingu').val();


        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        $('#strtenngoaingu' + i + 'validation').hide();
        $('#trinhdo' + i + 'validation').hide();

        var checkngoaingu = true;

        if (soluongngoaingu > 0) {
            for (var i = 1; i <= soluongngoaingu; i++) {
                if (i == soluongngoaingu) {
                    // Tên ngoại ngữ
                    if ($('#strtenngoaingu' + i).val().trim().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatnumber.test($('#strtenngoaingu' + i).val().trim()) == true || formatss.test($('#strtenngoaingu' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
                    }
                    // Trình độ
                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checkngoaingu == true) {
                        trinhdongoaingu += $('#strtenngoaingu' + i).val()
                            + "_" + $('#trinhdol' + i + ' :selected').val()
                            + "_" + $('#trinhdos' + i + ' :selected').val()
                            + "_" + $('#trinhdor' + i + ' :selected').val()
                            + "_" + $('#trinhdow' + i + ' :selected').val();
                    }
                }
                else {
                    // Tên ngoại ngữ
                    if ($('#strtenngoaingu' + i).val().trim().length < 1) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatnumber.test($('#strtenngoaingu' + i).val().trim()) == true || formatss.test($('#strtenngoaingu' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checkngoaingu = false;
                        $('#strtenngoaingu' + i + 'validation').text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show();
                    }
                    // Trình độ
                    if ($('#trinhdol' + i).val().length < 1 || $('#trinhdos' + i).val().length < 1 || $('#trinhdor' + i).val().length < 1 || $('#trinhdow' + i).val().length < 1) {
                        checkngoaingu = false;
                        $('#trinhdo' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checkngoaingu == true) {
                        trinhdongoaingu += $('#strtenngoaingu' + i).val()
                            + "_" + $('#trinhdol' + i + ' :selected').val()
                            + "_" + $('#trinhdos' + i + ' :selected').val()
                            + "_" + $('#trinhdor' + i + ' :selected').val()
                            + "_" + $('#trinhdow' + i + ' :selected').val()
                            + "=";
                    }
                }
            }

        }
        //Check
        //Done
        //Lập form
        if (checkngoaingu == true) {
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Trình độ ngoại ngữ, lấy biến [trinhdongoaingu]
            formData.append('trinhdongoaingu', trinhdongoaingu);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuatrinhDoNgoaiNgu',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                    alert("Đã có xảy ra lỗi, vui lòng thử lại!");
                }
                else if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    $.when(
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    );

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