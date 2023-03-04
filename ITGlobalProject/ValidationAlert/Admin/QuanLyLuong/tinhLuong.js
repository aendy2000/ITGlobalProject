$(document).ready(function () {
    //check all
    $('#checkAlls').on('click', function () {
        $('#dataTableBasic').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]')
            .prop('checked', this.checked);
    });

    //btn tính lương
    $('#btntinhluong').on('click', function () {
        var lstId = "";
        var thang = $('#tinhluongthangs :selected').val();
        alert(thang);
        $('#dataTableBasic').DataTable()
            .column(0)
            .nodes()
            .to$()
            .find('input[type=checkbox]:checked').each(function () {
                lstId += $(this).attr("name") + "-";
            });

        if (lstId.trim().length > 0) {
            var formData = new FormData();
            formData.append('thang', thang);
            formData.append('lstId', lstId.substring(0, lstId.length - 1));
            $('#AjaxLoader').show();

            $.ajax({
                url: $('#requestPath').val() + 'Admins/quanlyluong/tinhluong',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANGNHAP") {
                    window.location.href = $('#requestPath').val() + 'quanlytaikhoan/dangxuat';
                }
                else if (ketqua == "Erorr") {

                } else {

                }
            });
        }
        
    });
});