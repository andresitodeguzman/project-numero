$(document).ready(()=>{
    clear();

    $('.modal').modal();
    _$dbInit();
    showNumbers();

    showMainActivity();

    splash(1000);
});


const _$dbGetNetworks = async ()=>{
    var _fetchOnline = ()=>{
        $.ajax({
            type:'GET',
            cache:'false',
            url:'https://sheets.googleapis.com/v4/spreadsheets/1SXpspU0RqYdYG9xm70epDi5Bz5G6_tN8dqx6eov9h_Q/values/networks',
            data: {
                key: 'AIzaSyBVtB5ME7FX7-tdxc1wjIh8-yn49eC2K0s'
            },
            success: result=>{
                var res = result.values;
                res.splice(0,1);
                var ar = [];
                $.each(res, (index,value)=>{
                    var i = value[0];
                    var n = value[1];
                    var d = {
                        id:i,
                        name:n
                    };
                    ar.push(d);
                });
                localStorage.setItem("networks",JSON.stringify(ar));
            }
        }).fail((e)=>{
           console.log("Failed to get networks");
        });
    }

    if(navigator.onLine){
        _fetchOnline()
    }
};

const _$dbGetNumbers = async ()=>{
    var _fetchOnline = ()=>{
        $.ajax({
            type:'GET',
            cache:'false',
            url:'https://sheets.googleapis.com/v4/spreadsheets/1SXpspU0RqYdYG9xm70epDi5Bz5G6_tN8dqx6eov9h_Q/values/numbers',
            data: {
                key: 'AIzaSyBVtB5ME7FX7-tdxc1wjIh8-yn49eC2K0s'
            },
            success: result=>{
                var res = result.values;
                res.splice(0,1);
                var ar = [];

                function getNetworkName(i){
                    var nt = JSON.parse(localStorage.getItem("networks"));
                    var r = _.find(nt,{id:i});
                    return r['name'];
                };

                $.each(res,(index,value)=>{
                    var i = value[0];
                    var p = value[1];
                    var nid = value[2];
                    var nn = getNetworkName(nid);
                    var d = {
                        id:i,
                        prefix:p,
                        network_id:nid,
                        network_name:nn
                    };
                    ar.push(d);
                });
                localStorage.setItem("numbers",JSON.stringify(ar));

                showNumbers();
            }
        }).fail((e)=>{
           console.log("Failed to get numbers");
        });
    }

    if(navigator.onLine){
        _fetchOnline()
    }
};


var _$dbInit = ()=>{
    if(!localStorage.getItem("networks")){
        M.toast({html:"Getting networks and prefixes from database", durationLength:3000});
        _$dbGetNetworks();
    }
    if(!localStorage.getItem("numbers")){
        _$dbGetNumbers();
    }
};

var _$networks = ()=>{
    if(localStorage.getItem("networks")){
            return JSON.parse(localStorage.getItem("networks"));
    } else {
        return {};
    }
}

var _$numbers = ()=>{
    if(localStorage.getItem("numbers")){
        return numbers = JSON.parse(localStorage.getItem("numbers"));
    } else {
        return {};
    }
}

var showNumbers = (q)=>{
    var numbers = _$numbers();

    if(q){
        if($.isNumeric(q)){
            var numbers = _.filter(numbers,function(obj) {
                if(obj.prefix.match(q)) return obj;
            });
        } else {
            var numbers = _.filter(numbers,function(obj) {
                if(obj.network_name.match(q)) return obj;
            });
        }
    }

    $("#numbersList").html("");
    $.each(numbers,(index,num)=>{
        var i = num.id;
        var p = num.prefix;
        var ni = num.network_id;
        var nn = num.network_name;

        var tmpl = `
            <tr>
                <td>${p}</td>
                <td>${nn}</td>
            </tr>
        `;

        $("#numbersList").append(tmpl);
    });
};

var clear = ()=>{
    $(".activity").hide();
};

var showMainActivity = ()=>{
    clear();
    $("#mainActivity").fadeIn();
};

var showAboutApp = ()=>{
    clear();
    $("#aboutAppActivity").fadeIn();
};

/*
    splash
    Splashscreen handler
 */
function splash(param){
    var time = param;
    setTimeout(function(){
        $("#splashscreen").fadeOut();
    },time);
}

$("#search").keyup(()=>{
 var q = $("#search").val();
 showNumbers(q);
});