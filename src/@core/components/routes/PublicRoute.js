// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { isUserLoggedIn, getHomeRouteForLoggedInUser } from '@utils'
import {NavItem} from "reactstrap";

const PublicRoute = ({ children, route }) => {
  if (route) {
    const user = isUserLoggedIn()

    const restrictedRoute = route.meta && route.meta.restricted
    console.log(user)

    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
