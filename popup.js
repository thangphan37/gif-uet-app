  function renderImage(imageData) {
    imageData.map(img => {
      const image = document.createElement('img');

      image.src = img.link;

      document.getElementById("listImage").appendChild(image)
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

    console.log("result:", result)
    const jsonResult = await result.json();


    return jsonResult.data.images;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const  imageData = await getAlbum();
    console.log("list image:", imageData)
    renderImage(imageData);
  });