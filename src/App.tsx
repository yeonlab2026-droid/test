import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Summary from './pages/Summary';
import Funnel from './pages/Funnel';
import Sales from './pages/Sales';
import Crm from './pages/Crm';
import Service from './pages/Service';
import Issues from './pages/Issues';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Summary />} />
          <Route path="funnel" element={<Funnel />} />
          <Route path="sales" element={<Sales />} />
          <Route path="crm" element={<Crm />} />
          <Route path="service" element={<Service />} />
          <Route path="issues" element={<Issues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
