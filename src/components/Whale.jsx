import React from 'react';
import { useLocation } from 'react-router-dom';

// Component for Router Test
function Whale(props) {
   const { search } = useLocation();
   console.log(search)
   const match = search.match(/type=(.*)/);
   const type = match?.[1];
   console.log(type)
   console.log("LOCATION:", props.location);
   console.log("MATCH:", props.match);
   console.log("HISTORY:", props.history);
   return (
      <div>Router Test</div>
   )
}


Whale.propTypes = {}

export default Whale
