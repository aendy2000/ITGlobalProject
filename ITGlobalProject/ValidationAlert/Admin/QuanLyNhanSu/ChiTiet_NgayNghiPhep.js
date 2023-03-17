$(document).ready(function () {
    $('#btnLuuThongTin').on('click', function (e) {
        let snghiphep = "";
        $('input[id^="checknghiphep"]:checked').each(function () {
            snghiphep += $(this).attr("name") + "-";
        });
        var id = $(this).attr('name');
        var formData = new FormData();
        formData.append('id', id);
        formData.append('lstngayphep', snghiphep.substring(0, snghiphep.length - 1));
        $.ajax({
            url: $('#requestPath').val() + 'admins/quanlynhansu/danhMucNgayPhep',
            type: 'POST',
            dataType: 'html',
            contentType: false,
            processData: false,
            data: formData
        }).done(function (ketqua) {
            if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "Admins/QuanLyTaiKhoan/DangNhap";
            }
            else {
                var content = {};
                content.message = 'Đã lưu thông tin thay đổi!';
                content.title = 'Thành công!';
                content.icon = 'nav-icon fe fe-bell me-2';

                $.notify(content, {
                    type: "success",
                    placement: {
                        from: "bottom",
                        align: "right"
                    },
                    time: 1000,
                    delay: 1000,
                });
            }
        });
    });
});