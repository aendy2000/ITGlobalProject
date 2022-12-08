$(document).ready(function () {
    $('#all').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichBieu',
            type: 'POST',
            dataType: 'html',
            data: {
                'state': 'all',
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#tabContent').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });

    $('#chualam').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichBieu',
            type: 'POST',
            dataType: 'html',
            data: {
                'state': 'chualam',
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#tabContent').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });

    $('#danglam').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichBieu',
            type: 'POST',
            dataType: 'html',
            data: {
                'state': 'danglam',
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#tabContent').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });

    $('#danop').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichBieu',
            type: 'POST',
            dataType: 'html',
            data: {
                'state': 'danop',
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#tabContent').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });

    $('#hoanthanh').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: $('#requestPath').val() + 'Admins/QuanLyNhanSu/timKiemLichBieu',
            type: 'POST',
            dataType: 'html',
            data: {
                'state': 'hoanthanh',
                'idus': $("#idus").val()
            }
        }).done(function (ketqua) {
            if (ketqua == "DANHSACH") {
                window.location.href = $('#requestPath').val() + 'Admins/QuanLyNhanSu/danhSachNhanVien';
            } else {
                $('#tabContent').replaceWith(ketqua);
                $.when(
                    $.getScript($('#requestPath').val() + 'Content/Admin/assets/js/theme.min.js'),
                    $.Deferred(function (deferred) {
                        $(deferred.resolve);
                    })
                );
            }
        });
    });

});