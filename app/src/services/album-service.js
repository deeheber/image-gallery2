albumService.$inject = ['$http', 'apiUrl', '$cacheFactory'];

export default function albumService($http, apiUrl, $cacheFactory){
  const cache = $cacheFactory.get('$http');

  return {
    getAll(){
      return $http.get(`${apiUrl}/albums`, {cache: true})
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    add(album){
      cache.remove(`${apiUrl}/albums`);

      return $http.post(`${apiUrl}/albums`, album)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    remove(albumId){
      cache.remove(`${apiUrl}/albums`);

      return $http.delete(`${apiUrl}/albums/${albumId}`)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    },
    update(album){
      cache.remove(`${apiUrl}/albums`);
      const albumId = album._id;

      return $http.put(`${apiUrl}/albums/${albumId}`, album)
        .then(response=>response.data)
        .catch(err=>console.log(err));
    }
  };
}
