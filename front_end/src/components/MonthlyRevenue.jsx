import { useEffect , useState} from "react";
import {Post} from './Post'
import {useParams} from 'react-router-dom'
export function MonthlyRevenue (data) {
    const [posts, setPosts]  = useState({ });
    let { username, month } = useParams();

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/users/${username}/${month}/monthlyrevenue`;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setPosts({...posts, ...data})
                    })
                    .catch((err) => {
                        alert("No posts are found. Please check back later")
                    })
            
    },[])
console.log(posts)
console.log("hihi")
    return (
        <div style={{
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
           Sellerusername: {posts.sellerUsername} <br></br>
           Month:  {posts.Month}<br></br>
           Monthly Revenue: {posts.monthlyRevenue}
           
        </div>
        )
    
}