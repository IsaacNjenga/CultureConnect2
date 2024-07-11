import moment from "moment";
import React from "react";

function CustomMoment({ postedTime }) {
  const now = moment();
  const duration = moment.duration(now.diff(moment(postedTime)));

  const years = Math.floor(duration.asYears());
  const months = Math.floor(duration.asMonths());
  const weeks = Math.floor(duration.asWeeks());
  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours() % 24);
  const minutes = Math.floor(duration.asMinutes() % 60);
  const seconds = Math.floor(duration.asSeconds() % 60);

  let formatted = "";

  if (years > 0) {
    formatted = `${years}y`;
  } else if (months > 0) {
    formatted = `${months}m`;
  } else if (weeks > 0) {
    formatted = `${weeks}w`;
  } else if (days > 0) {
    formatted = `${days}d`;
  } else if (hours > 0) {
    formatted = `${hours}h`;
  } else if (minutes > 0) {
    formatted = `${minutes}m`;
  } else {
    formatted = `${seconds}s`;
  }

  return <span>{formatted}</span>;
}

export default CustomMoment;
