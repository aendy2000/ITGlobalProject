$(document).ready(function () {

    //Xóa task
    $('[id^="xoaBoTask"]').on('click', function () {
        let id = $(this).attr("name");
        let idpro = $('#idpro').val();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Công Việc?',
                    text: "Chắc chắn muốn xóa chứ?",
                    type: 'warning',
                    buttons: {
                        cancel: {
                            visible: true,
                            text: ' Hủy Bỏ ',
                            className: 'btn btn-danger'
                        },
                        confirm: {
                            text: 'Xác Nhận',
                            className: 'btn btn-success'
                        }
                    }
                }).then((xoacongviec) => {
                    if (xoacongviec) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('idpro', idpro);

                        $('#AjaxLoader').show();
                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/xoaTask',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            cache: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "Đã có lỗi xảy ra, vui lòng thử lại") {
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
                            }
                        });
                    }
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
    });

    //Click chi tiết task
    $('[id^="clickEditTask"]').on('click', function () {
        let id = $(this).attr("name");
        $('#editTaskID' + id).click();
    });

    //Chi tiết task
    $('[id^="editTaskID"]').on('click', function () {
        id = $(this).attr("name");
        var formData = new FormData();
        formData.append('id', id);
        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/xemChinhSuaTask',
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
                $('#ChinhSuaTaskPartialContent').replaceWith(ketqua);

                $('#chinhsuaassignTo').selectpicker();
                $('#chinhsuataskDeadline').selectpicker();
                $('#chinhsuanguoithuchien').selectpicker({
                    style: "text-dark btn-sm"
                });
                $('#chinhsuatrangthaicongviec').selectpicker({
                    style: "text-dark btn-sm"
                });

                $('#AjaxLoader').hide();
                $('#edittaskModal').modal('toggle');
            }
        });
    });

    //Thêm task mới
    $('#luuThemTask').on('click', function () {
        $('#nguoithuchienvalidation').hide();
        $('#taskNamevalidation').hide();
        $('#motataskvalidation').hide();
        $('#deadlinevalidation').hide();
        $('#estimatevalidation').hide();
        $('#tentailieuvalidation').hide();
        $('#duongdantailieuvalidation').hide();

        var idpro = $("#idpro").val();
        var assign = $('#nguoithuchien :selected').val();
        var taskname = $('#taskName').val().trim();
        var mota = $('#motatask').val().trim();
        var deadline = $('#deadline').val().trim();
        var estimate = $('#estimate').val().trim();

        var tentailieu = $('#tentailieu').val().trim();
        var loaitailieu = $('#loaitailieu :selected').val().trim();
        var duongdantailieu = $('#duongdantailieu').val().trim();

        //Check
        var check = true;

        //Người thực hiện
        if (assign.length < 1) {
            check = false;
            $('#nguoithuchienvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        //Tên công việc
        if (taskname.length < 1) {
            check = false;
            $('#taskNamevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (taskname.length > 100) {
            check = false;
            $('#taskNamevalidation').text("Tên công việc chỉ tối đa 100 ký tự.").show().prop("hidden", false);
        }

        //Mô tả công việc
        if (mota.length > 250) {
            check = false;
            $('#motataskvalidation').text("Mô tả công việc chỉ tối đa 250 ký tự.").show().prop("hidden", false);
        }

        //deadline công việc
        if (deadline.length < 1) {
            check = false;
            $('#deadlinevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        }

        //ước lượng công việc
        if (estimate.length < 1) {
            check = false;
            $('#estimatevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (estimate.indexOf("-") != -1 || Number(estimate) <= 0) {
            check = false;
            $('#estimatevalidation').text("Số giờ ước lượng phải lớn hơn 0.").show().prop("hidden", false);
        }

        //tên tài liệu
        if (tentailieu.length > 50) {
            check = false;
            $('#tentailieuvalidation').text("Tên tài liệu chỉ tối đa 50 ký tự.").show().prop("hidden", false);
        }

        if (duongdantailieu.length > 0 && (duongdantailieu.indexOf(' ') != -1 || duongdantailieu.indexOf("http") == -1)) {
            check = false;
            $('#duongdantailieuvalidation').text("Đường dẫn liên kết đến tài liệu không hợp lệ.").show().prop("hidden", false);
        }

        //Check xong thì:
        if (check == true) {
            var formData = new FormData();
            formData.append('idpro', idpro);
            formData.append('idassign', assign);
            formData.append('taskname', taskname);
            formData.append('mota', mota);
            formData.append('deadline', deadline);
            formData.append('estimate', estimate.replace(",", "."));
            formData.append('tentailieu', tentailieu);
            formData.append('loaitailieu', loaitailieu);
            formData.append('duongdantailieu', duongdantailieu);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/themCongViec',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
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
                    $('#dongthemTask').click();
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
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Đã thêm một công việc mới!", {
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

    //Kéo task
    dragula([document.querySelector("#do"),
    document.querySelector("#progress"),
    document.querySelector("#review"),
    document.querySelector("#done")]).on('drop', function (CucDuocKeo, viTriMoi, viTriCu, viTriPhiaTrenCucBiKeo) {
        $('#AjaxLoader').show();

        var idTask = CucDuocKeo.id;

        if (viTriMoi.id == "do") {
            $('#trangThai_' + idTask).replaceWith('<div id="trangThai_' + idTask + '">'
                + '<span class="badge-dot bg-gray-400 me-2 d-inline-block align-middle imgtooltip" data-template="stateid' + idTask + '"></span>'
                + '<div id="stateid' + idTask + '" class="d-none">'
                + '<h6 class="mb-0">Chưa thực hiện</h6>'
                + '</div>'
                + '</div>'
            );

        } else if (viTriMoi.id == "progress") {
            $('#trangThai_' + idTask).replaceWith('<div id="trangThai_' + idTask + '">'
                + '<span class="badge-dot bg-primary me-2 d-inline-block align-middle imgtooltip" data-template="stateid' + idTask + '"></span>'
                + '<div id="stateid' + idTask + '" class="d-none">'
                + '<h6 class="mb-0">Đang thực hiện</h6>'
                + '</div>'
                + '</div>'
            );

        } else if (viTriMoi.id == "review") {
            $('#trangThai_' + idTask).replaceWith('<div id="trangThai_' + idTask + '">'
                + '<span class="badge-dot bg-primary me-2 d-inline-block align-middle imgtooltip" data-template="stateid' + idTask + '"></span>'
                + '<div id="stateid' + idTask + '" class="d-none">'
                + '<h6 class="mb-0">Chờ Phê Duyệt</h6>'
                + '</div>'
                + '</div>'
            );

        } else {
            $('#trangThai_' + idTask).replaceWith('<div id="trangThai_' + idTask + '">'
                + '<span class="badge-dot bg-success me-2 d-inline-block align-middle imgtooltip" data-template="stateid' + idTask + '"></span>'
                + '<div id="stateid' + idTask + '" class="d-none">'
                + '<h6 class="mb-0">Đã hoàn thành</h6>'
                + '</div>'
                + '</div>'
            );
        }

        //Tooltip
        tippy('#trangThai_' + idTask, {
            content(e) {
                const t = 'stateid' + idTask;
                return document.getElementById(t).innerHTML
            },
            allowHTML: !0,
            theme: "light",
            animation: "scale"
        }), tippy(".bookmark", {
            content: "Add to Bookmarks",
            animation: "scale"
        }), tippy(".removeBookmark", {
            content: "Remove Bookmarks",
            animation: "scale"
        }), tippy(".texttooltip", {
            content(e) {
                const t = 'stateid' + idTask;
                return document.getElementById(t).innerHTML
            },
            allowHTML: !0,
            animation: "scale"
        }), tippy(".dropdownTooltip", {
            content(e) {
                const t = 'stateid' + idTask;
                return document.getElementById(t).innerHTML
            },
            allowHTML: !0,
            animation: "scale",
            placement: "right",
            theme: "lightPurple"
        }), $(".contacts-list .contacts-link").on("click", (function () {
            $(".chat-body").addClass("chat-body-visible")
        })), $("[data-close]").on("click", (function (e) {
            e.preventDefault(), $(".chat-body").removeClass("chat-body-visible")
        }));

        ////////////////////////////////////////////////////////////////////////////

        var lstTaskCurrent = viTriMoi.id + "~";
        $('#' + viTriMoi.id).find('[id^="taskss"]').each(function () {
            lstTaskCurrent += $(this).val() + "_";
        });

        var lstTaskFirst = viTriCu.id + "~";
        $('#' + viTriCu.id).find('[id^="taskss"]').each(function () {
            lstTaskFirst += $(this).val() + "_";
        });

        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/capNhatCongViec',
            type: 'POST',
            dataType: 'html',
            data: {
                'lstTaskFirst': lstTaskFirst.substring(0, lstTaskFirst.length - 1),
                'lstTaskCurrent': lstTaskCurrent.substring(0, lstTaskCurrent.length - 1),
                'idTask': idTask
            }
        }).done(function (ketqua) {
            if (ketqua == "FAILED") {
                $('#AjaxLoader').hide();
                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thông Báo!", "Đã có lỗi xảy ra, thử tải lại trang và thực hiện lại!", {
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
            } else if (ketqua == "DANGNHAP") {
                window.location.href = $('#requestPath').val() + "admins/quanlytaikhoan/dangnhap";
            }
            else {
                $('#AjaxLoader').hide();
            }
        });

    });

    //danh sách được asign
    $('#assignTo').on('change', function () {
        TaskType();
    });

    //deadline công việc
    $('#taskDeadline').on('change', function () {
        TaskType();
    });

    function TaskType() {
        let assign = $('#assignTo :selected').val();
        let deadlineType = $('#taskDeadline :selected').val();
        let id = $('#idpro').val();

        $('#AjaxLoader').show();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyDuAn/LoaiCongViec',
            type: 'POST',
            dataType: 'html',
            data: {
                assign: assign,
                deadlineType: deadlineType,
                id: id
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                Window.location.href = $('#requestPath').val() + 'admins/quanlyduan/danhsachduan';
            }
            else {
                $('#chiTietDuAnPartialID').replaceWith(ketqua);
                $('#assignTo option[value="' + assign + '"]').prop('selected', true);
                $('#taskDeadline option[value="' + deadlineType + '"]').prop('selected', true);

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
                ).done(function () {
                    //place your code here, the scripts are all loaded
                });

                $('#AjaxLoader').hide();
            }
        });
    }
});