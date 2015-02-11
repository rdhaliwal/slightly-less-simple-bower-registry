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
            $.ajaxSetup({
              timeout: 1000
            });
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
            })
            .fail(function() {
                $details.append('Something went wrong when loading this.');
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

        //TODO: Clean this up
        var $rows = $('.js-bowerPackage');
        $('#searchField').keyup(function() {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

            $rows.show().filter(function() {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });


    }

    initPage();

})
