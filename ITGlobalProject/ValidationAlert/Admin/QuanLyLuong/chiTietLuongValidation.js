$(document).ready(function () {
    //Xem chi tiết
    $('[id^="xemchiTietLuong-"]').on('click', function () {
        var id = $(this).attr("name");
        var formData = new FormData();
        formData.append('id', id);

        $('#AjaxLoader').show();
        $.ajax({
            url: $("#requestPath").val() + 'Admins/quanlyluong/chitietluong',
            data: formData,
            dataType: 'html',
            type: 'POST',
            contentType: false,
            processData: false
        }).done(function (ketqua) {
            $('#AjaxLoader').hide();
            $('#modalchitietluong').replaceWith(ketqua);
            $('#xemChiTietLuong').modal('toggle');
        });

    });
});