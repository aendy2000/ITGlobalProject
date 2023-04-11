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
                    var content = {};
                    content.message = 'Bạn đã thêm thành công.';
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
        }
    });

    //Lưu sửa task
    $('#luuChinhSuaTask').on('click', function () {
        $('#chinhsuataskNamevalidation').hide();
        $('#chinhsuamotataskvalidation').hide();
        $('#chinhsuadeadlinevalidation').hide();
        $('#chinhsuaestimatevalidation').hide();
        $('#chinhsuacompletedvalidation').hide();

        var id = $("#idt").val();
        var idpro = $("#idpro").val();
        var assign = $('#chinhsuanguoithuchien :selected').val();
        var taskname = $('#chinhsuataskName').val().trim();
        var mota = $('#chinhsuamotatask').val().trim();
        var state = $('#chinhsuatrangthaicongviec :selected').val().trim();
        var deadline = $('#chinhsuadeadline').val().trim();
        let estimates = $('#chinhsuaestimate').val();
        let completed = $('#chinhsuacompleted').val();

        //Check
        var check = true;

        //Tên công việc
        if (taskname.length < 1) {
            check = false;
            $('#chinhsuataskNamevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (taskname.length > 100) {
            check = false;
            $('#chinhsuataskNamevalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
        }

        //Mô tả công việc
        if (mota.length > 250) {
            check = false;
            $('#chinhsuamotataskvalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
        }

        //deadline công việc
        if (deadline.length < 1) {
            check = false;
            $('#chinhsuadeadlinevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        //ước lượng công việc
        if (estimates.length < 1) {
            check = false;
            $('#chinhsuaestimatevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (estimates.indexOf("-") != -1 || Number(estimates) <= 0) {
            check = false;
            $('#chinhsuaestimatevalidation').text("Số giờ ước lượng phải lớn hơn 0.").show().prop("hidden", false);
        }
        else if (Number(estimate) > 999999999) {
            check = false;
            $('#chinhsuaestimatevalidation').text("Số giờ ước lượng không hợp lệ.").show().prop("hidden", false);
        }

        //Đã hoàn thành
        if (completed.length > 0 && (completed.indexOf("-") != -1 || Number(completed)) < 0) {
            check = false;
            $('#chinhsuacompletedvalidation').text("Số giờ hoàn thành không thể nhỏ hơn 0.").show().prop("hidden", false);
        }
        else if (Number(completed) > 999999999) {
            check = false;
            $('#chinhsuacompletedvalidation').text("Số giờ hoàn thành không hợp lệ.").show().prop("hidden", false);
        }

        if (check == true) {
            var formData = new FormData();
            formData.append('id', id);
            formData.append('idpro', idpro);
            formData.append('idassign', assign);
            formData.append('taskname', taskname);
            formData.append('mota', mota);
            formData.append('state', state);
            formData.append('deadline', deadline);
            formData.append('estimates', estimates);
            formData.append('completed', completed);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaCongViec',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                cache: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua === "Đã có lỗi xảy ra, vui lòng thử lại") {
                    $('#AjaxLoader').hide();
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại sau", {
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
                else if (ketqua === "DANHSACH") {
                    $('#AjaxLoader').hide();
                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/danhSachDuAn';
                }
                else {
                    $('#edittaskModal').modal('toggle');

                    window.setTimeout(function () {
                        $('#chiTietDuAnPartialID').replaceWith(ketqua);
                        $('#assignTo').selectpicker();
                        $('#taskDeadline').selectpicker();
                        $('#nguoithuchien').selectpicker({
                            style: "text-dark btn-sm"
                        });

                        $.when(
                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                            $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                            $.Deferred(function (deferred) {
                                $(deferred.resolve);
                            })
                        ).done(function () { });
                        $('#AjaxLoader').hide();
                        var content = {};
                        content.message = 'Bạn đã lưu thành công.';
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
                    }, 300);
                }
            });
        }

    });
});