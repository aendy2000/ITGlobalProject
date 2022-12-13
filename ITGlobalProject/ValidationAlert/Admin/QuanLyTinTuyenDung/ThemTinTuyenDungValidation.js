$(document).ready(function () {
    //Đăng tin
    $('#dangtin').on('click', function () {
        //Hide các thẻ p


        //Gọi các check ký tự đặc biệt...


        //Lấy giá trị
        let tieude = $('#tieude').val();
        let chucdanh = $('#chucdanh :selected').val();
        let soluong = $('#soluong').val();

        //Hình thức
        let thucTapSinh = 0;
        let toanThoiGian = 0;
        if ($('#thucTapSinh').prop('checked')) {
            thucTapSinh = 1;
        }
        if ($('#toanThoiGian').prop('checked')) {
            toanThoiGian = 1;
        }

        let gioitinh = $('#gioitinh :selected').val();
        let kinhnghiem = $('#kinhnghiem :selected').val();
        let mucluong = $('#mucluong').val();
        let kynangchuyenmon = $('#selectKyNangChuyenMon').val();
        let motacongviec = $('#motacongviec').val();
        let yeucauungvien = $('#yeucauungvien').val();
        let quyenloiungvien = $('#quyenloiungvien').val();
        //Đăng or Nháp?
        let action = "Dang";

        //Check validation

        //Done
        var formData = new FormData();
        formData.append('tieude', tieude);
        formData.append('chucdanh', chucdanh);
        formData.append('soluong', soluong);
        formData.append('thucTapSinh', thucTapSinh);
        formData.append('toanThoiGian', toanThoiGian);
        formData.append('gioitinh', gioitinh);
        formData.append('kinhnghiem', kinhnghiem);
        formData.append('mucluong', mucluong);
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
                            text: "Tuyệt quá! đã đăng một bài tuyển dụng mới.",
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
        });
    });

    //Lưu bản nháp
    $('#luunhap').on('click', function () {
        //Hide các thẻ p


        //Gọi các check ký tự đặc biệt...


        //Lấy giá trị
        let tieude = $('#tieude').val();
        let chucdanh = $('#chucdanh :selected').val();
        let soluong = $('#soluong').val();

        //Hình thức
        let thucTapSinh = 0;
        let toanThoiGian = 0;
        if ($('#thucTapSinh').prop('checked')) {
            thucTapSinh = 1;
        }
        if ($('#toanThoiGian').prop('checked')) {
            toanThoiGian = 1;
        }

        let gioitinh = $('#gioitinh :selected').val();
        let kinhnghiem = $('#kinhnghiem :selected').val();
        let mucluong = $('#mucluong').val();
        let kynangchuyenmon = $('#selectKyNangChuyenMon').val();
        let motacongviec = $('#motacongviec').val();
        let yeucauungvien = $('#yeucauungvien').val();
        let quyenloiungvien = $('#quyenloiungvien').val();
        //Đăng or Nháp?
        let action = "Nhap";

        //Check validation

        //Done
        var formData = new FormData();
        formData.append('tieude', tieude);
        formData.append('chucdanh', chucdanh);
        formData.append('soluong', soluong);
        formData.append('thucTapSinh', thucTapSinh);
        formData.append('toanThoiGian', toanThoiGian);
        formData.append('gioitinh', gioitinh);
        formData.append('kinhnghiem', kinhnghiem);
        formData.append('mucluong', mucluong);
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
                            text: "Tuyệt quá! đã đăng một bài tuyển dụng mới.",
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
        });
    });

});