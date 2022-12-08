function MessageBoxErro(texto) {
    $.toast({
        heading: 'GoJumpers',
        text: texto,
        bgColor: '#E8242E',
        textColor: '#ffffff',
        showHideTransition: 'fade',
        allowToastClose: true,
        loader: false,
        hideAfter: 1500,
        //loaderBg: '#FBFBFB',            
        position: 'top-right',
        stack: 6
    });
}

function MessageBoxConcluido(texto) {
    $.toast({
        heading: 'GoJumpers',
        text: texto,
        bgColor: '#28A745',
        textColor: '#ffffff',
        showHideTransition: 'fade',
        allowToastClose: false,
        loader: false,
        hideAfter: 1000,
        //loaderBg: '#FBFBFB',            
        position: 'top-right',
        stack: false
    });
}