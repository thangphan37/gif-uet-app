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
      // const url = 'https://api.imgur.com/3/album/PyAepyl';
      const url = ['https://api.imgur.com/3/album/PyAepyl', 'https://api.imgur.com/3/album/YL2P1'];

      const result = await Promise.all([  fetch(url[0], {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Client-ID 8199676913db8bf"
        },
      }),  fetch(url[1], {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Client-ID 8199676913db8bf"
        },
      })])

      const jsonPepe = await result[0].json();
      const jsonAgapi = await result[1].json();

      return [
        {images: jsonPepe.data.images, title: 'Pepe', id: 0},
        {images: jsonAgapi.data.images, title: 'Agapi', id: 1},
        ];
    }

    $('body').on('click', '.image-sticker', function (event) {
      let userSendId = ''
      chrome.cookies.get({ "url": "https://www.facebook.com", "name": "c_user" }, function (cookie) {
        if (!cookie) {
          return window.alert('Không có thông tin người gửi =.=!')
        }
        userSendId = cookie.value
      })
      if (!currentRecieveId || !currentRecieveId.length) {
        return window.alert('Không có thông tin người nhận T.T ')
      }
      const nameImageSend = $(this).data('name');

      $.ajax({
        type: "POST",
        url: "http://ec2-34-207-67-69.compute-1.amazonaws.com:3000/send-message",
        data: {
          userSendId,
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
  imageData[0].images.map((image, index) => {
    const nameImage = image.link.split('https://i.imgur.com/')[1];

    const imageTag = `<div class="col s2"><img src="../album/Pepe/${index + 1} - ${nameImage}" class="image-sticker" data-name="${nameImage}"/></div>`
    $(`#test0`).append(imageTag)
  });

  imageData[1].images.map((image, index) => {
    const nameImage = image.link.split('https://i.imgur.com/')[1];

    const imageTag = `<div class="col s2"><img src="../album/Agapi/${index + 1} - ${nameImage}" class="image-sticker" data-name="${nameImage}"/></div>`
    $(`#test1`).append(imageTag)
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
