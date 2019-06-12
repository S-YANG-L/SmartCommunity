function goBack() {
	summer.closeWin({});
	summer.rmStorage("info1");
}

summerready = function() {
	var appointInfo1 = summer.getStorage("info1")
	document.getElementById("id").innerHTML = appointInfo1.id;
	document.getElementById("name").innerHTML = appointInfo1.applicantName;
	document.getElementById("sex").innerHTML = appointInfo1.applicantSex;
	document.getElementById("phone").innerHTML = appointInfo1.applicantPhone;
	document.getElementById("houseName").innerHTML = appointInfo1.houseName;
	document.getElementById("area").innerHTML = appointInfo1.inJacketArea;
	document.getElementById("money").innerHTML = appointInfo1.tablePrice;
	document.getElementById("lookingDate").innerHTML = appointInfo1.applicantDate;
	document.getElementById("content").innerHTML = appointInfo1.leavingMessage;
	

}