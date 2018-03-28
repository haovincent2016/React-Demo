import React from 'react'
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom'
import GMap from '@/containers/GMap'
import UserOrders from '@/containers/UserOrders'
import UserOrder from '@/containers/UserOrder'
import ApplyDriver from '@/containers/ApplyDriver'
import DriverOrder from '@/containers/DriverOrder'
import DriverOrders from '@/containers/DriverOrders'
import AdminOrders from '@/containers/AdminOrders'
import AdminOrder from '@/containers/AdminOrder'
import AdminDrivers from '@/containers/AdminDrivers'
import AdminDriver from '@/containers/AdminDriver'
import LoginPage from '@/containers/LoginPage'
import RegisterPage from '@/containers/RegisterPage'
import Header from '@/components/Header'

const routes = (
  <div className="wrapper">
    <Router>
      <Switch>
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/register" component={RegisterPage} />
        <Route path="/">
          <GMap />
        </Route>
      </Switch>
    </Router>
  </div>
)

/*
<Route path="/driver/apply" component={ApplyDriver} />
<Route path="/driver/orders" exact component={DriverOrders} />
<Route path="/driver/orders/:id" exact component={DriverOrder} />
<Route path="/admin/drivers" exact component={AdminDrivers} />
<Route path="/admin/drivers/:id" exact component={AdminDriver} />
<Route path="/admin/orders" exact component={AdminOrders} />
<Route path="/admin/orders/:id" exact component={AdminOrder} />
<Route path="/">
  <div className="main">
    <GMap />
    <Route path="/orders" exact component={UserOrders} />
    <Route path="/orders/:id" component={UserOrder} />
  </div>
</Route>
*/

export default routes
