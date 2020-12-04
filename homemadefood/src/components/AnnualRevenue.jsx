import { useEffect , useState} from "react";
import {Post} from './Post'
import {useParams} from 'react-router-dom'
export function AnnualRevenue (data) {
    const [posts, setPosts]  = useState({ });
    let { username, year } = useParams();

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/users/${username}/${year}/annualrevenue`;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setPosts({...posts, ...data})
                    })
                    .catch((err) => {
                        alert("No posts are found. Please check back later")
                    })
            
    },[])

    return (
        <div style={{
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
           Sellerusername: {posts.sellerUsername} <br></br>
           Year:  {posts.Year}<br></br>
           Annual Revenue: {posts.annualRevenue}
           
        </div>
        )
    
}