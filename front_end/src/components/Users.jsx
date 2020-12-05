import { useEffect , useState} from "react";
import{BasicTable} from './Usertable'
export function Users (data) {
    const [posts, setPosts]  = useState({posts:[], success: false});

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/users/`;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setPosts({...posts, ...data})
                    })
                    .catch((err) => {
                        alert("No users are found. Please check back later")
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