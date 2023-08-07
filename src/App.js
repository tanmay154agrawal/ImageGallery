import React ,{useState,useEffect }from 'react';
import Imagescards from './components/Imagescards';
import ImageSearch from './components/ImageSearch';
function App() {
  const [images,setImages] = useState([])
  const [isloading,setIsloading] = useState(true)
  const [term,setTerms] = useState("")
  
  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>{
      setImages(data.hits)
      setIsloading(false)
    })
    .catch(err=>console.log(err))
  },[term])


  return (
   <div className="container mx-auto">
    <ImageSearch searchText={(text)=>setTerms(text)}/>
    {!isloading && images.length===0 && <h1 className="text-6xl text-center mx-auto mt-32"> No images found</h1> }
    {isloading ? <h1 className="text-6xl text-center mx-auto mt-32"> Page is Loading</h1> : <div className="grid grid-cols-3 gap-4">
      {images.map(image=>(
        <Imagescards key={image.id} image={image}/>
      ))}
    </div>}
   </div>
  );
}
export default App;
