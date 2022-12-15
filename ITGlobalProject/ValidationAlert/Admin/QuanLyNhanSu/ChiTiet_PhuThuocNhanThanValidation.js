$(document).ready(function () {

    //...............

    $('#reserData').on('click', function () {
        let id = $('#idus').val();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/phuThuocNhanThanPartial?id=' + id,
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

    //Thêm nhân thân
    $('#themnhanthan').on('click', function (e) {
        let sott = Number($('#dem').val()) + 1;
        if (sott > 10) {
            alert("10 thôi nhiều d");
        }
        else {
            $('#appenddayne').replaceWith(
                '<div id="grhotennhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label">Họ & Tên nhân thân ' + sott + ' <span class="text-danger">*</span></label>'
                + '<input id="hotennhanthan' + sott + '" name="hotennhanthan' + sott + '" type="text" class="form-control" placeholder="Họ và Tên người phụ thuộc" />'
                + '<p style="font-size: 13px; color:red;" id="hotennhanthan' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grmoiquanhenhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label"> Mối quan hệ <span class="text-danger">*</span></label>'
                + '<input id="moiquanhenhanthan' + sott + '" name="moiquanhenhanthan' + sott + '" type="text" class="form-control" placeholder="Mối quan hệ với người phụ thuộc" />'
                + '<p style="font-size: 13px; color:red;" id="moiquanhenhanthan' + sott + 'validation"></p>'
                + '</div>'
                + '<div id="grngaysinhnhanthan' + sott + '" class="mb-2 col-12 col-md-4">'
                + '<label style="font-weight:bold;" class="form-label" > Ngày sinh <span class="text-danger">*</span></label>'
                + '<input type="text" class="form-control flatpickr" placeholder="Chọn ngày sinh" id="ngaysinhnhanthan' + sott + '" name="ngaysinhnhanthan' + sott + '" />'
                + '<p style="font-size: 13px; color:red;" id="ngaysinhnhanthan' + sott + 'validation"></p>'
                + '</div>'
                + ' <div id="appenddayne" class="col-12"></div>');

            var elem = document.getElementById('dem');
            elem.value = sott;
            if ($("input").length && Inputmask().mask(document.querySelectorAll("input")), $("#editor").length) new Quill("#editor", {
                modules: {
                    toolbar: [
                        [{
                            header: [1, 2, !1]
                        }],
                        [{
                            font: []
                        }],
                        ["bold", "italic", "underline", "strike"],
                        [{
                            size: ["small", !1, "large", "huge"]
                        }],
                        [{
                            list: "ordered"
                        }, {
                            list: "bullet"
                        }],
                        [{
                            color: []
                        }, {
                            background: []
                        }, {
                            align: []
                        }],
                        ["link", "image", "code-block", "video"]
                    ]
                },
                theme: "snow"
            });
            $(".flatpickr").length && flatpickr(".flatpickr", {
                disableMobile: !0
            });
        }
    });

    //xóa nhân thân
    $('#xoabotnhanthan').on('click', function (e) {
        let sott = Number($('#dem').val());
        if (sott === 0) {
        }
        else {
            $('#grhotennhanthan' + sott).remove();
            $('#grmoiquanhenhanthan' + sott).remove();
            $('#grngaysinhnhanthan' + sott).remove();

            var elem = document.getElementById('dem');
            elem.value = sott - 1;
        }
    });

    //Lưu chỉnh sửa
    $('#btnLuuThongTin').on('click', function (e) {

        $('#hotennhanthan' + i + 'validation').hide();
        $('#moiquanhenhanthan' + i + 'validation').hide();
        $('#ngaysinhnhanthan' + i + 'validation').hide();
        //Liên Hệ & Thanh Toán
        let id = $('#idus').val();
        //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
        let phuthuocnhanthan = "";
        let soluongnhanthan = $('#dem').val();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var checknhanthan = true;

        if (soluongnhanthan > 0) {
            for (var i = 1; i <= soluongnhanthan; i++) {
                if (i == soluongnhanthan) {
                    // Vali họ tên 
                    if ($('#hotennhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatnumber.test($('#hotennhanthan' + i).val().trim()) == true || formatss.test($('#hotennhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    // Vali mối quan hệ
                    if ($('#moiquanhenhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatss.test($('#moiquanhenhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    // Vali ngày sinh
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checknhanthan == true) {
                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val();
                    }
                }
                else {
                    // Vali họ tên 
                    if ($('#hotennhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatnumber.test($('#hotennhanthan' + i).val().trim()) == true || formatss.test($('#hotennhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#hotennhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    // Vali mối quan hệ
                    if ($('#moiquanhenhanthan' + i).val().trim().length < 1) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    else if (formatss.test($('#moiquanhenhanthan' + i).val().trim().toLowerCase().replace(/\d+/g, '')) == true) {
                        checknhanthan = false;
                        $('#moiquanhenhanthan' + i + 'validation').text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
                    }
                    // Vali ngày sinh
                    if ($('#ngaysinhnhanthan' + i).val().length < 1) {
                        checknhanthan = false;
                        $('#ngaysinhnhanthan' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
                    }
                    if (checknhanthan == true) {
                        phuthuocnhanthan += $('#hotennhanthan' + i).val()
                            + "_" + $('#moiquanhenhanthan' + i).val()
                            + "_" + $('#ngaysinhnhanthan' + i).val()
                            + "=";
                    }
                }
            }
        }
        // Check
        if (checknhanthan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Phụ thuộc nhân thân, lấy biến [phuthuocnhanthan]
            formData.append('phuthuocnhanthan', phuthuocnhanthan);

            e.preventDefault();
            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaPhuThuocNhanThan',
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
                            swal("Thành Công!", "Đã lưu thông tin chỉnh sửa", {
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
        //Done
    });
});