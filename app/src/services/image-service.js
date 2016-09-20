imageService.$inject = ['$http', 'apiUrl', '$cacheFactory'];

export default function imageService($http, apiUrl/*, $cacheFactory*/){
  //const cache = $cacheFactory.get('$http');

  return {
    getAlbumContent(albumId){
      return $http.get(`${apiUrl}/albums/${albumId}/content`/*, {cache: true}*/)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    add(image, userId){
      //const albumId = image.album;
      //cache.remove(`${apiUrl}/albums/${albumId}/content`);

      return $http.post(`${apiUrl}/images/${userId}`, image)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    remove(image){
      const imageId = image._id;
      //const albumId = image.album;
      //cache.remove(`${apiUrl}/albums/${albumId}/content`);

      return $http.delete(`${apiUrl}/images/${imageId}`)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    update(image){
      const imageId = image._id;
      //const albumId = image.album;

      //cache.remove(`${apiUrl}/albums/${albumId}/content`);

      return $http.put(`${apiUrl}/images/${imageId}`, image)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    }
  };
}
