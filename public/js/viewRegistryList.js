'use strict';

$(document).ready(function() {

    function handleBowerPackages() {
        console.log('Running handleBowerPackages');
        $('.js-bowerPackage[open]').each(function(){
            var tempUrl = "/view/" + $(this).data("package-name");
            var $e = $(this).find('.BowerPackage-details');
            console.log(tempUrl);
            $.ajax({
              url: tempUrl,
              cache: false
            })
              .done(function( html ) {
                $e.append(JSON.stringify(html));
              });


        });
    }

    function initPage() {
        handleBowerPackages();
        //$('.js-bowerPackage').on('click', handleBowerPackages)
    }

    initPage();

})
