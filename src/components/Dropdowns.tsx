import React, { useEffect } from 'react'

function Dropdowns({ handleChange }) {
  const [cuisine, setCuisine] = React.useState([])
  const [rating, setRating] = React.useState([])
  const [location, setLocation] = React.useState([])

  const getDropDownValues = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/filters`)
      const data = await response.json()
      console.log(data.cuisine);
      setCuisine(data.cuisine)
      setRating(data.rating)
      setLocation(data.location)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDropDownValues()
  }, [])

  return (
    <div className='flex flex-col md:flex-row justify-center gap-3 my-4'>
      <select
        name='cuisine'
        className='border border-gray-300 p-2 rounded-md'
        onChange={handleChange}
      >
        <option value=''>Select Cuisine</option>
        {
          ['American', 'Chinese', 'Indian', 'Italian', 'Mexican'].map((item: string) => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
      <select
        name='rating'
        className='border border-gray-300 p-2 rounded-md'
        onChange={handleChange}
      >
        <option value=''>Select Rating</option>
        {
          rating.map((item: string) => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
      {/* dropdown for location */}
      <select
        name='location'
        className='border border-gray-300 p-2 rounded-md'
        onChange={handleChange}
      >
        <option value=''>Select Location</option>
        {
          ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'].map((item: string) => (
            <option key={item} value={item}>{item}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Dropdowns