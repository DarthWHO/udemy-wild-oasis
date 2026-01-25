import styled from "styled-components";
import { useState } from "react";

import CreateCabinForm from "./CreateCabinForm.jsx";

import { formatCurrency } from "../../utils/helpers.js";
import { useDeleteCabin } from "./useDeleteCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    image_link,
    name,
    max_capacity,
    regular_price,
    discount,
  } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img src={image_link} alt={name} />
        <Cabin>{name}</Cabin>
        <div>{`${max_capacity} guests`}</div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount > 0 ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            disabled={isDeleting}
          >
            {isDeleting ? "Editing..." : "Edit"}
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
