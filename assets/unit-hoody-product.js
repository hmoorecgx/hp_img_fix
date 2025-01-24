  function findTotal() {
  var arr = document.getElementsByName('size');
  var arr1 = document.getElementsByName('size1');
  var arr2 = document.getElementsByName('size2');
  var tot = 0;
  var tot1 = 0;
  var tot2 = 0;


  for (var i = 0; i < arr.length; i++) {
    if (parseInt(arr[i].value))
      tot += parseInt(arr[i].value);
  }
  for (var i = 0; i < arr1.length; i++) {
    if (parseInt(arr1[i].value))
      tot1 += parseInt(arr1[i].value);
  }
  for (var i = 0; i < arr2.length; i++) {
    if (parseInt(arr2[i].value))
      tot2 += parseInt(arr2[i].value);
  }

 document.getElementById('total').value = tot;
 document.getElementById('total1').value = tot1;
 document.getElementById('total2').value = tot2;


}