// model template
hb.templateModal = function (title, message, id) {
    return '\
        <div class="modal">\
            <div class="modal-overlay" id="js-modal-overlay"></div>\
            <div class="popup-confirm">\
                <div class="confirm-header">\
                    <span class="confirm-title">' + title + '</span>\
                    <a href="javascript:;" id="js-confirm-close" class="confirm-close"></a>\
                </div>\
                <div class="confirm-content">\
                    <p>' + message + '</p>\
                </div>\
                <div class="confirm-footer">\
                    <a href="javascript:;" dataid="'+id+'" id="js-btn-confirm" class="confirm-btn btn-confirm">EVET</a>\
                    <a href="javascript:;" id="js-btn-cancel" class="confirm-btn btn-cancel">HAYIR</a>\
                </div>\
            </div>\
        </div>\
    ';
};

// message template
hb.templateMessage = function (message) {
    return '\
        <div id="message" class="popup-message">\
            <p>' + message + '</p>\
        </div>\
    ';
};

// add link page template
hb.templateAddLinkPage = function () {
    return '\
        <ul class="add-link-items">\
		    <li class="add-link-item"><a href="javascript:;" class="return-to-list" id="btnList">Listeleme Sayfasına Dön</a></li>\
		    <li class="add-link-item"><h1 class="add-link-title">Yeni link ekle</h1></li>\
		    <li class="add-link-item"><label class="add-link-label">Link Adı</label><input type="text" class="add-link-input" placeholder="e.g. Alphabet" id="linkName"></li>\
		    <li class="add-link-item"><label class="add-link-label">Link Url</label><input type="text" class="add-link-input" placeholder="e.g. http://abc.com" id="linkUrl"></li>\
		    <li class="add-link-item"><input type="button" class="add-link-btn-save" id="btnSave" value="EKLE"></li>\
		</ul>\
    ';
};

// list page template
hb.templateListPage = function (orderType,currentPage, data) {
    var containerHtml = '',
        tmpArr = hb.storeToArray();

    containerHtml += '<ul class="list-items">\
        <li class="list-item"><a href="javascript:;" id="addBtn" class="add-link">LİNK EKLE</a></li>\
        <li class="list-item">\
			<select id="orderSelect" class="order-select">\
			    <option value="">Order by</option>\
			    <option value="Most" '+ (orderType == 'Most' ? 'selected' : '') + '>Most Voted ( Z-A )</option>\
			    <option value="Less" '+ (orderType == 'Less' ? 'selected' : '') + '>Less Voted ( A-Z )</option>\
			</select>\
		</li>\
    ';

    hb.pagination(tmpArr, hb.currentPage, function (totalPage, pagedData) {
        for (var prop in pagedData) {
            containerHtml += '\
                <li class="list-item list-item--link">\
                    <div class="point-wrapper">\
                        <ul class="point-items">\
                            <li><span class="point">' + data[prop].point + '</span></li>\
                            <li><span class="point-text">PUAN</span></li>\
                        </ul>\
                    </div>\
                    <ul class="link-items">\
                        <li class="link-item"><span class="link-name">' + data[prop].link + '</span></li>\
                        <li class="link-item"><span class="link-url">( ' + data[prop].url + ' )</span></li>\
                        <li class="link-item">\
                            <a href="javascript:;" id="js-up-vote" dataid=' + prop + ' class="up-vote">Artı Puan</a>\
                            <a href="javascript:;" id="js-down-vote" dataid=' + prop + ' class="down-vote">Eksi Puan</a>\
                        </li>\
                    </ul>\
                    <a href="javascript:;" id="js-delete-link" dataid=' + prop + ' class="delete-link"></a>\
                </li>\
            ';
        } //for

        containerHtml += '\
            <li class="list-item">\
                <ul class="pagination-items">\
                    <li class="pagination-item"><a href="javascript:;" data-page-number="' + (parseInt(currentPage) - 1) + '" id="js-page-link" class="page-prev ' + (parseInt(currentPage) == 1 ? 'disabled' : '') + '" id="js-page-prev"></a></li>\
        ';
        for (var i = 1; i <= totalPage; i++) {
            containerHtml += '\
                <li class="pagination-item">\
				    <a href="javascript:;" class="page-link ' +( parseInt(currentPage) == i ? 'active' : '') + '" data-page-number="' + i + '" id="js-page-link">' + i + '</a>\
				</li>\
            ';
        }
        containerHtml += '\
                    <li class="pagination-item"><a href="javascript:;" data-page-number="' + (parseInt(currentPage) + 1) + '" id="js-page-link" class="page-next ' + (parseInt(currentPage) == parseInt(totalPage) ? 'disabled' : '') + '" id="js-page-next"></a></li>\
                </ul>\
            </li>\
        </ul>';
    }); //pagination
    
    return containerHtml;
};