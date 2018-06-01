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
                localStorage.setItem("networks",JSON.stringify(res));
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
                localStorage.setItem("numbers",JSON.stringify(res));
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

var _$networkSearchById = (qid)=>{
    var networks = _$networks();
    _.forEach(networks,(val)=>{
        var id = val[0];
        if(id != qid){

        } else {
            return val;
        }
    });

    return r;
};

var _$numbers = ()=>{
    if(localStorage.getItem("numbers")){
        var numbers = JSON.parse(localStorage.getItem("numbers"));
        var numArr = [];
        $.each(numbers,(index,number)=>{
            var net_id = number[2];

        });
    } else {
        return {};
    }
}

var _$filterNumbers = (query)=>{
    if(query){

    } else {

    }
}

$(document).ready(()=>{
    $('.modal').modal();
    _$dbInit();
});