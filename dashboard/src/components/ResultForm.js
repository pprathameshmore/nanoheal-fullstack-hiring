import React, { useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import { HOSTNAME } from "../utils/utils";

const useStyles = makeStyles({
  container: {
    margin: "auto",
  },
  input: {
    marginTop: "20px",
  },
  selectWidth: {
    minWidth: 120,
  },
  inputWidth: {
    width: "100%",
  },
});

export default function ResultForm() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [scanResults, setScanResults] = useState({
    status: "Queued",
    repositoryName: "",
    findings: [],
    queuedAt: "2020-07-06T20:36:59.414Z",
    scanningAt: "2020-07-06T20:36:59.414Z",
    finishedAt: "2020-07-06T20:36:59.414Z",
  });

  const [finding, setFinding] = useState({
    type: "",
    ruleId: "",
    location: {
      path: "",
      positions: {
        begin: {
          line: 0,
        },
      },
    },
    metadata: {
      description: "",
      severity: "",
    },
  });
  //events
  const repositoryNameHandler = (event) => {
    //Set the state
    setScanResults({
      ...scanResults,
      repositoryName: event.target.value,
    });
  };

  const inputSelectStatusHandler = (event) => {
    setScanResults({ ...scanResults, status: event.target.value });
  };

  const inputTypeHandler = (event) => {
    setFinding({
      ...finding,
      type: event.target.value,
    });
  };

  const inputRuleIdHandler = (event) => {
    setFinding({
      ...finding,
      ruleId: event.target.value,
    });
  };

  const inputPathHandler = (event) => {
    setFinding({
      ...finding,
      location: {
        ...finding.location,
        path: event.target.value,
      },
    });
  };

  const inputPositionHandler = (event) => {
    setFinding({
      ...finding,
      location: {
        ...finding.location,
        positions: {
          ...finding.location.positions,
          begin: {
            ...finding.location.positions.begin,
            line: event.target.value,
          },
        },
      },
    });
  };

  const inputDescriptionHandler = (event) => {
    setFinding({
      ...finding,
      metadata: {
        ...finding.metadata,
        description: event.target.value,
      },
    });
  };

  const inputSelectSeverityHandler = (event) => {
    setFinding({
      ...finding,
      metadata: {
        ...finding.metadata,
        severity: event.target.value,
      },
    });
  };

  const onSubmitFindingHandler = () => {
    setScanResults({
      ...scanResults,
      findings: [...scanResults.findings, finding],
    });
  };

  const onSubmitScanResultHandler = async () => {
    try {
      const response = await axios.post(
        `${HOSTNAME}api/v1/securities/scans`,
        scanResults
      );
      if (response.status === 201) {
        enqueueSnackbar("Scan result saved", { variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <Container className={classes.topMargin} maxWidth="sm">
      <h1>Submit Scan Results</h1>
      <Link to="/scans">
        {" "}
        <h3>See all scan</h3>
      </Link>
      <form autoComplete="off">
        <TextField
          id="inputRepositoryName"
          label="Repository Name"
          variant="outlined"
          size="medium"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={repositoryNameHandler}
          required
        />

        <FormControl
          variant="outlined"
          className={`${classes.input} ${classes.selectWidth}`}
          required
        >
          <InputLabel id="inputLabelSelectStatus">Status</InputLabel>
          <Select
            labelId="inputLabelSelectStatus"
            id="inputSelectStatus"
            label="Status"
            value={scanResults.status}
            onChange={inputSelectStatusHandler}
          >
            <MenuItem value="NONE">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Queued"}>Queued</MenuItem>
            <MenuItem value={"In_Progress"}>In Progress</MenuItem>
            <MenuItem value={"Success"}>Success</MenuItem>
            <MenuItem value={"Failure"}>Failure</MenuItem>
          </Select>
        </FormControl>

        <h2>Findings</h2>

        <TextField
          id="inputType"
          label="Type"
          variant="outlined"
          size="medium"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={inputTypeHandler}
          required
        />

        <TextField
          id="inputRuleID"
          label="Rule ID"
          variant="outlined"
          size="medium"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={inputRuleIdHandler}
          required
        />

        <h3>Location</h3>

        <TextField
          id="inputPath"
          label="Path"
          variant="outlined"
          size="medium"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={inputPathHandler}
          required
        />

        <TextField
          id="inputPosition"
          label="Position"
          variant="outlined"
          size="medium"
          type="number"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={inputPositionHandler}
          required
        />

        <h3>Metadata</h3>
        <TextField
          id="inputDescription"
          label="Description"
          variant="outlined"
          size="medium"
          className={`${classes.input} ${classes.inputWidth}`}
          onChange={inputDescriptionHandler}
          required
        />

        <FormControl
          variant="outlined"
          className={`${classes.input} ${classes.selectWidth}`}
        >
          <InputLabel id="inputLabelSelectSeverity">Severity</InputLabel>
          <Select
            labelId="inputLabelSelectSeverity"
            id="inputSelectSeverity"
            label="Status"
            value={finding.metadata.severity}
            onChange={inputSelectSeverityHandler}
            required
          >
            <MenuItem value="NONE">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HIGH"}>High</MenuItem>
          </Select>
        </FormControl>
      </form>{" "}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.input}
        onClick={onSubmitFindingHandler}
      >
        Add another findings
      </Button>
      <br></br>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.input}
        onClick={onSubmitScanResultHandler}
      >
        Submit
      </Button>
    </Container>
  );
}
