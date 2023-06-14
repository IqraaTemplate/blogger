$(document).ready((function(){if($("#datablogId").text()==DataBlogId)return!1;iqNlic()}));
$((function() {
    function t(t, a) {
        for (var i = 0; i < t[a].link.length; i++)
            if ("alternate" == t[a].link[i].rel) {
                var s = t[a].link[i].href;
                break
            } return s
    }

    function a(t, a, i) {
        return '<a href="' + i + '">' + t[a].title.$t + "</a>"
    }

    function i(t, a) {
        return '<span class="iPostAuthor"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>' +
            t[a].author[0].name.$t + " </span>"
    }

    function s(t, a) {
        var i = t[a].published.$t,
            s = i.substring(0, 4),
            e = i.substring(5, 7),
            c = i.substring(8, 10);
        return '<span class="iPostPubDate"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-7v-8h2v6h5v2z"/></svg>' +
            monthFormat[parseInt(e, 10) - 1] + " " + c + ", " + s + "</span>"
    }

    function e(t, a) {
        var i = t[a].content.$t,
            s = $("<div>").html(i),
            e = s.find('p:contains("المؤلف:")'),
            c = s.find('p:contains("تقييم جود ريدز:")');
        if (e.length > 0) var l = e.text().split(":")[1];
        if (c.length > 0) var r = c.text().split(":")[1];
        if (null != l) var n = '<div class="iAName">' + l + "</div>";
        else n = "";
        if (null != r) var m = '<div class="ibookrate show">' + r + "</div>";
        else m = "";
        return [n, m]
    }

    function postThumb($c, img) {
	var $h = $('<div>').html($c),
		$t = $h.find('img:first').attr('src'),
		$a = $t.lastIndexOf('/') || 0,
		$b = $t.lastIndexOf('/', $a - 1) || 0,
		$p0 = $t.substring(0, $b),
		$p1 = $t.substring($b, $a),
		$p2 = $t.substring($a);
	if($p1.match(/\/s[0-9]+/g) || $p1.match(/\/w[0-9]+/g) || $p1.match(/\/h[0-9]+/g) || $p1 == '/d') {
		$p1 = '/w680-rw-e360'
	}
	img = $p0 + $p1 + $p2;
	return img
}
    function FeatImage(feed, i, img) {
	var n = feed[i].title.$t,
		$c = feed[i].content.$t;
	if(feed[i].media$thumbnail) {
		var src = feed[i].media$thumbnail.url
	} else {
		src = noThumbnail;
	}
	if($c.indexOf($c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1) {
		if($c.indexOf('<img') > -1) {
			if($c.indexOf($c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < $c.indexOf('<img')) {
				img = src.replace('/default.', '/0.')
			} else {
				img = postThumb($c)
			}
		} else {
			img = src.replace('/default.', '/0.')
		}
	} else if($c.indexOf('<img') > -1) {
		img = postThumb($c)
	} else {
		img = noThumbnail;
	}
     var code = '<img class="postthumb lazyload" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAD6AAAA+gBtXtSawAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAYSURBVCiRY0xISOBgoAAwUaJ51IBhYwAAuQABOsYCprwAAAAASUVORK5CYII=" alt="' + n + '" data-src="' + img + '"/>';
        return code;
}

    function l(t, a) {
        if (null != t[a].category) var i =
            '<span class="iPostCat"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.56 4.438c.585.586.585 1.539.001 2.123-.285.283-.661.439-1.061.439s-.777-.156-1.06-.438c-.585-.586-.586-1.538-.001-2.123.284-.283.661-.439 1.062-.439.4 0 .776.156 1.059.438zm17.44 8.958l-10.609 10.604-13.391-13.391v-10.609h10.605l13.395 13.396zm-16.732-9.665c-.488-.487-1.127-.731-1.767-.731-.641 0-1.28.244-1.769.732-.977.976-.977 2.558 0 3.536.489.488 1.128.732 1.768.732s1.279-.244 1.768-.733c.976-.976.976-2.558 0-3.536z"/></svg>' +
            t[a].category[0].term + "</span>";
        else i = "";
        return i
    }

    function r(t, a) {
        var i = t[a].content.$t;
        return '<p class="iPostSnippet">' + $("<div>").html(i).text().trim().substr(0, 86) + "...</p>"
    }

    function n(t, a) {
        var i = t[a].content.$t;
        return '<p class="iPostSnippet">' + $("<div>").html(i).text().trim().substr(0, 200) + "...</p>"
    }

    function m(m, o, h, d) {
        if (o.match("mega-menu") || o.match("ipbc3") || o.match("ipbc5") || o.match("ipbc4") || o.match("grid-small") || o.match("ipbc1") || o
            .match("ipbc2") || o.match("ipbc6") || o.match("ipbc7") || o.match("ipbc8") || o.match("ipbc9") || o.match("related")) {
            var p = "";
            p = "recent" == d ? "/feeds/posts/default?alt=json-in-script&max-results=" + h : "random" == d ? "/feeds/posts/default?max-results=" +
                h + "&start-index=" + (Math.floor(Math.random() * h) + 1) + "&alt=json-in-script" : "/feeds/posts/default/-/" + d +
                "?alt=json-in-script&max-results=" + h, $.ajax({
                    url: p,
                    type: "get",
                    dataType: "jsonp",
                    beforeSend: function() {
                        (o.match("ipbc3") || o.match("ipbc6") || o.match("ipbc5") || o.match("ipbc4") || o.match("grid-small") || o.match(
                            "ipbc2") || o.match("ipbc1")) && m.parent().find(".widget-title").append(
                                '<a class="read-more" href="/search/label/' + d + "?&max-results=" + postPerPage +
                                '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 9v-4l8 8-8 8v-4s-13.277-2.144-16-14c5.796 6.206 16 6 16 6z"/></svg>' +
                                messages.showAll + "</a>"), o.match("ipbc1") && m.html('<div class="iLoader"/>').parent().addClass("ipbc1"),
                            o.match("ipbc2") && m.html('<div class="iLoader"/>').parent().addClass("ipbc2"), o.match("ipbc3") && m.html(
                                '<div class="iLoader"/>').parent().addClass("ipbc3"), (o.match("ipbc5") || o.match("ipbc4")) && m.html(
                                '<div class="iLoader"/>').parent().addClass("ipbc-coll"), o.match("ipbc6") && m.html(
                                '<div class="iLoader"/>').parent().addClass("ipbc6"), o.match("ipbc7") && m.html('<div class="iLoader"/>')
                            .parent().addClass("ipbc7"), o.match("ipbc8") && m.html('<div class="iLoader"/>').parent().addClass("ipbc8"), o
                            .match("ipbc9") && m.html('<div class="iLoader"/>').parent().addClass("ipbc9")
                    },
                    success: function(h) {
                        if (o.match("mega-menu")) var p = '<ul class="mega-menu-inner">';
                        else o.match("ipbc3") ? p = '<ul class="ipbc3">' : o.match("ipbc4") || o.match("ipbc5") ? p =
                            '<ul class="ipbc-coll">' : o.match("grid-small") ? p = '<ul class="grid-small">' : o.match("ipbc1") ? p =
                            '<ul class="ipbc1">' : o.match("ipbc2") ? p = '<ul class="ipbc2">' : o.match("ipbc6") ? p =
                            '<ul class="ipbc6">' : o.match("ipbc7") || o.match("ipbc8") || o.match("ipbc9") ? p =
                            '<ul class="custom-widget">' : o.match("related") && (p = '<ul class="irelatedposts">');
                        var v = h.feed.entry;
                        if (null != v) {
                            for (var b = 0, u = v; b < u.length; b++) {
                                var f = t(u, b),
                                    g = a(u, b, f),
                                    A = FeatImage(u, b),
                                    P = l(u, b),
                                    w = (i(u, b), s(u, b)),
                                    $ = (r(u, b), n(u, b), e(u, b)),
                                    x = "";
                                o.match("mega-menu") ? x += '<div class="mega-item item-' + b +
                                    '"><div class="mega-content"><div class="iPostThumbWrap"><a class="iPostThumbLink" href="' + f + '">' +
                                    A + '</a></div><h3 class="iPostTitle">' + g + '</h3><div class="iPostMeta">' + w +
                                    "</div></div></div>" : o.match("ipbc5") || o.match("ipbc4") ? x += 0 == b ?
                                    '<li class="feat-item item-big item-' + b +
                                    '"><div class="feat-inner"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] + P +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" :
                                    '<li class="feat-item item-small item-' + b +
                                    '"><div class="iPostThumbWrap"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] +
                                    '</div><div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" :
                                    o.match("ipbc3") ? x += 0 == b ? '<li class="feat-item item-big item-' + b +
                                    '"><div class="feat-inner"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] + P +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" :
                                    '<li class="feat-item item-small item-' + b + '"><a class="iPostThumbLink" href="' + f + '">' + A +
                                    "</a>" + $[1] + '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] +
                                    "</div></div></li>" : o.match("grid-small") ? x += '<li class="feat-item item-small item-' + b +
                                    '"><div class="iPostThumbWrap"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + P +
                                    '</div><div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + '</h3><div class="iPostMeta">' + w +
                                    "</div></div></li>" : o.match("ipbc1") ? x += '<li class="feat-item item-big item-' + b +
                                    '"><div class="feat-inner"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] + P +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></div></li>" :
                                    o.match("ipbc2") ? x += '<li class="feat-item item-big item-' + b +
                                    '"><div class="feat-inner"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] + P +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" : o
                                    .match("ipbc6") ? x += '<li class="feat-item item-' + b +
                                    '"><div class="feat-inner"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] + P +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" : o
                                    .match("ipbc7") || o.match("ipbc8") ? x += '<li class="item-' + b +
                                    '"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] +
                                    '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] + "</div></div></li>" : o
                                    .match("ipbc9") ? x += '<li class="item-' + b + '"><a class="iPostThumbLink" href="' + f + '">' + A +
                                    "</a>" + $[1] + '<div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] +
                                    "</div></div></div></li>" : o.match("related") && (x += '<li class="irelatedpost item-' + b +
                                        '"><div class="iPostThumbWrap"><a class="iPostThumbLink" href="' + f + '">' + A + "</a>" + $[1] +
                                        '</div><div class="iPostInfoWrap"><h3 class="iPostTitle">' + g + "</h3>" + $[0] +
                                        "</div></div></li>"), p += x
                            }
                            p += "</ul>"
                        } else p = '<ul class="no-posts">عذراً، ليست هنالك أية مقالات لعرضها هنا.</ul>';
                        o.match("mega-menu") ? (m.addClass("submenu mega-menu").append(p), m.find("a:first").attr("href", (function(t, a) {
                                return "recent" == d || "random" == d ? a.replace(a, "/search/?&max-results=" + postPerPage) : a
                                    .replace(a, "/search/label/" + d + "?&max-results=" + postPerPage)
                            }))) : o.match("ipbc3") || o.match("ipbc6") || o.match("ipbc5") || o.match("ipbc4") || o.match("grid-small") ||
                            o.match("ipbc2") || o.match("ipbc1") ? ((o.match("ipbc5") || o.match("ipbc4")) && (o.match("ipbc4") && m
                            .parent().addClass("ipbc4"), m.parent().addClass("col-width")), m.html(p).parent().addClass("show-widget")) : m
                            .html(p)
                    }
                })
        }
    }
    $(".Label a, a.b-label, a.iPostCat").attr("href", (function(t, a) {
        return a.replace(a, a + "?&max-results=" + postPerPage)
    })), $(".avatar-image-container img").attr("src", (function(t, a) {
        return (a = a.replace("/s35-c/", "/s45-c/")).replace("//resources.blogblog.com/img/blank.gif",
            "//lh3.googleusercontent.com/-ZwvCYgtymp4/Y2qf6oxk9gI/AAAAAAAAAcU/wx_Vy0R3-vk4f5OR99wtTAxarX4T4GLdQCNcBGAsYHQ/h120-e360-rw/iqraatemplateavatar.webp"
            )
    })), $(".iauthordescription a").each((function() {
        $(this).attr("target", "_blank")
    })), $(".inextprevposts").each((function() {
        var t = $("a.prev-post-link").attr("href"),
            a = $("a.next-post-link").attr("href");
        $.ajax({
            url: t,
            type: "get",
            success: function(t) {
                var a = $(t).find(".blog-post h1.iPostTitle").text();
                $(".iprevpost a .inextprevpostsbox p").text(a)
            }
        }), $.ajax({
            url: a,
            type: "get",
            success: function(t) {
                var a = $(t).find(".blog-post h1.iPostTitle").text();
                $(".inextpost a .inextprevpostsbox p").text(a)
            }
        })
    })), $("#main-wrapper, #sidebar-wrapper").each((function() {
        1 == fixedSidebar && $(this).theiaStickySidebar({
            additionalMarginTop: 30,
            additionalMarginBottom: 30
        })
    })), $(".back-top").each((function() {
        var t = $(this);
        $(window).on("scroll", (function() {
            $(this).scrollTop() >= 100 ? t.fadeIn(250) : t.fadeOut(250)
        })), t.click((function() {
            $("html, body").animate({
                scrollTop: 0
            }, 500)
        }))
    })), $("#main-menu #main-menu-nav li").each((function() {
        var t = $(this),
            a = t.find("a").attr("href").trim();
        m(t, a.toLowerCase(), 4, a.split("/")[0])
    })), $(".iqraa-pbc .widget-content").each((function() {
        var t = $(this),
            a = t.text().trim(),
            i = a.toLowerCase(),
            s = a.split("/");
        m(t, i, s[0], s[1])
    })), $(".common-widget .widget-content").each((function() {
        var t = $(this),
            a = t.text().trim(),
            i = a.toLowerCase(),
            s = a.split("/");
        m(t, i, s[0], s[1])
    })), $(".irelatedpostsbox").each((function() {
        var t = $(this),
            a = t.find(".related-tag").data("label");
        m(t, "related", RelatedPostsNo, a)
    })), $(".blog-post-comments").each((function() {
        var t = commentsSystem,
            a = "comments-system-" + t;
        "blogger" == t ? $(this).addClass(a).show() : "hide" == t ? $(this).hide() : $(this).addClass("comments-system-default").show()
    }))
}));
function iqNlic(){var t=10;$("body").append('<style>body{background:#000!important;overflow:hidden}#IqraaActivationAlert span{font-size: 50px; background: #fff; color: #214387; width: 70px; height: 70px; border-radius: 50%; display: inline-block;line-height: 70px;}#IqraaActivationAlert{z-index: 999999999; position: fixed; top: 0; right: 0; left: 0; padding:0; height: 100%; text-align: center; background: #214387 !important; color: #fff;line-height: 1.8;}#IqraaActivationAlert h1{font-size: 60px;}</style><div id="IqraaActivationAlert"><h1>قالب اقرأ كتاب</h1><h2>يجب تفعيل القالب</h2><p>عزيزي المدوّن، نعتذر منك عن هذا التوقيف ولكن يبدو أنك لم تقم بتفعيل القالب بالطريقة المناسبة أو أنك تستخدم قالباً غير شرعياً.</p><p>يمكنك الحصول على قالبك الخاص مع شرح الطريقة المناسبة للتفعيل من خلال زيارة الموقع الرسمي لقالب <b>اقرأ كتاب</b>.</p><p><b>www.iqraatech.net</b></p><span id="itimer">'+t+"</span></div>"),setInterval((function(){t<=1?window.location.href="https://www.iqraatech.net/":$("#itimer").text(--t)}),1e3)}
$(document).ready((function(){$((function(){"use strict";$.ajax({dataType:"json",url:"https://www.blogger.com/feeds/6591373118450126410/posts/default?alt=json-in-script",method:"GET",dataType:"jsonp",success:function(e){var t;for(t=0;t<e.feed.entry.length;t+=1){var n=$(e.feed.entry[t].content.$t);if(0===t&&!$("body").hasClass("error_page")){for(var o=n.find("li"),d=[],a=0;a<o.length;a+=1)d.push($(o[a]).text());var i=window.location.hostname.toLowerCase(),r=window.location.href.toLowerCase(),f=d.length-1;for(p=0;p<d.length;p+=1){if(-1!=i.indexOf(d[p])){var s=$(e.feed.entry[t].content.$t).find("script"),l=$(e.feed.entry[t].content.$t).find("style");$("head").append(l),$("head").append(s);break}p==f&&-1==r.indexOf("post-preview")&&-1==r.indexOf("www.blogger")&&-1==r.indexOf("b/layout-preview")&&-1==r.indexOf("b/preview")&&-1==r.indexOf("translate.google")&&-1==r.indexOf("webcache.googleusercontent")&&-1==r.indexOf("template-editor")&&iqNlic()}}if(0===t&&!$("body").hasClass("error_page")){o=n.find("li");var p=[];for(d=0;d<o.length;d+=1)p.push($(o[d]).text());for(a=$("#datablogId").text(),i=window.location.href.toLowerCase(),r=p.length-1,f=0;f<p.length;f+=1){if(-1!=a.indexOf(p[f])){s=$(e.feed.entry[t].content.$t).find("script");var c=$(e.feed.entry[t].content.$t).find("style");$("head").append(c),$("head").append(s);break}f==r&&-1==i.indexOf("post-preview")&&-1==i.indexOf("www.blogger")&&-1==i.indexOf("b/layout-preview")&&-1==i.indexOf("b/preview")&&-1==i.indexOf("translate.google")&&-1==i.indexOf("webcache.googleusercontent")&&-1==i.indexOf("template-editor")&&iqNlic()}}1===t&&(l=$(e.feed.entry[t].content.$t).find("style"),$("head").append(l))}}})}))}));
$(".post-body blockquote").each((function(){var a=$(this),t=a.text().toLowerCase().trim(),e=a.html();if(t.match("-رسالة إيجابية-")){const t=e.replace("-رسالة إيجابية-","");a.replaceWith('<div class="iqraa-message success">'+t+"</div>")}if(t.match("-رسالة معلومات-")){const t=e.replace("-رسالة معلومات-","");a.replaceWith('<div class="iqraa-message info">'+t+"</div>")}if(t.match("-رسالة تحذير-")){const t=e.replace("-رسالة تحذير-","");a.replaceWith('<div class="iqraa-message warning">'+t+"</div>")}if(t.match("-رسالة خطأ-")){const t=e.replace("-رسالة خطأ-","");a.replaceWith('<div class="iqraa-message error">'+t+"</div>")}if(t.match("-رسالة إيجابية بعنوان-")){const t=e.replace("-رسالة إيجابية بعنوان-","");a.replaceWith('<div class="iqraa-message success imtitle">'+t+"</div>")}if(t.match("-رسالة معلومات بعنوان-")){const t=e.replace("-رسالة معلومات بعنوان-","");a.replaceWith('<div class="iqraa-message info imtitle">'+t+"</div>")}if(t.match("-رسالة تحذير بعنوان-")){const t=e.replace("-رسالة تحذير بعنوان-","");a.replaceWith('<div class="iqraa-message warning imtitle">'+t+"</div>")}if(t.match("-رسالة خطأ بعنوان-")){const t=e.replace("-رسالة خطأ بعنوان-","");a.replaceWith('<div class="iqraa-message error imtitle">'+t+"</div>")}if(t.match("-المصادر-")){const t=e.replace("-المصادر-","");a.replaceWith('<button class="iqraacoll" type="button"><svg class="isourcebefore" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm4.256 11h-12v-1h12v1zm0-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>قائمة المصادر<svg class="isourceafter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></button><div class="collcontent">'+t+"</div>")}if(t.match("-تضمين pdf-")){const t=e.replace("-تضمين pdf-","");a.replaceWith('<iframe class="lazyload" data-src="'+t+'" width="100%" height="600px">')}if(t.match("-زر تحميل صغير-")){const t=e.replace("-زر تحميل صغير-","");a.replaceWith('<a class="button small download" href="'+t+'">تحميل</a>')}if(t.match("-زر تحميل متوسط-")){const t=e.replace("-زر تحميل متوسط-","");a.replaceWith('<a class="button medium download" href="'+t+'">تحميل</a>')}if(t.match("-زر تحميل كبير-")){const t=e.replace("-زر تحميل كبير-","");a.replaceWith('<a class="button large download" href="'+t+'">تحميل</a>')}if(t.match("-زر معاينة صغير-")){const t=e.replace("-زر معاينة صغير-","");a.replaceWith('<a class="button small demo" href="'+t+'">معاينة</a>')}if(t.match("-زر معاينة متوسط-")){const t=e.replace("-زر معاينة متوسط-","");a.replaceWith('<a class="button medium demo" href="'+t+'">معاينة</a>')}if(t.match("-زر معاينة كبير-")){const t=e.replace("-زر معاينة كبير-","");a.replaceWith('<a class="button large demo" href="'+t+'">معاينة</a>')}if(t.match("-زر شراء صغير-")){const t=e.replace("-زر شراء صغير-","");a.replaceWith('<a class="button small buy" href="'+t+'">شراء</a>')}if(t.match("-زر شراء متوسط-")){const t=e.replace("-زر شراء متوسط-","");a.replaceWith('<a class="button medium buy" href="'+t+'">شراء</a>')}if(t.match("-زر شراء كبير-")){const t=e.replace("-زر شراء كبير-","");a.replaceWith('<a class="button large buy" href="'+t+'">شراء</a>')}if(t.match("-زر رابط صغير-")){const t=e.replace("-زر رابط صغير-","");a.replaceWith('<a class="button small link" href="'+t+'">زيارة الرابط</a>')}if(t.match("-زر رابط متوسط-")){const t=e.replace("-زر رابط متوسط-","");a.replaceWith('<a class="button medium link" href="'+t+'">زيارة الرابط</a>')}if(t.match("-زر رابط كبير-")){const t=e.replace("-زر رابط كبير-","");a.replaceWith('<a class="button large link" href="'+t+'">زيارة الرابط</a>')}if(t.match("-كود css-")){const t=e.replace("-كود css-","");a.replaceWith('<pre class="code css"><code>'+t+'</code></pre>')}if(t.match("-كود js-")){const t=e.replace("-كود js-","");a.replaceWith('<pre class="code js"><code>'+t+'</code></pre>')}if(t.match("-كود html-")){const t=e.replace("-كود html-","");a.replaceWith('<pre class="code html"><code>'+t+'</code></pre>')}}));
$((function(){$("#load-more-link").each((function(){var a=$(this).data("load");a&&$("#load-more-link").show(),$("#load-more-link").on("click",(function(o){$("#load-more-link").hide(),$.ajax({url:a,success:function(o){var e=$(o).find(".grid-posts");e.find(".index-post").addClass("post-animated post-fadeInUp"),$(".grid-posts").append(e.html()),(a=$(o).find("#load-more-link").data("load"))?$("#load-more-link").show():($("#load-more-link").hide(),$("#blog-pager .no-more").addClass("show")),$(".iBookInfo").each((function(){var a=$(this),o=a.data("id");$.ajax({url:"/feeds/posts/default/"+o+"?alt=json",type:"get",dataType:"jsonp",success:function(o){var e=o.entry.content.$t,n=$("<div>").html(e),t=n.find('p:contains("المؤلف:")'),i=n.find('p:contains("تقييم جود ريدز:")');if(t.length>0){var d=t.text().split(":")[1];a.find(".iAName").text(d).parent().addClass("show")}if(i.length>0){var s=i.text().split(":")[1];a.find(".ibookrate").text(s).addClass("show")}}})})),$("#main-wrapper").each((function(){1==fixedSidebar&&$(this).theiaStickySidebar()}))},beforeSend:function(){$("#blog-pager .iLoader").show()},complete:function(){$("#blog-pager .iLoader").hide()}}),o.preventDefault()}))}))}));
var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://cdn.statically.io/gh/IqraaTemplate/blogger/main/lazysizes.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a);
$(".iauthorbox .iauthordescription").each((function(){var t=$(this),a=t.find("a");a.each((function(){var t=$(this),a=t.text().trim(),e=t.attr("href");t.replaceWith('<li class="'+a+'"><a href="'+e+'" title="'+a+'" rel="noopener noreferrer" target="_blank"/></li>')})),a.length&&t.parent().append('<ul class="iauthorlinks"></ul>'),t.find("li").appendTo(".iauthorlinks")}));
function ldCss(t,e,s){const n=document.createElement("link");n.id=e,n.rel="stylesheet",n.type="text/css",n.href=t,s&&(n.onload=s),document.head.appendChild(n)}ldCss("https://www.blogger.com/dyn-css/authorization.css?targetBlogID="+blogID,"auth-css",(function(){}));
var i,coll=document.getElementsByClassName("iqraacoll");for(i=0;i<coll.length;i++)coll[i].addEventListener("click",(function(){this.classList.toggle("active");var l=this.nextElementSibling;"block"===l.style.display?l.style.display="none":l.style.display="block"}));
$("#iHeader").each((function(){var e,t;1==fixedHeader&&($(document).ready((function(){var e=$("#iHeader"),t=e.offset().top;$(window).on("scroll",(function(){$(window).scrollTop()>t?e.addClass("fixed-header").css({position:"fixed",width:"100%",right:"0",top:"0",margin:"0",padding:"0 0",height:"80px","z-index":"11"}):e.removeClass("fixed-header").removeAttr("style")}))})),style=".fixed-iqraant{top:80px!important;}.iqraant-tool{border-top:none!important;}",e=style,(t=document.createElement("style")).innerHTML=e,document.body.appendChild(t))}));
$("#Iqraa-NT").each((function(){1==iqraantfix&&$(document).ready((function(){var i=$("#Iqraa-NT"),a=i.offset().top;$(window).on("scroll",(function(){$(window).scrollTop()>a?i.addClass("fixed-iqraant").css({position:"fixed",width:"100%",right:"0",top:"0",margin:"0",padding:"0 0","z-index":"10"}):i.removeClass("fixed-iqraant").removeAttr("style")}))}))}));
$("body").each((function(){1==rclickblock&&window.addEventListener("contextmenu",(e=>{e.preventDefault()}))}));
$(".post-body").each((function(){1==postcopyblock&&$(document).ready((function(){var e=document.createElement("style");e.innerHTML=".post-body {-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-ms-user-select:none;-moz-user-select:none;}pre{-webkit-touch-callout:text;-webkit-user-select:text;-khtml-user-select:text;-ms-user-select:text;-moz-user-select:text;}",document.head.appendChild(e)}))}));
$("body").each((function(){var e,t;1==bodycopyblock&&(style="body {-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none}pre{-webkit-touch-callout:text;-webkit-user-select:text;-khtml-user-select:text;-ms-user-select:text;-moz-user-select:text;}",e=style,(t=document.createElement("style")).innerHTML=e,document.body.appendChild(t))}));
$("body").each((function(){var e,n;1==bodyimageblock&&(style=".separator a,img{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}",e=style,(n=document.createElement("style")).innerHTML=e,document.body.appendChild(n))}));
$("body").each((function(){var e,n;1==postimageblock&&(style=".separator a,#main-wrapper img{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}",e=style,(n=document.createElement("style")).innerHTML=e,document.body.appendChild(n))}));
$("body").each((function(){if(1==copysource){document.oncopy=function(){var e,o=document.getElementsByTagName("body")[0],n=(e=window.getSelection())+"<br/><br/>المصدر : <a href='"+document.location.href+"'>"+document.location.href+"</a><br/>",t=document.createElement("div");t.style.position="absolute",t.style.left="-99999px",o.appendChild(t),t.innerHTML=n,e.selectAllChildren(t),window.setTimeout((function(){o.removeChild(t)}),0)}}}));
const accordionItemHeaders=document.querySelectorAll(".acc-header");accordionItemHeaders.forEach((e=>{e.addEventListener("click",(t=>{e.classList.toggle("active");const c=e.nextElementSibling;e.classList.contains("active")?c.style.maxHeight=c.scrollHeight+"px":c.style.maxHeight=0}))}));
$("body").each((function(){if(1==iLazyAdsense){var e=document.createElement("script");e.setAttribute("data-ad-client",iAdsenseId),e.async=!0,e.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}}));
$("body").each((function(){if(1==iLazyAnalytics){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://www.googletagmanager.com/gtag/js?id=iGAnalyticsID";var t=document.getElementsByTagName("script")[0];function e(){dataLayer.push(arguments)}t.parentNode.insertBefore(a,t),window.dataLayer=window.dataLayer||[],e("js",new Date),e("config",iGAnalyticsID)}}));
$("body").each((function(){1==iembedimgandvidcom&&function(){for(var e=/(\[img\])?((http:|https:)?\/\/\S*?\.(jpg|gif|png|bmp|webp|jpeg]))(\[\/img\])?/gi,t=/(\[vid\])?http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌[\w\?‌=]*)?(\[\/vid\])?/gi,A=/(\[vid\])?(http:|https:)?\/\/(vimeo.com)\/([0-9]*)(\[\/vid\])?/gi,i=document.querySelectorAll(".comment-content"),a=0;a<i.length;a++){for(var r=i[a].getElementsByTagName("a"),o=0;o<r.length;o++)if(r[o].href.match(e)||r[o].href.match(t)||r[o].href.match(A)){var h=document.createElement("span");h.innerHTML=r[o].href;var m=r[o];m.parentNode.insertBefore(h,m),r[o].href="",r[o].innerHTML=""}var d=i[a].innerHTML;d=(d=(d=d.replace(e,'<img style="max-widthh:95%;height:100%;display: blocK;margin:10px 0;" class="lazyload" srs="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="$2"" alt=""/>')).replace(t,'<div class="iYouTubeiFrame"><iframe class="iframe-video iYTBLazy" title="YouTube video player" data-src="https://www.youtube.com/embed/$2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')).replace(A,'<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;margin:20px auto;"><iframe style="position: absolute;width: 100%;height: 100%;top: 0;right: 0;" src="https://player.vimeo.com/video/$4" frameborder="0" allowfullscreen></iframe></div>'),i[a].innerHTML=d}}()}));
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){return!0===t.initialized||!(i("body").width()<t.minWidth)&&(function(t,e){t.initialized=!0,0===i("#theia-sticky-sidebar-stylesheet-"+t.namespace).length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));e.each((function(){var e={};if(e.sidebar=i(this),e.options=t||{},e.container=i(e.options.containerSelector),0==e.container.length&&(e.container=e.sidebar.parent()),e.sidebar.parents().css("-webkit-transform","none"),e.sidebar.css({position:e.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),e.stickySidebar=e.sidebar.find(".theiaStickySidebar"),0==e.stickySidebar.length){var a=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;e.sidebar.find("script").filter((function(i,t){return 0===t.type.length||t.type.match(a)})).remove(),e.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children()),e.sidebar.append(e.stickySidebar)}e.marginBottom=parseInt(e.sidebar.css("margin-bottom")),e.paddingTop=parseInt(e.sidebar.css("padding-top")),e.paddingBottom=parseInt(e.sidebar.css("padding-bottom"));var n=e.stickySidebar.offset().top,s=e.stickySidebar.outerHeight();function r(){e.fixedScrollTop=0,e.sidebar.css({"min-height":"1px"}),e.stickySidebar.css({position:"static",width:"",transform:"none"})}function d(t){var e=t.height();return t.children().each((function(){e=Math.max(e,i(this).height())})),e}e.stickySidebar.css("padding-top",1),e.stickySidebar.css("padding-bottom",1),n-=e.stickySidebar.offset().top,s=e.stickySidebar.outerHeight()-s-n,0==n?(e.stickySidebar.css("padding-top",0),e.stickySidebarPaddingTop=0):e.stickySidebarPaddingTop=1,0==s?(e.stickySidebar.css("padding-bottom",0),e.stickySidebarPaddingBottom=0):e.stickySidebarPaddingBottom=1,e.previousScrollTop=null,e.fixedScrollTop=0,r(),e.onScroll=function(e){if(e.stickySidebar.is(":visible"))if(i("body").width()<e.options.minWidth)r();else{if(e.options.disableOnResponsiveLayouts)if(e.sidebar.outerWidth("none"==e.sidebar.css("float"))+50>e.container.width())return void r();var a=i(document).scrollTop(),n="static";if(a>=e.sidebar.offset().top+(e.paddingTop-e.options.additionalMarginTop)){var s,c=e.paddingTop+t.additionalMarginTop,p=e.paddingBottom+e.marginBottom+t.additionalMarginBottom,b=e.sidebar.offset().top,l=e.sidebar.offset().top+d(e.container),f=0+t.additionalMarginTop;s=e.stickySidebar.outerHeight()+c+p<i(window).height()?f+e.stickySidebar.outerHeight():i(window).height()-e.marginBottom-e.paddingBottom-t.additionalMarginBottom;var h=b-a+e.paddingTop,u=l-a-e.paddingBottom-e.marginBottom,g=e.stickySidebar.offset().top-a,S=e.previousScrollTop-a;"fixed"==e.stickySidebar.css("position")&&"modern"==e.options.sidebarBehavior&&(g+=S),"stick-to-top"==e.options.sidebarBehavior&&(g=t.additionalMarginTop),"stick-to-bottom"==e.options.sidebarBehavior&&(g=s-e.stickySidebar.outerHeight()),g=S>0?Math.min(g,f):Math.max(g,s-e.stickySidebar.outerHeight()),g=Math.max(g,h),g=Math.min(g,u-e.stickySidebar.outerHeight());var y=e.container.height()==e.stickySidebar.outerHeight();n=(y||g!=f)&&(y||g!=s-e.stickySidebar.outerHeight())?a+g-e.sidebar.offset().top-e.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==n){var m=i(document).scrollLeft();e.stickySidebar.css({position:"fixed",width:o(e.stickySidebar)+"px",transform:"translateY("+g+"px)",left:e.sidebar.offset().left+parseInt(e.sidebar.css("padding-left"))-m+"px",top:"0px"})}else if("absolute"==n){var k={};"absolute"!=e.stickySidebar.css("position")&&(k.position="absolute",k.transform="translateY("+(a+g-e.sidebar.offset().top-e.stickySidebarPaddingTop-e.stickySidebarPaddingBottom)+"px)",k.top="0px"),k.width=o(e.stickySidebar)+"px",k.left="",e.stickySidebar.css(k)}else"static"==n&&r();"static"!=n&&1==e.options.updateSidebarHeight&&e.sidebar.css({"min-height":e.stickySidebar.outerHeight()+e.stickySidebar.offset().top-e.sidebar.offset().top+e.paddingBottom}),e.previousScrollTop=a}},e.onScroll(e),i(document).on("scroll."+e.options.namespace,function(i){return function(){i.onScroll(i)}}(e)),i(window).on("resize."+e.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(e)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(e.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(e))}))}(t,e),!0)}function o(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return void 0===t&&(t=i.width()),t}return(t=i.extend({containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"},t)).additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,function(t,o){e(t,o)||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,o){return function(a){e(t,o)&&i(this).unbind(a)}}(t,o)),i(window).on("resize."+t.namespace,function(t,o){return function(a){e(t,o)&&i(this).unbind(a)}}(t,o)))}(t,this),this}}(jQuery),function(i){i.fn.replaceText=function(t,e,o){return this.each((function(){var a,n,s=this.firstChild,r=[];if(s)do{3===s.nodeType&&(n=(a=s.nodeValue).replace(t,e))!==a&&(!o&&/</.test(n)?(i(s).before(n),r.push(s)):s.nodeValue=n)}while(s=s.nextSibling);r.length&&i(r).remove()}))}}(jQuery);
!function(s){s.fn.download=function(a){var i=s.extend({},{duration:iPBDBTNTimer,messageText:iPBDBTNNote},a),v=0;return s(this).each((function(){let a=s(this).data("href"),t=s(this).data("name"),d=s(this).data("size"),n=s(this).data("type"),e=`<div class="iProgressBarDBTN" data-index="${v++}"><div class="iPBDB-BoxContent"><div class="Top"><div class="left"><div class="name"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z"/></svg> اسم الملف: </span> <span>${t}</span></div><div class="size"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-11.073-8.14c-.081-.659.431-1.246 1.101-1.246.628 0 1.124.552 1.045 1.184l-.618 4.941c-.029.231-.226.405-.459.405-.232 0-.43-.174-.459-.405l-.61-4.879zm1.069 8.754c-.563 0-1.021-.457-1.021-1.021s.457-1.021 1.021-1.021c.564 0 1.021.457 1.021 1.021s-.457 1.021-1.021 1.021z"/></svg> حجم الملف:</span> <span>${d}</span></div><div class="type"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.37 5.379l-5.64 5.64c-.655.655-1.515.982-2.374.982-1.855 0-3.356-1.498-3.356-3.356 0-.86.327-1.721.981-2.375l5.54-5.539c.487-.487 1.125-.731 1.765-.731 2.206 0 3.338 2.686 1.765 4.259l-4.919 4.919c-.634.634-1.665.634-2.298 0-.634-.633-.634-1.664 0-2.298l3.97-3.97.828.828-3.97 3.97c-.178.177-.178.465 0 .642.177.178.465.178.642 0l4.919-4.918c1.239-1.243-.636-3.112-1.873-1.874l-5.54 5.54c-.853.853-.853 2.24 0 3.094.854.852 2.24.852 3.093 0l5.64-5.64.827.827zm.637-5.379c.409.609.635 1.17.729 2h7.264v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-8.062c-.63.075-1 .13-2-.133v10.195h10.189c3.163 0 9.811-7.223 9.811-9.614v-14.386h-9.993zm4.993 6h-3.423l-.793.793-.207.207h4.423v-1zm0 3h-6.423l-1 1h7.423v-1zm0 3h-9.423l-.433.433c-.212.213-.449.395-.689.567h10.545v-1z"/></svg> نوع الملف:</span> <span>${n}</span></div></div><div class="right"><a href="${a}" class="BTN d-link"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5c3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78zm0-2c-4.006 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408-.212-3.951-3.473-7.092-7.479-7.092zm-4 10h3v-4h2v4h3l-4 4-4-4z"/></svg>  تحميل الملف</a></div></div><div class="Bottom"><div class="ProgressBar"></div><div class="msg"><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" fill-rule="nonzero"/></svg>${i.messageText}</div></div></div></div>`;s(this).replaceWith(e)})),s(".iProgressBarDBTN").each((function(a){var v=s(this),t=v.find(".d-link").attr("href"),d=1e3*i.duration;v.find(".BTN").click((function(s){s.preventDefault(),v.find(".ProgressBar").addClass("progress"),v.attr("data-duration",d),v.css("--duration",d+"ms"),setTimeout((()=>{v.find(".ProgressBar").removeClass("progress"),window.open(t,"_self")}),v.data("duration"))}))}))}}(jQuery),$(document).ready((function(){$("a[download]").download({duration:iPBDBTNTimer})}));
const ireadmodal=document.querySelector("#ireadmodal"),ireadmodalbtn=document.querySelectorAll(".iqraarbbtn");for(let e=0;e<ireadmodalbtn.length;e++)ireadmodalbtn[e].addEventListener("click",(function(){ireadmodal.style.display="block"}));ireadmodalbtn.onclick=function(){ireadmodal.style.display="block"},window.onclick=function(e){e.target==ireadmodal&&(ireadmodal.style.display="none")};$(".ireadmodalCloseBTN").click((function(){$(".ireadmodal").css("display","none")}));
const idownloadmodal=document.querySelector("#idownloadmodal"),btn=document.querySelectorAll(".isdbtn");for(let o=0;o<btn.length;o++)btn[o].addEventListener("click",(function(){idownloadmodal.style.display="block"}));btn.onclick=function(){idownloadmodal.style.display="block"},window.onclick=function(o){o.target==idownloadmodal&&(idownloadmodal.style.display="none")},$(".idownloadmodalCloseBTN").click((function(){$(".idownloadmodal").css("display","none")}));