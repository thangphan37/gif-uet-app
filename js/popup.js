(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn($, window) {
  $(pageReady)
  
  async function pageReady() {
    const imageData = await getAlbum()
    var currentRecieveId = ''
    // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //   if (request.newID && request.newID !== currentRecieveId) {
    //     currentRecieveId = request.newID;
    //     console.log('New mem ', currentRecieveId);
    //   }
    // })
    chrome.storage.local.get(['idCurrentRecieveUser'], function (result) {
      if(result.idCurrentRecieveUser){
        currentRecieveId = result.idCurrentRecieveUser
      }
    })

    renderImage(imageData);

    function renderImage(imageData) {
      imageData.map(image => {
        const nameImage = image.link.split('https://i.imgur.com/')[1]
        const imageTag = `<div class="col s2"><img src="${image.link}" class="image-sticker" data-name="${nameImage}"/></div>`
        $("#listImage").append(imageTag)
      })
    }

    async function getAlbum() {
      const url = 'https://api.imgur.com/3/album/YL2P1';

      const result = await fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Client-ID 8199676913db8bf"
        },
      });
      const jsonResult = await result.json();
      return jsonResult.data.images;
    }
    
    $('body').on('click', '.image-sticker', function (event) {
      if (!currentRecieveId || !currentRecieveId.length) {
        return window.alert('Khong co ID nguoi nhan!')
      }
      const nameImageSend = $(this).data('name')
      $.ajax({
        type: "POST",
        url: "http://ec2-34-207-67-69.compute-1.amazonaws.com:3000/send-message",
        data: {
          userSendId: "100004030405392",
          userRecievedId: currentRecieveId,
          imageName: nameImageSend
        }
      })
      .done(console.log)
      .fail(console.log)
    })
  }
})



