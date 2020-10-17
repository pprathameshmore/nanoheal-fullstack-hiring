import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import ScanView from "../components/ScanView";
import { HOSTNAME } from "../utils/utils";

export default function Scans() {
  const [scans, setScans] = useState([]);

  //Make a API call

  useEffect(() => {
    try {
      axios.get(`${HOSTNAME}api/v1/securities/scans`).then((data) => {
        setScans(data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <h1>All scans</h1>
      {scans.map((scan, index) => {
        return <ScanView key={index} {...scan} />;
      })}
    </Container>
  );
}
