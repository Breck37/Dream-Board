import React, { Component } from "react";
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css'
import Header from "../header/Header";
import "../styles/Upload.css";
import axios from 'axios';
import {connect} from 'react-redux';
import {login} from '../../ducks/reducer';
// import glamourous from 'glamorous';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      // imagePreviewUrl: "",
      text: "",
      categories: [],
      category: '',
    };
  }

  componentDidMount(){
    axios.get('/user-data').then(response => {
      const user = response.data
      this.props.login(user)
      axios.get('/getcategory').then(response => {
        console.log(response.data)
        this.setState({
          categories: response.data
        })
      })
    }).catch(() => {
      this.props.history.push('/')
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log("uploading-", this.state.file, this.state.text, this.props.user, this.state.category, 'Hey');
    const {id} = this.props.user
    axios.post(`/uploadimage/${id}`, {
      user_id: id,
      image_url: this.state.file,
      image_text: this.state.text,
      category: this.state.category,
    })
    .then(response => {
        this.props.history.push(`/mydreams/${id}`)
    })
  }

  _handleTextChange(e){
    this.setState({
      text: e.target.value
    });
    console.log(this.state.text);
  }

  _handleImageChange(e) {
    e.preventDefault();

    // let reader = new FileReader();
    let file = e.target.value;

    // reader.onloadend = () => {
      this.setState({
        file: file,
        // imagePreviewUrl: reader.result
      });
    // };

    // reader.readAsDataURL(file);
  }

  //CATEGORY
  handleCategory(e){
    console.log('target', e.target.value)
    this.state.categories.filter(elem => {
      if(elem.category_name === e.target.value){
        console.log(elem.id)
    this.setState({
      category: elem.id
    });}
  })
  }

  render() {
    console.log(this.state.category)
    let { file } = this.state;
    let $imagePreview = null;
    let {categories} = this.state
    let showCat = null;
    if (file) {
      $imagePreview = <img className='upload-img' src={file} alt="display" />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    //CATEGORY???????????????????????????
    if(categories[0]){
      showCat = <select className='genre-choice' onChange={e => this.handleCategory(e)}>
        <option value='Default'>Select</option>
        <option value={categories[0].category_name}>{categories[0].category_name}</option>
        <option value={categories[1].category_name}>{categories[1].category_name}</option>
        <option value={categories[2].category_name}>{categories[2].category_name}</option>
        <option value={categories[3].category_name}>{categories[3].category_name}</option>
        <option value={categories[4].category_name}>{categories[4].category_name}</option>
        <option value={categories[5].category_name}>{categories[5].category_name}</option>
        </select>
    } else {
      showCat = <p>Loading Categories</p>
    }
    return (
      <div className="component">
        <Header />
        <div className="previewComponent">
          <form onSubmit={e => this._handleSubmit(e)}>
            Image Url: <input
              className="fileInput"
              onChange={e => this._handleImageChange(e)}
            />
          </form>
          <div className="imgPreview">{$imagePreview}</div>
          <h2 className="image-text">{this.state.text}</h2>
          <textarea
            placeholder="Add Image Caption Before Upload"
            className="caption"
            onChange={e => this._handleTextChange(e)}
          />
          {/*CATEGORY*/}
          <div>{showCat}</div>
          <div className="submit">
            <button
              className="home-btn"
              type="submit"
              onClick={e => this._handleSubmit(e)}
            >
              Upload Dream
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {login})(Upload);

// const upload = require('superagent');
// import ReactUpload from 'react-s3-upload';

// const uploader = new FineUploaderTraditional({
//     options: {
//         chunking: {
//             enabled: true
//         },
//         dropzone: {
//             enabled: true,
//         },
//         deleteFile: {
//             enabled: true,
//             endpoint: '/uploads'
//         },
//         request: {
//             endpoint: '/uploads'
//         },
//         retry: {
//             enableAuto: true
//         }
//     }
// })

// const fileInputChildren = <span>Choose Files</span>

// export default class Upload extends Component {
//     render() {
//         return (
//             <div>Upload</div>
//             // <ImagesUploader
//             //     url="http://localhost:3035/notmultiple"
//             //     optimisticPreviews
//             //     multiple={false}
//             //     onLoadEnd={err=>{
//             //         if(err){
//             //             console.log(err);
//             //         }
//             //     }}
//             //     label="Upload your image"
//             //     />
//         )
//     }
// }

// <div>
//     {/* <input type='file' /> */}
//     {/* <Dropzone onDrop={this.onDrop} multiple='false'>
//     */}
// </div>

// graphql(CreateChampionMutatioUpload;

//     onDrop = async files => {
//         this.setState({ file: files[0]});
//     }

//     onChange = e =>{
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     uploadToS3 = async (file, signedRequest) => {
//         const options = {
//             headers: {
//                 "Content-Type": file.type
//             }
//         }
//         await axios.put(signedRequest, file, options)
//     }

//     formatFilename = filename => {
//         const date = date().format('YYYYMMDD');
//         const randomString = Math.random()
//             .toString(36)
//             .substring(2, 7);
//         const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
//         const newFilename = `appuploads/${date}-${randomString}-${cleanFileName}`;
//         return newFilename.substring(0, 60);
//     }

//     submit = async () => {
//         const {name, file} = this.state;
//         const response = await this.props.s3Sign({
//             variables: {
//                 filename: this.formatFilename(file.name),
//                 filetype: file.type
//             }
//         });
//         const {signedRequest, url} = response.data.signS3;
//         await this.uploadToS3(file, signedRequest);

//         const graphqlResponse = await this.props.createChampion({
//             variables: {
//                 name,
//                 pictureUrl: url
//             }
//         });

//         this.props.history.push(
//             `/champion/${graphqlResponse.data.createChampion.id}`
//         )

//     const CreateChampionMutation = gql`
//     mutation($name: String!, $pictureUrl: String!){
//         createChampion(name: $name, pictureUrl: $pictureUrl){
//             id
//         }
//     }
// `;

// const s3SignMutation = gql`
//     mutation($filename: String!, $filetype: String!){
//         signS3(filename: $filename, filetype: $filetype) {
//             url
//             signedRequest
//         }
//     }
// `;
