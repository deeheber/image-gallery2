albumService.$inject = ['$http', 'apiUrl', '$cacheFactory'];

export default function albumService($http, apiUrl, $cacheFactory){
  const cache = $cacheFactory.get('$http');

  return {

    getByUser(userId){
      return $http.get(`${apiUrl}/albums/${userId}`, {cache: true})
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    add(album){
      cache.remove(`${apiUrl}/albums/${album.user}`);

      return $http.post(`${apiUrl}/albums/${album.user}`, album)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    remove(albumId, userId){
      cache.remove(`${apiUrl}/albums/${userId}`);

      return $http.delete(`${apiUrl}/albums/${albumId}`)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    update(album, userId){
      cache.remove(`${apiUrl}/albums/${userId}`);
      const albumId = album._id;

      return $http.put(`${apiUrl}/albums/${albumId}`, album)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    }
  };
}
