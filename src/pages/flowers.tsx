// Flowers.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/scss/style.scss'
import SearchFlowers from '../components/Search/SearchFlowers';

const Flowers = () => {

    const [flowerList, setFlorwers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    

    const getFlowers = async () => {
        try {
             await axios.get('https://flowrspot-api.herokuapp.com/api/v1/flowers')
                .then(res => {
                    if(res.data){
                        console.log("data",res.data);
                        
                        setFlorwers(res.data.flowers)
                    }
                })
        } catch (error) {
            console.log("error",error);
            
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
        <SearchFlowers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {filteredFlowers.map((flower) => (
                <div key={flower.id} style={{ width: '280px', height: '350px', backgroundImage: `url(${flower.profile_picture})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <h3 className='flower-name'> {flower.name} </h3>
                    {/* <img src={flower.profile_picture} alt="flower" style={{width:'184px',height:"230px", backgroundColor: 'linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%)'}} /> */}
                </div>
            ))}
        </div>
    </div>;
}

export default Flowers;
