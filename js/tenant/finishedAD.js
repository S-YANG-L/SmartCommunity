function goBack() {
	summer.closeWin({});
	summer.rmStorage("info2");
}

summerready = function() {
	var appointInfo2 = summer.getStorage("info2")
	document.getElementById("id").innerHTML = appointInfo2.id;
	document.getElementById("name").innerHTML = appointInfo2.applicantName;
	document.getElementById("sex").innerHTML = appointInfo2.applicantSex;
	document.getElementById("phone").innerHTML = appointInfo2.applicantPhone;
	document.getElementById("houseName").innerHTML = appointInfo2.houseName;
	document.getElementById("area").innerHTML = appointInfo2.inJacketArea;
	document.getElementById("money").innerHTML = appointInfo2.tablePrice;
	document.getElementById("lookingDate").innerHTML = appointInfo2.applicantDate;
	document.getElementById("content").innerHTML = appointInfo2.leavingMessage;
}