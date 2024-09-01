import React, { useEffect, useState } from 'react'
// mui components
import Pagination from '@mui/material/Pagination';
import Restaurants from '../components/Restaurants';
import Dropdowns from '../components/Dropdowns';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Pagination from './components/Pagination';

function DashBoard() {

  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    cuisine: '',
    rating: '',
    location: ''
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate()

  const filterRestaurants = () => {
    const query = new URLSearchParams({ name: filter.search, cuisine: filter.cuisine, rating: filter.rating, location: filter.location, page: page.toString() });

    console.log(query.toString());

    fetch(`${import.meta.env.VITE_BACKEND_URL}/restaurants?${query.toString()}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPages(data.pages);
        setRestaurants(data.data);
      })
  }

  const handleChange = (e: any) => {
    if (e.target.name === 'search') {
      const debounceFilter = setTimeout(() => {
        setFilter({
          ...filter,
          [e.target.name]: e.target.value
        });
      }, 300);
      return () => clearTimeout(debounceFilter);
    } else {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value
      });
    }
  }

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const logout = () => {
    localStorage.removeItem('rest_token')
    toast.success('Logged out successfully')
    navigate('signin')
  }

  useEffect(() => {
    filterRestaurants();
  }, [filter, page]);

  return (
    <div className='max-w-6xl mx-5 md:mx-auto px-5'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <h1 className='text-3xl font-bold my-5'>Restaurants</h1>
        {/* search bar */}
        <div className='flex gap-2'>
          <input
            name='search'
            type="text"
            placeholder='Search for restaurants'
            className='border border-gray-300 p-2 w-full rounded-md'
            onChange={handleChange}
          />
          <button
            onClick={logout}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            LogOut
          </button>
        </div>
      </div>
      <Dropdowns handleChange={handleChange} />
      {!restaurants && <Loader />}
      {restaurants &&
        <Restaurants restaurants={restaurants} />}
      <div className=' flex justify-center my-10
      '>
        <Pagination
          count={pages}
          page={page}
          onChange={handlePage}
          siblingCount={5}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  )
}

export default DashBoard