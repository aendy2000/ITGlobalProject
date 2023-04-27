$(document).ready(function () {

    //Chọn loại đối tác
    $('[id^="canhandoanhnghiep-"]').on('change', function () {
        var id = $(this).attr('name');
        if ($(this).prop("checked")) {
            $('#doanhnghieps1-' + id).prop("hidden", false);
            $('#doanhnghieps2-' + id).prop("hidden", false);
            $('#canhans-' + id).prop("hidden", true);
        } else {
            $('#doanhnghieps1-' + id).prop("hidden", true);
            $('#doanhnghieps2-' + id).prop("hidden", true);
            $('#canhans-' + id).prop("hidden", false);
        }
    });

    //Chọn khách hàng có sẵn
    $('[id^="selectKhachHangCu"]').on('click', function () {
        var id = $(this).attr("name");

        $('#tatDanhSachKHCu').click();

        $('#luKhachHang').hide();
        $('#NavthongTinKhachHang').hide();

        $('#luKhachHangCu').show().prop("hidden", false);
        $('#NavthongTinKhachHangCu').show().prop("hidden", false);

        $('#idKhachHang').val(id);
        $('#namedncu').val(
            $('#companys' + id).val()
        );
        $('#hotencu').val(
            $('#names' + id).val()
        );
        $('#cmndcu').val(
            $('#cmnds' + id).val()
        );
        $('#phonecu').val(
            $('#sdts' + id).val()
        );
        $('#emailcu').val(
            $('#emails' + id).val()
        );
        $('#ngaysinhcu').val(
            $('#sns' + id).val()
        );
        $('#gioitinhcu').val(
            $('#gioitinhs' + id).val()
        );
        $('#diahchinhacu').val(
            $('#dcs' + id).val()
        );

        var avt = $('#avts' + id).val();
        if (avt.length < 1) {
            $('#previewImageCu').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
        } else {
            $('#previewImageCu').replaceWith('<img src="' + avt + '" class="avatar-xxl rounded-circle" alt="" id="previewImageCu" />');
        }

    });

    //Chọn nhập khách hàng mới
    $('#themthongtin').on('click', function () {
        var dem = Number($(this).attr('name'));
        if (dem < 3) {
            dem++;
            $('#appendDoDay').replaceWith(`
                <div id="appendKhachHang-` + dem + `">
                    <hr class="my-4" />
                    <!-- form -->
                    <input hidden value="0" id="idpart-` + dem + `" />
                    <p class="h4 mb-4 text-center"><u>THÔNG TIN KHÁCH HÀNG ` + dem + `</u></p>
                    <div class="row">
                        <div class="mb-3 col-12">
                            <label style="font-weight:bold;" class="form-label" for="phone">Loại đối tác</label>
                            <div class="form-check form-switch form-control">
                                <label style="margin-top: 1px; margin-left: -10px" class="form-check-label" for="canhandoanhnghiep-` + dem + `">Cá Nhân / Doanh Nghiệp</label>
                                &emsp;&emsp;&ensp;&ensp;&ensp;
                                <input id="canhandoanhnghiep-` + dem + `" name="` + dem + `" style="margin-right: -20px" class="form-check-input" type="checkbox" role="switch">
                            </div>
                        </div>
                        <div hidden id="doanhnghieps1-` + dem + `" class="mb-3 col-12">
                            <label style="font-weight:bold" class="form-label">Tên Đơn vị / Doanh nghiệp <span class="text-danger">*</span></label>
                            <input id="namedn-` + dem + `" name="namedn-` + dem + `" type="text" class="form-control" placeholder="Nhập vào tên doanh nghiệp của khách hàng" required>
                            <p hidden style="font-size: 13px; color:red;" id="namednvalidation-` + dem + `"></p>
                        </div>
                        <!-- form group -->
                        <div hidden id="doanhnghieps2-` + dem + `" class="mb-3 col-12  col-md-6">
                            <label style="font-weight:bold" class="form-label">Tên người đại diện <span class="text-danger">*</span></label>
                            <input id="hotennguoidaidien-` + dem + `" name="hotennguoidaidien-` + dem + `" type="text" class="form-control" placeholder="Nhập vào họ và tên của người đại diện" required>
                            <p hidden style="font-size: 13px; color:red;" id="hotennguoidaidienvalidation-` + dem + `"></p>
                        </div>
                        <!-- form group -->
                        <div id="canhans-` + dem + `" class="mb-3 col-12  col-md-6">
                            <label style="font-weight:bold" class="form-label">Họ và Tên <span class="text-danger">*</span></label>
                            <input id="hoten-` + dem + `" name="hoten-` + dem + `" type="text" class="form-control" placeholder="Nhập vào họ và tên của khách hàng" required>
                            <p hidden style="font-size: 13px; color:red;" id="hotenvalidation-` + dem + `"></p>
                        </div>
                        <div class="mb-3 col-12 col-md-6">
                            <label style="font-weight:bold" class="form-label">Mã Số Thuế <span class="text-danger">*</span></label>
                            <input id="masothue-` + dem + `" name="masothue-` + dem + `" type="text" class="form-control" placeholder="Nhập mã số thuế" data-inputmask="'mask': '9999999999'" inputmode="numeric" required>
                            <p hidden style="font-size: 13px; color:red;" id="masothuevalidation-` + dem + `"></p>
                        </div>
                        <!-- Phone -->
                        <div class="mb-3 col-12 col-md-6">
                            <label style="font-weight:bold" class="form-label" for="phone">Số điện thoại <span class="text-danger">*</span></label>
                            <input id="phone-` + dem + `" name="phone-` + dem + `" value="" type="tel" class="form-control" placeholder="Nhập vào số điện thoại khách hàng" data-inputmask="'mask': '9999 999 999'" inputmode="numeric" />
                            <p hidden style="font-size: 13px; color:red;" id="phonevalidation-` + dem + `"></p>
                        </div>
                        <div class="mb-3 col-12 col-md-6">
                            <label style="font-weight:bold" class="form-label" for="phone">Email <span class="text-danger">*</span></label>
                            <input value="" type="text" id="email-` + dem + `" name="email-` + dem + `" class="form-control" placeholder="example@itglobal.net" data-inputmask="'alias': 'email'" inputmode="numeric" />
                            <p hidden style="font-size: 13px; color:red;" id="emailvalidation-` + dem + `"></p>
                        </div>
                        <!-- Birthday -->
                        <div class="mb-3 col-12 col-md-6">
                            <label style="font-weight:bold" class="form-label" for="birth">Ngày sinh</label>
                            <input id="ngaysinh-` + dem + `" name="ngaysinh-` + dem + `" value="" class="form-control flatpickr" type="date" placeholder="Chọn ngày sinh" />
                            <p hidden style="font-size: 13px; color:red;" id="ngaysinhvalidation-` + dem + `"></p>
                        </div>
                        <!-- Birthday -->
                        <div class="mb-3 col-12 col-md-6">
                            <label style="font-weight:bold" class="form-label">Giới tính </label>
                            <select id="gioitinh-` + dem + `" name="gioitinh-` + dem + `" style="color:black" class="selectpicker" data-width="100%">
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            <p hidden style="font-size: 13px; color:red;" id="gioitinhvalidation-` + dem + `"></p>
                        </div>

                        <div class="mb-3 col-12 col-md-12">
                            <label style="font-weight:bold" class="form-label">Website</label>
                            <input id="urlweb-` + dem + `" name="urlweb-` + dem + `" type="text" class="form-control" placeholder="Nhập vào đường dẫn website (nếu có)" required>
                            <p hidden style="font-size: 13px; color:red;" id="urlwebvalidation-` + dem + `"></p>
                        </div>

                        <div class="mb-3 col-12 col-md-12">
                            <label style="font-weight:bold" class="form-label">Địa chỉ</label>
                            <textarea rows="4" id="diahchinha-` + dem + `" name="diahchinha-` + dem + `" type="text" class="form-control" placeholder="Nhập vào địa chỉ liên lạc"></textarea>
                            <p hidden style="font-size: 13px; color:red;" id="diachinhavalidation-` + dem + `"></p>
                        </div>
                    </div>
                </div>
                <div id="appendDoDay"></div>`);

            //Chọn loại đối tác
            $('#canhandoanhnghiep-' + dem).on('change', function () {
                if ($(this).prop("checked")) {
                    $('#doanhnghieps1-' + dem).prop("hidden", false);
                    $('#doanhnghieps2-' + dem).prop("hidden", false);
                    $('#canhans-' + dem).prop("hidden", true);
                } else {
                    $('#doanhnghieps1-' + dem).prop("hidden", true);
                    $('#doanhnghieps2-' + dem).prop("hidden", true);
                    $('#canhans-' + dem).prop("hidden", false);
                }
            });

            $('#masothue-' + dem).inputmask();
            $('#phone-' + dem).inputmask();
            $('#email-' + dem).inputmask();

            $('#ngaysinh-' + dem).flatpickr();
            $('#gioitinh-' + dem).selectpicker();

            $(this).attr('name', dem);
            $('#botthongtin').attr('name', dem);
        }
    });

    //Bớt khách hàng
    $('#botthongtin').on('click', function () {
        var dem = Number($(this).attr('name'));
        if (dem > 1) {
            $('#appendKhachHang-' + dem).remove();
            dem--;
            $(this).attr('name', dem);
            $('#themthongtin').attr('name', dem);
        }
    });

    //Chọn ảnh hợp đồng
    $('#chonanhhopdong').on('click', function () {
        $('#selectFileshopdong').click();
    });

    $('#selectFileshopdong').on('input', function (e) {
        if ($(this).val().length < 1) {
            $('#previewImageshopdong').prop('hidden', false);
            $('#pdfViewers').prop('hidden', true);
            $('#xoahinhanhhopdong').prop("hidden", true);
        } else {
            $('#pdfViewers').prop('hidden', false);
            $('#xoahinhanhhopdong').prop("hidden", false);
            // Loaded via <script> tag, create shortcut to access PDF.js exports.
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

            var file = e.target.files[0];
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
                            var canvas = $("#pdfViewers")[0];
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

                            $('#previewImageshopdong').prop('hidden', true);
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


    $('#xoahinhanhhopdong').on('click', function () {
        $('#selectFileshopdong').val('');
        $('#previewImageshopdong').prop('hidden', false);
        $('#pdfViewers').prop('hidden', true);
        $('#xoahinhanhhopdong').prop("hidden", true);
    });

    //Chọn ảnh
    $('#clickFiles').on('click', function (e) {
        $('#selectFiles').click();
    });

    //Xóa ảnh
    $('#reloadButton').on('click', function (e) {
        $('#selectFiles').val('');
        $('#previewImage').replaceWith('<img src="' + $('#requestPath').val() + 'Content/Admin/assets/images/avatar/default-avatar.png")" class="avatar-xxl rounded-circle" alt="" id="previewImage" />');
    });

    //Click lưu chỉnh sửa - khách hàng hiện tại
    $('#luuThongTin').on('click', function () {
        var dem = $('#dem').val();

        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

        for (var i = 1; i <= dem; i++) {
            $('#ngaygd' + i + 'validation').hide();
            $('#gd' + i + 'validation').hide();
        }

        var formatss = /[`!*()\=\[\]{}#;'%:"\\|,^@&.+-_<>\/?~]/;
        var formatTextVN = /[ àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]/;
        var formatLower = /[abcdefghiklmnopqrstuvwxyz]/;
        var formatUpper = /[ABCDEFGHIKLMNOPQRSTUVWXYZ]/;
        var formatnumber = /[1234567890]/;
        var formatEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        // value Dự án
        var name = $('#name').val().trim();
        var mota = $('#mota').val().trim();
        var batdau = $('#batdau').val().trim();
        var ketthuc = $('#ketthuc').val().trim();

        //validation name
        var checkduan = true;

        if (name.length < 1) {
            checkduan = false;
            $('#namevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#name').focus();
        } else if (name.length > 100) {
            checkduan = false;
            $('#namevalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#name').focus();
        }

        //validation mô tả
        if (mota.length > 0) {
            if (mota.length > 1000) {
                checkduan = false;
                $('#motavalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#mota').focus();
            }
        }

        //validation ngày bắt đầu
        if (batdau.length < 1) {
            checkduan = false;
            $('#batdauvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#batdau').focus();
        }

        //validation ngày kết thúc
        if (ketthuc.length < 1) {
            checkduan = false;
            $('#ketthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (Number(ketthuc.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
            checkduan = false;
            $('#ketthucvalidation').text("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
        }

        //value and validation giai đoạn
        let giaidoan = "";
        let chiphi = "";
        for (var i = 1; i <= dem; i++) {
            let ngaygd = $('#ngaygd' + i).val();
            let chiphigd = $('#gd' + i).val();

            //Ngày
            if (ngaygd.length < 1) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (Number(ngaygd.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }
            else if (i >= 2 && Number(ngaygd.replace(/-/g, '')) <= Number($('#ngaygd' + (i - 1)).val().replace(/-/g, ''))) {
                checkduan = false;
                $('#ngaygd' + i + 'validation').text("Ngày kết thúc giai đoạn " + i + " phải lớn hơn giai đoạn " + (i - 1) + ".").show().prop("hidden", false);
                $('#ngaygd' + i).focus();
            }

            //Gía tiền
            if (chiphigd.length == 0) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#gd' + i).focus();
            } else if (Number(chiphigd.replace(/,/g, '').trim()) == 0) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Chi phí giai đoạn không thể bằng 0.").show().prop("hidden", false);
                $('#gd' + i).focus();
            } else if (chiphigd.indexOf("-") != -1) {
                checkduan = false;
                $('#gd' + i + 'validation').text("Số tiền không thể âm.").show().prop("hidden", false);
                $('#gd' + i).focus();
            }

            //Đúng validaion
            if (checkduan == true) {
                if (i == dem) {
                    giaidoan += $('#ngaygd' + i).val();
                    chiphi += $('#gd' + i).val();
                }
                else {
                    giaidoan += $('#ngaygd' + i).val() + "_";
                    chiphi += $('#gd' + i).val() + "_";
                }
            }
        }

        // value Khách hàng

        var demkh = Number($('#themthongtin').attr('name'));

        var idkhs = "";
        var namedns = "";
        var hotendaidiens = "";
        var hotens = "";
        var phones = "";
        var emails = "";
        var ngaysinhs = "";
        var gioitinhs = "";
        var masothues = "";
        var websites = "";
        var diahchinhas = "";
        var loaidoitac = "";

        var checkall = true;

        for (var i = 1; i <= demkh; i++) {

            //tag Khách hàng
            $('#namednvalidation-' + i).hide();
            $('#hotennguoidaidienvalidation-' + i).hide();
            $('#hotenvalidation-' + i).hide();
            $('#masothuevalidation-' + i).hide();
            $('#phonevalidation-' + i).hide();
            $('#emailvalidation-' + i).hide();
            $('#ngaysinhvalidation-' + i).hide();
            $('#gioitinhvalidation-' + i).hide();
            $('#urlwebvalidation-' + i).hide();
            $('#diahchinhavalidation-' + i).hide();

            var namedn = $('#namedn-' + i).val().trim();
            var hotendaidien = $('#hotennguoidaidien-' + i).val().trim();
            var hoten = $('#hoten-' + i).val().trim();
            var masothue = $('#masothue-' + i).val().replace(/_/g, '').trim();
            var phone = $('#phone-' + i).val().replace(/_/g, '').trim();
            var email = $('#email-' + i).val().trim();
            var ngaysinh = $('#ngaysinh-' + i).val().trim();
            var gioitinh = $('#gioitinh-' + i + ' :selected').val().trim();
            var website = $('#urlweb-' + i).val().trim();
            var diahchinha = $('#diahchinha-' + i).val().trim();
            var idpartners = $('#idpart-' + i).val();

            idkhs += idpartners + "#";
            namedns += namedn + "#";
            hotendaidiens += hotendaidien + "#";
            hotens += hoten + "#";
            phones += phone + "#";
            emails += email + "#";
            ngaysinhs += ngaysinh + "#";
            gioitinhs += gioitinh + "#";
            masothues += masothue + "#";
            websites += website + "#";
            diahchinhas += diahchinha + "#";

            var checkkhachhang = true;

            if ($('#canhandoanhnghiep-' + i).prop("checked")) {

                loaidoitac += "True#";

                //Validation tên doanh nghiệp
                if (namedn.length < 1) {
                    checkkhachhang = false;
                    $('#namednvalidation-' + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                    $('#namedn-' + i).focus();
                }
                else if (namedn.length > 100) {
                    checkkhachhang = false;
                    $('#namednvalidation-' + i).text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                    $('#namedn-' + i).focus();
                }

                //Validation tên người đại diện
                if (hotendaidien.length < 1) {
                    checkkhachhang = false;
                    $('#hotennguoidaidienvalidation-' + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                    $('#hotennguoidaidien-' + i).focus();
                } else if (formatnumber.test(hotendaidien) == true || formatss.test(hotendaidien.toLowerCase().replace(/\d+/g, '')) == true) {
                    checkkhachhang = false;
                    $('#hotennguoidaidienvalidation-' + i).text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                    $('#hotennguoidaidien-' + i).focus();
                } else if (hotendaidien.length > 50) {
                    checkkhachhang = false;
                    $('#hotennguoidaidienvalidation-' + i).text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                    $('#hotennguoidaidien-' + i).focus();
                }
            }
            else {
                loaidoitac += "False#";
                //Validation tên khach hàng
                if (hoten.length < 1) {
                    checkkhachhang = false;
                    $('#hotenvalidation-' + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                    $('#hoten').focus();
                } else if (formatnumber.test(hoten) == true || formatss.test(hoten.toLowerCase().replace(/\d+/g, '')) == true) {
                    checkkhachhang = false;
                    $('#hotenvalidation-' + i).text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                    $('#hoten').focus();
                } else if (hoten.length > 50) {
                    checkkhachhang = false;
                    $('#hotenvalidation-' + i).text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                    $('#hoten').focus();
                }
            }

            //Validation sđt
            if (phone.length < 1) {
                checkkhachhang = false;
                $("#phonevalidation-" + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#phone-' + i).focus();

            } else if (phone.length != 12) {
                checkkhachhang = false;
                $('#phonevalidation-' + i).text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#phone-' + i).focus();
            }

            //Validation email
            if (email.length < 1) {
                checkkhachhang = false;
                $('#emailvalidation-' + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#email-' + i).focus();

            } else if (formatEmail.test(email) == false) {
                checkkhachhang = false;
                $('#emailvalidation-' + i).text("Nhập không đúng định dạng! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#email-' + i).focus();
            }
            else if (email.length > 50) {
                checkkhachhang = false;
                $('#emailvalidation-' + i).text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#email-' + i).focus();
            }

            //Validation ngày sinh
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            if (ngaysinh.length > 0) {
                if (Number(ngaysinh.replace(/-/g, '')) >= Number(yyyy + mm + dd)) {
                    checkkhachhang = false;
                    $('#ngaysinhvalidation-' + i).text("Ngày sinh không thể lớn hơn ngày hiện tại").show().prop("hidden", false);
                    $('#ngaysinh-' + i).focus();
                }
            }

            //validation Địa chỉ nhà
            if (diahchinha.length > 250) {
                checkkhachhang = false;
                $('#diachinhavalidation-' + i).text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#gioitinh-' + i).focus();
            }

            //validation mã số thuế
            if (masothue.length != 10) {
                checkkhachhang = false;
                $('#masothuevalidation-' + i).text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
                $('#masothue-' + i).focus();
            }

            if (checkkhachhang == false) {
                checkall = false;
            }
        }

        //Check đúng hết thì làm
        if (checkduan == true && checkall == true) {
            var formData = new FormData();
            //Dự án
            formData.append('hopdong', $("#selectFileshopdong")[0].files[0]);
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
            formData.append('giaidoan', giaidoan);
            formData.append('chiphi', chiphi);
            formData.append('idpro', $('#idpro').val());

            //Khách hàng
            formData.append('namedn', namedns.substring(0, namedns.length - 1));
            formData.append('hotennguoidaidien', hotendaidiens.substring(0, hotendaidiens.length - 1));
            formData.append('hoten', hotens.substring(0, hotens.length - 1));
            formData.append('phone', phones.substring(0, phones.length - 1));
            formData.append('email', emails.substring(0, emails.length - 1));
            formData.append('ngaysinh', ngaysinhs.substring(0, ngaysinhs.length - 1));
            formData.append('gioitinh', gioitinhs.substring(0, gioitinhs.length - 1));
            formData.append('diahchinha', diahchinhas.substring(0, diahchinhas.length - 1));
            formData.append('masothue', masothues.substring(0, masothues.length - 1));
            formData.append('website', websites.substring(0, websites.length - 1));
            formData.append('loaidoitac', loaidoitac.substring(0, loaidoitac.length - 1));
            formData.append('idpart', idkhs.substring(0, idkhs.length - 1));

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaDuAn',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua === "Đã có xảy ra lỗi, vui lòng thử lại") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại", {
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
                } else if (ketqua.indexOf("đang được sử dụng") != -1) {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", ketqua, {
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
                else {
                    $('#chiTietDuAnPartialID').replaceWith(ketqua);
                    $('#resetdata_1').click();
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

    $('#luuThongTinKHCu').on('click', function () {
        //tag Dự án
        $('#namevalidation').hide();
        $('#motavalidation').hide();
        $('#batdauvalidation').hide();
        $('#ketthucvalidation').hide();

        // value Dự án
        var name = $('#name').val().trim();
        var mota = $('#mota').val().trim();
        var batdau = $('#batdau').val().trim();
        var ketthuc = $('#ketthuc').val().trim();

        //validation name
        var checkduan = true;
        if (name.length < 1) {
            checkduan = false;
            $('#namevalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#name').focus();
        } else if (name.length > 100) {
            checkduan = false;
            $('#namevalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
            $('#name').focus();
        }

        //validation mô tả
        if (mota.length > 0) {
            if (mota.length > 1000) {
                checkduan = false;
                $('#motavalidation').text("Nhập quá giới hạn ký tự! Vui lòng kiểm tra lại.").show().prop("hidden", false);
                $('#mota').focus();
            }
        }

        //validation ngày bắt đầu
        if (batdau.length < 1) {
            checkduan = false;
            $('#batdauvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
            $('#batdau').focus();
        }

        //validation ngày kết thúc
        if (ketthuc.length < 1) {
            checkduan = false;
            $('#ketthucvalidation').text("Không được bỏ trống thông tin này! Vui lòng nhập đầy đủ.").show().prop("hidden", false);
        } else if (Number(ketthuc.replace(/-/g, '')) < Number(batdau.replace(/-/g, ''))) {
            checkduan = false;
            $('#ketthucvalidation').text("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu dự án.").show().prop("hidden", false);
        }

        if (checkduan == true) {
            //Khách hàng
            var idpro = $('#idpro').val();
            var id = $('#idKhachHang').val();

            var formData = new FormData();
            //Dự án
            formData.append('idpro', idpro);
            formData.append('hopdong', $("#selectFileshopdong")[0].files[0]);
            formData.append('name', name);
            formData.append('mota', mota);
            formData.append('batdau', batdau);
            formData.append('ketthuc', ketthuc);
            formData.append('id', id);

            $('#AjaxLoader').show();
            $.ajax({
                url: $('#requestPath').val() + 'Admins/QuanLyDuAn/chinhSuaDuAn',
                type: 'POST',
                dataType: 'html',
                contentType: false,
                processData: false,
                data: formData
            }).done(function (ketqua) {
                $('#AjaxLoader').hide();
                if (ketqua == "Đã có xảy ra lỗi, vui lòng thử lại") {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", "Đã có xảy ra lỗi, vui lòng thử lại", {
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
                } else if (ketqua.indexOf("đang được sử dụng") != -1) {
                    var SweetAlert2Demo = function () {
                        var initDemos = function () {
                            swal("Thông Báo!", ketqua, {
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
                else {
                    $('#chiTietDuAnPartialID').replaceWith(ketqua);
                    $('#resetdata_1').click();
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

});