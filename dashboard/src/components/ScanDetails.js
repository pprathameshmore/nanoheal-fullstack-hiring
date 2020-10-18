import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Container } from "@material-ui/core";
import { useRouteMatch, useParams } from "react-router-dom";
import { HOSTNAME } from "../utils/utils";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(_id, ruleId, description, severity, path, line) {
  return { _id, ruleId, description, severity, path, line };
}

export default function ScanDetails() {
  const classes = useStyles();
  const { scanId } = useParams();

  const [scanDetails, setScanDetails] = useState({});

  const [findings, setFindings] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${HOSTNAME}api/v1/securities/scans/${scanId}`).then((data) => {
        setFindings(data.data.data.findings);
        setScanDetails(data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  let rows = [];

  findings.forEach((finding, index) => {
    rows.push(
      createData(
        finding._id,
        finding.ruleId,
        finding.metadata.description,
        finding.metadata.severity,
        finding.location.path,
        finding.location.positions.begin.line
      )
    );
  });

  return (
    <Container maxWidth="lg">
      {" "}
      <h1>Scan details for {scanDetails.repositoryName}</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rule ID</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Severity </TableCell>
              <TableCell align="left">Path</TableCell>
              <TableCell align="left">Line Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.ruleId}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.severity}</TableCell>
                <TableCell align="left">{row.path}</TableCell>
                <TableCell align="left">{row.line}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
