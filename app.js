const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e){
    e.preventDefault();
    removeImages();
    const searchTerm = form.elements.query.value;
    //Se utiliza axios para hacer más sencillo el Fetch, incluyendo los parametros en el query.
    const config =  { params: {q: searchTerm}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = "";
})

//Hace visibiles las imagenes sobre el documento
const makeImages = (shows) => {
    for(let result of shows){
        if(result.show.image){
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

//Elimina las imagenes visibles
const removeImages = () => {
    for (let i= document.images.length; i-->0;)
    document.images[i].parentNode.removeChild(document.images[i]);
}