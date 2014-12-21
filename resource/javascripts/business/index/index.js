$(document).ready(function() {
    var login = function() {
        _gthis = this;
        _gthis.username = "";
        _gthis.password = "";
    };
    login.prototype = {
        _init: function() {
            _gthis._checklogin();
        },
        _checklogin: function() {
            var sa = $.cookie('sa');
            if (sa == '' || sa == null) {
                _gthis._glogin();
            } else {
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: 'http://sa.kascend.com/auth/info',
                    success: function(data) {
                        var profile = data.profile;
                        var show = {
                            list: []
                        };
                        $(".logo").text(data.company);
                        $(".name").text(data.name);
                        profile.forEach(function(one, index) {
                            var b = {
                                url: one.url,
                                title: one.title
                            };
                            show.list.push(b);
                        });
                        var template = $("#firstdata").html();
                        Mustache.parse(template);
                        var rendered = Mustache.render(template, show);
                        $(".con_1 .one_mid ul").html(rendered);
                        $(".logincontainer").hide();
                        var newpanel = new panel();
                        newpanel._init();
                    },
                    error: function(error) {
                        _gthis._glogin();
                    }
                });
            }
        },
        _glogin: function() {
            _gthis._op();
        },
        _op: function() {
            $(".loginbtn").click(function() {
                _gthis._getValue();
                if (_gthis._checkValue()) {
                    _gthis._beginLogin();
                } else {
                    alert("不能为空");
                }
            });
        },
        _getValue: function() {
            _gthis.username = $(".username").val();
            _gthis.password = $(".password").val();
        },
        _checkValue: function() {
            if (_gthis.username == "" || _gthis.password == "") {
                return false;
            } else {
                return true;
            }
        },
        _beginLogin: function() {
            var data = {
                username: _gthis.username,
                password: _gthis.password
            };
            $.ajax({
                type: 'POST',
                url: 'http://sa.kascend.com/auth/login',
                data: data,
                dataType: 'json',
                success: function(data) {
                    var profile = data.profile;
                    var show = {
                        list: []
                    };
                    profile.forEach(function(one, index) {
                        var b = {
                            url: one.url,
                            title: one.title
                        };
                        show.list.push(b);
                    });
                    $(".logo").text(data.company);
                    $(".name").text(data.name);
                    var template = $("#firstdata").html();
                    Mustache.parse(template);
                    var rendered = Mustache.render(template, show);
                    $(".con_1 .one_mid ul").html(rendered);
                    $(".logincontainer").hide();
                    var newpanel = new panel();
                    newpanel._init();
                }
            });
        }
    };


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
            $(window).resize(function() {
                var window_width = $(window).width();
                var nowwidth = window_width - 460 + 'px';
                $(".con_3").css({
                    'width': nowwidth
                });
            });
            _pthis._op();
        },
        _op: function() {
            $(".con_1 .one_mid ul li").click(function() {
                $(".con_1 .one_mid ul li").removeClass('active');
                $(this).addClass('active');
                var projectname = $(this).text();
                $(".con_2 .one_top span").text(projectname);
                var twourl = $(this).data('src');
                $.ajax({
                    url: twourl,
                    type: 'GET',
                    dataType: 'json',
                    success: function(callback) {
                        var back = callback;
                        var profile = back.profile;
                        var show = {
                            list: []
                        };
                        profile.forEach(function(one, index) {
                            var b = {
                                url: one.url,
                                title: one.title
                            };
                            show.list.push(b);
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
                $(".con_2 .one_mid ul li").removeClass('active');
                $(this).addClass('active')
                var url = $(this).data('src');
                var projectname = $(this).text();
                $(".con_3 .one_top span").text(projectname);
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
    var newlogin = new login();
    newlogin._init();
});