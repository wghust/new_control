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
                    url: 'http://sa.kascend.com/auth/info',
                    success: function(data) {
                        var show = [];
                        data.profile.forEach(function(one, index) {
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
                url: 'http://sa.kascend.com/auth/login',
                data: data,
                dataType: 'json',
                success: function(data) {
                    var show = [];
                    data.profile.forEach(function(one, index) {
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
                    $(".logincontainer").hide();
                    var newpanel = new panel();
                    newpanel._init();
                }
            });
        }
    };
    var newlogin = new login();
    newlogin._init();
});