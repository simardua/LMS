import React from 'react'
import { FallingLines } from 'react-loader-spinner';
const Loader = () => {
  return (
      <>
      <div style={{
          position: "fixed",
          top: "0",
          left: '0',
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)"
      }}>
          <FallingLines
              color="#66317d"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
          />
      </div>
      </>
  )
}

export default Loader