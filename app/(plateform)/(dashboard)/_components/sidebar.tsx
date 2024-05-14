'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Accordion } from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import NavItem, { Organization } from './nav-item'


interface SidebarProps {
    storageKey?:string
}

const SideBar = ({storageKey = "t-sidebar-state"} : SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage <Record<string,unknown>>(storageKey, {})
    const {userMemberships, isLoaded:isLoadedOrgList} = useOrganizationList({
        userMemberships:{
            infinite:true
        }
    })
    const {organization:activeOrganization, isLoaded:isLoadedOrg} = useOrganization()

    const defaultAccordianValue: string[] = Object.keys(expanded)
    .reduce((acc:string[], key:string)=>{
        if(expanded[key]){
            acc.push(key)
        }
        return acc
    },[])

    const onExpand = (id:string) =>{
        if (!expanded[id]){
            setExpanded((curr)=>({
                ...curr,
                [id]:true
            }))
        } else{
            setExpanded((curr)=>({
                ...curr,
                [id]:!expanded[id]
            }))
        }
        console.log(expanded)
    }

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading){
        return(
			<>
				<div className="flex items-center justify-between mb-2">
					<Skeleton className="h-10 w-[50%]" />
					<Skeleton className="h-10 w-10" />
				</div>
				<div className="space-y-2">
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
        )
    }


  return (
    <>
        <div className="font-medium text-sm flex items-center mb-1">
            <span className="pl-4">Workspaces</span>
            <Button
                asChild
                type="button"
                size="icon"
                variant="ghost"
                className="ml-auto"
            >
                <Link href="/select-org">
                    <Plus className="h-4 w-4" />
                </Link>
            </Button>
        </div>

			<Accordion
				type="multiple"
				defaultValue={defaultAccordianValue}
				className="space-y-2"
			>
				{userMemberships.data?.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={activeOrganization?.id === organization.id}
						isExpanded={expanded[organization.id]}
						organization={organization as Organization}
						onExpand={onExpand}
					/>
				))}
			</Accordion>



    </>
  )
}

export default SideBar