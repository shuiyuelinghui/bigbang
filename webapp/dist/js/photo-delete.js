    //
	//var oFileChecker = document.getElementById("img0");
	//var right_type=new Array(".gif",".jpg",".jpeg",".png",".bmp");
	///**
	// 判断要上传的图片文件大小
	//*/
	//function   CheckFileSize(){
	//	var limit = 3 * 1024 * 1024;
	//	if (oFileChecker.fileSize > limit){
	//		 alert('请上传3mb内的文件');
	//	   var obj = document.getElementById("p-file");
	//		obj.outerHTML = obj.outerHTML;
	//		document.getElementById("p-file").value="";
	//	   return   false;
	//	 }
	//	return   true;
	//}
	//
	//function changeSrc(filePicker) {
	//     //CheckProperty();
	//     if(!checkImgType(filePicker.value)) {
	//	    alert('照片格式不正确！');
	//      	var obj = document.getElementById("p-file");
	//    	obj.outerHTML = obj.outerHTML;
	//   	    document.getElementById("p-file").value="";
	//      	return;
	//     }
	//	//var t_image = new Image();
	//	//t_image.src = $('#p-file').val();
	//	//var file = getBase64Image(t_image);
	//	//var file = getBase64Image($('#p-file').val());
	//	var t_image = new Image();
	//	t_image.src = $('#p-file').val();
	//	log(t_image);
	//	// t_image.onload = function(){
	//	// 	 alert(getBase64Image(t_image));
	//	// };
	//  	// oFileChecker.src = $('#p-file').val().replace('file:///', '');
	//}
	//
	//oFileChecker.onreadystatechange = function () {
	//     if (oFileChecker.readyState == "complete") {
	//        CheckFileSize();
	//     }
	//}
	//
	// /**
	//   判断上传文件格式是否正确
	// */
	// function checkImgType(fileURL) {
	// //本程序用来验证后缀，如果还有其它格式，可以添加在right_type;
	// var right_typeLen=right_type.length;
	// var imgUrl=fileURL.toLowerCase();
	// var postfixLen=imgUrl.length;
	// var len4=imgUrl.substring(postfixLen-4,postfixLen);
	// var len5=imgUrl.substring(postfixLen-5,postfixLen);
	// for (i=0;i<right_typeLen;i++) {
	//      if((len4==right_type[i])||(len5==right_type[i])){
	//       return true;
	//      }
	//  }
	//}
    //
	////检测图像属性
	//function CheckProperty() {
	//	document.getElementById("img0").onerror = function(){
	//		alert('照片已损坏！');
	//		var obj = document.getElementById("p-file");
	//    	obj.outerHTML = obj.outerHTML;
	//   	    document.getElementById("p-file").value="";
	//   	    document.getElementById("img0").src= top.path + "/dist/img/zjhz-img.png";
	//	}
	//
	//}
    //
    //
