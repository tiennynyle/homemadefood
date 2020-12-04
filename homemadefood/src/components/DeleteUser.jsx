import { useEffect , useState} from "react";
import {Post} from './Post'
import {useParams} from 'react-router-dom'
export function DeleteUser (data) {
    const [posts, setPosts]  = useState({ posts:[], success: false});
    let { username } = useParams();

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/users/delete/${username}/`;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setPosts({...posts, ...data})
                    })
                    .catch((err) => {
                        alert("User not found. Please try again!")
                    })
            
    },[])

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