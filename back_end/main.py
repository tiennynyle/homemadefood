from datetime import date
import sqlite3
from flask import Flask, request, jsonify, abort
import json
from flask_cors import CORS
import base64


app = Flask(__name__)
CORS(app)

"""
TODOS:
DONE - 1. Get Foodwith FoodId, in this query I need to retrieve a specific Post in relation to Photo Table because Foodcan have many Photos. 
In addition, Foodalso relates to the Comment table as Food can have many Comments. 
Finally, I also need to join the User Table to retrieve the information of the user who posted this post.
DONE - 2. Get All food from all users. In this query, I need to enable the infinite scrolling feature in the front-end. In other words, when fetching all posts, I need to limit fetching only 20 posts at the time and sort them based on the timestamp that it was created. Of course, in this case, we also need to join the Photo table to get all photos, comments table to get around 10 comments per fetching, join a User table to get User info.
DONE - 3. As admin users have the ability to remove a user, I need to support removing user transactions in the database. As message, post, and comment table depend on the user table, deleting a user from the user table must also remove all the records related to the deleted user. To solve this, I need to have the user foreign key as cascading on delete.
DONE- 4. The main feature in this app isto enable users to sign up for an account, therefore, saving user info is another transaction. I also need to save the user's password which can allow us to authenticate the user later if they need to sign in. Therefore, I need to hash the password before saving this string to the table.
DONE - 5. In the app, users can see all the posts that they posted. In this query, it is similar to query 1 and 2 as described above. We need to verify if user id exists on the user table, if it is, we can perform a select query to fetch 20 posts per query and perform infinite scrolling on the front-end to fetch more posts as requested.
DONE - 6. A selleruser can perform analytical queries to see the food that they have sold and the revenue in a period of one month/ 3 month/ 6 months/ a year.
DONE - 7. Any users can perform analytical queries to see the most ordered dish, mostordered cuisine in a period of one month/ 3months/ 6 months/ a year.
DONE- 8. An admin user can perform analytical queries to see the number of active users in a period of time.
"""


def query_db(query, args=(), one=False):
    conn = sqlite3.connect("homemade.db")
    cursor = conn.execute(query, args)
    rv = cursor.fetchall()
    cursor.close()
    return [(rv[0] if rv else None) if one else rv, [d[0] for d in cursor.description]]


def insert_db(query, args):
    conn = sqlite3.connect("homemade.db")
    cursor = conn.cursor()
    cursor.execute(query, args)
    conn.commit()
    cursor.close()


def delete_db(query, args):
    conn = sqlite3.connect("homemade.db")
    cursor = conn.cursor()
    cursor.execute(query, args)
    conn.commit()
    cursor.close()


MAX_NUMBER_POSTS = 2


@app.route('/posts', methods=['GET'])
def get_posts():
    skip = request.args.get('skip', default=0, type=int)
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID ORDER BY foodID LIMIT ? OFFSET ?", (MAX_NUMBER_POSTS, skip))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    if len(reformat_posts) == 0:
        abort(404)
    result = {
        'success': True,
        'posts': reformat_posts,
        'cursor': MAX_NUMBER_POSTS
    }
    return jsonify(result)


@app.route('/comments/<int:commentID>', methods=['GET'])
def get_comments_by_id(commentID):
    posts, names = query_db(
        "SELECT * FROM Comment WHERE commentID = ?", (commentID,))

    reformat_comment = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_comment.append(fields)
    if len(reformat_comment) == 0:
        abort(404)
    result = {
        'success': True,
        'comment': reformat_comment[0],
    }
    return jsonify(result)


@app.route('/postcomments', methods=['POST'])
def post_comments():
    body = request.get_json()
    content = body.get('content')
    username = body.get('username')
    foodID = body.get('foodID')
    if (username is None) or (content is None) or (foodID is None):
        abort(422)
    try:
        d1 = today.strftime("%Y-%m-%d")
        insert_db("INSERT INTO Comment(username, content, foodID, datePosted) VALUES(?,?,?,?)",
                  (username, content, foodID, d1))

        return jsonify({
            "success": True
        })
    except:
        print("hohoho")
        abort(422)


@app.route('/order', methods=['POST'])
def order_food():
    body = request.get_json()
    customerUsername = body.get('customerUsername')
    sellerUsername = body.get('sellerUsername')
    foodID = body.get('foodID')
    quantity = body.get('quantity')
    if (customerUsername is None) or (sellerUsername is None) or (foodID is None) or (quantity is None):
        abort(422)
    try:
        d1 = today.strftime("%Y-%m-%d")
        insert_db("INSERT INTO Orders(customerUsername, dateOrdered) VALUES(?,?)",
                  (customerUsername, d1))
        id_query, names = query_db(
            "SELECT orderID FROM Orders WHERE orderID = (SELECT MAX(orderID)  FROM Orders)")
        orderID = id_query[0][0]
        insert_db("INSERT INTO OrderDetail(orderID, sellerUsername, foodID, quantity) VALUES (?,?,?,?) ",
                  (orderID, sellerUsername, foodID, quantity))

        return jsonify({
            "success": True
        })
    except:
        abort(422)


