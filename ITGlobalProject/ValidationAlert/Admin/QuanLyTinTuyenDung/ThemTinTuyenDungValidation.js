$(document).ready(function () {

    //Đăng tin
    $('#dangtin').on('click', function () {
        //Hide các thẻ p
        $("#tieudevalidation").text("").hide();
        $("#chucdanhvalidation").text("").hide();
        $("#soluongvalidation").text("").hide();
        $("#hinhthucvalidation").text("").hide();
        $("#gioitinhvalidation").text("").hide();
        $("#mucluongtoithieuvalidation").text("").hide();
        $("#mucluongtoidavalidation").text("").hide();
        $("#kinhnghiemvalidation").text("").hide();
        $("#hannopcvvalidation").text("").hide();
        $("#selectKyNangChuyenMonvalidation").text("").hide();
        $("#motacongviecvalidation").text("").hide();
        $("#yeucauungvienvalidation").text("").hide();
        $("#quyenloiungvienvalidation").text("").hide();
        //Gọi các check ký tự đặc biệt...
        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        //Lấy giá trị
        let tieude = $('#tieude').val().trim();
        let chucdanh = $('#chucdanh :selected').val();
        let soluong = $('#soluong').val();

        //Hình thức
        let thucTapSinh = 0;
        let banThoiGian = 0;
        let toanThoiGian = 0;
        if ($('#thucTapSinh').prop('checked')) {
            thucTapSinh = 1;
        }
        if ($('#banThoiGian').prop('checked')) {
            banThoiGian = 1;
        }
        if ($('#toanThoiGian').prop('checked')) {
            toanThoiGian = 1;
        }

        let datetimes = $('#Currentdate').val().replace(/-/g, '');
        let gioitinh = $('#gioitinh :selected').val();
        let kinhnghiem = $('#kinhnghiem :selected').val();
        let mucluongtoithieu = $('#mucluongtoithieu').val();
        let mucluongtoida = $('#mucluongtoida').val();
        let kynangchuyenmon = $('#selectKyNangChuyenMon').val();
        let hannopcv = $('#hannopcv').val();
        let motacongviec = $('#motacongviec').val().trim();
        let yeucauungvien = $('#yeucauungvien').val().trim();
        let quyenloiungvien = $('#quyenloiungvien').val().trim();
        //Đăng or Nháp?
        let action = "Dang";

        //Check validation
        var checktintuyendung = true;
        // Vali tiêu đề
        if (tieude.length < 1) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (formatnumber.test(tieude)) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
        }
        else if (tieude.length > 250) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }
        // Vali chức danh
        if (chucdanh.length < 1) {
            checktintuyendung = false;
            $("#chucdanhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali số lượng
        if (soluong.length < 1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(soluong.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (soluong.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        // Vali hình thức làm việc
        if (thucTapSinh == 0 && toanThoiGian == 0 && banThoiGian == 0) {
            checktintuyendung = false;
            $("#hinhthucvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali giới tính
        if (gioitinh.length < 1) {
            checktintuyendung = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali mức lương tối thiểu
        if (mucluongtoithieu.length < 1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(mucluongtoithieu.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (mucluongtoithieu.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        else if (Number(mucluongtoithieu.replace(/,/g, '')) > Number(mucluongtoida.replace(/,/g, ''))) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Mức lương tối thiểu không được lớn hơn mức lương tối đa! Vui lòng nhập lại.").show();
        }
        // Vali mức lương tối đa
        if (mucluongtoida.length < 1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(mucluongtoida.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (mucluongtoida.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        // Vali kinh nghiệm
        if (kinhnghiem.length < 1) {
            checktintuyendung = false;
            $("#kinhnghiemvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali hạn nộp CV
        if (hannopcv.length < 1) {
            checktintuyendung = false;
            $("#hannopcvvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        } else if (Number(hannopcv.replace(/-/g, '')) < Number(datetimes)) {
            checktintuyendung = false;
            $("#hannopcvvalidation").text("Hạn nộp CV không thể thấp hơn ngày hiện tại!").show();
        }
        // Vali yêu cầu kỹ năng
        if (kynangchuyenmon.length < 1) {
            checktintuyendung = false;
            $("#selectKyNangChuyenMonvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali mô tả công việc
        if (motacongviec.length < 1) {
            checktintuyendung = false;
            $("#motacongviecvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali yêu cầu ứng viên
        if (yeucauungvien.length < 1) {
            checktintuyendung = false;
            $("#yeucauungvienvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali quyền lợi của ứng viên
        if (quyenloiungvien.length < 1) {
            checktintuyendung = false;
            $("#quyenloiungvienvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Done
        if (checktintuyendung == true) {
            var formData = new FormData();
            formData.append('tieude', tieude);
            formData.append('chucdanh', chucdanh);
            formData.append('soluong', soluong);
            formData.append('thucTapSinh', thucTapSinh);
            formData.append('toanThoiGian', toanThoiGian);
            formData.append('banThoiGian', banThoiGian);
            formData.append('gioitinh', gioitinh);
            formData.append('kinhnghiem', kinhnghiem);
            formData.append('hannopcv', hannopcv);
            formData.append('mucluongtoithieu', mucluongtoithieu);
            formData.append('mucluongtoida', mucluongtoida);
            formData.append('kynangchuyenmon', kynangchuyenmon);
            formData.append('motacongviec', motacongviec);
            formData.append('yeucauungvien', yeucauungvien);
            formData.append('quyenloiungvien', quyenloiungvien);
            formData.append('action', action);

            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/themTinTuyenDung',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua.indexOf("SUCCESS") != -1) {
                    $('#resetdata').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal({
                                title: 'Thành Công!',
                                text: "Tuyệt quá! Tin tuyển dụng đã được thêm vào danh sách.",
                                type: 'success',
                                buttons: {
                                    cancel: {
                                        visible: true,
                                        text: ' Đóng ',
                                        className: 'btn btn-danger'
                                    },
                                    confirm: {
                                        text: 'Xem bài viết',
                                        className: 'btn btn-success'
                                    }
                                }
                            }).then((xacnhan) => {
                                if (xacnhan) {
                                    window.location.href = $('#requestPath').val() + 'TinTuyenDung/thongTinTuyenDung/?id=' + ketqua.replace('SUCCESS', '');
                                };
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
                else {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Đã có lỗi xảy ra!", ketqua, {
                                icon: "erorr",
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
            });
        }
    });

    //Lưu bản nháp
    $('#luunhap').on('click', function () {
        //Hide các thẻ p
        $("#tieudevalidation").text("").hide();
        $("#chucdanhvalidation").text("").hide();
        $("#soluongvalidation").text("").hide();
        $("#hinhthucvalidation").text("").hide();
        $("#gioitinhvalidation").text("").hide();
        $("#mucluongtoithieuvalidation").text("").hide();
        $("#mucluongtoidavalidation").text("").hide();
        $("#kinhnghiemvalidation").text("").hide();
        $("#hannopcvvalidation").text("").hide();
        $("#selectKyNangChuyenMonvalidation").text("").hide();
        $("#motacongviecvalidation").text("").hide();
        $("#yeucauungvienvalidation").text("").hide();
        $("#quyenloiungvienvalidation").text("").hide();
        //Gọi các check ký tự đặc biệt...
        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        let datetimes = $('#Currentdate').val().replace(/-/g, '');
        //Lấy giá trị
        let tieude = $('#tieude').val().trim();
        let chucdanh = $('#chucdanh :selected').val();
        let soluong = $('#soluong').val();

        //Hình thức
        let thucTapSinh = 0;
        let toanThoiGian = 0;
        let banThoiGian = 0;
        if ($('#thucTapSinh').prop('checked')) {
            thucTapSinh = 1;
        }
        if ($('#banThoiGian').prop('checked')) {
            banThoiGian = 1;
        }
        if ($('#toanThoiGian').prop('checked')) {
            toanThoiGian = 1;
        }
       
        let gioitinh = $('#gioitinh :selected').val();
        let kinhnghiem = $('#kinhnghiem :selected').val();
        let mucluongtoithieu = $('#mucluongtoithieu').val();
        let mucluongtoida = $('#mucluongtoida').val();
        let kynangchuyenmon = $('#selectKyNangChuyenMon').val();
        let hannopcv = $('#hannopcv').val();
        let motacongviec = $('#motacongviec').val().trim();
        let yeucauungvien = $('#yeucauungvien').val().trim();
        let quyenloiungvien = $('#quyenloiungvien').val().trim();
        //Đăng or Nháp?
        let action = "Nhap";

        //Check validation
        var checktintuyendung = true;
        // Vali tiêu đề
        if (tieude.length < 1) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (formatnumber.test(tieude)) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Sai rồi! Vui lòng kiểm tra lại định dạng.").show();
        }
        else if (tieude.length > 250) {
            checktintuyendung = false;
            $("#tieudevalidation").text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show();
        }
        // Vali chức danh
        if (chucdanh.length < 1) {
            checktintuyendung = false;
            $("#chucdanhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali số lượng
        if (soluong.length < 1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(soluong.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (soluong.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#soluongvalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        // Vali hình thức làm việc
        if (thucTapSinh == 0 && toanThoiGian == 0 && banThoiGian == 0) {
            checktintuyendung = false;
            $("#hinhthucvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali giới tính
        if (gioitinh.length < 1) {
            checktintuyendung = false;
            $("#gioitinhvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali mức lương tối thiểu
        if (mucluongtoithieu.length < 1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(mucluongtoithieu.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (mucluongtoithieu.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        else if (Number(mucluongtoithieu.replace(/,/g, '')) > Number(mucluongtoida.replace(/,/g, ''))) {
            checktintuyendung = false;
            $("#mucluongtoithieuvalidation").text("Mức lương tối thiểu không được lớn hơn mức lương tối đa! Vui lòng nhập lại.").show();
        }
        // Vali mức lương tối đa
        if (mucluongtoida.length < 1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(mucluongtoida.replace(/,/g, '')) < 1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Thông tin này tối thiểu là 1 ! Vui lòng nhập lại.").show();
        }
        else if (mucluongtoida.indexOf(".") != -1) {
            checktintuyendung = false;
            $("#mucluongtoidavalidation").text("Vui lòng nhập lại một số nguyên.").show();
        }
        // Vali kinh nghiệm
        if (kinhnghiem.length < 1) {
            checktintuyendung = false;
            $("#kinhnghiemvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali hạn nộp CV
        if (hannopcv.length < 1) {
            checktintuyendung = false;
            $("#hannopcvvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        else if (Number(hannopcv.replace(/-/g, '')) < Number(datetimes)) {
            checktintuyendung = false;
            $("#hannopcvvalidation").text("Hạn nộp CV không thể thấp hơn ngày hiện tại!").show();
        }
        // Vali yêu cầu kỹ năng
        if (kynangchuyenmon.length < 1) {
            checktintuyendung = false;
            $("#selectKyNangChuyenMonvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali mô tả công việc
        if (motacongviec.length < 1) {
            checktintuyendung = false;
            $("#motacongviecvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali yêu cầu ứng viên
        if (yeucauungvien.length < 1) {
            checktintuyendung = false;
            $("#yeucauungvienvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        // Vali quyền lợi của ứng viên
        if (quyenloiungvien.length < 1) {
            checktintuyendung = false;
            $("#quyenloiungvienvalidation").text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Done
        if (checktintuyendung == true) {
            var formData = new FormData();
            formData.append('tieude', tieude);
            formData.append('chucdanh', chucdanh);
            formData.append('soluong', soluong);
            formData.append('thucTapSinh', thucTapSinh);
            formData.append('toanThoiGian', toanThoiGian);
            formData.append('banThoiGian', banThoiGian);
            formData.append('gioitinh', gioitinh);
            formData.append('kinhnghiem', kinhnghiem);
            formData.append('hannopcv', hannopcv);
            formData.append('mucluongtoithieu', mucluongtoithieu);
            formData.append('mucluongtoida', mucluongtoida);
            formData.append('kynangchuyenmon', kynangchuyenmon);
            formData.append('motacongviec', motacongviec);
            formData.append('yeucauungvien', yeucauungvien);
            formData.append('quyenloiungvien', quyenloiungvien);
            formData.append('action', action);

            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/themTinTuyenDung',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua.indexOf("SUCCESS") != -1) {
                    $('#resetdata').click();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal('Thành Công!', "Tuyệt quá! Bản nháp tin tuyển dụng đã được thêm vào danh sách.", {
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
                else {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Đã có lỗi xảy ra!", ketqua, {
                                icon: "erorr",
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
            });
        }
    });

});