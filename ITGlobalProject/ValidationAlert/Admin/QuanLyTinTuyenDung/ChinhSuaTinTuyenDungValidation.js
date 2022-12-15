$(document).ready(function () {
    //Lưu chỉnh sửa
    $('#savedata').on('click', function () {
        //Hide các thẻ p


        //Gọi các check ký tự đặc biệt...


        //Lấy giá trị
        let id = $('#id').val();

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
        let mucluongtoithieu = $('#mucluongtoithieu').val();
        let mucluongtoida = $('#mucluongtoida').val();
        let kynangchuyenmon = $('#selectKyNangChuyenMon').val();
        let hannopcv = $('#hannopcv').val();
        let motacongviec = $('#motacongviec').val();
        let yeucauungvien = $('#yeucauungvien').val();
        let quyenloiungvien = $('#quyenloiungvien').val();
        //Check validation


        //Done
        var formData = new FormData();
        formData.append('id', id);

        formData.append('tieude', tieude);
        formData.append('chucdanh', chucdanh);
        formData.append('soluong', soluong);
        formData.append('thucTapSinh', thucTapSinh);
        formData.append('toanThoiGian', toanThoiGian);
        formData.append('gioitinh', gioitinh);
        formData.append('kinhnghiem', kinhnghiem);
        formData.append('hannopcv', hannopcv);
        formData.append('mucluongtoithieu', mucluongtoithieu);
        formData.append('mucluongtoida', mucluongtoida);
        formData.append('kynangchuyenmon', kynangchuyenmon);
        formData.append('motacongviec', motacongviec);
        formData.append('yeucauungvien', yeucauungvien);
        formData.append('quyenloiungvien', quyenloiungvien);

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyTinTuyenDung/chinhSuaTinTuyenDung',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            if (ketqua.indexOf("SUCCESS") != -1) {
                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thành Công!", "Đã lưu thông tin thay đổi tin tuyển dụng.", {
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
            else if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyTinTuyenDung/danhSachTinTuyenDung";
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