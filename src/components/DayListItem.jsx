import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const FormatSpots = () => {
    return props.spots === 0 ? (
      <h3 className={dayClasses}>no spots remaining</h3>
    ) : (
      <h3 className={dayClasses}>{`${props.spots} spot${
        props.spots !== 1 ? "s" : ""
      } remaining`}</h3>
    );
  };

  const dayClasses = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClasses}
      selected={props.selected}
    >
      <h2 className={dayClasses}>{props.name}</h2>
      <FormatSpots />
    </li>
  );
}
