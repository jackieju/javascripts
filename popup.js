// to get size, you need create an invisible div width id testextsize
/*
e.g.
<div id='testtextsize' style="display:inline-block;visibility:hidden;z-index:-1;position:absolute;">
</div>
<textarea>dsfsaffasdfsadfsda
</textarea>
<button onclick="do1();">test</button>
<div id="popup" class="round_border_b" onclick="close_popup(this);">
<p/>
</div>
function do1(){
	console.log(1);
	t = $("textarea").val();
	console.log(t);
	size = calcSizeForText(t);
	console.log("=>width2:"+size.width+", height2:"+size.height);
	

	popup($("textarea").val(), true, size);
	console.log(1);
	
}*/
function calcTextLineSize(text, fontsize){
	test = document.getElementById("testtextsize");
	test.style.fontSize = fontsize;
	test.innerHTML=text;
	height = (test.clientHeight + 1) ;
	width = (test.clientWidth + 1) ;
	return {width:width,height:height};
}
function calcSizeForText(text){
	size= calcTextLineSize(text,"13pt");
	console.log("=>width:"+size.width+", height:"+size.height);

	u = Math.sqrt(size.width*size.height*9/16);
	return {
		width:u*16/9,
		height:u
	}
}
function showpad(id, show, content){
	console.log("showpad111111:"+id+","+show+", "+content);
	if (show != false){
		$("#"+id).css("display", "block");
		if (content)
			$("#"+id).html(content);
			
	}
	else
		$("#"+id).css("display", "none");
		
}

// move div to horizonal/vertical center
function center(node){
	//$("#popup").css("left", "0px");
	
	h1 = node.outerHeight();
	console.log("window.screen.height="+window.screen.height);
	console.log("window.innerHeight="+window.innerHeight);
	// h2 = window.screen.height;
	h2 = window.innerHeight;
	
	//alert("h1:"+h1+", h2:"+h2);
	node.css("top", (h2-h1)/2+"px");

	console.log("window.screen.wdith="+window.screen.width);
	console.log("window.innerWidth="+window.innerWidth);
	
	// w2 = window.screen.width;
	w2 = window.innerWidth;
	//$("#popup").css("max-width", w2-20+"px");
	w1 = node.outerWidth();
	
	_left = (w2-w1)/2;
	console.log("w1:"+w1+", w2:"+w2+", _left="+_left);
	node.css("left", _left+"px");
	
	w3 = parseInt(node.css("border-left-width"))+parseInt(node.css("border-right-width"))+parseInt(node.css("padding-left"))+parseInt(node.css("padding-right"));
	console.log("w3:"+w3+ ", w1:"+w1);
	//node.css("width", (w1-w3)+"px");
	node.width(w1-w3);
	//alert(99);
	console.log(node.outerWidth()+","+node.css("left"));
}

function show_popup(nodeid, pos){
	pos = pos || true;
	node = $("#"+nodeid);
	
	node.css("display", "block");
	if (pos == true) {// auto-position
		center(node)
		
	}else if (pos == null){
		
	}else{
		node.css("left", pos.x+"px");
		node.css("top", pos.y+"px");
	}
	console.log("popup done");
	return node;
}
/**
 * popup msg, you need html
<div id="popup" style="display:none;background:url(/images/bg_dlg.png);background-size: 100% 100%;color:yellow;text-align:center;padding:28px;position:absolute;z-index:800;width:187px;min-height:37px;max-height:200px;overflow:auto;word-wrap: break-word;word-break: normal;left:38;top:180px;border:0px red solid;" onclick="close_popup();">
 */
function popup(msg, pos, vertical_align){
	vertical_align = vertical_align || false;
	
	node = show_popup("popup", pos);
	
	if (vertical_align){
		node.css("display", "table"); //for vertical align center	
		$("#popup").html("<p>"+msg+"</p>");
	}
	else
	$("#popup").html(msg);
	
	// auto-resize to 16:9 according the text content
	size = calcSizeForText(msg);
	console.log("size:"+size.width+","+size.height);
	if (size !=null && size.width && size.height){
		if (vertical_align){
			$("#popup>p").width(size.width);
			$("#popup>p").height(size.height);
		}
		node.width(size.width);
		node.height(size.height);
		console.log("size changed to "+size.width+","+size.height);
	}
	
	
}
function close_popup(node){
	//$("#popup").css("display", "none");
	if (node != null)
		$(node).css("display", "none");
}
function showWaiting(show){
	if (show)
		$("#waitingbg").css("display", "block");
	else
		$("#waitingbg").css("display", "none");	
}



