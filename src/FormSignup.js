import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';
import ImageUploading from 'react-images-uploading';
import { UploadHandler } from 'react-file-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const FormSignup = ({ submitForm }) => {

  const { handleChange, handleSubmit, onChange, getUploadParams, handleChangeStatus, values, errors, images, scores } = useForm(
    submitForm,
    validate
  );

  const mystyle = {
    padding: "15px",
    fontFamily: "Arial",
    textAlign: "center",
    backgroundColor: 'black',
    borderRadius:'3vh'
  };

  const styles = {
    //  margin: '100px',
    // width: '250px',
    // height: '250px',
    backgroundColor: 'black'
  };

  return (
    <div className='form-content-right' style={mystyle}>
      <form onSubmit={handleSubmit} className='form' noValidate style={{'backgroundColor': 'black'}}>
        <h1 style={{color: "white",marginTop:'8vh', padding:'30px','backgroundColor': 'black'}}>
          Registration Form....
        </h1>

        <div className='label-packet' style={{ backgroundColor:'black'}}>
          
        <div className="App" style={mystyle}>
            <ImageUploading
              // multiple
              name='profilepicture'
              value={images} //values.profilepicture
              onChange={onChange}  //handleChange
              // maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper" style={mystyle}>
                  {/* <button className='btn btn-info'
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Add Profile pic
                  </button> */}
                  <input className='btn btn-info my-3'
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    type="button" value="Profile pic" />
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item" style={mystyle}>
                      <img src={image['data_url']} alt="" style={{'width':'35vh','height':'35vh','borderRadius':'50%','padding':'8px'}} />
                      <div className="image-item__btn-wrapper" style={mystyle}>
                        <button className="btn btn-warning mx-3"  onClick={() => onImageUpdate(index)}>Update</button>
                        <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Username:</label>
            <input
              className='form-control'
              type='text'
              name='username'
              placeholder='Enter your username'
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p style={{color: "red", backgroundColor:'black'}}>{errors.username}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Height:</label>
            <input
              className='form-control'
              type='number'
              name='height'
              placeholder='Enter your height'
              value={values.height}
              onChange={handleChange}
            />
            {errors.height && <p style={{color: "red", backgroundColor:'black'}}>{errors.height}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Weight:</label>
            <input
              className='form-control'
              type='number'
              name='weight'
              placeholder='Enter your weight'
              value={values.weight}
              onChange={handleChange}
            />
            {errors.weight && <p style={{color: "red", backgroundColor:'black'}}>{errors.weight}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>GPA:</label>
            <input
              className='form-control'
              type='number'
              name='gpa'
              placeholder='Enter your gpa'
              value={values.gpa}
              onChange={handleChange}
            />
            {errors.gpa && <p style={{color: "red", backgroundColor:'black'}}>{errors.gpa}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Award:</label>
            <input
              className='form-control'
              type='number'
              name='award'
              placeholder='Enter your award'
              value={values.award}
              onChange={handleChange}
            />
            {errors.award && <p style={{color: "red", backgroundColor:'black'}}>{errors.award}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Contact:</label>
            <input
              className='form-control'
              type='number'
              name='contact'
              placeholder='Enter your contact'
              value={values.contact}
              onChange={handleChange}
            />
            {errors.contact && <p style={{color: "red", backgroundColor:'black'}}>{errors.contact}</p>}
          </div>

          
          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','marginRight':'1.5vh','marginTop':'1.5vh','backgroundColor': 'black'}}>Ball Test Score:</label>
            <select 
              name='score'
              value={values.value}
              onChange={handleChange} >
              {scores.map(item => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select> 
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>
            <label className='form-label' for="formGroupExampleInput" style={{'color':'white','backgroundColor': 'black'}}>Video Link:</label>
            <input
              className='form-control'
              type='url'
              name='urlLink'
              placeholder='Enter your url link'
              value={values.urlLink}
              onChange={handleChange}
            />
            {errors.urlLink && <p style={{color: "red", backgroundColor:'black'}}>{errors.urlLink}</p>}
          </div>

          <div className='form-group' style={{backgroundColor: 'black'}}>

          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            // onSubmit={handleSubmit}
            accept="audio/*,video/*"
          />
          </div>

        </div>
        
        <button className='btn btn-primary' type='submit'  style={{ "marginBottom":"6vh"}}>
          Register
        </button>

      </form>
    </div>
  );
};

export default FormSignup;
