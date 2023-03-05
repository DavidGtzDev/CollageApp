import React, {useEffect} from 'react';


const App = () => {
  //Redirect to collage page
  useEffect(() => {
    window.location.href = '/collage';
  }, [])

  return (
    <div>

    </div>
  );
};

export default App;