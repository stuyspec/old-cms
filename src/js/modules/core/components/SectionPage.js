import React from "react";
import { Route, Switch } from 'react-router-dom'
import Section from './Section'
import SectionsList from './SectionsList'

const SectionPage = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/:slug`} component={SectionPage}/>
      <Route exact path="/sections" component={SectionsList} />
      <Route path="/sections/:slug" render={() => <Section slug={match.params.slug} />} />
    </Switch>
  );
};

export default SectionPage;