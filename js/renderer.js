hb.render = {
	divContainer :document.getElementById("container"),
	containerHtml:'',
	list:function(){
		var self = this;
		hb.data = hb.localStorage.order(hb.filterType, hb.orderType);
		self.containerHtml = '';
		self.containerHtml += '<ol id="dataList">';
		self.containerHtml += '<li>\
			<select id="orderSelect">\
			  <option value="">Order by</option>\
			  <option value="Most" '+ (hb.orderType=='Most'? 'selected':'') +'>Most Voted ( Z-A )</option>\
			  <option value="Less" '+ (hb.orderType=='Less'? 'selected':'') +'>Less Voted ( A-Z )</option>\
			</select>\
		</li>';
		
		var tmpArr = hb.storeToArray();
		hb.pagination(tmpArr, hb.currentPage, function(totalpage, pagedData){
			for(var prop in pagedData){
				self.containerHtml +='<li>'+
				hb.data[prop].link+'</br>'+
				hb.data[prop].url+'</br>'+
				hb.data[prop].point+'</br>'+
				'<ul><li><input type="button" id="js-up-vote" dataid='+prop+' value="Up Vote"></li>'+
				'<li><input type="button" id="js-down-vote" dataid='+prop+' value="Down Vote"></li>'+
				'<li><input type="button" id="js-delete-link" dataid='+prop+' value="Delete Link"></li></ul>'+
				'</li>';
			}
			self.containerHtml +='<li><ul>';
			for(var i = 1;i<=totalpage;i++) {
				self.containerHtml +='<li>\
				<a href="javascript:;" data-page-number="' + i + '" id="js-page-link">' + i + '</a>\
				</li>';
			}
			self.containerHtml +='</ul></li></ol>';
			self.divContainer.innerHTML = self.containerHtml;	
		});
		
	},
	insert: function(){
		this.containerHtml = '<ul>\
								<li><input type="button" id="btnList" value="Listeleme Sayfası"></li>\
								<li><h1>Yeni link ekle</h1></li>\
								<li><label>Link Adı</label><input type="text" id="linkName"></li>\
								<li><label>Link Url</label><input type="text" id="linkUrl"></li>\
								<li><input type="button" id="btnSave" value="Kaydet"></li>\
							  </ul>\
				';
		this.divContainer.innerHTML = this.containerHtml;
	}
	
};