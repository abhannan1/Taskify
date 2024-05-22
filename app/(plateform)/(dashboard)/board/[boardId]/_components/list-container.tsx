"use client"

import { ListWithCards } from '@/types'
import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import ListForm from './list-form'
import ListItem from './list-item'
import { Card, List } from '@prisma/client'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { updateCardOrder } from '@/actions/update-card-order'

interface ListContainerProps{
    boardId:string,
    data: ListWithCards[]
}

// function reorder  <T>(list: T[], startIndex: number, endIndex: number) : T[] {
//     const result = Array.from(list)
//     const [removedItem]= result.splice(startIndex, 1) 
//     list.splice(endIndex,0,removedItem)

//     return result;
// }

function reorder  <T>(list: T[], popIndex: number, pushIndex: number) {
    const result = Array.from(list)
    const [removedItem]= result.splice(popIndex, 1) 
    result.splice(pushIndex,0,removedItem)
    return result;
}

const ListContainer = ({boardId, data}: ListContainerProps) => {


    const [orderedData, setOrderedData] = useState(data)
    const {execute: executeUpdateListOrder, isLoading: isLoadingUpdateListOrder} = useAction(updateListOrder, {
        onSuccess:(data)=>{
            toast.success("reordered the lists")
        },
        onError:(error)=>{
            toast.error(error)
        }
    })
    const {execute: executeUpdateCardOrder, isLoading: isLoadingUpdateCardOrder} = useAction(updateCardOrder, {
        onSuccess:(data)=>{
            toast.success("reordered the cards")
        },
        onError:(error)=>{
            toast.error(error)
        }
    })

    useEffect(()=>{
        setOrderedData(data)
    },[data])


    const onDropEnd= (result:any)=>{
        const { destination, source, type } = result;

		if (!destination) {
			return;
		}

		//Dropped in same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		//User moves a List

		if (type === "list") {
			const items = reorder(
				orderedData,
				source.index,
				destination.index
			).map((item, index) => ({
				...item,
				order: index,
			}));
    
			setOrderedData(items);
			//Trigger server action
			executeUpdateListOrder({ boardId, items });
		}

		//User moves a Card

		if (type === "card") {
			const newOrderedData = [...orderedData];

			// Source and destination list
			const sourceList = newOrderedData.find(
				(list) => list.id === source.droppableId
			);
			const destList = newOrderedData.find(
				(list) => list.id === destination.droppableId
			);

			if (!sourceList || !destList) {
				return;
			}

			// Check if cards exists on the sourceList
			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			// Check if cards exists on the destList
			if (!destList.cards) {
				destList.cards = [];
			}

			// Moving the card in the same list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);

				reorderedCards.forEach((card, idx) => {
					card.order = idx;
				});

				sourceList.cards = reorderedCards;

				setOrderedData(newOrderedData);

                executeUpdateCardOrder({ boardId, items:reorderedCards });


				//Move card from one list to another list
                
            } else{
                //remove card from the source list
                const [removedCard] = sourceList.cards.splice(source.index, 1)

                removedCard.listId = destList.id

                destList.cards.splice(destination.index, 0, removedCard)

                sourceList.cards.forEach((card,index)=>{
                    card.order = index
                })
                
                destList.cards.forEach((card,index)=>{
                    card.order = index
                })

                setOrderedData(newOrderedData)

                executeUpdateCardOrder({ boardId, items:destList.cards });


            }
        }

    }

  return (
        <DragDropContext onDragEnd={onDropEnd}>
            <Droppable droppableId='lists' type='list' direction='horizontal'>
                {
                    (provided)=>(
                        <ol className={cn('flex gap-x-3 h-full',
                            (
                            isLoadingUpdateListOrder 
                                ||
                            isLoadingUpdateCardOrder
                        ) 
                            &&
                            "animate-pulse "
                        )}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        >
                        {orderedData.map((data, index)=>{
                            return(
                                <ListItem
                                key={data.id}
                                index={index}
                                data={data}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm/>
                        <div className='flex-shrink-0 w-1'/>
                    </ol>
                )
            }
            </Droppable>
        </DragDropContext>
  )
}

export default ListContainer