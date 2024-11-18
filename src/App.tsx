import './App.css'
import HeaderComponent from './components/Header/HeaderComponent.tsx';
import { Container } from '@mui/material';
import ContactForm from './components/ContactForm/ContactForm.tsx';
import { Route, Routes } from 'react-router-dom';
import HomeContainer from './containers/Home/HomeContainer.tsx';

const App = () => {

  return (
    <>
      <HeaderComponent/>
      <Container>
        <Routes>
          <Route path='/' element={<HomeContainer/>}/>
          <Route path='/addContact' element={<ContactForm/>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
