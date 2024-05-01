import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./democourse.scss";
import Flashcard from "../../components/flashcard/Flashcard.jsx"

const DemoCourse = () => {
  const { id } = useParams();

  // States
  const [chaptersData, setChaptersData] = useState([]);
  const [summariesData, setSummariesData] = useState([]);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [searchTermChapters, setSearchTermChapters] = useState('');
  const [searchTermSummaries, setSearchTermSummaries] = useState('');
  const [searchTermFlashcards, setSearchTermFlashcards] = useState('');
  const [showAddFormChapters, setShowAddFormChapters] = useState(false);
  const [showAddFormFlashcards, setShowAddFormFlashcards] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`https://gp-ooo8.onrender.com/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        

        const { chapters, summary, flashCards } = response.data.course;
        
        setChaptersData(chapters);
        setSummariesData(summary);
        setFlashcardsData(flashCards);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('title', formTitle);
    if (file) formData.append('pdf', file);

    // Example POST request
    await axios.post(`https://gp-ooo8.onrender.com/chapters/${id}`, formData, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' 
      }
      
    });

    setFormTitle('');
    setFile(null);
    setShowAddFormChapters(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Display filename (optional)
    if (event.target.files[0]) {
      const selectedFileName = event.target.files[0].name;
      console.log("Selected file:", selectedFileName); // Or display it in the UI
    }
  };

  const TableComponent = ({ title, data, searchTerm, setSearchTerm, showAddForm, setShowAddForm }) => {
    return (
      <>
        <div className="courses-header">
          <h2>{title}</h2>
          <div className="courses-toolbar">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`${title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">Search</button>
            </div>
            {title === 'Chapters' && (
              <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>+</button>
            )}
          </div>
        </div>

        {showAddForm && (
          <div className="add-course-form">
            <form onSubmit={(e) => handleSubmit(e, title)}>
              <div className="form-field">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="file">{title} File:</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  // required
                />
              </div>
              <button type="submit">Add {title}</button>
            </form>
          </div>
        )}

        <div className="courses-table-container">
          <table className="courses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  {/* <Flashcard /> */}
                  <td>{item.content || item.summary || item.flashcards[0].question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title">Demo Course Page</h1>
      <TableComponent
        title="Chapters"
        data={chaptersData}
        searchTerm={searchTermChapters}
        setSearchTerm={setSearchTermChapters}
        showAddForm={showAddFormChapters}
        setShowAddForm={setShowAddFormChapters}
      />
      <TableComponent
        title="Summary"
        data={summariesData}
        searchTerm={searchTermSummaries}
        setSearchTerm={setSearchTermSummaries}
      />
      <TableComponent
        title="Flashcard"
        data={flashcardsData}
        searchTerm={searchTermFlashcards}
        setSearchTerm={setSearchTermFlashcards}
        showAddForm={showAddFormFlashcards}
        setShowAddForm={setShowAddFormFlashcards}
      />
    </div>
  );
};

export default DemoCourse;
