import React from 'react'

const OrganizationIdPage = ({params}:{params:{organizationId:string}}) => {
  return (
    <div>
         Landing page : {params.organizationId}
    </div>
  )
}

export default OrganizationIdPage