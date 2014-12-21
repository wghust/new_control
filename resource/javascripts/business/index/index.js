$(document).ready(function() {
    var panel = function() {
        _pthis = this;
    };
    panel.prototype = {
        _init: function() {
            _pthis._buildpanel();
        },
        _buildpanel: function() {
            var window_width = $(window).width();
            var nowwidth = window_width - 460 + 'px';
            $(".con_3").css({
                'width': nowwidth
            });
            _pthis._op();
        },
        _op: function() {
            $(".con_1 .one_mid ul li").click(function() {
                $(".con_1 .one_mid ul li").css({
                    'background-color': 'white',
                    'color': 'black'
                });
                $(this).css({
                    'background-color': '#3592DD',
                    'color': 'white'
                });
                var twourl = $(this).data('src');
                $.ajax({
                    url: twourl,
                    type: 'GET',
                    dataType: 'json',
                    success: function(callback) {
                        var back = callback;
                        var show = [];
                        back.profile.forEach(function(one, index) {
                            var b = {
                                url: one.url,
                                title: one.title
                            };
                            show.push(b);
                        });
                        var template = $("#firstdata").html();
                        Mustache.parse(template);
                        var rendered = Mustache.render(template, show);
                        $(".con_2 .one_mid ul").html(rendered);
                        _pthis._shownext(1);
                        _pthis._nextop();
                    },
                    error: function(err) {
                        window.location.reload();
                    }
                });
            });
        },
        _nextop: function() {
            $(".con_2 .one_mid ul li").click(function() {
                $(".con_2 .one_mid ul li").css({
                    'background-color': 'white',
                    'color': 'black'
                });
                $(this).css({
                    'background-color': '#3592DD',
                    'color': 'white'
                });
                var url = $(this).data('src');
                _pthis._shownext(2);
            });
        },
        _shownext: function(state) {
            switch (state) {
                case 1:
                    $(".con_2").css({
                        'display': 'block'
                    });
                    $(".con_2").animate({
                        'margin-left': '0',
                        'opacity': 1
                    }, 'slow', 'easeOutElastic');
                    break;
                case 2:
                    $(".con_3").css({
                        'display': 'block'
                    });
                    $(".con_3").animate({
                        'margin-left': '0',
                        'opacity': 1
                    }, 100, 'easeInCirc');
                    break;
                default:
                    break;
            }
        }
    };
});