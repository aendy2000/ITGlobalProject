$(document).ready(function () {
    //Comment
    $('#SubmitComment').on('click', function () {
        $('#chinhsuabinhluantaskvalidation').hide();
        let cmt = $('#textComment').val().trim();

        if (cmt.length < 1) {
            $('#chinhsuabinhluantaskvalidation').text('Bạn chưa nhập nội dung bình luận.').show().prop('hidden', false);
        } else {
            let id = $('#idt').val();
            var formData = new FormData();
            formData.append('id', id);
            formData.append('cmt', cmt);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/binhLuanTask',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANHSACH") {
                    $('#AjaxLoader').hide();
                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/danhSachDuAn';
                }
                else {
                    $('#contentBinhLuans').replaceWith(ketqua.split('<div>---SPLIT---</div>')[0]);
                    $('#contentHistorys').replaceWith(ketqua.split('<div>---SPLIT---</div>')[1]);

                    var el = new SimpleBar(document.getElementById('pageComment'));
                    el.getScrollElement().scrollTop = el.getScrollElement().scrollHeight;

                    $('#textComment').val("");
                    $('#AjaxLoader').hide();
                }
            });
        }
    });
});