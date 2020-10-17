import React from "react";
import Container from "@material-ui/core/Container";
import { useRouteMatch, useParams } from "react-router-dom";

export default function ScanDetails() {
  const { scanId } = useParams();
  return (
    <div>
      <Container maxWidth="lg">
        <h1>Scan Details {scanId}</h1>
      </Container>
    </div>
  );
}