@app.route('/<string:username>/orderhistory', methods=['GET'])
def get_orderhistory_by_username(username):
    users = query_db(
        "SELECT username FROM User WHERE username = ? ", (username,))
    if len(users[0]) == 0:
        abort(404)
    posts, names = query_db(
        "select * from OrderDetail JOIN Orders on OrderDetail.orderID = Orders.orderID where customerUsername = ?", (username,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


def encodingPassword(password):
    sample_string_bytes = password.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    base64_string = base64_bytes.decode("ascii")
    return base64_string


today = date.today()


@app.route('/signup', methods=['POST'])
def sign_up():
    body = request.get_json()
    username = body.get('username')
    firstName = body.get('firstName')
    lastName = body.get('lastName')
    email = body.get('email')
    password = body.get('password')

    if (username is None) or (firstName is None) or (
            lastName is None) or (
            email is None):
        abort(422)
    try:
        d1 = today.strftime("%Y-%m-%d")
        insert_db("INSERT INTO User(username, password, firstName, lastName, email, dateCreated) VALUES(?,?,?,?,?, ?)",
                  (username, encodingPassword(password), firstName, lastName, email, d1))

        return jsonify({
            "success": True
        })
    except:
        abort(422)


@app.route('/signin', methods=['POST'])
def sign_in():
    body = request.get_json()
    username = body.get('username')
    password = body.get('password')

    if (username is None) or (password is None):
        abort(422)

    result = query_db("SELECT * FROM User WHERE User.username = ? AND User.password = ?",
                      (username, encodingPassword(password)))
    print(result[0])
    if len(result[0]) == 0:
        abort(404)
    return jsonify({
        "success": True
    })


@app.route('/posts/<int:foodID>/', methods=['GET'])
def get_posts_by_foodID(foodID):
    food_IDs = query_db("SELECT foodID FROM Food WHERE foodID = ? ", (foodID,))
    if len(food_IDs) == 0:
        abort(404)
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID WHERE f.foodID = ?", (foodID,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


@app.route('/posts/mostpopular/<int:month>/2020/', methods=['GET'])
def get_most_purchased_food_posts_in_a_month(month):
    if month < 10:
        month = "0" + str(month)
    most_purchased_food, fields = query_db(
        "SELECT Food.*, t1.totalQuantity FROM (SELECT OrderDetail.foodID, sum(OrderDetail.quantity) as totalQuantity FROM OrderDetail LEFT JOIN Orders ON OrderDetail.orderID = Orders.orderID WHERE strftime('%m', Orders.dateOrdered) = ? GROUP BY foodID ORDER BY totalQuantity DESC ) as t1 LEFT JOIN Food ON t1.foodID = Food.foodID LIMIT 1;", (str(month),))
    if len(most_purchased_food) == 0:
        abort(404)
    for food in most_purchased_food:
        food_id = food[0]
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID WHERE f.foodID = ?", (food_id,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


@app.route('/posts/mostpopular/last3months/', methods=['GET'])
def get_most_purchased_food_posts_last_three_months():
    most_purchased_food, fields = query_db(
        "SELECT Food.*, t1.totalQuantity FROM (SELECT OrderDetail.foodID, sum(OrderDetail.quantity) as totalQuantity FROM OrderDetail LEFT JOIN Orders ON OrderDetail.orderID = Orders.orderID WHERE dateOrdered >= date('now','-3 months') GROUP BY foodID ORDER BY totalQuantity DESC ) as t1 LEFT JOIN Food ON t1.foodID = Food.foodID LIMIT 1;")
    if len(most_purchased_food) == 0:
        abort(404)
    for food in most_purchased_food:
        food_id = food[0]
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID WHERE f.foodID = ?", (food_id,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


@app.route('/posts/mostpopular/<int:year>/', methods=['GET'])
def get_most_purchased_food_posts_in_year(year):
    year = str(year)
    most_purchased_food, fields = query_db(
        "SELECT Food.*, t1.totalQuantity FROM (SELECT OrderDetail.foodID, sum(OrderDetail.quantity) as totalQuantity FROM OrderDetail LEFT JOIN Orders ON OrderDetail.orderID = Orders.orderID WHERE strftime('%Y', Orders.dateOrdered) = ? GROUP BY foodID ORDER BY totalQuantity DESC ) as t1 LEFT JOIN Food ON t1.foodID = Food.foodID LIMIT 1;", (str(year),))
    if len(most_purchased_food) == 0:
        abort(404)
    for food in most_purchased_food:
        food_id = food[0]
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID WHERE f.foodID = ?", (food_id,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


@app.route('/users/<string:username>/posts', methods=['GET'])
def get_posts_by_username(username):
    users = query_db(
        "SELECT username FROM User WHERE username = ? ", (username,))
    if len(users[0]) == 0:
        abort(404)
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID WHERE f.sellerUsername = ?", (username,))
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })


