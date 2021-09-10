import React, { useState } from "react";
import { connect } from "react-redux";

function Labels({
  allLabels, labels, isEditing, update,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [labelInput, setLabelInput] = useState("");

  function addLabel(ev) {
    if (ev.key === "Enter") {
      const newLabel = ev.target.value;
      if (!labels.includes(newLabel) && newLabel.length > 0) {
        update(labels.concat(newLabel));
        setLabelInput("");
      }
    } else if (ev.key === "Escape") {
      setIsAdding(false);
    }
  }

  function dataListChange(ev) {
    const curVal = ev.target.value;
    setLabelInput(curVal);
    if (allLabels.includes(curVal)) { addLabel(ev); }
  }

  function inputDOM() {
    if (!isEditing) return "";

    if (isAdding) {
      return (
        <div>
          <datalist id="labels">
            {
              allLabels.filter((label) => !labels.includes(label)).map((label) => <option value={label} key={label}>{label}</option>)
            }
          </datalist>
          <input type="search" list="labels" onKeyDown={addLabel} value={labelInput} onChange={dataListChange} placeholder="Choose Label" />
        </div>
      );
    }

    return <button onClick={setIsAdding.bind(null, true)}>add tag +</button>;
  }

  return (
    <div className="label-display">
      {
        labels.map((label) => (
          <span className="label" key={label}>{ label }</span>
        ))
      }
      {
        inputDOM()
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  allLabels: state.todos.filter(({ labels }) => labels && labels.length).map(({ labels }) => labels).flat().sort((a, b) => a.localeCompare(b))
    .reduce((uniq, label) => {
      if (!uniq.includes(label)) uniq.push(label);
      return uniq;
    }, []),

});

export default connect(mapStateToProps)(Labels);
