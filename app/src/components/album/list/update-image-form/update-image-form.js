import template from './update-image-form.html';
import styles from './update-image-form.scss';

export default{
  template,
  bindings: {
    update: '<',
    info: '<'
  },
  controller(){
    this.styles = styles;

    const resetImage = ()=>{
      this.image = {};
    };

    resetImage();

    this.submit = ()=>{
      //TODO see about refactoring this later
      this.image._id = this.info._id;
      this.image.album = this.info.album;

      const originalTitle = this.info.title;
      const originalDescription = this.info.description;
      const originalLink = this.info.link;

      //form validation
      //not blank
      if(this.image.title || this.image.description || this.image.link){
        //doesn't match original object
        if((this.image.title !== originalTitle) && (this.image.description !== originalDescription) && (this.image.link !== originalLink)){
          this.update(this.image);
          resetImage();
        } else {
          this.isInvalid = true;
        }
      } else {
        this.isInvalid = true;
      }
    };
  }
};
