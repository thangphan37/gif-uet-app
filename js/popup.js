(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn($, window) {
  $(pageReady)

  async function pageReady() {
    $('.modal').modal();
    $('.tabs').tabs();
    const imageData = await getAlbum()
    var currentRecieveId = ''

    chrome.storage.local.get(['idCurrentRecieveUser'], function (result) {
      if (result.idCurrentRecieveUser) {
        currentRecieveId = result.idCurrentRecieveUser
      }
    })

    renderImage(imageData);
    // renderCategory();

    async function getAlbum() {
      const url = 'https://api.imgur.com/3/album/PyAepyl';

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
      const nameImageSend = $(this).data('name');

      $.ajax({
        type: "POST",
        url: "http://ec2-34-207-67-69.compute-1.amazonaws.com:3000/send-message",
        data: {
          userSendId: "100011442782742",
          userRecievedId: currentRecieveId,
          imageName: nameImageSend
        }
      })
        .done(console.log)
        .fail(console.log)
    })
  }
})


function renderImage(imageData) {
  imageData.map((image, index) => {
    const nameImage = image.link.split('https://i.imgur.com/')[1];

    const imageTag = `<div class="col s2"><img src="../album/Pepe/${index + 1} - ${nameImage}" class="image-sticker" data-name="${nameImage}"/></div>`
    $(`#test0`).append(imageTag)
  })
}

function renderCategory() {
  const listCategory = ["Pepe", "Agapi"];

  listCategory.map((category, index) => {
    const imgCategory = `<li class="tab col s3"><a href="#test${index}">
            ${category}
          </a></li>`;

    $(".tabs").append(imgCategory);
  });
  $('.tabs').tabs();
}
