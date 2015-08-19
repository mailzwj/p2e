(function(window, undefined){
    function P2E(cfg) {
        cfg.size = cfg.size || 1;
        cfg.attrs = cfg.attrs || {};
        cfg.range = {width: 400, height: 600};

        this.get = function(n) {
            return cfg[n];
        };
        this.set = function(n, v) {
            cfg[n] = v;
        };
        this.init();
    }

    P2E.prototype = {
        constructor: P2E,
        _parseCSSStr: function(clsName, arr) {
            var _this = this,
                size = _this.get('size'),
                cvs = _this.canvas,
                w = cvs.width,
                h = cvs.height,
                str = '',
                bsd = '-webkit-box-shadow:{{bsdStr}};box-shadow:{{bsdStr}};',
                bsdArr = [],
                bsdStr = '',
                cssSize = size <= 1 ? 1 : size - 1;
            for (var b = 0, al = arr.length; b < al; b++) {
                if (arr[b].color.a !== 0) {
                    bsdArr.push(arr[b].x + 'px ' + arr[b].y + 'px ' + 'rgba(' + arr[b].color.r + ', ' + arr[b].color.g + ', ' + arr[b].color.b + ', ' + arr[b].color.a + ')');
                }
            }
            bsdStr = bsdArr.join(',');
            str += '.' + clsName + '{position:relative;width:' + w + 'px;height:' + h + 'px;overflow:hidden;}\n';
            str += '.' + clsName + ':after{';
            str += 'position:absolute;top:0;left:0;content:"";width:' + cssSize + 'px;height:' + cssSize + 'px;background-color:rgba(' + arr[0].color.r + ',' + arr[0].color.g + ',' + arr[0].color.b + ',' + arr[0].color.a + ');';
            str += bsd.replace(/{{bsdStr}}/g, bsdStr);
            str += '}';
            return str;
        },
        init: function() {
            this.canvas = document.getElementById('J_ReadImage');
        },
        drawImage: function(data, callback) {
            var _this = this,
                cvs = _this.canvas,
                ctx = cvs.getContext('2d'),
                img = new Image();
            img.onload = function() {
                cvs.width = img.width;
                cvs.height = img.height;
                _this.set('range', {width: img.width, height: img.height});
                ctx.drawImage(img, 0, 0);
                if (callback && typeof callback === 'function') {
                    callback.call(_this);
                }
            };
            if (typeof data === 'string') {
                img.src = data;
            } else {
                img.src = data.src;
            }
        },
        getPoints: function(arr) {
            var ps = [];
            for (var i = 0, len = arr.length; i < len; i += 4) {
                ps.push({
                    r: arr[i],
                    g: arr[i + 1],
                    b: arr[i + 2],
                    a: arr[i + 3]
                });
            }
            return ps;
        },
        formatImageData: function(data) {
            var _this = this,
                points = _this.getPoints(data.data),
                size = _this.get('size'),
                stepX = Math.ceil(data.width / size),
                stepY = Math.ceil(data.height / size),
                rArr = [];

            for (var m = 0; m < stepY; m++) {
                for (var n = 0; n < stepX; n++) {
                    rArr.push({
                        x: n * size,
                        y: m * size,
                        color: points[m * data.width * size  + n * size] || {r: 0, g: 0, b: 0, a: 1}
                    });
                }
            }
            return rArr;
        },
        getHtml: function() {
            var _this = this,
                attrs = _this.get('attrs'),
                size = _this.get('size'),
                oDiv = document.createElement('div'),
                style = document.createElement('style'),
                cvs = _this.canvas,
                ctx = cvs.getContext('2d'),
                iData = ctx.getImageData(0, 0, cvs.width, cvs.height),
                rangeArr = _this.formatImageData(iData),
                cls = 'p2e-' + (new Date().getTime()).toString(32),
                cssStr = _this._parseCSSStr(cls, rangeArr);

            for (var attr in attrs) {
                oDiv.setAttribute(attr, attrs[attr]);
            }
            oDiv.className = cls + (oDiv.className ? ' ' + oDiv.className : '');
            style.innerHTML = cssStr;
            oDiv.appendChild(style);
            return oDiv;
        }
    };

    window.P2E = window.P2E || P2E;
})(window);