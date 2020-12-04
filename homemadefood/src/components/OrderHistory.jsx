import { useEffect , useState} from "react";
import{BasicTable} from './OrderTable'
import {useParams} from 'react-router-dom'
export function OrderHistory (data) {
    const [posts, setPosts]  = useState({posts:[], success: false});
    let { username } = useParams();

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/${username}/orderhistory`;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setPosts({...posts, ...data})
                    })
                    .catch((err) => {
                        alert("No users are found. Please check back later")
                    })
            
    },[])
console.log(posts)
    return (
        <>
 
        <div style={{
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
          <BasicTable rows={posts.posts}/>
        </div>
        </>
        )
    
}