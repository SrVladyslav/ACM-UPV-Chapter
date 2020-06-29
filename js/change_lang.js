// Lang info
var langs = ['en', 'es']
var lang_index = 0

// The page will appear in english
var current_lang = langs[lang_index]


window.change_lang = function() {
    // Selecting the next lang
    past_lang = langs[lang_index]
    lang_index = ++lang_index % 2
    current_lang = langs[lang_index]
    document.getElementById('nav-but').innerHTML = past_lang.toUpperCase()
    translate()
}

window.change_to = function(lang) {
    // Selecting the next lang
    past_lang = langs[lang_index]
    if ('en' == lang) {
        lang_index = 0
    } else if ('es' == lang) {
        lang_index = 1
    } else {
        lang_index = 2
    }
    current_lang = lang
    translate()
}

function translate() {
    $("[data-translate]").each(function() {
        var key = $(this).data('translate')
        $(this).html(dictionary[key][current_lang] || "N/A")
    });
}

translate();