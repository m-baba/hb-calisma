// add event
hb.addEvent = function (el, type, handler) {
    if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
}

// live event
hb.live = function (selector, event, callback, context) {
    hb.addEvent(context || document, event, function (e) {
        var found, el = e.target || e.srcElement;
        while (el && !(found = el.id == selector)) el = el.parentElement;
        if (found) callback.call(el, e);
    });
};

// pagination
hb.pagination = function (array, pageNumber, callback) {
    var per_page = per_page || hb.pageItemCount,
	totalPage = (array.length % hb.pageItemCount == 0) ? array.length / per_page : (array.length / per_page) + 1,
	offset = (pageNumber - 1) * per_page,
	result = array.slice(offset).slice(0, per_page);
    result = hb.arrayToStore(result);
    callback = callback(totalPage, result) || function () { };
};

// store to array
hb.storeToArray = function () {
    var result = [];
    for (var prop in hb.data) {
        result.push(hb.data[prop]);
    }
    return result;
};

// array to store
hb.arrayToStore = function (list) {
    var result = {};
    for (var i = 0 ; i < list.length; i++) {
        result[list[i].order] = {};
        result[list[i].order] = list[i];
    }
    return result;
};

// sort
hb.sort = function (dataArray, filterType) {
    return dataArray.sort(function (a, b) {
        if (a[filterType] > b[filterType]) {
            return -1;
        } else {
            if (b[filterType] > a[filterType]) {
                return 1;
            }
            else {
                if (a[hb.secondarySortOrder] > b[hb.secondarySortOrder]) return -1;
                if (b[hb.secondarySortOrder] > a[hb.secondarySortOrder]) return 1;
            }
        }
    });
};

// remove element
hb.removeElement = function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};