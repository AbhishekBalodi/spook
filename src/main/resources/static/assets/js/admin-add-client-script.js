$(document).ready(function() {
            // Fetch countries
            var selectedCountry = $('#selectedCountry').val();
    		var selectedCurrency = $('#selectedCurrency').val();
            $.ajax({
                url: 'https://restcountries.com/v3.1/all',
                type: 'GET',
                success: function(data) {
                    var countrySelect = $('#country');
                    $.each(data, function(index, country) {
                        var option = $('<option></option>')
                            .attr('value', country.cca2) 
                            .text(country.name.common);
                        countrySelect.append(option);
                    });
                    if (selectedCountry) {
                        $('#country').val(selectedCountry);
                    }
                },
                error: function() {
                    console.error('Error fetching countries.');
                }
            });

            // Fetch currencies
            $.ajax({
                url: 'https://openexchangerates.org/api/currencies.json',
                type: 'GET',
                success: function(data) {
                    var currencySelect = $('#currency');
                    $.each(data, function(code, name) {
                        var option = $('<option></option>')
                            .attr('value', code) // Currency code
                            .text(name + ' (' + code + ')');
                        currencySelect.append(option);
                    });
                    if (selectedCurrency) {
                        $('#currency').val(selectedCurrency);
                    }
                },
                error: function() {
                    console.error('Error fetching currencies.');
                }
            });
        });