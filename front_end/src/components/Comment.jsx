import { useEffect , useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export function Comment (data) {
    let commentIds = data.comments; 
    const foodID = data.foodID;

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(()=> {
        if (commentIds){
            commentIds = commentIds.split(',');
            
            for (let id of commentIds) {
                const url = "http://127.0.0.1:5000/comments/" + id;
                    fetch(url).then((res) => res.json())
                    .then((data) => {
                        setComments(oldArray => [...oldArray, data]);
                    })
                    .catch((err) => {
                        alert("Something is wrong please try again" + err)
                    })
            }

  
        }
    },[])
    const onSubmitComment = () => {
        if (comment === '') {
            return
        }
        const username = localStorage.getItem("USERNAME")
      
        const url = "http://127.0.0.1:5000/postcomments";
        const data = {
            content : comment,
            username : username,
            foodID : foodID
        }

        fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        }).then((res) => res.json())
        .catch((err) => {
            alert("Something is wrong please try again" + err)
        })
    }
 
    return (
        <div>
            {
                comments.length === 0 ? (
                    <div>No comments yet</div>
                ): (
                    comments.map((comment, index) => {
                        return <div key={index}>
                                From {comment.comment.username} : {comment.comment.content}
                            </div>
                    })
                )
            }
          
            <div style={{display:'flex', flexDirection:'row'}}>
            <TextField id="standard-basic" label="Write Comment..." fullWidth value={comment} onChange={(e) => setComment(e.target.value)}/>
                <Button style={{background:'pink', color:'black'}} onClick={onSubmitComment}>
                    Send
                </Button>
            </div>

        </div>
    )
}