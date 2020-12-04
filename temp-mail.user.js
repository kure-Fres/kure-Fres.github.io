// ==UserScript==
// @name         Temp-mail.org email changer
// @namespace    https://discord.gg/RYpMWnHw9B
// @version      0.1
// @description  Change your temp-mail.org email without buying Premium!
// @author       Fres
// @match        https://temp-mail.org/*/change
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
// ==/UserScript==

(function() {
    'use strict';

    var mails;
    $.getJSON('https://web1.temp-mail.org/request/domains/format/json', function(data) {
        mails = data
        $("#select2-domain-container").attr('title', data[0])
        $("#select2-domain-container")[0].innerText = data[0]
    });

    function resizespan() {
        var current = $(window).scrollTop();
        window.scrollTo(0,0);
        window.scrollTo(0,document.body.scrollHeight);
        window.scrollTo(0,current);
    };

    $("#postbut")[0].innerText = "Login";

    var bool = true;
    var btnnHeight;
    $("#select2-domain-container").click(function(){
        if ($("#select2-domain-container").parent().attr('aria-expanded') == "true") {
            if (bool == true) {bool = false} else if (bool == false) {bool = true};
            if (bool) {
                if ($(".select2-container--open").length > 1) {
                    $(".select2-container--open")[1].remove()
                } else {
                    $(".select2-container--open").remove()
                }
                $(".select2-container--open").removeClass( "select2-container--open" )
            }
            var i;
            var btnns = ""
            for (i = 0; i < mails.length; i++) {
                var selected = false
                if (i == 0) selected = true;
                btnns = btnns + `<li class="select2-results__option" id="select2-domain-result-bbuj-${mails[i]}" role="treeitem" aria-selected="${selected}" data-select2-id="select2-domain-result-bbuj-${mails[i]}">${mails[i]}</li>`
            };
            $("#select2-domain-results")[0].innerHTML = btnns;
            resizespan()
            $(".select2-results__option").hover(function() {
                $(this).css("background-color", "#F1F3F9")
            }, function() {
                $(this).css("background-color", "")
            });
            $(".select2-results__option").click(function() {
                if ($(".select2-container--open").length > 1) {
                    $(".select2-container--open")[1].remove()
                } else {
                    $(".select2-container--open").remove()
                }
                $(".select2-container--open").removeClass( "select2-container--open" )
                $("#select2-domain-container").attr('title', this.innerText)
                $("#select2-domain-container")[0].innerText = this.innerText
            });
        }
    });
    $("#postbut").click(function(){
        if ($("#new_mail").val().length > 2) {
            Cookies.set('email', $("#new_mail").val() + $("#select2-domain-container")[0].innerText);
            document.location.href = "https://temp-mail.org/en/";
        }
    });
})();
