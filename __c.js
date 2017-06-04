;(function(){
    _cc_={
        //选取节点
        '__':function(name){
            var oneChar=name.charAt(0);
            var eleName=name.substring(1);
            if(oneChar=='#'){
                return dom=document.getElementById(eleName);
            }else if(oneChar=='.'){
                if(document.getElementsByClassName){
                    return dom=document.getElementsByClassName(eleName);
                }else{
                }
            }else if(oneChar=='<'){
                return dom=document.getElementsByTagName(eleName);
            }
        },
        //获取第一个子节点
        'first':function(dom){
            return dom.firstElementChild||dom.firstChild;
        },
        //获取最后一个子节点
        'last':function(dom){
            return dom.lastElementChild||dom.lastChild;
        },
        //匹配第几个元素
        'eq':function(doms,n){
            return doms[n];
        },
        'has':function(dom,attribute){
            return dom.getAttribute(attribute)?true:false;
        },
        //add,remove,has
        'class':{
            'hasClass':function(dom,className){
                return this.__public__(dom,className,'has');
            },
            //增加class
            'addClass':function(dom,className){
                this.__public__(dom,className,'add');
            },
            //删除class
            'removeClass':function(dom,className){
                this.__public__(dom,className,'remove');
            },
            //class公共
            '__public__':function(dom,className,type){
                var __class=dom.getAttribute('class');
                if(__class) {
                    var classArr = __class.split(' ')||[__class];
                    if(type=='add'){
                        var ifAdd = true;
                    }
                    for (var i = 0; i < classArr.length; i++) {
                        if (classArr[i] == className) {
                            if(type=='remove'){
                                classArr.splice(i, 1);
                                break;
                            }else if(type=='add'){
                                ifAdd = false;
                                break;
                            }else if(type=='has'){
                                return true;
                                break;
                            }
                        }
                    }
                    if(type=='remove'){
                        dom.setAttribute('class', classArr.join(' '));
                    }else if(type=='add'){
                        ifAdd&&dom.setAttribute('class', __class + ' ' + className);
                    }else if(type=='has'){
                        return false;
                    }
                }
            }
        },
        //绑定事件
        'on':function(dom,evsStr,fun){
            if(arguments.length>2){//3个参数设置一个事件或多个不同的事件执行相同的函数
                var evs=evsStr.split(' ')||[evsStr];
                for(var i=0;i<evs.length;i++){
                    console.log(evs[i]);
                    addEvent(evs[i],fun);
                }
            }else if(arguments.length==2&&typeof evsStr=='object'){//2个参数并且第2个参数为{}，设置一个事件或多个不同的事件执行不同的函数
                for(var ev in evsStr){
                    addEvent(ev,evsStr[ev]);
                }
            }
            //绑定事件
            function addEvent(e,fu,cap){
                if(dom.addEventListener){
                    dom.addEventListener(e,fu,cap||false);
                }else if(dom.attachEvent){
                    dom.attachEvent('on'+e,fu);
                }else{
                    dom['on'+e]=fu;
                }
            }
        },
        //获取元素样式
        'css':function(dom,property,val){
            if(arguments.length==2){//两个参数
                if(typeof arguments[1]=='object'){//第2个参数为object类型的说明是设置样式
                    for(var pro in property){
                        dom.style[pro]=property[pro];
                    }
                }else if(typeof arguments[1]=='string'){//第2个参数为string类型的说明是获取样式
                    return dom.currentStyle?dom.currentStyle[property]:getComputedStyle(dom)[property];
                }
            }else if(arguments.length==3){//3个参数,设置一个样式
                dom.style[property]=val;
            }
        },
        //获取滚动高度
        'getScrollTop':function(){
            return document.body.scrollTop||document.documentElement.scrollTop;
        },
        'setScrollTop':function(val){
            document.body.scrollTop?document.body.scrollTop=val:document.documentElement.scrollTop=val;
        },
        //是否是移动端（true|false）
        'ifMobile':function(){
            var useragent=navigator.userAgent.toLowerCase();
            var mobile=[
                'iphone',
                'ipad',
                'android'
            ];
            var ifMobile=false;
            for(var i=0;i<mobile.length;i++){
                if(useragent.indexOf(mobile[i])!=-1){
                    ifMobile=true;
                    break;
                }
            }
            return ifMobile;
        },
        //设置cookie
        'setCookie':function(key,val,tim){//（key,value,几天后过期）
            var date=new Date();
            date.setDate(date.getDate()+tim);
            document.cookie=key+'='+val+';expires='+date;
        },
        //获取cookie(或获取一个数组包含key，value)
        'getCookie':function(key){
            var cookie=document.cookie;
            var ckArr=cookie.split('; ');
            console.log(ckArr);
            for(var i=0;i<ckArr.length;i++){
                var kvArr=ckArr[i].split('=');
                if(kvArr[0]==key){
                    return kvArr;
                }
            }
        },
        //获取都不相等的随机数，返回一个数组
        /*
        参数第一个代表获取几个随机数，第2个参数用一个数组表示一个范围，第一位表示最小数，第二位表示最大数
        一个参数默认取到0-9的随机数,不谢参数的话默认返回一个包含一个0-9的数的数组
        2个参数获取对应范围
        */
        'randomNum':function(){//参数（n|n,[n1,n2]）
            var numArr=[];//要返回的数组
            var __arguments=arguments;//参数
            if(arguments.length==1){//1个参数时
                __rand(0,9);
            }else if(arguments.length==2){//2个参数时
                __rand(arguments[1][0],arguments[1][1]);
            }else if(arguments.length==0){//没有参数时
                numArr.push(__round(0,9));
            }
            return numArr;


            //一个范围都不相等的随机数
            function __rand(min,max){
                for(var i=0;i<__arguments[0];i++){
                    var ran=__round(min,max);
                    for(var j=0;j<numArr.length;j++){
                        while(numArr[j]==ran){
                            ran=__round(min,max);
                            j=0;//如果相等重新开始比较
                        }
                    }
                    numArr.push(ran)
                }
            }
            //获取一个范围的随机数
            function __round(min,max){
                return Math.round(Math.random()*(max-min)+min);
            }
        },
        'randomColor':function(){//参数（n|n,[n1,n2]）
            var colorNumArr=[];//要比较的数组
            var colorArr=[];//要返回的数组
            var __arguments=arguments;//参数
            if(arguments.length==1){
                __rand(__arguments[0]);
            } else if(arguments.length==0){
                __rand(1);
            }
            __joinColor();
            return colorArr;


            //一个范围都不相等的随机数
            function __rand(num){
                for(var i=0;i<num;i++){
                    var ran=__round();
                    for(var j=0;j<colorNumArr.length;j++){
                        while(colorNumArr[j][0]==ran[0]&&colorNumArr[j][1]==ran[1]&&colorNumArr[j][2]==ran[2]){
                            ran=__round();
                            j=0;
                        }
                    }
                    colorNumArr.push(ran)
                }
            }
            //把获取的数字数组组装为颜色数组
            function __joinColor(){
                for(var i=0;i<colorNumArr.length;i++){
                    var rgb='rgb('+colorNumArr[i][0]+','+colorNumArr[i][1]+','+colorNumArr[i][2]+')';
                    colorArr.push(rgb);
                }
            }
            //获取随机0-255的3个数字
            function __round(){
                return [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)];
            }
        },
        //获取离页面顶端和最左边的距离
        'offset':{
            //left距离
            'top':function(dom){
                return this.__public__(dom,'top');
            },
            //top距离
            'left':function(dom){
                return this.__public__(dom,'left');
            },
            //公共获取
            '__public__':function(dom,direction){
                var offD=dom;
                var off=0;
                while(offD.offsetParent){
                    off+=(direction=='top'?offD.offsetTop:offD.offsetLeft);
                    offD=offD.offsetParent;
                }
                return off;
            }
        },
        //增加属性|获取属性
        'attr':function(dom){
            if(arguments.length==2){
                return dom.getAttribute(arguments[1]);
            }else if(arguments.length==3){
                dom.setAttribute(arguments[1],arguments[2]);
            }
        },
        //删除属性
        'removeAttr':function(dom){
            dom.removeAttribute(arguments[1]);
        },
        //获取时间
        /*
        * t为一个时间格式字符串，如'Y-M-D-W H:Mi:S'=>'2017-06-03-星期六 22:06:50'
        * 可以定义任何分隔符和关键字的格式，关键字为Y：年，M:月，D:日,W:星期几，H:时，Mi:分,S:秒，Ms:毫秒
        * 也可单个获取定义，如'///H://S&&'=>'///22://50&&';
        * */
        'getDate':function(t){
            var reg=/[^a-zA-Z0-9]/ig;//匹配分隔符
            var tArr=t.split(reg);//通过分隔符分割为数组
            for(var a=0;a<tArr.length;a++){
                if(!tArr[a]){
                    tArr.splice(a,1);
                    a--;
                }
            }
            var date=new Date();
            var time=[];//存放对应时间
            var timeRep={
                'Y':function(){
                    return date.getFullYear();
                },
                'M':function(){
                    return zerofill(date.getMonth()+1);
                },
                'D':function(){
                    return zerofill(date.getDate());
                },
                'W':function(){
                    var w=date.getDay();
                    var week='';
                    switch(w){
                        case 0: week='星期日';
                            break;
                        case 1: week='星期一';
                            break;
                        case 2: week='星期二';
                            break;
                        case 3: week='星期三';
                            break;
                        case 4: week='星期四';
                            break;
                        case 5: week='星期五';
                            break;
                        case 6: week='星期六';
                            break;
                    }
                    return week;
                },
                'H':function(){
                    return zerofill(date.getHours());
                },
                'Mi':function(){
                    return zerofill(date.getMinutes());
                },
                'S':function(){
                    return zerofill(date.getSeconds());
                },
                'Ms':function(){
                    return date.getMilliseconds();
                }
            };
            for(var i=0;i<tArr.length;i++){
                for(var j in timeRep) {
                    if (tArr[i] ==j) {
                        time.push(timeRep[j]());//push对应时间
                        break;
                    }
                }
            }
            var str='';//中转字符串
            var returnStr=t;//要返回的时间字符串
            for(var k=0;k<tArr.length;k++){
                str=returnStr.replace(tArr[k],time[k]);
                returnStr=str;
            }
            return returnStr;

            //补零函数
            function zerofill(time){
                return time<10?'0'+time:time;
            }
        }

    }
})(window._cc_=window._cc_||{});
