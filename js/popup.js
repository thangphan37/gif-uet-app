(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn($, window) {
  $(pageReady);

  async function pageReady() {
    $('.modal').modal();
    $('.tabs').tabs();
    const imageData = await getAlbum();
    var currentRecieveId = ''

    chrome.storage.local.get(['idCurrentRecieveUser'], function (result) {
      if (result.idCurrentRecieveUser) {
        currentRecieveId = result.idCurrentRecieveUser
      }
    });

    renderImage(imageData);

    async function getAlbum() {
      const url = [
        'https://api.imgur.com/3/album/PyAepyl',
        'https://api.imgur.com/3/album/YL2P1',
        'https://api.imgur.com/3/album/hEXgz',
        'https://api.imgur.com/3/album/ulf7o',
      ];
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Client-ID 8199676913db8bf"
      };

      const result = await Promise.all([
        fetch(url[0], { headers }),
        fetch(url[1], { headers }),
        fetch(url[2], { headers }),
        fetch(url[3], { headers })
      ]);

      const jsonPepe = await result[0].json();
      const jsonAgapi = await result[1].json();
      const jsonMoew = await result[2].json();
      const jsonMeme = await result[3].json();

      return [
        { images: jsonPepe.data.images, title: 'Pepe', id: 0 },
        { images: jsonAgapi.data.images, title: 'Agapi', id: 1 },
        { images: jsonMoew.data.images, title: 'Moew', id: 2 },
        { images: jsonMeme.data.images, title: 'Meme', id: 3 },
      ];
    }

    $('body').on('click', '.image-sticker', function (event) {
      let userSendId = ''
      chrome.cookies.get({ "url": "https://www.facebook.com", "name": "c_user" }, function (cookie) {
        if (!cookie) {
          return window.alert('Không có thông tin người gửi =.=!')
        }
        userSendId = cookie.value;
      });

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
});

function renderContentImage(i, title, imageData) {
  return imageData[i].images.map((image, index) => {
    const nameImage = image.link.split('https://i.imgur.com/')[1];

    const imageTag = `<div class="col s2"><img src="../album/${title}/${index + 1} - ${nameImage}" class="image-sticker" data-name="${nameImage}"/></div>`
    $(`#test${i}`).append(imageTag)
  });
}

function renderImage(imageData) {
  renderContentImage(0, 'Pepe', imageData);
  renderContentImage(1, 'Agapi', imageData);
  renderContentImage(2, 'Moew', imageData);
  renderContentImage(3, 'Meme', imageData);
}

// function renderCategory() {
//   const listCategory = ["Pepe", "Agapi"];
//
//   listCategory.map((category, index) => {
//     const imgCategory = `<li class="tab col s3"><a href="#test${index}">
//             ${category}
//           </a></li>`;
//
//     $(".tabs").append(imgCategory);
//   });
//   $('.tabs').tabs();
// }
