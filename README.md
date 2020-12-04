# homemadefood
This project is an individual project for my database class. The goal of this project is to show my understanding of EER model and relational schema.
I decided to buil a full stack applcation that enables users to browse, comment, and order home-made food. 
This project is coded in Python3.
## Getting Started
### Pre-requisites and Local Development
You should already have Python3, pip, node, sqlite3 installed on your local machines
To create a virtual environment on MacOS, run:
```python3 -m venv env```
To activate the virtual environment, run:
```source env/bin/activate```
## About the Stack
### Backend
On MacOS, to set up all the dependencies, run:
```pip install requirements.txt```
To run the application on your local machine, run:
```export FLASK_APP=main.py ```
### Frontend
Installing dependencies, run:
```npm install```
To run the front-end, run:
```npm start ```
## Files that are written by me:
- data.sql

- main.py
- All files in homemadefood > src > components
- App.js
- Credit: I used some templates from material-ui to display tables, menu bar, buttons, etc. in my front end (Link: https://material-ui.com/). I modified the template to work with my data returned by my back-end, and also modified it according to my design purposes.
## GUI References

## API References
The API will return these error types when requests fail:
- 404: Not Found
- 422: Unprocessable
### Endpoints
#### GET /posts
- General: Returns a list of all food posts, cursor (number of posts per page), and success value
- Sample: 
```{
cursor: 2,
posts: [
{
availability: "Y",
category: "Meat",
commentID: "1,2,5,6",
cuisine: "Vietnamese",
foodID: 1,
foodName: "Pho Ga",
photoURL: "https://static.onecms.io/wp-content/uploads/sites/19/2016/01/08/quick-chicken-pho-su.jpg,https://grubarazzi.com/wp-content/uploads/2020/01/Homemade-Chicken-Pho.jpg",
price: 10.5,
rating: 5,
sellerUsername: "taile0304"
},
{
availability: "Y",
category: "Meat",
commentID: null,
cuisine: "Thai",
foodID: 2,
foodName: "Pad Thai",
photoURL: "https://www.recipetineats.com/wp-content/uploads/2020/01/Chicken-Pad-Thai_9-SQ.jpg,https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
price: 11.5,
rating: 3,
sellerUsername: "hadang72"
}
],
success: true}``` 

#### GET /comments/<int:commentID>

