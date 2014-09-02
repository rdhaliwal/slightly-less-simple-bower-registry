'use strict';

$(document).ready(function() {

    function handleBowerPackages() {
        console.log('Running handleBowerPackages');
        $('.js-bowerPackage[open]').each(function(){

            var tempUrl = "/view/" + $(this).data("package-name");
            var $package = $(this);
            var $details = $(this).find('.BowerPackage-details');

            if ($package.attr('data-loaded-data') !== 'true') {
                $details.addClass('is-loading');
                console.log('Firing off request to:' + tempUrl);
                $.ajax({
                    url: tempUrl,
                    cache: true
                })
                .done(function( html ) {
                    $details.removeClass('is-loading');
                    $details.append(html);
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
                $details.addClass('is-loading');
                console.log('Firing off request to:' + tempUrl);
                $.ajax({
                    url: tempUrl,
                    cache: true
                })
                .done(function( html ) {
                    $details.removeClass('is-loading');
                    $details.append(html);
                    $package.attr('data-loaded-data', 'true');
                });
            }
        });
    }

    initPage();

})
