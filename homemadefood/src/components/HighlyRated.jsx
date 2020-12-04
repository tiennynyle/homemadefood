import { useEffect , useState} from "react";
import {Post} from './Post'
export function HighlyRated (data) {
    const [posts, setPosts]  = useState({ posts:[], success: false});

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/highlyratedfood`;
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
            {
                posts.posts.map((post, index) => {
                    return <div key={index}>
                        <Post data={post}/>
                    </div>
                })
            }
        </div>
        )
    
}