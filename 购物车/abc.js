window.onload = function () {
//元素集合
	var table = document.getElementById('cartTable');//table
	var tbody = table.getElementsByTagName('tbody')[0];//tbody
	var checkAlls = document.getElementsByClassName('check-all');//全选input按钮
	var checkOnes = tbody.getElementsByClassName('check-one');//tbody下的单选input按钮
	var tbodyDelete =  tbody.getElementsByClassName('delete');//tbody下的删除键
	var foot = document.getElementById('foot');//底部div
	var footDelete = foot.getElementsByClassName('delete')[0];//底部删除键
	var add = document.getElementsByClassName('add');//+
	var reduce = document.getElementsByClassName('reduce');//-
	var selectedTotal = document.getElementById('selectedTotal');//总商品数
	var priceTotal = document.getElementById('priceTotal');//总钱数
	var selectedViewList= document.getElementById('selectedViewList');//商品容器
	var	selected = document.getElementById('selected');//点击出现商品
//封装函数前一个，后一个，更新商品总数和总价
	function pre(obj) {
		var preobj = obj.previousSibling;
		while(preobj.nodeType == 3){
			var preobj = preobj.previousSibling
		}
		return preobj;
	}
	function next(obj) {
		var nextobj = obj.nextSibling;
		while(nextobj.nodeType == 3){
			var nextobj = nextobj.nextSibling
		}
		return nextobj;
	}
	
	function update() {
		var numAll = 0;
		var priceAll = 0;
		var HTMLstr = "";
		var tbodyTr = tbody.getElementsByTagName('tr');//tbody下的tr
		for (var i = 0; i < tbodyTr.length; i++) {
			if (tbodyTr[i].getElementsByClassName('check-one')[0].checked == true) {
				var price = Number(tbodyTr[i].getElementsByClassName('subtotal')[0].innerHTML);
				var num = Number(tbodyTr[i].getElementsByClassName('count-input')[0].value);
				numAll += num;
				priceAll += price;
				HTMLstr += '<div><img src="' + tbodyTr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>';
			}
		}
		selectedTotal.innerHTML = numAll;
		priceTotal.innerHTML = priceAll.toFixed(2);
		selectedViewList.innerHTML = HTMLstr;
	}
		//封装函数前一个，后一个，更新商品总数和总价
		//全选input按钮
		for (var i = 0; i < checkAlls.length; i++) {
			checkAlls[i].onclick = function () {
			for (var i = 0; i < checkOnes.length; i++) {
				checkOnes[i].checked = this.checked;			
			    }
			update();
		    }
		}
		//全选input按钮
		//单选input按钮
	 	 for (var i = 0; i < checkOnes.length; i++) {
	 	 	checkOnes[i].onclick = function () {
	 	 	update();
	 	 }
     }
		//单选input按钮
		//单删除按键
		for (var i = 0; i < tbodyDelete.length; i++) {
		tbodyDelete[i].onclick = function () {
			var tr = this.parentNode.parentNode;
			tbody.removeChild(tr);
			update();
		}
		
	}
		//单删除按键
		//底部的全删除按键
		footDelete.onclick = function () {
			var info = false;
			for (var i = 0; i < checkOnes.length; i++) {
				console.log(checkOnes[i].checked);
				if (checkOnes[i].checked) {
					var tr = checkOnes[i].parentNode.parentNode;
					tbody.removeChild(tr);
					info = true;
					i--;
				}
			}
			if (info == false) {
				alert('请选择商品')
			}
			update()
		}
		//底部的全删除按键
		//+号键
		for (var i = 0; i < add.length; i++) {
			add[i].onclick = function () {
				var price = Number(pre(this.parentNode).innerHTML);
				var priceAll = next(this.parentNode);
				var reduce = this.parentNode.firstChild;
				var countInput = pre(this);
				var num = Number(countInput.value) + 1;
				countInput.value = num;
				priceAll.innerHTML = (price * num).toFixed(2);
				reduce.innerHTML = "-";
				update();
			}
			
		}
		//+号键
		// -号键
		for (var i = 0; i < reduce.length; i++) {
			reduce[i].onclick = function () {
				var price = Number(pre(this.parentNode).innerHTML);
				var priceAll = next(this.parentNode);
				var countInput = next(this);
				var num = Number(countInput.value) - 1;
				if (num == 0) {
					this.innerHTML = "";
				}else{
					countInput.value = num;
					priceAll.innerHTML = (price * num).toFixed(2);
				}
				update();	
			}
			
		}
		// -号键
//显示商品
		selected.onclick = function () {
				if (selectedTotal.innerHTML != 0) {
					foot.className = 'foot show'
				}else{
					foot.className = 'foot'
				}
		}
//显示商品
//删除已选商品
	selectedViewList.onclick = function (e) {
		var tbodyTr = tbody.getElementsByTagName('tr');
		var e = e || window.event;
        var el = e.srcElement;
        if (el.className=='del') {
            var input =  tbodyTr[el.getAttribute('index')].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
	    }
    }
//删除已选商品
checkAlls[0].checked = true;
checkAlls[0].onclick();
update();
}