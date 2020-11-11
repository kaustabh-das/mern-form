import { useState, useEffect } from 'react';
import  axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    profilepicture: '',
    username: '',
    height: '',
    weight: '',
    gpa: '',
    award: '',
    contact: '',
    score: '',
    urlLink: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    axios.get('http://localhost:5000/users')
        .then(res => {
                console.log(res.data[0].username);
                let userName = [];
                for(let i=0; i<res.data.length; i++){
                  userName.push(res.data[i].gpa);
                }
                setScores(userName);
              })
              .catch(error => {
                console.log(error);
              })

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, [])
  // console.log(scores)
    // {
    //   label: "12",
    //   value: "12"
    // },
    // { label: "13", value: "13" },
    // { label: "14", value: "14" }
  // ]); 

  // This useState is for image.
  const [images, setImages] = useState([]);
  
  // uploading image part.
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // uploading video part.
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: '' } }
  
  // This useState is for videos.
  const [videos, setVideos] = useState([]);

  const handleChangeStatus = ({ meta, file }, status) => { 
    setVideos(file);
    // console.log(status, meta, file);
    // console.log(file);  
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    console.log(values);
    console.log(images);
    // console.log(status, meta, file); 
    console.log(videos);
    
    // Image uploading to s3 bucket 
    let formData = new FormData();
    formData.append("image", images[0].file);
    axios.post('http://localhost:5000/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    
    // Data upload yo mongodb cloud  
    axios.post('http://localhost:5000/users/add', values)
      .then(res => console.log(res.data));

    // Video uploading to s3 bucket 
    let formData2 = new FormData();
    formData2.append("image", videos);
    axios.post('http://localhost:5000/users/upload', formData2, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })  

    // window.location = '/'; // After submiting the form, it will redirect to homepage.
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, onChange, getUploadParams, handleChangeStatus , values, errors, images, scores };
};

export default useForm;
