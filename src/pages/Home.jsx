import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { allUsers, deleteUser } from '../services/AllApi'
import { registerContext } from './Contextshare'
import { Alert } from 'react-bootstrap'
import { useContext } from 'react'



function Home() {

  const{registerdata,setRegisterData} = useContext(registerContext)

  const [showspin, setshowSpin] = useState(true)

  const[allUserData,setallUserData] = useState([])

  const[search,setSearch] = useState("")

  const {id} = useParams()
  console.log(id);


  useEffect(() => {

    getAllEmployees()


    setTimeout(() => {

      setshowSpin(false)

    }, 2000);


  }, [search])


  // To get all data, call allUsers()

  const getAllEmployees = async() =>{
    const response = await allUsers(search)
    console.log(response);
    setallUserData(response.data)
  }

  console.log(allUserData);

  // To delete single data
  const removeUser = async(id)=>{
    const response = await deleteUser(id)

    if(response.status===200){
      getAllEmployees()
    }else{
      alert("Operation FAILED successfully !!! Please try after sometime")
    }
  }


  return (
    <>

    {
      registerdata&&
      <Alert variant='success' onClose={()=>setRegisterData("")} dismissible>
        {registerdata.fname.toUpperCase()} Registered Successfully
      </Alert>
    }

      {
        showspin ? <LoadingSpinner /> :

          <div className='container'>

            <div className='search-all d-flex align-items-center'>

              <div className='search d-flex align-items-center mt-5'>

                <span className='fw-bolder'> Search: </span>

                <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search by Employee Name' className='form-control ms-3' style={{ width: '400px' }} />

              </div>

              <Link to={'/add'} className='btn btn-warning ms-auto mt-5'> <i class="fa-solid fa-user-plus"></i> Add</Link>

            </div>

            <div className='table mt-5'>

              <h1 className='fw-bolder'>List of All Employees</h1>

              <Hometable displayData = {allUserData} removeuser={removeUser}/>

            </div>

          </div>
      }
    </>
  )
}

export default Home