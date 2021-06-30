import React from 'react'
import Item from './Item'
import Carousel from 'react-multi-carousel'
import data from '../data/resources.dummy.json'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1301 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1300, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 899, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 499, min: 0 },
    items: 1,
  },
}

const CardCarousel = (props): JSX.Element => {
  const { title } = props
  return (
    <div className="mt-10">
      <h3 className="w-full text-3xl md:text-5xl text-center md:text-left font-black text-green-700 mb-4 md:ml-3 antialiased sm:subpixel-antialiased md:antialiased">
        {title}
      </h3>
      <Carousel responsive={responsive}>
        {data.map((d, index) => (
          <Item
            key={index}
            name={d.name}
            price="$200.00"
            rating={d.rating}
            rating_style={d.rt_color}
            location="Panama City, Panama"
            image={d.img}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CardCarousel
