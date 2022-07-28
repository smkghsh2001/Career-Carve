import './App.css';
import Student from './components/Student'
import MentorTable from './components/MentorTable';
import { BookingTable } from './components/BookingTable';
function App() {
  return (
    <div className="App">
      <Student />
      <div className='table-grid'>
        <MentorTable />
        <BookingTable />
      </div>
    </div>
  );
}

export default App;
