import './App.css';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Quiz}/>
        <Route path="/quiz-creator" component={Quiz}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={Quiz}/>
      </Switch>
    </Layout>
  );
}

export default App;
