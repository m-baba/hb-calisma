hb.filterType = 'order';
hb.currentPage = 1;
hb.orderType = '';
hb.secondarySortOrder = 'voteTime';
hb.pageItemCount=3;
hb.DomNames={
	upVoteBtn:'js-up-vote',
	downVoteBtn:'js-down-vote',
	deleteBtn :'js-delete-link',
	addBtn:'addBtn',
	listBtn:'btnList',
	orderSelect:'orderSelect',
	saveBtn: 'btnSave',
	pagelink:'js-page-link'
};
hb.DomEvents={
	CLICK :'click',
	CHANGE:'change',
	LOAD:'load'
};

hb.vote = {
	upvote:function(id){
		hb.data[id].point++;
		hb.data[id].voteTime = new Date().getTime();
		hb.localStorage.save();
	},
	downvote:function(id){
		hb.data[id].point--;
		hb.data[id].voteTime = new Date().getTime();
		hb.localStorage.save();
	}
}

hb.live(hb.DomNames.upVoteBtn, hb.DomEvents.CLICK, function(){ 
var id =this.getAttribute('dataid');
	hb.vote.upvote(id);
	hb.filterType = 'point';
	hb.render.list();
});

hb.live(hb.DomNames.downVoteBtn, hb.DomEvents.CLICK, function(){ 
var id =this.getAttribute('dataid');
	hb.vote.downvote(id);
	hb.filterType = 'point';
	hb.render.list(); 
});

hb.live(hb.DomNames.deleteBtn, hb.DomEvents.CLICK, function(){ 
var id =this.getAttribute('dataid');
	hb.localStorage.deleteObj(id);
	hb.render.list(); 
});

hb.live(hb.DomNames.addBtn, hb.DomEvents.CLICK, function(){ 
	hb.render.insert(); 
});

hb.live(hb.DomNames.listBtn, hb.DomEvents.CLICK, function(){ 
	hb.render.list(); 
});

hb.live(hb.DomNames.orderSelect, hb.DomEvents.CHANGE, function(){ 
	hb.orderType = this.value;
	hb.filterType = 'point';
	hb.render.list();
});

hb.live(hb.DomNames.saveBtn, hb.DomEvents.CLICK, function(){
	var linkName = document.getElementById("linkName");
	var linkUrl = document.getElementById("linkUrl");
	var id = new Date().getTime();
	hb.data[id] ={};
	hb.data[id].order = id;
	hb.data[id].link = linkName.value;
	hb.data[id].url = linkUrl.value;
	hb.data[id].point =0;
	hb.data[id].voteTime =id;
	hb.localStorage.save();

	hb.render.list();
});

hb.live(hb.DomNames.pagelink, hb.DomEvents.CLICK, function(){ 
	var pageNumber =this.getAttribute('data-page-number'),
		orderType = document.getElementById(hb.DomNames.orderSelect).value;
	hb.currentPage = pageNumber;
	hb.render.list();
});

window.addEventListener(hb.DomEvents.LOAD, hb.render.list());