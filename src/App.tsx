import './App.css'
import HeaderComponent from './components/Header/HeaderComponent.tsx';
import { Container } from '@mui/material';
import ContactForm from './components/ContactForm/ContactForm.tsx';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/Home/HomeContainer.tsx';
import AllContacts from './components/AllContacts/AllContacts.tsx';

const App = () => {

  return (
    <>
      <HeaderComponent/>
      <Container>
        <Routes>
          <Route path='/' element={<HomeContainer/>}/>
          <Route path='/:id' element={<AllContacts contactSelected={true}/>}/>
          <Route path='/addContact' element={<ContactForm/>}/>
          <Route path="*" element={<h5>No Such Page exists</h5>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