@app.route('/users/', methods=['GET'])
def get_all_users():
    users, names = query_db(
        "SELECT User.username, User.email, User.firstName, User.lastName from User")
    print(users, names)
    if len(users[0]) == 0:
        abort(404)
    reformat_users = []
    for user in users:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = user[i]
        reformat_users.append(fields)

    return jsonify({
        "success": True,
        "posts": reformat_users
    })


@app.route('/users/delete/<string:username>/', methods=['DELETE'])
def delete_users_by_username(username):
    check_user = query_db(
        "SELECT username FROM User WHERE username = ?", (username,))
    print(check_user)
    if len(check_user[0]) == 0:
        abort(404)
    delete_user = delete_db("DELETE FROM User WHERE username = ?", (username,))
    return jsonify({
        "success": True,
        "deleted": username
    })


@app.route('/users/<string:username>/<int:month>/monthlyrevenue', methods=['GET'])
def get_monthly_revenue(username, month):
    if month < 10:
        month = "0" + str(month)

    users = query_db(
        "SELECT username FROM User WHERE username = ? ", (username,))
    if len(users[0]) == 0:
        abort(404)
    posts, names = query_db("SELECT sellerUsername, strftime('%m', t2.dateOrdered) as `Month`, sum(totalPrice) as `monthlyRevenue` FROM (SELECT OrderDetail.*, (Food.price * OrderDetail.quantity) AS TotalPrice FROM OrderDetail LEFT JOIN Food ON Food.sellerUsername = OrderDetail.sellerUsername AND Food.foodID = OrderDetail.foodID) AS t1  JOIN (SELECT * FROM Orders WHERE strftime('%m', Orders.dateOrdered) == ?) as t2 ON t1.orderID = t2.orderID AND sellerUsername = ? GROUP BY sellerUsername", (str(month), username))

    if len(posts) == 0:
        return jsonify({
            "Month": str(month),
            "monthlyRevenue": 0,
            "sellerUsername": username,
            "success": True,
        })

    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    fields["success"] = True
    return jsonify(fields)


@app.route('/users/<string:username>/<int:year>/annualrevenue', methods=['GET'])
def get_annual_revenue(username, year):
    year = str(year)
    users = query_db(
        "SELECT username FROM User WHERE username = ? ", (username,))
    if len(users[0]) == 0:
        abort(404)
    posts, names = query_db("SELECT sellerUsername, strftime('%Y', t2.dateOrdered) as `Year`, sum(totalPrice) as `annualRevenue` FROM (SELECT OrderDetail.*, (Food.price * OrderDetail.quantity) AS TotalPrice FROM OrderDetail LEFT JOIN Food ON Food.sellerUsername = OrderDetail.sellerUsername AND Food.foodID = OrderDetail.foodID) AS t1  JOIN (SELECT * FROM Orders WHERE strftime('%Y', Orders.dateOrdered) == ?) as t2 ON t1.orderID = t2.orderID AND sellerUsername = ? GROUP BY sellerUsername", (year, username))
    print(posts)
    print(names)
    if len(posts) == 0:
        return jsonify({
            "annualRevenue": 0,
            "Year": year,
            "sellerUsername": username,
            "success": True,
        })

    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    fields["success"] = True
    print(reformat_posts)
    return jsonify(fields)


@app.route('/userssince/<int:year>', methods=['GET'])
def get_users_active_since(year):
    year = str(year)
    posts, names = query_db(
        "SELECT * FROM User WHERE strftime('%Y', User.dateCreated) == ?", (year,))
    if len(posts[0]) == 0:
        abort(404)
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    print(reformat_posts)
    return jsonify({
        "Success": True,
        "listOfUsers": reformat_posts,
        "NumUsersCreatedThisYear": len(reformat_posts),
        "Year": str(year)
    })


@app.route('/highlyratedfood', methods=['GET'])
def get_highly_rated_food():
    posts, names = query_db("SELECT f.*, t2.photoURL, t1.commentID FROM Food f LEFT JOIN (SELECT foodID, GROUP_CONCAT(commentID) AS commentID FROM Comment GROUP BY foodID) t1 ON f.foodID = t1.foodID LEFT JOIN (SELECT foodID, GROUP_CONCAT(photoURL) AS photoURL FROM Photo GROUP BY foodID) t2 ON f.foodID = t2.foodID ORDER BY rating DESC LIMIT 5")
    if len(posts[0]) == 0:
        abort(404)
    reformat_posts = []
    for post in posts:
        fields = {}
        for i in range(len(names)):
            fields[names[i]] = post[i]
        reformat_posts.append(fields)
    return jsonify({
        "success": True,
        "posts": reformat_posts
    })
