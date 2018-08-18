var idCurrentRecieveUser = ''
chrome.storage.local.set({ idCurrentRecieveUser }, function () {
  console.log('Value is set to ' + idCurrentRecieveUser);
});

$('body').on('click', '._1mf._1mj', function (event) {
  var listClass = $(this).closest('._5qi9._5qib').find('._3_9e._s0f').attr('class').split(' ')
  idCurrentRecieveUser = listClass[listClass.length-1].split(':')[1]
  console.log('Current new', idCurrentRecieveUser);
  chrome.storage.local.set({ "idCurrentRecieveUser": idCurrentRecieveUser }, function () {
    console.log('Value is set to ' + idCurrentRecieveUser);
  });
  // chrome.runtime.sendMessage(chrome.runtime.id, { newID: idCurrentRecieveUser })
})
