// Flowers.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/scss/style.scss'
import SearchFlowers from '../components/Search/SearchFlowers';
import Loader from '../components/Loader/Loading';
import favorite from '../assets/icons/favorite.svg'
import nonFavorite from '../assets/icons/nonFavorite.svg'
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Flowers = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [flowerList, setFlorwers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');
    const [favoriteFlowers, setFavoriteFlowers] = useState<{ [key: string]: boolean }>({});
    

    useEffect(() => {
        if(auth.isLogin){
            setIsAuthenticated(auth.isLogin)
        }
    },[auth.isLogin])
    
    const toggleFavoriteFlower = (flowerId: string) => {
        setFavoriteFlowers((prevFavoriteFlowers) => ({
            ...prevFavoriteFlowers,
            [flowerId]: !prevFavoriteFlowers[flowerId], // Toggle favorite status for flowerId
        }));
    };


    const getFlowers = async () => {
        setIsLoading(true)
        try {
             await axios.get('https://flowrspot-api.herokuapp.com/api/v1/flowers')
                .then(res => {
                    if(res.data){                        
                        setFlorwers(res.data.flowers)
                        setIsLoading(false)
                    }
                }).catch(error => {
                    console.error('Login failed:', error);
                    setErrorMessage(error.response.data.message || 'An error occurred');
                    setIsLoading(false); // Request completed with an error
                    setIsError(true); // Error occurred
                  });
                } catch (error) {
                  console.error('Login failed:', error);
                  setErrorMessage(errorMessage || 'An error occurred');
                  setIsLoading(false); // Request completed with an error
                  setIsError(true); // Error occurred
                } finally {
                  setIsLoading(false);
                }
    }

    useEffect(() => {
        getFlowers();
    },[])

    // Filter the flower list based on the search term
  const filteredFlowers = flowerList.filter((flower) =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return <div className='flower-list-wrapper'>
        { isLoading ? <Loader/> : <> <SearchFlowers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       { isError ? <div className='error-message'> {errorMessage} </div> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {filteredFlowers.map((flower) => (
                <div className='flower-holder' key={flower.id} style={{ backgroundImage: `url(${flower.profile_picture})`}}>
                    {isAuthenticated ? <img className='favorite-img' width={70} height={70} src={favoriteFlowers[flower.id] ? favorite : nonFavorite} alt="favorite-flower" onClick={() => toggleFavoriteFlower(flower.id)}/> : null}
                    <div className="item-footer">
                        <div className="flower-info">
                        <h3 className='flower-name'> {flower.name}  </h3>
                        <p className='flower-desc'> {flower.latin_name} </p>
                        </div>
                        <div className='flower-sighting' style={favoriteFlowers[flower.id] ? { background: 'linear-gradient(270deg, #ECBCB3, #EAA79E)' } : { backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        {flower.sightings}
                        </div>
                    </div>
                    {/* <img src={flower.profile_picture} alt="flower" style={{width:'184px',height:"230px", backgroundColor: 'linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%)'}} /> */}
                </div>
            ))}
        </div>} </> }
    </div>;
}

export default Flowers;
