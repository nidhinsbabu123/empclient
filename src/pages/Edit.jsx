import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { allUsers, editUser } from '../services/AllApi';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function Edit() {

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];

  const [showspin, setshowSpin] = useState(true)

  // Create state to hold normal inputs
  const[normalUserInput,setnormalUserInput] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // Create state to hold value in Employee status
  const[status,setStatus]=useState("")

  // Create state to hold value from uploading files
  const[profile,setprofile] = useState("")

  //create a State
  const[preview,setPreview] = useState("")







  // Define normal input function.
  const getandsetNormalInputs=(e)=>{
    const{name,value}=e.target

    // using rest operator
    setnormalUserInput({...normalUserInput,[name]:value})
  }

  // console.log(normalUserInput);
  // console.log(status);
  // console.log(profile);

  const handlefile = (e)=>{
    console.log(e.target.files[0]);
    setprofile(e.target.files[0])
  }



  useEffect(() => {

    if(profile){
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {

      setshowSpin(false)

    }, 2000);


  }, [profile])

  useEffect(() => {

    getUser() 

  }, [])
  

  // Edit a single employee details
  const {id} = useParams()
  console.log(id);

  const[existingImg,setexistingImg] = useState("")

  // to get all users from database
  const getUser = async() => {
    const {data} = await allUsers("")
    console.log(data);

    let existingUser = data.find(item=>item._id===id)
    console.log(existingUser);

    setnormalUserInput(existingUser)
    setStatus(existingUser.status)
    setexistingImg(existingUser.profile)
  }

  // handleSubmit Function
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const{fname,lname,email,mobile,gender,location} = normalUserInput

    if(!fname||!lname||!email||!mobile||!gender||!status||!profile||!location){
      alert("Please fill the form completely")
    }else{
      // alert("Form filled completely")

      // Create form data
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      profile? data.append("profile",profile):data.append("profile",existingImg)
      data.append("location",location)

      // headers
      if(profile){

        var headers={
          "content-type":"multipart/form-data"
        }

      }else{
        var headers=""
      }  

      // API Call for edit
      const response = await editUser(id,data,headers)
      console.log(response);

    }
  }

  

  return (
    <>

{ showspin?
        <LoadingSpinner/>:
        <div className='container mt-3'>

        <h1 className='text-center fw-bolder'>Update Employee Details !!</h1>

        <div className='mt-3 shadow border rounded p-2'>

          <div className='text-center'>
            <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview?preview:`${BASE_URL}/uploads/${existingImg}`} alt="No Img" />
          </div>

          <Form className='mt-3'>

            <Row>

              {/* First name */}

              <FloatingLabel controlId="floatingInputfname" label="fname" className='mb-3 col-lg-6'>
                <Form.Control type="text" placeholder="fname" name='fname' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.fname}/>
              </FloatingLabel>

              {/* Last name */}

              <FloatingLabel controlId="floatingInputlname" label="lname" className='mb-3 col-lg-6'>
                <Form.Control type="text" placeholder="lname" name='lname' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.lname}/>
              </FloatingLabel>

              {/* E-mail */}

              <FloatingLabel controlId="floatingInputemail" label="email" className='mb-3 col-lg-6'>
                <Form.Control type="email" placeholder="e-mail" name='email' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.email} />
              </FloatingLabel>

              {/* Mobile */}

              <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
                <Form.Control type="text" placeholder="mobile" name='mobile' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.mobile}/>
              </FloatingLabel>

              {/* Gender */}

              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Select Gender</Form.Label>

                {/* Male */}

                <Form.Check type="radio" name='gender' value={"Male"} label={'Male'} onChange={e=>getandsetNormalInputs(e)} checked={normalUserInput.gender==="Male"?true:false}/>

                {/* Female */}

                <Form.Check type="radio" name='gender' value={"Female"} label={'Female'} onChange={e=>getandsetNormalInputs(e)} checked={normalUserInput.gender==="Female"?true:false}/>

              </Form.Group>

              {/* Status */}
              {/* Select */}

              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Select Employee Status</Form.Label>

                <Select placeholder={status} onChange={e=>setStatus(e.value)} options={options}/>


              </Form.Group>

              {/* Upload File */}

              <Form.Group className='mb-3 col-lg-6'>

                <Form.Label>Choose a profile picture</Form.Label>
                <Form.Control type="file" name='profile' onChange={e=>handlefile(e)}/>

              </Form.Group>

              {/* Location */}

              <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-3'>
                <Form.Control type="text" placeholder="location" name='location'onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.location}/>
              </FloatingLabel>

              <Button onClick={e=>handleSubmit(e)} type='submit' variant='info'>Submit</Button>


            </Row>
          </Form>

        </div>

      </div>
      }

      

    </>
  )
}

export default Edit