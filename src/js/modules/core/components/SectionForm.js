import React from "react";
import { AllSectionsQuery } from "../queries";
import { graphql, compose } from "react-apollo";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import Input from "./Input";
import Loading from './Loading'

const styles = {
  parent: {
    "-webkit-appearance": "menulist-button",
    height: "40px",
    fontSize: "1.05em"
  },
  field: {
    fontSize: "1.25em",
    padding: "20px"
  },
  label: {
    paddingBottom: "8px"
  },
  sectionForm: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rank: {
    padding: "5px",
    fontSize: "1.05em"
  },
  submit: {
    maxWidth: "80px",
    padding: "8px",
    fontSize: "1.25em",
    margin: "15px",
    backgroundColor: "white"
  }
};

const SectionForm = ({
  classes,
  data: { loading, allSections },
  submitting,
  handleSubmit
}) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={classes.sectionForm}>
      <form onSubmit={handleSubmit}>
        <Field name="name" type="text" label="Name" component={Input} />
        <div className={classes.field}>
          <div className={classes.label}> Parent Section </div>
          <Field
            className={classes.parent}
            name="parent"
            label="Parent"
            component="select"
          >
            {allSections.map(section =>
              <option value={section.id} key={section.id}>
                {" "}{section.name}{" "}
              </option>
            )}
          </Field>
        </div>
        <div className={classes.field}>
          <div className={classes.label}>Description</div>
          <Field
            name="description"
            type="text"
            component="textarea"
            rows="4"
            cols="80"
          />
        </div>
        <div className={classes.field}>
          <div className={classes.label}>Rank</div>
          <Field
            className={classes.rank}
            name="rank"
            type="number"
            component="input"
          />
        </div>
        <button className={classes.submit} type="submit" disabled={submitting}>
          {" "}Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default compose(
  graphql(AllSectionsQuery),
  reduxForm({
    form: "section"
  }),
  injectSheet(styles)
)(SectionForm);
