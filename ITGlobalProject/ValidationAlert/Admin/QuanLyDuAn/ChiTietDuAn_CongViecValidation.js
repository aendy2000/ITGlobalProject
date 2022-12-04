$(document).ready(function () {

    //Thêm task mới
    $('#luuThemTask').on('click', function () {
        var idpro = $("#idpro").val();
        var assign = $('#nguoithuchien :selected').val();
        var taskname = $('#taskName').val();
        var mota = $('#motatask').val();
        var deadline = $('#deadline').val();
        var estimate = $('#estimate').val();

        var tentailieu = $('#tentailieu').val();
        var loaitailieu = $('#loaitailieu :selected').val();
        var duongdantailieu = $('#duongdantailieu').val();

        //Check


        //Check xong thì:

        $('#AjaxLoader').show();

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
            else if (ketqua === "DANHSACH") {
                $('#AjaxLoader').hide();
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyDuAn/danhSachDuAn';
            }
            else {
                $('#dongthemTask').click();
                $('#chiTietDuAnPartialID').replaceWith(ketqua);
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
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////
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
            if (ketqua !== "FAILED") {
                $('#AjaxLoader').hide();
            }
            else {
                $('#AjaxLoader').hide();
                var SweetAlert2Demo = function () {
                    var initDemos = function () {
                        swal("Thông Báo!", "Đã có lỗi xảy ra, thử tải lại trang và thực hiện lại!", {
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