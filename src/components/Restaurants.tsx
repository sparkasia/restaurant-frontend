import React, { FC } from 'react'
import { RestaurantType } from '../types'
import RestaurantItem from './RestaurantItem'
// props
type RestaurantsProps = {
  restaurants: RestaurantType[]
}

const Restaurants: FC<RestaurantsProps> = ({ restaurants }) => {

  const bold = (item: string) => <span className='font-bold'>{item}</span>

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {
        restaurants?.map((restaurant: any) => (
          <RestaurantItem key={restaurant._id} restaurant={restaurant} />
        ))
      }
    </div>
  )
}

export default Restaurants