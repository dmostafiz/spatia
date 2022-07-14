import React, { useState } from 'react'
import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';

const CategoryRightSidebar = () => {
  const [sliderValue, setSliderValue] = useState(50)

  const labelStyles = {
    ml: '-3',
    fontSize: 'sm',
    width: '150px',
    bg: 'transparent'
  }

  return (
    <Box height='calc(100vh - 400px)'>

      <Slider
        onChange={(val) => setSliderValue(val)}
        orientation='vertical'
      >

        <SliderMark value={100} {...labelStyles} mb={2}>
          Latest Posts

        </SliderMark>

        <SliderMark value={0} {...labelStyles} mb={-8}>
          Old Posts
        </SliderMark>


        {(sliderValue > 5 && sliderValue < 95) && <SliderMark
          value={sliderValue}
          textAlign='left'
          bg='transparent'
          color='black.800'
          mb={-3}
          ml='3'
          w='150px'
        >
          {sliderValue}% of 100%
        </SliderMark>}


        <SliderTrack bg='#ede7e0'>
          <SliderFilledTrack bg='#ede7e0' />
        </SliderTrack>

        <SliderThumb bg='#e6caaf' _focus={{ ring: 'none' }}>

        </SliderThumb>
          
      </Slider>

    </Box>
  )
}

export default CategoryRightSidebar
