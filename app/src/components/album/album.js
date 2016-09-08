import template from './album.html';
import styles from './album.scss';

export default{
  template,
  controller,
  bindings: {
    albumId: '<',
    display: '<'
  }
};

controller.$inject = ['imageService', '$state'];

function controller(imageService, $state){
  this.styles = styles;

  this.uiOnParamsChanged = (params)=>{
    // checking for valid params
    // if invalid, kick to list view
    if(params.display){
      if(params.display === 'gallery'){
        this.display = params.display;
      } else if(params.display === 'thumbnail'){
        this.display = params.display;
      } else if(params.display === 'list'){
        this.display = params.display;
      }
      else {
        // fallback for invalid display params
        this.display = 'list';
        $state.go($state.current.name, {display: 'list'});
      }
    } else {
      this.display = params.display || 'list';
    }
  };

  this.updateDisplay = ()=>{
    $state.go($state.current.name, {display: this.display});
  };

  imageService.getAlbumContent(this.albumId)
      .then(data=>{
        if(data){
          this.title = data[0].title;
          this.images = data[1];
        }
      })
      .catch(err=>console.log(err));

  this.add = imageToAdd=>{
    imageService.add(imageToAdd)
      .then(addedImage=>this.images.push(addedImage))
      .catch(err=>console.log(err));
  };

  this.remove = imageToDelete=>{
    imageService.remove(imageToDelete)
      .then(deleted=>{
        const index = this.images.findIndex(image=>image._id === deleted._id);
        if(index !== -1){
          this.images.splice(index, 1);
        }
      })
      .catch(err=>console.log(err));
  };

  this.update = imageToUpdate=>{
    imageService.update(imageToUpdate)
      .then(updated=>{
        const index = this.images.findIndex(image=>image._id === updated._id);
        if(index !== -1){
          this.images.splice(index, 1, updated);
        }
      })
      .catch(err=>console.log(err));
  };
}
