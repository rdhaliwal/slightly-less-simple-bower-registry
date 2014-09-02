'use strict';

$(document).ready(function() {

    function handleBowerPackages() {
        console.log('Running handleBowerPackages');
        $('.js-bowerPackage[open]').each(function(){

            var tempUrl = "/view/" + $(this).data("package-name");
            var $package = $(this);
            var $details = $(this).find('.BowerPackage-details');

            if ($package.attr('data-loaded-data') !== 'true') {
                console.log(tempUrl);
                $.ajax({
                    url: tempUrl,
                    cache: true
                })
                .done(function( html ) {
                    $details.append(html);
                    //$details.append(JSON.stringify(html));
                    $package.attr('data-loaded-data', 'true');
                });
            }
        });
    }

    function initPage() {
        handleBowerPackages();
        $('.js-bowerPackage').on('click', function(){
            var tempUrl = "/view/" + $(this).data("package-name");
            var $package = $(this);
            var $details = $(this).find('.BowerPackage-details');

            if ($package.attr('data-loaded-data') !== 'true') {
                console.log(tempUrl);
                $.ajax({
                    url: tempUrl,
                    cache: true
                })
                .done(function( html ) {
                    $details.append(html);
                    $package.attr('data-loaded-data', 'true');
                });
            }
        });
    }

    initPage();

})
