
import React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #edeef0;
`

const MainWrapper = ({children}) => {
  return (
    <Wrapper>
        {children}
    </Wrapper>
  )
}

export default MainWrapper
