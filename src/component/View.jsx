
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Data from './Data'


const View = () => {

    useEffect(() => {
        if (loggedValue === "" || loggedValue === null) {
            history('/login');  
        }
    });

    const [filteredList, setFilteredList] = new useState(Data);
    const history = useNavigate()
    const loggedValue = sessionStorage.getItem('LoggedInUser');

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    
    const records = filteredList.slice(firstIndex, lastIndex);

    const npage = Math.ceil(filteredList.length / recordsPerPage)
 
    const number = [...Array(npage + 1).keys()].slice(1)


    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changePage(id){
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }



    const handalEdit = (id, name, email, department, position) => {
        Swal.fire({
            title: '<p>Do you want to edit this record?</p>',
            html: `<div className="bg-white swal-show-data shadow-md rounded overflow-x-auto">
            <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">#</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Department</th>
                    <th className="py-3 px-6 text-left">Position</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center"><span className="font-medium">${id}</span></div>
                </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center"><span className="font-medium">${name}</span></div>
                    </td>

                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center"><span className="font-medium">${email}</span></div>
                    </td>

                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center"><span className="font-medium">${department}</span></div>
                    </td>

                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center"><span className="font-medium">${position}</span></div>
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
            `,
            width: 700,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, Edit it!',
            confirmButtonColor: '#4f46e5',
            // denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-2',
                confirmButton: 'order-1',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {

                localStorage.setItem('id', id);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                localStorage.setItem('department', department);
                localStorage.setItem('position', position);
                history('/update')

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    iconColor: 'white',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })
                Toast.fire('You Can Edit Record', '', 'success')
            }
        })
    }

    const filterBySearch = (event) => {
        // Access input value
        const keyword = event.target.value.toLowerCase();
        // Create copy of item list
        var updatedList = [...Data];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((key) => {
            return key.name.toLowerCase().includes(keyword) || key.department.toLowerCase().includes(keyword) || key.email.toLowerCase().includes(keyword) || key.position.toLowerCase().includes(keyword);
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };

    const handalDelete = (id) => {
        Swal.fire({
            title: 'Are you sure? you want to delete this record.',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#ef4444',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-2',
                confirmButton: 'order-1 delete',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Record Deleted Successfully', '', 'success')

                let index = filteredList.map((e) => {
                    return e.id
                }).indexOf(id);

                filteredList.splice(index, 1);
                history('/')

            }
            // else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            // }
        })

    }

    return (
        <>


            <div className="w-full lg:w-5/6   mt-5 body-font rounded  m-auto flex flex-col text-gray-700 bg-white border-t border-gray-100 shadow-sm mb-5 items-center justify-between p-6 mx-auto md:flex-row">
                <Link className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                <svg width="50" height="50" viewBox="-102.4 -102.4 1228.8 1228.8" className="prefix__icon" xmlns="http://www.w3.org/2000/svg" fill="#4f46e5"><path d="M512 661.3c-117.6 0-213.3-95.7-213.3-213.3S394.4 234.7 512 234.7 725.3 330.4 725.3 448 629.6 661.3 512 661.3zm0-341.3c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z" fill="#14b8a6"/><path d="M837 862.9c-15.7 0-30.8-8.7-38.2-23.7C744.3 729.5 634.4 661.3 512 661.3s-232.3 68.1-286.8 177.9c-10.5 21.1-36.1 29.7-57.2 19.2s-29.7-36.1-19.2-57.2C217.8 662.3 357 576 512 576s294.2 86.3 363.2 225.2c10.5 21.1 1.9 46.7-19.2 57.2-6.1 3-12.6 4.5-19 4.5z" fill="#14b8a6"/><path d="M512 1002.7c-270.6 0-490.7-220.1-490.7-490.7S241.4 21.3 512 21.3s490.7 220.1 490.7 490.7-220.1 490.7-490.7 490.7zm0-896c-223.5 0-405.3 181.8-405.3 405.3S288.5 917.3 512 917.3 917.3 735.5 917.3 512 735.5 106.7 512 106.7z"/><path d="M512 661.3c-117.6 0-213.3-95.7-213.3-213.3S394.4 234.7 512 234.7 725.3 330.4 725.3 448 629.6 661.3 512 661.3zm0-341.3c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z" fill="#14b8a6"/><path d="M837 862.9c-15.7 0-30.8-8.7-38.2-23.7C744.3 729.5 634.4 661.3 512 661.3s-232.3 68.1-286.8 177.9c-10.5 21.1-36.1 29.7-57.2 19.2s-29.7-36.1-19.2-57.2C217.8 662.3 357 576 512 576s294.2 86.3 363.2 225.2c10.5 21.1 1.9 46.7-19.2 57.2-6.1 3-12.6 4.5-19 4.5z" fill="#14b8a6"/><path d="M512 1002.7c-270.6 0-490.7-220.1-490.7-490.7S241.4 21.3 512 21.3s490.7 220.1 490.7 490.7-220.1 490.7-490.7 490.7zm0-896c-223.5 0-405.3 181.8-405.3 405.3S288.5 917.3 512 917.3 917.3 735.5 917.3 512 735.5 106.7 512 106.7z"/></svg> Welcome! {loggedValue}
                </Link>

                <div className="items-center h-full">
                    <Link to={'/login'} className="px-4 py-1 inline-flex text-md font-normal text-white transition-all duration-150 bg-teal-500 items-center rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">Log out <span className='text-lg'>→</span></Link>
                </div>
            </div>


            <div className="px-3   bg-gray-100 font-sans">
                <div className='w-full lg:w-5/6 m-auto justify-between pt-5 flex  overflow-hidden' >
                    <div className='col'>
                        <Link to="/create" className='text-md mr-2 whitespace-nowrap shadow-lg inline-flex text-indigo-50 transition duration-150 hover:bg-indigo-500 hover:shadow-lg bg-indigo-600 px-4 py-2 rounded font-[600]'>Create Record</Link>
                    </div>
                    <div className='col'>
                        <div className="flex items-center max-w-md sm:max-w-sm mx-auto bg-white rounded-lg ">
                            <div className="w-full relative">
                                <input type="text" onChange={filterBySearch} className="w-full shadow-sm px-4 py-2 h-[44] text-gray-800 rounded-full focus:outline-none" placeholder="Search" />
                                <div className='absolute right-[15px] top-[10px]'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="min-w-screen  min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full lg:w-5/6 ">
                        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">#</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Email</th>
                                        <th className="py-3 px-6 text-left">Department</th>
                                        <th className="py-3 px-6 text-left">Position</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    <tr></tr>
                                    {
                                        records && records.length > 0 ?

                                            records.map((e, i) => {
                                                return (

                                                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="font-medium">{e.id}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="font-medium">{e.name}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="font-medium">{e.email}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="font-medium">{e.department}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="font-medium">{e.position}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex item-center justify-center">

                                                                <div className=" mr-2 transform hover:scale-110">

                                                                    <button type='button' onClick={() => handalEdit(e.id, e.name, e.email, e.department, e.position)} className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-600 bg-indigo-500 p-1 rounded'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width='20px' height='20px'>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </button>


                                                                </div>
                                                                <div className="mr-2 transfor hover:scale-110">
                                                                    <button type='button' onClick={() => handalDelete(e.id)} className='text-sm text-indigo-50 transition duration-150 hover:bg-red-600 bg-red-500 font-semibold p-1 rounded'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width='20px' height='20px'>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                )
                                            })
                                            : <tr>
                                                <td colSpan={6}> <p className='text-center text-gray-500 font-bold text-2xl py-4'>No Data Available</p></td>
                                            </tr>
                                    }

                                </tbody>

                            </table>

                            
                        </div>

                        <nav className='flex justify-center'>
                            <ul className="inline-flex -space-x-px ">
                                <li>
                                    <Link disabled={currentPage === 1? 'disabled': '' }  onClick={prevPage}
                                        className="bg-white border rounded-l-md border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-block " >Previous</Link>
                                </li>

                                {
                                    number.map((n, i) => {
                                        return (
                                            <li key={i} className={`${currentPage === n ? 'active' : ''}`}>
                                                <Link  onClick={()=> changePage(n)}
                                                    className="bg-white border border-gray-300 text-gray-500 inline-block hover:bg-gray-100 hover:text-gray-700 ml-0 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</Link>
                                            </li>
                                        )
                                    })
                                }

                                <li>
                                    <Link disabled={currentPage === npage? 'disabled': '' } onClick={nextPage} 
                                        className="bg-white border rounded-r-md border-gray-300 text-gray-500 hover:bg-gray-100 inline-block hover:text-gray-700  leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50">Next</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </>
    )

    

}

export default View
