'use strict';

$(document).ready(function() {

    function loadPackageInfo(element) {
        var tempUrl = "/view/" + $(element).data("package-name");
        var $package = $(element);
        var $version = $(element).find('.js-bowerPackageVersion');
        var $detailsContainer = $(element).find('.BowerPackage-details');
        var $details = $(element).find('.js-bowerPackageDetails');

        if ($package.attr('data-loaded-data') !== 'true') {
            $detailsContainer.addClass('is-loading');
            console.log('Firing off request to:' + tempUrl);
            $.ajax({
                url: tempUrl,
                cache: true
            })
            .done(function( result ) {
                $detailsContainer.removeClass('is-loading');
                $details.append(result);
                $details.show();
                $version.html($details.find('.BowerPackage-latestVersionNumber').html());
                $package.attr('data-loaded-data', 'true');
            });
        }
    }

    function handleBowerPackages() {
        console.log('Running handleBowerPackages');
        $('.js-bowerPackage[open]').each(function(){
            loadPackageInfo(this);
        });
    }

    function initPage() {
        handleBowerPackages();
        $('.js-bowerPackage').on('click', function(){
            loadPackageInfo(this);
        });
    }

    initPage();

})
