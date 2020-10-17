import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 20,
  },
  cardSpace: {
    marginBottom: 20,
  },
});

export default function ScanView(props) {
  const classes = useStyles();

  const {
    _id,
    repositoryName,
    status,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
  } = props;

  let timestamp;

  switch (status) {
    case "Queued":
      timestamp = "Queued at: " + new Date(queuedAt);
      break;
    case "Success":
      timestamp = "Success at: " + new Date(finishedAt);
      break;
    case "In_Progress":
      timestamp = "In Progress at: " + new Date(scanningAt);
      break;
    case "Failure":
      timestamp = "Failure at: " + new Date(finishedAt);
      break;
    default:
      break;
  }

  return (
    <Card className={`${classes.root} ${classes.cardSpace}`}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {status}
        </Typography>
        <Typography variant="h5" component="h2">
          {repositoryName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {timestamp}
        </Typography>
        <Typography variant="body2" component="p">
          Findings:
          <Badge badgeContent={findings.length} color="primary">
            <SearchIcon />
          </Badge>
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/scans/${_id}`}>
          <Button size="medium">See details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
