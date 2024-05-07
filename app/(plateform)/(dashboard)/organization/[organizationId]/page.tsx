// import { auth } from '@clerk/nextjs/server'
import React from 'react'

const OrganizationIdPage = ({params}:{params:{organizationId:string}}) => {
    // const {userId, orgId} = auth()
  return (
    <div>
         Landing page : {params.organizationId}
         <hr />
         {/* userId:{userId} */}
         <hr />
         {/* orgId: {orgId} */}
    </div>
  )
}

export default OrganizationIdPage