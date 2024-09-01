import React, { useEffect } from 'react'

function RestaurantItem({ restaurant }) {

  const [image, setImage] = React.useState('');
  const getImage = () => {
    fetch('https://foodish-api.com/api/')
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image);
      });

  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
      <img src={image} alt={restaurant.name} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="font-bold text-xl mt-2 mb-2">{restaurant.name}</div>
      <p className="text-gray-700 text-base">
        <strong>Location:</strong> {restaurant.location}
      </p>
      <p className="text-gray-700 text-base">
        <strong>Cuisine:</strong> {restaurant.cuisine}
      </p>
      <p className="text-gray-700 text-base">
        <strong>Rating:</strong> {restaurant.rating} / 5
      </p>
    </div>
  )
}

export default RestaurantItem