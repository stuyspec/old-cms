import React from "react"
import { Link } from 'react-router-dom'

const Contributors = ({ contributors }) => {
  return(
    <div>
    {contributors.map(user =>
      <Link to={`/users/${user.slug}`} key={user.id}>
        <i> {user.first_name} {user.last_name} </i>
      </Link>
    )}
    </div>
  )
}
export default Contributors;