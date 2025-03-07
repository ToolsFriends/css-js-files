// Pagination Script
$(function() {
    $("#load-more-link").each(function() {
        var a = $(this),
            b = a.data("load");
        if (b) $("#load-more-link").show();
        $("#load-more-link").on("click", function(a) {
            $("#load-more-link").hide();
            $.ajax({
                url: b,
                success: function(a) {
                    var c = $(a).find(".grid-posts");
                    c.find(".index-post").addClass("post-animated post-fadeInUp");
                    $(".grid-posts").append(c.html());
                    b = $(a).find("#load-more-link").data("load");
                    if (b) $("#load-more-link").show();
                    else {
                        $("#load-more-link").hide();
                        $("#blog-pager .no-more").addClass("show");
                    }
                    $('.index-post .post-image-link .post-thumb').lazyyard();
                    $("#main-wrapper").each(function() {
                        if (true == fixedSidebar) $(this).theiaStickySidebar();
                    });
                },
                beforeSend: function() {
                    $("#blog-pager .loading").show();
                },
                complete: function() {
                    $("#blog-pager .loading").hide();
                }
            });
            a.preventDefault();
        });
    });
});

// Facebook SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));