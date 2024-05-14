import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes';

const SettingsPage = () => {
  return (
    <div className='w-full'>
        <OrganizationProfile
        routing='hash'
        appearance={{
            // baseTheme:dark ,
            elements:{
                cardBox:{
                  border:'1px solid #e5e5e5',
                  boxShadow:'none',
                  width:'100%',
                  // height:"100%"
                },
                
                rootBox:{
                    boxShadow:'none',
                    width:'100%',
                }
            }
        }}
        />
    </div>
  )
}

export default SettingsPage