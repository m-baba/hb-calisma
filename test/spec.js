/*
    //store.js
*/
describe("store.js üzerindeki fonksiyonlarýn testi", function () {

    it("save function test", function () {
        // set data
        hb.data = {
            1534587276397: { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
            1534587276398: { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
        };
        
        var saveControl = hb.localStorage.save();
        expect(saveControl).toEqual(true);
    });

    it("list function test", function () {
        var listData = hb.localStorage.list();
        expect(listData).toEqual(hb.data);
    });

    it("init function test", function () {
        var initData = hb.localStorage.init();
        expect(initData).toEqual(hb.data);
    });

    it("count function test", function () {
        var countData = hb.localStorage.count();
        expect(countData).toEqual(2);
    });

    it("order function test", function () {
        var filterData = hb.localStorage.order('point','MOST'),
            testData = {
                1534587276398: { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 },
                1534587276397: { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 }
            };
        expect(filterData).toEqual(testData);
    });

    it("delete function test", function () {
        hb.localStorage.deleteObj('1534587276398');
        var countData = hb.localStorage.count();

        expect(countData).toEqual(1);
    });

});

/*
    //helpers.js
*/
describe("helpers.js üzerindeki fonksiyonlarýn testi", function () {

    it("pagination function test", function () {
        var arrayData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            currentPage = 1,
            _totalPage = 0;

        hb.pageItemCount = 2;
        hb.pagination(arrayData, currentPage, function (totalPage, pagedData) {
            _totalPage = totalPage;
        });

        expect(_totalPage).toEqual(5);
    });

    it("storeToArray function test", function () {
        hb.data = {
            1534587276397: { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
            1534587276398: { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
        };

        var arrayData = [
            { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
            { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
        ],
        returnArrayData = hb.storeToArray();

        expect(returnArrayData).toEqual(arrayData);
    });

    it("arrayToStore function test", function () {
        var arrayData = [
                { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
                { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
            ],
            storeData = hb.arrayToStore(arrayData);

        expect(storeData).toEqual(hb.data);
    });

    it("arrayToStore function test", function () {
        var arrayData = [
                { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
                { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
            ],
            sortData = [
                    { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 },
                    { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 }
            ],
            returnData = hb.sort(arrayData, 'point');

        expect(returnData).toEqual(sortData);
    });
   
});

/*
    //bussines.js
*/
describe("bussines.js üzerindeki fonksiyonlarýn testi", function () {

    it("upvote function test", function () {
        hb.data = {
            1534587276397: { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
            1534587276398: { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
        };

        hb.vote.upvote(1534587276397);
        var updatedPoint = hb.data[1534587276397].point;

        expect(updatedPoint).toEqual(6);
    });

    it("downvote function test", function () {
        hb.data = {
            1534587276397: { order: 1534587276397, link: "test", url: "www.test.com", point: 5, voteTime: 1534587276397 },
            1534587276398: { order: 1534587276398, link: "test2", url: "www.test2.com", point: 6, voteTime: 1534587276398 }
        };

        hb.vote.downvote(1534587276397);
        var updatedPoint = hb.data[1534587276397].point;

        expect(updatedPoint).toEqual(4);
    });

});