import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Data from './Data';

const Create = () => {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const [department, setDepartment] = useState('');
  const [departmentError, setDepartmentError] = useState(null);

  const [position, setPosition] = useState('');
  const [positionError, setPositionError] = useState(null);
  const loggedValue = sessionStorage.getItem('LoggedInUser');
  const history = useNavigate();
  useEffect(() => {

    if (loggedValue === "" || loggedValue === null) {
      history('/login');
    }
  });

  // setName

  const handleChangeName = event => {
    if (!(event.target.value)) {
      setNameError('Name is invalid');
    } else {
      setNameError(null);
    }
    setName(event.target.value);
  };

  // setEmail
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = event => {
    if (!isValidEmail(event.target.value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError(null);
    }
    setEmail(event.target.value);
  };

  // setDeparment


  const handleChangedepartment = event => {
    if (!(event.target.value)) {
      setDepartmentError('Deparment is invalid');
    } else {
      setDepartmentError(null);
    }
    setDepartment(event.target.value);
  };

  //   setPositon
  const handleChangePosition = event => {
    if (!(event.target.value)) {
      setPositionError('Position is invalid');
    } else {
      setPositionError(null);
    }
    setPosition(event.target.value);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = (Math.random() * 9999).toFixed();

    let NUname = name,
      NUemail = email,
      NUdepartment = department,
      NUposition = position;

    Data.push({
      id: uniqueId,
      name: NUname,
      email: NUemail,
      department: NUdepartment,
      position: NUposition
    })

    history('/')
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto  w-full p-8  bg-white rounded-lg shadow-lg">
        <div className='flex justify-between items-center'>
          <h1 className='text-[30px] mb-6'>Create Record</h1>
          <Link to="/" className="text-lg inline-flex text-indigo-50 whitespace-nowrap transition duration-150 hover:bg-indigo-500 bg-indigo-600 px-4 py-2 rounded font-[600] focus:ring-indigo-300">View Record</Link>
        </div>

        <form>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-900 block mb-2">Full Name</label>
            <input type="text" id="fName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""
              onChange={handleChangeName} />

            {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-900 block mb-2">Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""
              onChange={handleChangeEmail} />

            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-900 block mb-2">Department</label>
            <input type="text" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""
              onChange={handleChangedepartment}
            />
            {departmentError && <span style={{ color: 'red' }}>{departmentError}</span>}
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-900 block mb-2">Position</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChangePosition}>
              <option ></option>
              <option>Team Lead</option>
              <option>Module Lead</option>
              <option>Senior</option>
            </select>
            {positionError && <span style={{ color: 'red' }}>{positionError}</span>}
          </div>

          <div className='flex justify-between'>
            <button onClick={(e) => handleSubmit(e)} disabled={!name || !isValidEmail(email) || !department || !position} className="text-white bg-blue-600  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center">Submit</button>
          </div>
        </form>
      </div>
      </section>

    </>
  )
}

export default Create
