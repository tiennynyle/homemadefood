import React, {useEffect, useState} from 'react';
import {Post} from './Post'

export function Posts () {

    
    const [posts, setPosts]  = useState({cursor: 0, posts:[], success: false});

    useEffect(()=> {
        const url = "http://127.0.0.1:5000/posts"
        fetch(url).then((res) => res.json())
          .then((data) => {

            setPosts({...posts, ...data})
            
          })
          .catch((err) => {
              alert("Something is wrong please try again" + err)
          })
    }, [])

    return (
        <>
 
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
    </>
    )
}