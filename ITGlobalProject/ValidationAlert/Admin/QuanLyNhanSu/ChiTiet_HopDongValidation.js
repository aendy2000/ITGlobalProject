$(document).ready(function () {

    //Bộ phận
    $('#bophan').on('change', function () {
        if ($('#bophan :selected').val().length < 1) {
            document.getElementById('vaitro').value = "";
            $('#vaitro').prop('disabled', true);
        } else {
            var formData = new FormData();
            formData.append('id', $('#bophan :selected').val())

            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/luaChonBoPhan',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
                } else {
                    $('#vaitro').replaceWith(ketqua);
                }
            });
        }
    });

    //Loại hợp đồng
    $('#loaiHopDong').on('change', function () {
        if ($('#loaiHopDong :selected').val() == "Hợp đồng có thời hạn") {

            $("#taiAnhHopDong").addClass("col-md-12");
            $("#taiAnhHopDong").removeClass("col-md-4");

            $('#ketthucHopDong').prop('hidden', false);
        } else {
            $("#taiAnhHopDong").addClass("col-md-4");
            $("#taiAnhHopDong").removeClass("col-md-12");

            $('#ketthucHopDong').prop('hidden', true);
        }
    });

    //Chinh Sửa Loại hợp đồng
    $('#chonLoaiHopDongChinhSua').on('change', function () {
        if ($('#chonLoaiHopDongChinhSua :selected').val() == "Hợp đồng có thời hạn") {

            $("#taiAnhHopDongChinhSua").addClass("col-md-12");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-4");

            $('#ketthucHopDongChinhSua').prop('hidden', false);
        } else {
            $("#taiAnhHopDongChinhSua").addClass("col-md-4");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-12");

            $('#ketthucHopDongChinhSua').prop('hidden', true);
        }
    });

    //Xóa Hợp Đồng
    $('[id^="xoaHopDong"]').on('click', function () {
        let id = $(this).attr('name');
        let idus = $('#idus').val();

        var SweetAlert2Demo = function () {
            var initDemos = function () {
                swal({
                    title: 'Xóa Hợp đồng?',
                    text: "Bạn có chắc muốn loại bỏ hợp đồng này?",
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
                }).then((xoahopdong) => {
                    if (xoahopdong) {
                        var formData = new FormData();
                        formData.append('id', id);
                        formData.append('idus', idus);

                        $.ajax({
                            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/xoaHopDong',
                            type: 'POST',
                            dataType: 'html',
                            contentType: false,
                            processData: false,
                            data: formData
                        }).done(function (ketqua) {
                            if (ketqua == "DANHSACH") {
                                window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                            } else {
                                $('#contentPartial').replaceWith(ketqua);
                                $.when(
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                                    $.Deferred(function (deferred) {
                                        $(deferred.resolve);
                                    })
                                );

                                var SweetAlert2Demo = function () {
                                    var initDemos = function () {
                                        swal("Thành Công!", "Bạn đã xóa thành công.", {
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Sửa hợp đồng
    $('[id^="chinhsuaHD"]').on('click', function () {
        let id = $(this).attr('name');
        $('#chinhsuaidhopdong').val(id);
        $('#chinhsuangaykyhopdong').val($('#ngaybatdauInput' + id).val());
        $('#chinhsuangaygiahanhopdong').val($('#ngayketthucInput' + id).val());

        $('#chonLoaiHopDongChinhSua').val($('#loaihopdongInput' + id).val()).prop('selected', true);
        if ($('#loaihopdongInput' + id).val() == "Hợp đồng có thời hạn") {
            $("#taiAnhHopDongChinhSua").addClass("col-md-12");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-4");

            $('#ketthucHopDongChinhSua').prop('hidden', false);
        } else {
            $("#taiAnhHopDongChinhSua").addClass("col-md-4");
            $("#taiAnhHopDongChinhSua").removeClass("col-md-12");

            $('#ketthucHopDongChinhSua').prop('hidden', true);
        }

        $('#previewPDFEdit').replaceWith('<iframe class="gallery__img rounded-3" frameborder="0" id="previewPDFEdit" style="overflow: hidden; height: 1130px; width: 100%" src="' + $('#hinhanhInput' + id).val() + '"></iframe>');
    });

    //Chọn ảnh chỉnh sửa hợp đồng
    $('#chinhsuachonanhhopdongmoi').on('click', function () {
        $('#chinhsuaselectFiles').click();
    });

    //Chọn 1 hợp đồng
    $('#chinhsuaselectFiles').on('input', function (e) {

        if ($(this).val().length < 1) {
            $('#previewPDFEdit').prop('hidden', false);
            $('#pdfVieweredit').prop('hidden', true);
        } else {
            $('#pdfVieweredit').prop('hidden', false);
            // Loaded via <script> tag, create shortcut to access PDF.js exports.
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

            var file = e.target.files[0]
            if (file.type == "application/pdf") {

                var fileReader = new FileReader();
                fileReader.onload = function () {
                    var pdfData = new Uint8Array(this.result);
                    // Using DocumentInitParameters object to load binary data.
                    var loadingTask = pdfjsLib.getDocument({ data: pdfData });
                    loadingTask.promise.then(function (pdf) {
                        console.log('PDF loaded');

                        // Fetch the first page
                        var pageNumber = 1;
                        pdf.getPage(pageNumber).then(function (page) {
                            console.log('Page loaded');

                            var scale = 1.5;
                            var viewport = page.getViewport({ scale: scale });

                            // Prepare canvas using PDF page dimensions
                            var canvas = $("#pdfVieweredit")[0];
                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            // Render PDF page into canvas context
                            var renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };
                            var renderTask = page.render(renderContext);
                            renderTask.promise.then(function () {
                                console.log('Page rendered');
                            });

                            $('#previewPDFEdit').prop('hidden', true);
                        });
                    }, function (reason) {
                        // PDF loading error
                        console.error(reason);
                    });
                };
                fileReader.readAsArrayBuffer(file);
            }
        }
    });

    //Lưu chỉnh sửa hợp đồng
    $('#LuuChinhSuaHopDong').on('click', function () {

        $('#ChinhSualoaihopdongvalidation').text("").hide();
        $('#chinhsuangaykyhopdongvalidation').text("").hide();
        $('#chinhsuangaygiahanhopdongvalidation').text("").hide();
        $('#chinhsuaselectFilesvalidation').text("").hide();

        let idus = $('#idus').val();

        let id = $('#chinhsuaidhopdong').val();
        let batdau = $('#chinhsuangaykyhopdong').val();
        let ketthuc = $('#chinhsuangaygiahanhopdong').val();
        let loaihopdong = $('#chonLoaiHopDongChinhSua :selected').val();


        var checkhopdongtaikhoan = true;


        //Check
        //Loại hợp đồng
        if (loaihopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ChinhSualoaihopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Ngày ký hđ
        if (batdau.length < 1) {
            checkhopdongtaikhoan = false;
            $('#chinhsuangaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        var checkDates = parseInt(ketthuc.replace(/-/g, '').trim()) - parseInt(batdau.replace(/-/g, '').trim());
        //ngày kết thúc hợp đồng
        if (loaihopdong == "Hợp đồng có thời hạn") {
            if (ketthuc.length < 1) {
                checkhopdongtaikhoan = false;
                $('#chinhsuangaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (checkDates < 0) {
                checkhopdongtaikhoan = false;
                $('#chinhsuangaygiahanhopdongvalidation').text("Ngày gia hạn/kết thúc không thể nhỏ hơn ngày bắt đầu.").show();
            }
        }
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            formData.append('anhHopDong', $("#chinhsuaselectFiles")[0].files[0]);
            formData.append('ngaykyhopdong', batdau);
            formData.append('ngaygiahanhopdong', ketthuc);
            formData.append('id', id);
            formData.append('idus', idus);
            formData.append('loaihopdong', loaihopdong);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/suaHopDong',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                    alert("Đã có xảy ra lỗi, vui lòng thử lại!");
                }
                else if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                }
                else {
                    $('#dongChinhSuaHopDongCanvas').click();
                    $('#contentPartial').replaceWith(ketqua);
                    $.when(
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    );

                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã cập nhật thành công.", {
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Hủy thêm hợp đồng
    $('#dongthemhopdong').on('click', function () {
        $('#previewPDF').replaceWith('<img style="max-width: 700px;" src="' + $('#requestPath').val() + 'Content/Admin/assets/images/png/hopdong-default.png" alt="Gallery image 1" class="gallery__img rounded-3" id="previewPDF">');

        $("#taiAnhHopDong").addClass("col-md-4");
        $("#taiAnhHopDong").removeClass("col-md-12");

        $('#ketthucHopDong').prop('hidden', true);
    });

    //Chọn ảnh hợp đồng mới
    $('#chonanhhopdongmoi').on('click', function () {
        $('#selectFiles').click();
    });

    //Chọn 1 hợp đồng mới
    $('#selectFiles').on('input', function (e) {
        if ($(this).val().length < 1) {
            $('#previewPDF').prop('hidden', false);
            $('#pdfViewer').prop('hidden', true);
        } else {
            $('#pdfViewer').prop('hidden', false);
            // Loaded via <script> tag, create shortcut to access PDF.js exports.
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

            var file = e.target.files[0]
            if (file.type == "application/pdf") {

                var fileReader = new FileReader();
                fileReader.onload = function () {
                    var pdfData = new Uint8Array(this.result);
                    // Using DocumentInitParameters object to load binary data.
                    var loadingTask = pdfjsLib.getDocument({ data: pdfData });
                    loadingTask.promise.then(function (pdf) {
                        console.log('PDF loaded');

                        // Fetch the first page
                        var pageNumber = 1;
                        pdf.getPage(pageNumber).then(function (page) {
                            console.log('Page loaded');

                            var scale = 1.5;
                            var viewport = page.getViewport({ scale: scale });

                            // Prepare canvas using PDF page dimensions
                            var canvas = $("#pdfViewer")[0];
                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            // Render PDF page into canvas context
                            var renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };
                            var renderTask = page.render(renderContext);
                            renderTask.promise.then(function () {
                                console.log('Page rendered');
                            });

                            $('#previewPDF').prop('hidden', true);
                        });
                    }, function (reason) {
                        // PDF loading error
                        console.error(reason);
                    });
                };
                fileReader.readAsArrayBuffer(file);
            }
        }
    });

    //Lưu thêm HĐ mới
    $('#themHopDongMoi').on('click', function () {

        $('#themloaihopdongvalidation').text("").hide();
        $('#ngaykyhopdongvalidation').text("").hide();
        $('#ngaygiahanhopdongvalidation').text("").hide();
        $('#selectFilesvalidation').text("").hide();

        let id = $('#idus').val();

        let ngaykyhopdong = $('#ngaykyhopdong').val();
        let ngaygiahanhopdong = $('#ngaygiahanhopdong').val();
        let selectFiles = $('#selectFiles').val();
        let loaihopdong = $('#loaiHopDong :selected').val();

        var checkhopdongtaikhoan = true;
        //Check
        //Loại hợp đồng
        if (loaihopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#themloaihopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Ngày ký hđ
        if (ngaykyhopdong.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngaykyhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        var checkDates = parseInt(ngaygiahanhopdong.replace(/-/g, '').trim()) - parseInt(ngaykyhopdong.replace(/-/g, '').trim());
        //ngày kết thúc hợp đồng
        if (loaihopdong == "Hợp đồng có thời hạn") {
            if (ngaygiahanhopdong.length < 1) {
                checkhopdongtaikhoan = false;
                $('#ngaygiahanhopdongvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
            }
            else if (checkDates < 0) {
                checkhopdongtaikhoan = false;
                $('#ngaygiahanhopdongvalidation').text("Ngày gia hạn/kết thúc không thể nhỏ hơn ngày bắt đầu.").show();
            }
        }

        if (selectFiles.length < 1) {
            checkhopdongtaikhoan = false;
            $('#selectFilesvalidation').text("Không được bỏ trống thông tin này! Vui lòng tải ảnh hợp đồng.").show();
        }
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            formData.append('anhHopDong', $("#selectFiles")[0].files[0]);
            formData.append('ngaykyhopdong', ngaykyhopdong);
            formData.append('ngaygiahanhopdong', ngaygiahanhopdong);
            formData.append('id', id);
            formData.append('loaihopdong', loaihopdong);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/themHopDongMoi',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                    alert("Đã có xảy ra lỗi, vui lòng thử lại!");
                }
                else if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                }
                else {
                    $('#dongModalHopDongMoi').click();
                    $('#contentPartial').replaceWith(ketqua);
                    $.when(
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    );

                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã thêm thành công.", {
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

    // LƯU THÔNG TIN LÀM VIỆC
    $('#btnLuuThongTin').on('click', function (e) {

        $('#ngayvaolamvalidation').text("").hide();
        $('#vaitrovalidation').text("").hide();
        $('#hinhthucvalidation').text("").hide();
        $('#usernamevalidation').text("").hide();

        let id = $('#idus').val();
        //Hợp đồng & Tài khoản
       
        let ngayvaolam = $('#ngayvaolam').val();
        let bophan = $('#bophan :selected').val();
        let vaitro = $('#vaitro :selected').val();
        let hinhthuc = $('#hinhthuc :selected').val();

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        var checkhopdongtaikhoan = true;


        //Check
        //Ngày vào làm
        if (ngayvaolam.length < 1) {
            checkhopdongtaikhoan = false;
            $('#ngayvaolamvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Bộ phận
        if (bophan.length < 1) {
            checkhopdongtaikhoan = false;
            $('#bophanvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }
        //Chức danh
        if (vaitro.length < 1) {
            checkhopdongtaikhoan = false;
            $('#vaitrovalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

        //Hình thức
        if (hinhthuc.length < 1) {
            checkhopdongtaikhoan = false;
            $('#hinhthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show();
        }

       
        //Done
        if (checkhopdongtaikhoan == true) {
            //Lập form
            var formData = new FormData();
            //Thông Tin Cá Nhân
            formData.append('id', id);
            //Hợp đồng & Tài khoản
            formData.append('ngayvaolam', ngayvaolam);
            formData.append('vaitro', vaitro);
            formData.append('hinhthuc', hinhthuc);
            e.preventDefault();
            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/chinhSuaViecLamHopDong',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại!") {
                    alert("Đã có xảy ra lỗi, vui lòng thử lại!");
                }
                else if (ketqua == "DANHSACH") {
                    window.location.href = $('#requestPath').val() + "Admins/QuanLyNhanSu/danhSachNhanVien";
                }
                else {
                    $('#contentPartial').replaceWith(ketqua);
                    $.when(
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                        $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                        $.Deferred(function (deferred) {
                            $(deferred.resolve);
                        })
                    );

                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thành Công!", "Bạn đã cập nhật thành công.", {
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
    //

    $('#reloadPage').on('click', function () {
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/hopDongPartial?id=' + $('#idus').val(),
            type: 'GET',
            dataType: 'html'
        }).done(function (ketqua) {
            if (ketqua !== "DANHSACH") {
                $('#contentPartial').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/plugin/sweetalert/sweetalert.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/flatpickr/dist/flatpickr.min.js'),
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/libs/apexcharts/dist/apexcharts.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
            else {
                window.location.href = $('#actionDanhsach').data('request-url');
            }
        });
    });
});