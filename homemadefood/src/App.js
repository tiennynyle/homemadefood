
import './App.css';
import {SignIn, SignUp, Posts, FavoriteFoodOfTheMonth, FavoriteFoodOfTheYear, PostbyUsername, MonthlyRevenue, AnnualRevenue, NumUsers, HighlyRated, FavoriteThreeMonths, Users, DeleteUser, OrderHistory, FoodById} from './components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {MenuAppBar} from './components/AppBar'

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>  
          <>
          <MenuAppBar/>
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <Route path="/posts/mostpopular/:month/2020/" exact children={<FavoriteFoodOfTheMonth />} />
          <Route path="/posts/mostpopular/2020/" exact children={<FavoriteFoodOfTheYear />} />
          <Route path="/users/:username/posts" exact children={<PostbyUsername />} />
          <Route path="/users/:username/:month/monthlyrevenue" exact children={<MonthlyRevenue />} />
          <Route path="/users/:username/:year/annualrevenue" exact children={<AnnualRevenue />} />
          <Route path="/userssince/:year" exact children={<NumUsers />} />
          <Route path="/users/" exact children={<Users />} />
          <Route path="/users/delete/:username" exact children={<DeleteUser />} />
          <Route path="/highlyratedfood" exact children={<HighlyRated />} />
          <Route path="/posts/mostpopular/last3months/" exact children={<FavoriteThreeMonths />} />
          <Route path="/:username/orderhistory" exact children={<OrderHistory />} />
          <Route path="/posts/:foodID/" exact children={<FoodById />} />

          </>
          
        </Switch>
    </div>
    </Router>
  );
}

export default App;
