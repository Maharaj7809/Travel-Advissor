import React from 'react'
import './List.scss'

const List = ({places,type,setType,rating,setRating}) => {
  return (
    <div className="Lista">
      <div> <h1>Food & Dining Around You</h1></div>
    <div  className='Listo'>  
      <div> <label id="type">Type</label>
         <select id="type" value={type} onChange={(e) => setType(e.target.value)} >
           
        <option value="restaurants">Restaurents</option>
        <option value="hotels">Hotels</option>
        <option value="attractions">Attractions</option>
            
            </select> </div>
       <div>
       <label id="rating">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} >
              <option value="">All</option>
              <option value="3">Above 3.0</option>
              <option value="4">Above 4.0</option>
              <option value="4.5">Above 4.5</option>
            </select>
       </div>
            
            </div>

   <div className="row"   >
          {places?.map((place ,index) => (
              <Card  key={index} place={place} img={place?.photo?.images?.medium?.url} />
          ))}
  </div>
       </div> 
  )
}

const Card=({place,img})=>{

  console.log(place);
  return(
  <div className='cardi'>  
  <img className="card" src={img} alt=''/>
<div style={ {display:'flex', justifyContent:"center"}}>
  <h4>  {place.name} </h4>
</div>
        <div style={ {display:'flex', justifyContent:"space-between"}} >
    
          <h5>{place.num_reviews} review{place.num_reviews > 1 && 's'}</h5>
          


        </div>

        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <div> <h5>phone</h5></div>
          <div><h5>{place.phone} </h5></div>
         
        </div>

        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <div> <h5>price</h5></div>
          <div><h5>{place.price_level} </h5></div>
         
        </div>



        <div style={ {display:'flex', justifyContent:"space-between"}}>
          <h5>Ranking</h5>
          <h5>
            {place.ranking}
          </h5>
        </div>
        {place?.awards?.map((award) => (
          <div style={ {display:'flex', justifyContent:"space-between",alignItems:"center"}}>
            <img src={award?.images?.small} />
            <h5>{award.display_name}</h5>
          </div>
        ))}
</div>

  )
}



export default List;