import React from 'react'

export function CountReasults(props) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"15px"}}>
      <div style={{ display : "flex", justifyContent : "center", alignItems : "center" , height : "160px" , background : "#4fa2d9", borderRadius: '7px', fontSize:"30px", color:"#fff"}}>{props.count} Products</div>
      <div style={{ display : "flex", justifyContent : "center", alignItems : "center" , height : "160px" , background : "#48c282", borderRadius: '7px', fontSize:"30px", color:"#fff"}}></div>
      <div style={{ display : "flex", justifyContent : "center", alignItems : "center" , height : "160px" , background : "#fe9a7d", borderRadius: '7px', fontSize:"30px", color:"#fff"}}></div>
    </div>
  )
}
