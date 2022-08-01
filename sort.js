function sort(th, column, type){
	target = $(th); // header div
	parent = target.parent();
	console.log("event:"+event);
	type = type || "string";
	console.log("sorting");
	columns=["name", "type", "udt", "size"];
	order = target.attr("order");
	if (order == "1")
		order = "0";
	else
		order = "1";
		
	container = parent.find(".column_value_container");
	ar = container.find("div.datagrid");
	console.log("==>"+ar.length);
	data = [];
	for (i=0;i<ar.length;i++){
		a=$(ar[i]);
		s=a.html().trim();
		data[parseInt(a.attr("aindex"))]=s;
		
	}
	ar.sort(function(a,b){
		var an = $(a).html().trim(),
			bn = $(b).html().trim();
		
		if (type == "number"){
			if (an == "")
				an = -99999999999;
			else
				an = parseInt(an);
				
			if (bn == "")
				bn = -99999999999;
			else
				bn = parseInt(bn);
				
		}	
		
		if (order == "0"){
			if(an > bn) {
				return 1;
			}
			if(an < bn) {
				return -1;
			}
		}else{
			if(an > bn) {
				return -1;
			}
			if(an < bn) {
				return  1;
			}
		}
		return 0;
	});
	// for debug
	for (i =0; i< ar.length-1;i ++){
		console.log($(ar[i]).html());
	}
	//
	
	// reinsert node
	pnode = container;
	console.log("==>1:"+pnode.length);
	pnode.empty();
	pnode.append(ar);
	target.attr("order", order);
	if (order == "1"){
		 console.log(target.length);
		// $("#column_"+column+" .header").switchClass("sorteddown", "sortedup");
		target.removeClass("sorteddown");
		target.addClass("sortedup");
		
	}
	else{
		// $("#column_"+column+" .header").switchClass("sortedup", "sorteddown");
		target.removeClass("sortedup");
		target.addClass("sorteddown");
	}
	console.log("target:"+target.length+", parent:"+parent.length+", parent2:"+parent.parent().length);
	// console.log("target1:"+parent.prop("tagName"));
	// console.log("target2:"+target.parent().parent().prop("tagName"));
	
	// reinsert other column
	top1 = parent.parent();
	console.log("top:"+top1.length+", "+parent.parent().length);
	sib = top1.children(".column");
	target_column_div = target.parent();
	console.log("sib:"+sib.length);
	for (i = 0;i < sib.length;i++){
		console.log(i+":"+$(sib[i]).attr("tagName"));
	}
	for (i = 0;i < sib.length;i++){
		console.log(i);
		if (sib[i]==target_column_div[0])
			continue;
		node1 = $(sib[i]);
		ar2 = node1.find("div.datagrid");
		console.log("datagrid:"+ar2.length);
		count = 0;
			ar2.sort(function(a,b){
			//	console.log("ai="+$(a).attr("aindex")+", bi="+$(b).attr("aindex"));
			//	var an = container.find(".datagrid[aindex='"+$(a).attr("aindex")+"']").html().trim(),
			//		bn = container.find(".datagrid[aindex='"+$(b).attr("aindex")+"']").html().trim();
			
				an = data[parseInt($(a).attr("aindex"))];
				bn = data[parseInt($(b).attr("aindex"))];
				
			//	console.log(i+":an="+an+", bn="+bn);
				count ++;
				if (type == "number"){
					if (an == "")
						an = -99999999999;
					else
						an = parseInt(an);

					if (bn == "")
						bn = -99999999999;
					else
						bn = parseInt(bn);
				}	

				if (order == "0"){
					if(an > bn) {
						return 1;
					}
					if(an < bn) {
						return -1;
					}
				}else{
					if(an > bn) {
						return -1;
					}
					if(an < bn) {
						return  1;
					}
				}
				return 0;
			});
			console.log("run "+count);
			pnode = node1.find(".column_value_container");
				console.log(i+":pnode:"+pnode);
			pnode.empty();
			pnode.append(ar2);
	}
	
/*	// order other columns 
	for (cl in columns){
		if (cl != column){
		
			ar2 = $("#column_"+cl+" div.datagrid");
			ar2.sort(function(a,b){
				console.log("ai="+$(a).attr("aindex")+", bi="+$(a).attr("aindex"));
				var an = $("#column_"+column+"_container .connectedSortable .datagrid[aindex='"+$(a).attr("aindex")+"']").html(),
					bn = $("#column_"+column+"_container .connectedSortable .datagrid[aindex='"+$(a).attr("aindex")+"']").html();
					
					if (type == "number"){
						an = parseInt(an);
						bn = parseInt(bn);
					}	

					if (order == "0"){
						if(an > bn) {
							return 1;
						}
						if(an < bn) {
							return -1;
						}
					}else{
						if(an > bn) {
							return -1;
						}
						if(an < bn) {
							return  1;
						}
					}
				return 0;
			});
			pnode = $("#column_"+cl+"_container");
			pnode.empty();
			pnode.append(ar2);
		}
	}*/
}