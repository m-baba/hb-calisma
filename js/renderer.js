hb.render = {
    divContainer: document.getElementById("container"),
    containerHtml: '',
    list: function () {
        var self = this;
        hb.data = hb.localStorage.order(hb.filterType, hb.orderType);
        self.containerHtml = '';
        self.containerHtml = hb.templateListPage(hb.orderType, hb.currentPage, hb.data);
        self.divContainer.innerHTML = self.containerHtml;
    },
    insert: function () {
        this.containerHtml = hb.templateAddLinkPage();
        this.divContainer.innerHTML = this.containerHtml;
    }
};