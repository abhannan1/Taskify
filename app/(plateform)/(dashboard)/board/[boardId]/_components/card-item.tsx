"use client"

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";

interface CardItemProps {
  data: Card;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="max-h-[6.5rem] overflow-hidden border-2 border-transparent hover:border-black/30 py-2 px-3 text-sm font-normal bg-white shadow-sm rounded-sm cursor-pointer"
        >
          <p className="line-clamp-3">
            {data.title}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
