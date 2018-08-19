// define variables
hb.filterType = 'order';
hb.currentPage = 1;
hb.orderType = '';
hb.secondarySortOrder = 'voteTime';
hb.pageItemCount = 5;
hb.modalElem = document.getElementById("modalWrapper");

hb.DomNames = {
    upVoteBtn: 'js-up-vote',
    downVoteBtn: 'js-down-vote',
    deleteBtn: 'js-delete-link',
    addBtn: 'addBtn',
    listBtn: 'btnList',
    orderSelect: 'orderSelect',
    saveBtn: 'btnSave',
    pagelink: 'js-page-link',
    modalOverlay: 'js-modal-overlay',
    confirmClose: 'js-confirm-close',
    btnConfirm: 'js-btn-confirm',
    btnCancel: 'js-btn-cancel'
};

hb.DomEvents = {
    CLICK: 'click',
    CHANGE: 'change',
    LOAD: 'load'
};

// vote
hb.vote = {
    upvote: function (id) {
        if (hb.data[id].point >= 10)
            return;
        hb.data[id].point++;
        hb.data[id].voteTime = new Date().getTime();
        hb.localStorage.save();
    },
    downvote: function (id) {
        if (hb.data[id].point <= 0)
            return;
        hb.data[id].point--;
        hb.data[id].voteTime = new Date().getTime();
        hb.localStorage.save();
    }
}

// up vote
hb.live(hb.DomNames.upVoteBtn, hb.DomEvents.CLICK, function () {
    var id = this.getAttribute('dataid');
    hb.vote.upvote(id);
    hb.filterType = 'point';
    hb.render.list();
});

// down vote
hb.live(hb.DomNames.downVoteBtn, hb.DomEvents.CLICK, function () {
    var id = this.getAttribute('dataid');
    hb.vote.downvote(id);
    hb.filterType = 'point';
    hb.render.list();
});

// show delete pop up
hb.live(hb.DomNames.deleteBtn, hb.DomEvents.CLICK, function () {
    var id = this.getAttribute('dataid'),
        modalHtml = hb.templateModal('Linki Sil', 'Linki silmek istiyormusunuz?', id);

    hb.modalElem.innerHTML = modalHtml;
});

// delete
hb.live(hb.DomNames.btnConfirm, hb.DomEvents.CLICK, function () {
    var id = this.getAttribute('dataid'),
        messageHtml = hb.templateMessage('Link Silindi');

    hb.removeElement('modal'); // hide modal
    hb.modalElem.innerHTML = messageHtml;   // show message 
    hb.localStorage.deleteObj(id); // delete link
    setTimeout(function () { hb.removeElement('popup-message'); }, 2000); //hide message
    hb.currentPage = 1;
    hb.render.list();
});

// goto add link
hb.live(hb.DomNames.addBtn, hb.DomEvents.CLICK, function () {
    hb.render.insert();
});

// return list
hb.live(hb.DomNames.listBtn, hb.DomEvents.CLICK, function () {
    hb.render.list();
});

// order
hb.live(hb.DomNames.orderSelect, hb.DomEvents.CHANGE, function () {
    hb.orderType = this.value;
    hb.filterType = 'point';
    hb.render.list();
});

// save
hb.live(hb.DomNames.saveBtn, hb.DomEvents.CLICK, function () {
    var linkName = document.getElementById("linkName").value.trim(),
        linkUrl = document.getElementById("linkUrl").value.trim(),
        messageHtml = hb.templateMessage('Link Eklendi');

    if (linkName == '' || linkUrl == '')
        return;

    var id = new Date().getTime();
    hb.data[id] = {};
    hb.data[id].order = id;
    hb.data[id].link = linkName;
    hb.data[id].url = linkUrl;
    hb.data[id].point = 0;
    hb.data[id].voteTime = id;
    hb.localStorage.save();

    hb.modalElem.innerHTML = messageHtml;   // show message
    setTimeout(function () { hb.removeElement('popup-message'); }, 2000); //hide message

    hb.render.list();
});

// page click
hb.live(hb.DomNames.pagelink, hb.DomEvents.CLICK, function () {
    var pageNumber = this.getAttribute('data-page-number'),
		orderType = document.getElementById(hb.DomNames.orderSelect).value;
    hb.currentPage = pageNumber;
    hb.render.list();
});

// modal
hb.live(hb.DomNames.modalOverlay, hb.DomEvents.CLICK, function () {
    hb.removeElement('modal');
});

hb.live(hb.DomNames.confirmClose, hb.DomEvents.CLICK, function () {
    hb.removeElement('modal');
});

hb.live(hb.DomNames.btnCancel, hb.DomEvents.CLICK, function () {
    hb.removeElement('modal');
});

// page init
window.addEventListener(hb.DomEvents.LOAD, hb.render.list());