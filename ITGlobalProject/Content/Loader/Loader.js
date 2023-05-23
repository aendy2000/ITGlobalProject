
    $(document).ajaxStart(function () {  
        $('#AjaxLoader').fadeIn('slow');  
    })  
    .ajaxStop(function () {  
        $('#AjaxLoader').fadeOut('slow');  
    });  
