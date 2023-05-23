$(document).ready(function () {

    $('#submitForm').on('click', function () {
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var message = $('#message').val();

        if (name.length === 0) {
            $('#namevalidation').text('Hãy nhập vào tên của bạn').show();
        }
        else if (phone.length === 0) {
            $('#phonevalidation').text('Hãy nhập vào số điện thoại của bạn').show();
        }
        else if (email.length === 0) {
            $('#emailvalidation').text('Hãy nhập vào email liên hệ của bạn').show();
        }
        else if (message.length === 0) {
            $('#messagevalidation').text('Hãy nhập nội dung liên hệ của bạn').show();
        }
        else {
            $('#AjaxLoader').fadeIn('slow');
            var formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('message', message);

            let urls = $('#actionSubmit').data('request-url');
            $.ajax({
                url: urls,
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (result) {
                $('#AjaxLoader').fadeOut('slow');
                if (result === "SUCCESS") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Thông tin của bạn đã được gửi đi,\nchúng tôi sẽ sớm liên hệ lại với bạn!", {
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
})