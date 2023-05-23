$(document).ready(function () {

   
    //Bộ phận
    $('#bophan').on('change', function () {
        if ($('#bophan :selected').val().length < 1) {
            document.getElementById('vaitro').value = "";
            $('#vaitro').prop('disabled', true);
        } else {
            var formData = new FormData();
            formData.append('id', $('#bophan :selected').val())

            $.ajax({
                url: $('#requestPath').val() + 'employee/quanlytaikhoan/luaChonBoPhan',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "employee/quanlytaikhoan/thongtinchitiet?id=" + $('#idus').val();
                } else {
                    $('#vaitro').replaceWith(ketqua);
                }
            });
        }
    });

    // LƯU THÔNG TIN LÀM VIỆC
    $('#btnLuuThongTin').on('click', function (e) {

        $('#ngayvaolamvalidation').text("").hide();
        $('#vaitrovalidation').text("").hide();
        $('#hinhthucvalidation').text("").hide();
        $('#usernamevalidation').text("").hide();

        let id = $('#idus').val();
        //Hợp đồng & Tài khoản
       
        let ngayvaolam = $('#ngayvaolam').val();
        let bophan = $('#bophan :selected').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var checkhopdongtaikhoan = true;


        //Check
        //Ngày vào làm
        if (ngayvaolam.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngayvaolamvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Bộ phận
        if (bophan.length < 1) {
            checkhopdongtaikhoan = false;
            $('#bophanvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Chức danh
        if (vaitro.length < 1) {
            checkhopdongtaikhoan = false;
            $('#vaitrovalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Hình thức
        if (hinhthuc.length < 1) {
            checkhopdongtaikhoan = false;
            $('#hinhthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

       
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Hợp đồng & Tài khoản
            formData.append('ngayvaolam', ngayvaolam);
            formData.append('vaitro', vaitro);
            formData.append('hinhthuc', hinhthuc);
            e.preventDefault();
            $('#AjaxLoader').fadeIn('slow');
            $.ajax({
                url: $('#requestPath').val() + 'employee/quanlytaikhoan/chinhSuaViecLamHopDong',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').fadeOut('slow');
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                    alert("Đã có xảy ra lỗi, vui lòng thử lại!");
                }
                else if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "employee/quanlytaikhoan/thongtinchitiet?id=" + $('#idus').val();
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
    });
    //

    $('#reloadPage').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'employee/quanlytaikhoan/hopDongPartial?id=' + $('#idus').val(),
            type: 'GET',
            dataType: 'html'
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
                window.location.href = $('#requestPath').val() + "employee/quanlytaikhoan/thongtinchitiet?id=" + $('#idus').val();
            }
        });
    });
});