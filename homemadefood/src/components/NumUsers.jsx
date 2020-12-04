import { useEffect , useState} from "react";
import {Post} from './Post'
import {useParams} from 'react-router-dom'
export function NumUsers (data) {
    const [posts, setPosts]  = useState({ NumUsersCreatedThisYear:-6,Success:false,Year:0,listOfUsers:[]});
    let { year } = useParams();

    useEffect(()=> {
        
                const url = `http://127.0.0.1:5000/userssince/${year}`;
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
           <b>List of Users:</b>
           {
            posts.listOfUsers.map((post, index) => {
                return <div key={index}>
                        LastName: {post.lastName}
                        <br/>
                        First Name: {post.firstName}
                        <br/>
                        Username: {post.username}
                        <br/>
                        Email: {post.email}
                        <br/>
                        Password: {post.password}

                </div>
            })
        }
        <br/>
           <b>Number of Users Created This Year:</b>  {posts.NumUsersCreatedThisYear}<br></br>
           <b>Year:</b> {posts.Year}
           
        </div>
        )
    
}