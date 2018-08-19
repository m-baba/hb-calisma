hb = {};
hb.data = {};
hb.localStorage = {
    storeName: 'hbStore',
    init: function () {
        if (typeof localStorage[this.storeName] === 'undefined') {
            localStorage[this.storeName] = JSON.stringify(hb.data);
        } else {
            return hb.data = this.list();
        }
    },
    save: function () {
        localStorage[this.storeName] = JSON.stringify(hb.data);
        return true;
    },
    deleteObj: function (id, callback) {
        delete hb.data[id];
        this.save();
    },
    list: function () {
        return JSON.parse(localStorage[this.storeName]);
    },
    order: function (filterType, orderType) {
        var dataArray = hb.storeToArray();
        dataArray = hb.sort(dataArray, filterType);
        if (orderType == 'Less') {
            dataArray.reverse();
        }
        var result = hb.arrayToStore(dataArray);
        return result;
    },
    count: function () {
        return Object.keys(hb.data).length;
    }
};

hb.localStorage.init();