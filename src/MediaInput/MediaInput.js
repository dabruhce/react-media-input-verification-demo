import React from 'react';
//Input
import FileReaderInput from 'react-file-input';
//Material-UI
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//Display
import ReactPlayer from 'react-player';
//Utility
import Mime from 'mime-types';
import './MediaInput.css';

class MediaInputComponent extends React.Component {

  constructor(props) {
     super(props);

  this.state = {
    loading: false,
    file: {},
    fileName: "",
    myurl: "",
    duration: "",
    type: "",
    size: "",
    open: false,
    error: "",
    dimensions: {}

  };
  this.onImgLoad = this.onImgLoad.bind(this);

}


handleInputChange = (event) => {
    this.resetStatus();
    console.log('Selected file:', event.target.files[0]);
    let errorMessage = this.state.error;
    let file = event.target.files[0];

    const url = URL.createObjectURL(file);

    this.setState({ url})
    this.setState({ type: file.type})
    this.setState({ size: file.size})
    this.setState({ fileName: file.name})

    //TO0 LARGE
    if(file.size > 1000000000) {
      errorMessage = errorMessage + " File limit exceeded";
      console.log("error message is: ", errorMessage);
      this.setState({ open: true})
    }


    //PREVENT USERS FROM OVERRIDING CUSTOM FILE INPUT LOOKUP
    //MIME TYPE VERIFY HEADER
    let trueMimeType = Mime.lookup(file.name);
    if(trueMimeType !== file.type) {
      errorMessage = errorMessage + " Mime type mismatch";
      console.log("error message is: ", errorMessage);
      this.setState({ open: true})
    }

    //ENSURE THIS IS ACCEPTED MIME TYPE
    let isValidType = false;
    var validMimeTypes = ["image/jpeg", "image/gif", "image/jpeg", "video/webm", "video/mp4"];
    validMimeTypes.map(function(item) {
      if(item === file.type) {
        isValidType = true;
      }
    })

    //INVALID MIME TYPE, CHECK ABOVE BLOCK
    if(!isValidType) {
      errorMessage = errorMessage + file.type + " file type is not allowed";
      console.log("error message is: ", errorMessage);
      this.setState({ open: true})
    }

    this.setState({ error: errorMessage})

  }


  onImgLoad = ({target:img}) => {
    let errorMessage = this.state.error;

    if(this.checkImageDimensions(img.naturalWidth,img.naturalHeight)) {
      errorMessage = errorMessage + " invalid Image Dimensions ";
      errorMessage = errorMessage + " " + img.naturalWidth + "x" + img.naturalHeight;
      this.setState({ error: errorMessage})
      this.setState({ open: true})
    }

    this.setState({dimensions:{height:img.naturalHeight, width:img.naturalWidth}});
  }



  checkImageDimensions = (width,height) => {

    /* e.g. web image ad sizes or MP
    //Ad sizes
    //88x31
    //234x60
    //300x100
    //300x250
    //728x90

    //MP sizes
    //12 MP - 4000x3000
    //8 MP  - 3264x2448
    //5 MP  - 2592x1936
    //3.2 MP- 2048x1536

    */
  //  console.log("width " +  width);
  //  console.log("height " +  height);
      if(width !== 728) {
        return true;
      }
      if(height !== 90) {
        return true;
      }

      return false;

  }

  onDuration = duration => {
    let errorMessage = this.state.error;
    let maxDuration = 30;
  		//this.duration = duration
    this.setState({ duration })
    console.log('duration is: ' + duration)

    if(duration > maxDuration) {
      errorMessage = errorMessage + " We only support " + maxDuration + " seconds of video at this time.";
      errorMessage = errorMessage + " This video " + duration;
      console.log("error message is: ", errorMessage);
      this.setState({ open: true})
    }
    this.setState({ error: errorMessage})
	}

  resetStatus = () => {
    this.setState({open: false});
    this.setState({size: 0});
    this.setState({type: ""});
    this.setState({url: ""});
    this.setState({error: ""});
    this.setState({fileName: ""});
    this.setState({duration: ""});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.resetStatus();
  };

  render() {
    const {loading} = this.state;
    const {width, height} = this.state.dimensions;
    const subtitle = "dimensions: " + width + "x" + height + " size:" + this.state.size;

    const actions = [
       <FlatButton
         label="Reset"
         primary={true}
         onTouchTap={this.handleClose}
       />,

     ];

    return (
      <div style={{width: '100%', maxWidth: 728, margin: 'auto'}}>

        <Dialog
        title="Our appologies...."
        actions={actions}
        modal={true}
        open={this.state.open}
        >
        {this.state.error}
        </Dialog>

        {this.state.type === 'image/gif' &&
        <Card>
         <CardMedia
           >
           <img
             onLoad={this.onImgLoad}
             src={this.state.url} />
         </CardMedia>
        </Card>
        }

        {this.state.type === 'image/jpeg' &&
        <Card>
         <CardMedia
           >
           <img
             onLoad={this.onImgLoad}
             src={this.state.url} />
         </CardMedia>
        </Card>
        }

        {this.state.type === 'image/png' &&
        <Card>
         <CardMedia
           >
           <img
             onLoad={this.onImgLoad}
             src={this.state.url} />
         </CardMedia>
        </Card>
        }

        {this.state.type === 'video/webm' &&
        <Card>
          <CardMedia
            >
            <ReactPlayer
              url={this.state.url}
              onDuration={this.onDuration}
              onLoad={this.onVideoLoad}
           />
          </CardMedia>
        </Card>
        }

        {this.state.type === 'video/mp4' &&

        <Card>
          <CardMedia
            >
            <ReactPlayer
              url={this.state.url}
              onDuration={this.onDuration}
           />
          </CardMedia>
        </Card>
        }

         <FileReaderInput name="MediaInput"
            accept=".png,.jpg,.mp4,.webm,.gif"
            placeholder="Add Video or Image"
            className="inputClass"
            onChange={this.handleInputChange} />

      </div>
    );
  }


}

export default MediaInputComponent
