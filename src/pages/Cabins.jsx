import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide form" : "Create new cabin"}
        </Button>
      </Row>
      <Row>{showForm && <CreateCabinForm />}</Row>
    </>
  );
}

export default Cabins;
