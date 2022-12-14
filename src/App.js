import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import PrivateRoute, { AdminRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Missing from './pages/Missing';

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Welcome from './features/auth/Welcome';

import Event from './pages/Event/Event';
import NewEvent from './pages/Event/NewEvent';
import EventList from './pages/Event/EventList';
// import EventPage from './pages/Event/EventPage';

import Ticket from './pages/Ticket/Ticket';
// import TicketPage from './pages/Ticket/TicketPage';
// import NewTicket from './pages/Ticket/NewTicket';

import Venue from './pages/Venue/Venue';
// import VenuePage from './pages/Venue/VenuePage';
import VenueList from './pages/Venue/VenueList';
import NewVenue from './pages/Venue/NewVenue'

import Comedian from './pages/Comedian/Comedian';
import NewComedian from './pages/Comedian/NewComedian';
import ComedianList from './pages/Comedian/ComedianList';

import Admin from './features/auth/Admin';
import UserList from './features/auth/UserList';
import NewUser from './features/auth/NewUser';

import NotAuth from './features/auth/NotAuth';
import About from './pages/About';
import Contact from './pages/Contact';

const ROLES = {
  'User': 2821,
  'Admin': 5045
}

function App() {
  const [isLogged, setIsLoggedIn] = useState(false);
  const logIn = () => {
    window.location.reload();
  }

  return (
    <Routes>
      <Route path="/" element={<Layout logIn={logIn} isLogged={isLogged} />}>
        <Route index element={<Home />} />
        {/* Events Routes */}
        <Route path="events">
          <Route index element={<Event />} />
          {/* <Route path=":id">
            <Route index element={<EventPage />} />
          </Route> */}
        </Route>

        {/* About Routes */}
        <Route path="about">
          <Route index element={<About />} />
        </Route>

        {/* Contact Us Routes */}
        <Route path="contact">
          <Route index element={<Contact />} />
        </Route>

        {/* Comedian Routes without link to any events */}
        <Route path="comedians">
          <Route index element={<Comedian />} />
        </Route>

        {/* Venue Routes withou link to any events */}
        <Route path="venues">
          <Route index element={<Venue />} />
          {/* <Route path=":id" element={<VenuePage />} /> */}
        </Route>

        {/* Login and Register Routes */}
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        {/* Routes Change once login */}
        <Route path="welcome" element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>}
        />

        {/* Ticket Routes  */}
        <Route path="tickets" element={
          <PrivateRoute>
            <Ticket />
          </PrivateRoute>}
        />

        {/* Admin Routes */}
        <Route path="admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>}
        />

        {/* Admin New Event Routes */}
        <Route path="admin/event/new" element={
          <AdminRoute>
            <NewEvent />
          </AdminRoute>}
        />
        {/* Admin New Venue Routes */}
        <Route path="admin/venue/new" element={
          <AdminRoute>
            <NewVenue />
          </AdminRoute>}
        />
        {/* Admin New Comedian Routes */}
        <Route path="admin/comedian/new" element={
          <AdminRoute>
            <NewComedian />
          </AdminRoute>}
        />
        {/* Admin New User Routes */}
        <Route path="admin/user/new" element={
          <AdminRoute>
            <NewUser />
          </AdminRoute>}
        />
        {/* Admin User List Routes */}
        <Route path="admin/user/list" element={
          <AdminRoute>
            <UserList />
          </AdminRoute>}
        />
        {/* Admin Event List Routes */}
        <Route path="admin/event/list" element={
          <AdminRoute>
            <EventList />
          </AdminRoute>}
        />
        {/* Admin Venue List Routes */}
        <Route path="admin/venue/list" element={
          <AdminRoute>
            <VenueList />
          </AdminRoute>}
        />
        {/* Admin Comedian List Routes */}
        <Route path="admin/comedian/list" element={
          <AdminRoute>
            <ComedianList />
          </AdminRoute>}
        />

        <Route path="NotAuth" element={<NotAuth />} />

        {/* Display missing page for every route that does not exist */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
